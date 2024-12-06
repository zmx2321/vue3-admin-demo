<template>
    <select-detail-dialog :with="'80%'" :title="'圆形选区'" ref="refSelectDetailDialog">
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
import SelectDetailDialog from "@/components/OpenlayerBaseMap/components/SelectDetailDialog.vue";
import OverviewContainer from './selectedDialogContainer/OverviewContainer.vue'
import AreaTableContainer from './selectedDialogContainer/AreaTableContainer.vue'
// api相关 - 工具
import { apiCommon } from "@/utils/index.js";
import * as gisApi from "@/api/gis/gis";

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
    // console.log(val)
    refSelectDetailDialog.value.show();

    getOverviewDarta(val)
    getAreaTableDarta(val);
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
const getAreaTableDarta = async ({ lonlat, radius }) => {
    // console.log("设置圆数据", val, JSON.stringify(val));

    // 获取接口数据接口
    let params = {
        // coordinates: lonlat,
    };

    loading.value = true

    // let areaCircleInfo = await apiCommon(gisApi.queryAreaHealthInfo, params);
    // refAreaTableContainer.value.getAreaTableDarta(areaCircleInfo.data)

    let areaCircleInfo = {
        data: []
    }
    nextTick(() => {
        refAreaTableContainer.value.getAreaTableDarta(areaCircleInfo.data)
    })

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