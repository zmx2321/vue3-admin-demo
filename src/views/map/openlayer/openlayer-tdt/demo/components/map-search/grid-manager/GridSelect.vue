<template>
  <section class="grid_select_wrap">
    <div class="grid_select_cont">
      <el-radio-group v-model="gridSelect">
        <el-radio
          v-for="(item, index) in gridDataList"
          :key="index"
          :label="item.id"
          @change="selectGrid"
        >
          {{ item.name }}
        </el-radio>
      </el-radio-group>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
// 组件传参
import mittBus from "@/utils/mittBus"; // mitt
// api相关
import { apiCommon } from "@/utils/index.js";
import * as gisApi from "@/api/gis/gis";

const gridSelect = ref("");

let gridDataList = ref([]);

// poxy对象
const { proxy } = getCurrentInstance();

/**
 * 接收其他组件派发的方法
 */
// 通知网格列表刷新
/* mittBus.on("reloadGridSelect", () => {
  console.log("通知图层列表刷新");

  initGridData();
}); */

// 选择网格
const selectGrid = async (id) => {
  let params = {
    id,
  };
  // console.log(params);

  proxy.$modal.loading("正在请求，请稍候...");
  let gridData = await apiCommon(gisApi.queryGridByld, params);
  gridData = gridData.data;
  proxy.$modal.closeLoading();

  mittBus.emit("selectGrid", gridData);
};

// 初始化图层管理
const initGridData = async () => {
  try {
    let gridData = await apiCommon(gisApi.queryGridBasiclnfoList);
    gridDataList.value = gridData.data;
    // console.log(gridDataList.value);
  } catch (e) {
    console.warn(e);
  }
};
initGridData();
</script>

<style lang="scss" scoped>
.grid_select_wrap {
  position: fixed;
  margin-top: 12px;
  padding: 10px;
  width: 255px;
  height: 72vh;
  background: rgb(255 255 255 / 80%);
  border-radius: 10px;
  overflow: auto;

  .grid_select_cont {
    margin-left: 12px;

    .el-radio-group {
      // margin-top: 15px;

      :deep .el-radio {
        display: block;
        width: 100%;

        .el-radio__label {
          white-space: initial;
          line-height: 25px;
        }
      }
    }
  }
}
</style>
