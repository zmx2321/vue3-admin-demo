<template>
  <el-form ref="ruleFormRef" :inline="true" :model="ruleForm" label-width="80px">
    <el-form-item label="网络制式">
      <el-radio-group v-model="ruleForm.contactType" @change="setContactType" :disabled="renderFlag">
        <el-radio label="all">全部</el-radio>
        <el-radio label="4g">4g</el-radio>
        <el-radio label="5g">5g</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="基站类型">
      <el-radio-group v-model="ruleForm.coverType" @change="setCoverType" :disabled="renderFlag">
        <el-radio label="all">全部</el-radio>
        <el-radio label="室内">室内</el-radio>
        <el-radio label="室外">室外</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="渲染方式">
      <el-radio-group v-model="ruleForm.renderType" @change="setRenderType">
        <el-radio label="频率">频率</el-radio>
        <el-radio label="xxx" disabled>xxx</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="" style="margin-left: 13px">
      <el-autocomplete v-model="ruleForm.dynamicFieldsValue" :fetch-suggestions="querySearch"
        @select="selectGisSearchSubmit" style="width: 400px" placeholder="请输入" clearable :trigger-on-focus="true"
        :debounce="100" :disabled="renderFlag">
        <template #prepend>
          <el-select v-model="ruleForm.searchType" style="width: 115px" @change="selectSearchCriteria">
            <el-option v-for="(item, index) in searchCriteriaList" :key="index" :label="item.label"
              :value="item.prop" />
          </el-select>
        </template>
        <template #default="{ item }">
          <div class="auto_item_wrap" v-if="ruleForm.searchType === 'POI'">
            <h3>{{ item.name }} {{ item.phone }}</h3>
            <span>{{ item.address }} &nbsp;&nbsp; [{{ item.lonlat }}]</span>
          </div>
          <div class="auto_item_wrap" v-else>
            <h3>[{{ item.networkType }}] {{ item.cgi }}</h3>
            <span>{{ item.cellName }}</span>
            <span>{{ item.coverType }}</span>
          </div>
        </template>
        <template #append>
          <el-button type="primary" @click="setGisSearchSubmit">
            <el-icon>
              <Search />
            </el-icon>
          </el-button>
        </template>
      </el-autocomplete>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, computed } from "vue";
// 组件传参
import mittBus from "@/utils/mittBus"; // mitt
// store
import { gisDataStore } from '@/stores/modules/gis.ts'
// api
import * as gisApi from "@/api/modules/map";

const { setGisSearchData } = gisDataStore()

const ruleFormRef = ref(null);
let currentZoom = ref(0);
let currentMinRenderZoom = 0;
let currentCenter = []

let renderFlag = computed(() => {
  return parseInt(currentZoom.value) < currentMinRenderZoom;
});

// 搜索条件
const searchCriteriaList = ref([
  {
    label: "小区名称",
    prop: "cellName",
    eventName: "searchByCellName",
    isShowSelect: true,
  },
  {
    label: "CGI",
    prop: "CGI",
    eventName: "searchByCGI",
    isShowSelect: false,
  },
  {
    label: "POI搜索",
    prop: "POI",
    eventName: "POISearch",
    isShowSelect: true,
  },
  {
    label: "经纬度搜索",
    prop: "lonlat",
    eventName: "searchByLonlat",
    isShowSelect: false,
  },
]);

const ruleForm = ref({
  contactType: "all", // 网络制式
  coverType: "all", // 基站类型
  renderType: "频率", // 渲染方式
  searchType: searchCriteriaList.value[2].prop, // 搜索条件
  dynamicFieldsValue: "", // 动态字段结果
  // dynamicFieldsValue: "121.634959, 29.878552", // 动态字段结果 - 无重叠
  // dynamicFieldsValue: "121.621406, 29.872199", // 动态字段结果 - 有重叠
  // dynamicFieldsValue: "公园", // 动态字段结果
  // dynamicFieldsValue: 'H949990-宁波江北奥体中心体育馆内场临时EasyMarco-HLH-D101-65'  // 动态字段结果
  // dynamicFieldsValue: '460-00-815600-69'  // 动态字段结果 - 室外cgi测试
  // dynamicFieldsValue: '460-00-405194-1'  // 动态字段结果 - 室内cgi测试
});

/**
 * 接收其他组件派发的方法
 */
// 重制按钮
mittBus.on("resetBtn", () => {
  ruleForm.value.contactType = "all";
  ruleForm.value.coverType = "all";
});
// 获取当前中心点坐标
mittBus.on("getCurrentCenter", (center) => {
  // console.log("获取当前中心点坐标", center);

  currentCenter = center.join(',')
});
// 获取当前zoom
mittBus.on("getCurrentZoom", ({ zoom, minRenderZoom }) => {
  // console.log("当前缩放级别为：" + zoom, minRenderZoom);

  currentZoom.value = zoom;
  currentMinRenderZoom = minRenderZoom;
});

/**
 * 业务
 */
// 查询网络制式
const setContactType = () => {
  // console.log(ruleForm.value.contactType)

  mittBus.emit("getContactType", ruleForm.value.contactType);
};

// 查询基站类型
const setCoverType = () => {
  // console.log(ruleForm.value.coverType)

  mittBus.emit("getCoverType", ruleForm.value.coverType);
};

// 切换渲染方式
const setRenderType = () => {
  mittBus.emit("setRenderType", ruleForm.value.renderType);
  mittBus.emit("setRenderTypeLend", ruleForm.value.renderType); // 图例
};

// 选择搜索条件
const selectSearchCriteria = () => {
  // console.log('搜索类型', ruleForm.value.searchType, ruleForm.value.dynamicFieldsValue)

  ruleForm.value.dynamicFieldsValue = "";
};

// gis查询
const setGisSearchSubmit = () => {
  // console.log('gis查询', ruleForm.value.searchType, ruleForm.value.dynamicFieldsValue)

  // 当输入内容时才派发事件
  if (ruleForm.value.dynamicFieldsValue !== "") {
    searchCriteriaList.value.forEach((item) => {
      switch (ruleForm.value.searchType) {
        case item.prop:
          // 根据定义的名称派发事件
          mittBus.emit(item.eventName, ruleForm.value.dynamicFieldsValue);
          break;
      }
    });
  }
};

// 获取下拉框数据接口
const getSelectDatyAsync = async (queryString) => {
  let gisData = null;

  // 小区名称
  if (ruleForm.value.searchType === "cellName") {
    let params = {
      cellName: queryString,
    };
    // gisData = await apiCommon(gisApi.queryCellListByCellName, params);
    gisData = {
      data: []
    }

    gisData.data.forEach((item) => {
      item.value = item.cellName;
    });

    setGisSearchData(gisData.data)
    return gisData.data;
  }
  // 站点名称名称
  if (ruleForm.value.searchType === "stationName") {
    let params = {
      stationName: queryString,
    };
    // gisData = await apiCommon(gisApi.queryCellListByStationName, params);
    gisData = {
      data: []
    }

    gisData.data.forEach((item) => {
      item.value = item.stationName;
    });

    return gisData.data;
  }

  if (ruleForm.value.searchType === "POI") {
    // 周边搜索条件
    let params = {
      postStr: {
        keyWord: queryString,  // 关键字
        level: 15,  // 目前查询的级别	
        queryRadius: 5000,  // 查询半径（周边搜索必备）
        pointLonlat: currentCenter,  // 点坐标（周边搜索必备）
        queryType: 3,  // 搜索类型（1：普通搜索，2：视野内搜索，3：周边搜索，4：普通建议词搜索，5：公交规划建议词搜索，6：公交规划起止点搜索（只搜索公交站），7： 纯地名搜索（不搜公交线），10：拉框搜索
        start: 0,  // 返回结果起始位（用于分页和缓存）默认0
        count: 100  // 返回的结果数量（用于分页和缓存）
      },
      type: 'query',
      tk: import.meta.env.VITE_APP_MapToken
    };

    gisData = await gisApi.queryGisDataByPOISearch(params);
    if (!gisData.data.pois) {
      gisData.data.pois = []
    }
    setGisSearchData(gisData.data.pois)
    return gisData.data.pois;
  }
};

// 获取下拉框数据
const querySearch = async (queryString, cb) => {
  searchCriteriaList.value.forEach(async (item) => {
    // 识别当前搜索条件
    if (item.prop === ruleForm.value.searchType) {
      // 如果不需要模糊搜索不显示下拉框
      if (!item.isShowSelect) {
        cb([]);
      } else {
        if (queryString !== "") {
          getSelectDatyAsync(queryString).then((gisData) => {
            if (!gisData) { gisData = [] }

            gisData.forEach(gisDataItem => {
              gisDataItem.searchType = ruleForm.value.searchType
            })

            cb(gisData);
          });
        } else {
          cb([]);
        }
      }
    }
  });
};

// 搜索框下拉选择
const selectGisSearchSubmit = (val) => {
  // console.log('搜索框下拉选择', val)

  mittBus.emit("selectGisSearchSubmit", val);
};
</script>

<style lang="scss" scoped>
.el-popper.is-pure {
  .auto_item_wrap {
    // background: #f00;
    border-bottom: solid 1px #efefef;
    // padding-bottom: 10px;

    span {
      display: block;
      // margin-top: -15px;
    }
  }
}
</style>
