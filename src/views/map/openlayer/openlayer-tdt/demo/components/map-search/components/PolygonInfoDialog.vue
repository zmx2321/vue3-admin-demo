<template>
  <select-detail-dialog :with="'80%'" :title="title ? '多边形选区数据 - ' + title : '多边形选区数据'" ref="refSelectDetailDialog">
    <!-- 数据概览 -->
    <template #SelectAreaOverviewContainer>
      <div class="overview_wrap">
        <overview-container ref="refOverviewContainer" />
      </div>
    </template>

    <!-- 数据筛选 -->
    <template #SelectAreaTableContainer>
      <div class="table_wrap">
        <area-table-container ref="refAreaTableContainer" :loading="loading">
          <el-table-column type="index" width="50" label="#" align="center" />
          <el-table-column prop="county" label="省市区" width="80" align="center" />
          <el-table-column prop="netType" label="网络制式" width="80" align="center" />
          <el-table-column prop="neName" label="小区名称" />
          <el-table-column prop="perception" label="用户感知" width="80" align="center" />
          <el-table-column prop="alarm" label="告警故障" width="80" align="center" />
          <el-table-column prop="profit" label="价值收益" width="80" align="center" />
          <el-table-column prop="quality" label="网络质量" width="80" align="center" />
          <el-table-column prop="env" label="机房环境" width="80" align="center" />
          <el-table-column prop="total" label="总分" width="80" align="center" />
        </area-table-container>
      </div>
    </template>
  </select-detail-dialog>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import SelectDetailDialog from "@/components/OpenlayerBaseMap/components/SelectDetailDialog.vue";
import OverviewContainer from './selectedDialogContainer/OverviewContainer.vue'
import AreaTableContainer from './selectedDialogContainer/AreaTableContainer.vue'
// api相关 - 工具
import { apiCommon } from "@/utils/index.js";
import * as gisApi from "@/api/gis/gis";
// 组件传参
// import mittBus from "@/utils/mittBus"; // mitt

// ref
const refSelectDetailDialog = ref(null);
const refOverviewContainer = ref(null);
const refAreaTableContainer = ref(null);

let title = ref("");
let loading = ref(true)

/**
* 业务
*/
const show = (val) => {
  refSelectDetailDialog.value.show();

  title.value = val.name;

  getOverviewDarta(val)
  getAreaTableDarta(val);

  // mittBus.emit("setCancelPolygonBtn");
};

// 获取概览数据
const getOverviewDarta = async ({ lonlat, name }) => {
  // console.log("获取概览数据", val, JSON.stringify(val));

  /* // 获取接口数据接口
  let params = {
    coordinates: lonlat,
  };

  let areaHealthInfo = await apiCommon(gisApi.queryAreaHealthInfo, params);

  refOverviewContainer.value.getOverviewDarta(areaHealthInfo.data) */

  nextTick(() => {
    refOverviewContainer.value.getOverviewDarta({})
  })
};

// 获取筛选数据
const getAreaTableDarta = async ({ lonlat }) => {
  // console.log("获取筛选数据", val, JSON.stringify(val));

  // 获取接口数据接口
  let params = {
    coordinates: lonlat,
  };

  loading.value = true

  let areaHealthInfo = await apiCommon(gisApi.queryAreaHealthInfo, params);

  refAreaTableContainer.value.getAreaTableDarta(areaHealthInfo.data, lonlat)

  loading.value = false
};

defineExpose({
  show,
});

</script>

<style lang="scss" scoped>
.overview_wrap {}

.table_wrap {}
</style>