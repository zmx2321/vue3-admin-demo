<template>
    <section class="table_cont">
        <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
            <el-form-item label="小区名称" prop="neName" style="width: 300px;">
                <el-input v-model="queryParams.neName" placeholder="请输入小区名称" clearable />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
                <el-button type="warning" plain icon="Download" @click="handleExport">导出</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" stripe height="50vh" v-loading="loading">
            <!-- 表格字段 -->
            <slot />
        </el-table>
    </section>
</template>

<script setup>
import { nextTick, ref } from 'vue'
const { proxy } = getCurrentInstance();

const props = defineProps({
    loading: {
        type: Boolean,
        default: true,
        required: true
    }
})

const tableData = ref([]);
let tableDataCopy = []
const queryParams = ref({})
const lonlat1 = ref()

// 获取筛选数据
const getAreaTableDarta = (tbData, lonlat) => {
    // console.log('获取筛选数据', tbData)
    tableData.value = tbData
    tableDataCopy = tbData
    lonlat1.value = lonlat

}

// 搜索
const handleQuery = () => {
    console.log('搜索', queryParams.value)

    // 对象有几个属性
    const length = Object.getOwnPropertyNames(queryParams.value).length

    for (let key in queryParams.value) {
        if ((length === 0 || length === 1) && queryParams.value[key] === '') {
            tableData.value = tableDataCopy

            return
        }

        tableData.value = tableDataCopy.filter(item => item.neName === queryParams.value.neName)
    }
}
// 导出
const handleExport = () => {
    let param = {};
    param.coordinates = lonlat1.value
    proxy.download("/gis/exportAreaHealthInfo", {
        ...param
    }, `网格小区数据_${new Date().getTime()}.xlsx`);
}

defineExpose({
    getAreaTableDarta,
});
</script>

<style lang="scss" scoped>
.table_cont {}
</style>