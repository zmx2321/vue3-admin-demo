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
import SelectDetailDialog from "@/components/OpenlayerBaseMapTDT/components/SelectDetailDialog.vue";
import OverviewContainer from './selectedDialogContainer/OverviewContainer.vue'
import AreaTableContainer from './selectedDialogContainer/AreaTableContainer.vue'
// api相关 - 工具

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
    console.log("获取概览数据", lonlat, name);
};

// 获取筛选数据
const getAreaTableDarta = async ({ lonlat, radius }) => {
    // console.log("设置圆数据", val, JSON.stringify(val));

    console.log("获取筛选数据", lonlat, radius);

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