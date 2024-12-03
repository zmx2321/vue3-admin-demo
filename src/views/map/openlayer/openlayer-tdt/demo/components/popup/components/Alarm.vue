<template>
    <section>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </section>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue'

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

const props = defineProps({
    baseData: {
        type: Object,
        default: () => { },
    }
})

const getPopupData = () => {
    console.log('故障告警信息', props.baseData)
}

defineExpose({
    getPopupData,
});
</script>

<style lang="scss" scoped></style>