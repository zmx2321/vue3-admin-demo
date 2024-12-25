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
        </area-table-container>
      </div>
    </template>
  </select-detail-dialog>
</template>

<script setup>
import { nextTick, ref } from 'vue'
import SelectDetailDialog from "@/components/OpenlayerBaseMapTDT/components/SelectDetailDialog.vue";
import OverviewContainer from './selectedDialogContainer/OverviewContainer.vue'
import AreaTableContainer from './selectedDialogContainer/AreaTableContainer.vue'
// api相关 - 工具
// import { apiCommon } from "@/utils/index.js";
// import * as gisApi from "@/api/gis/gis";
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
  refSelectDetailDialog.value.show(val);

  title.value = val.name;

  getOverviewDarta(val)
  getAreaTableDarta(val);
};

// 获取概览数据
const getOverviewDarta = async ({ lonlat, name }) => {
  console.log("获取概览数据", lonlat, name);
};

// 获取筛选数据
const getAreaTableDarta = async ({ lonlat }) => {
  console.log("获取筛选数据", lonlat);

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