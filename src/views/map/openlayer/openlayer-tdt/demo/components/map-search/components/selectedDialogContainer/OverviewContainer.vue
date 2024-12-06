<template>
    <section class="overview_cont">
        <div class="health_txt">
            <b>{{ currentData.total }}</b>
            <el-descriptions class="margin-top" :column="1" border>
                <el-descriptions-item>
                    <template #label>
                        <span class="cell-item"> 机房环境 </span>
                    </template>
                    <span>{{ currentData.env }}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <span class="cell-item"> 价值收益 </span>
                    </template>
                    <span>{{ currentData.profit }}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <span class="cell-item"> 用户感知 </span>
                    </template>
                    <span>{{ currentData.perception }}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <span class="cell-item"> 网络质量 </span>
                    </template>
                    <span>{{ currentData.quality }}</span>
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <span class="cell-item"> 告警故障 </span>
                    </template>
                    <span>{{ currentData.alarm }}</span>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="health_chart">
            <health-chart class="chart_cot" ref="refHealthChart" :width="'80%'" :height="'80%'"
                :chart-data="chartData" />
        </div>
    </section>
</template>

<script setup>
import { ref, defineProps } from 'vue'
// import SelectAreaOverviewChart from '../../../chart/SelectAreaOverviewChart.vue'
import HealthChart from "../../../chart/HealthChart.vue";

const props = defineProps({
    /* message: {
      type: String,
      default: '',
      required: true
    } */
})

// const refSelectAreaOverviewChart = ref(null)
const refHealthChart = ref(null);

const currentData = ref({});

const chartData = ref({
    dataMax: [
        {
            name: "基站环境",
            max: 100,
        },
        {
            name: "故障告警",
            max: 100,
        },
        {
            name: "站点价值",
            max: 100,
        },
        {
            name: "用户感知",
            max: 100,
        },
        {
            name: "网络质量",
            max: 100,
        },
    ],
    score: [0, 0, 0, 0, 0],
});

// 获取概览数据
const getOverviewDarta = (val) => {
    // console.log('获取概览数据', val)

    currentData.value = val

    setChartData()
}

const setChartData = () => {
    // 图表赋值
    chartData.value.score = [0, 0, 0, 0, 0];

    refHealthChart.value.resetChart();

    /* chartData.value = {
        fieldData: ['Mon1', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        yData: [150, 230, 224, 218, 135, 147, 260]
    }

    refSelectAreaOverviewChart.value.resetChart() */
}

defineExpose({
    getOverviewDarta,
});
</script>

<style lang="scss" scoped>
.overview_cont {

    position: relative;
    display: flex;
    justify-content: space-around;
    padding-top: 10px;

    :deep .health_time {
        position: absolute;
        top: 0;
        left: 0;
    }

    .health_txt {
        width: 35%;

        b {
            position: relative;
            display: block;
            text-align: center;
            // margin-bottom: 10px;
            font-size: 28px;
            color: #000;

            &::before {
                content: "";
                position: absolute;
                margin-left: -29px;
                top: 50%;
                transform: translateY(-50%);
                width: 23px;
                height: 23px;
                background: url("../../icon/tongji.svg") top no-repeat;
                background-size: 100% 100%;
            }
        }
    }

    .health_chart {
        flex: 1;
        position: relative;

        .chart_cot {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
</style>