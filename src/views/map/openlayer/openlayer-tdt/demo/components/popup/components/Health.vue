<template>
    <section class="health_wrap">
        <el-date-picker class="health_time" v-model="insertTime" type="date" placeholder="请选择时间" :shortcuts="shortcuts"
            format="YYYY-MM-DD" value-format="YYYY-MM-DD" size="small" @change="getHealthByTime" :clearable="false" />

        <div class="health_txt">
            <div class="health_txt_left">
                <b>{{ healthData?.total }}</b>
                <el-descriptions class="margin-top" :column="1" border>
                    <el-descriptions-item>
                        <template #label>
                            <span class="cell-item"> 机房环境 </span>
                        </template>
                        <span>{{ healthData?.env }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <span class="cell-item"> 价值收益 </span>
                        </template>
                        <span>{{ healthData?.profit }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <span class="cell-item"> 用户感知 </span>
                        </template>
                        <span>{{ healthData?.perception }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <span class="cell-item"> 网络质量 </span>
                        </template>
                        <span>{{ healthData?.quality }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <span class="cell-item"> 告警故障 </span>
                        </template>
                        <span>{{ healthData?.alarm }}</span>
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <div class="health_chart">
                <health-chart class="chart_cot" ref="refHealthChart" :width="'80%'" :height="'80%'"
                    :chart-data="healthChartData" />
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, defineEmits, defineProps } from 'vue'
// api相关 - 工具
import { apiCommon, getDateTimeNowFormate } from "@/utils/index.js";
import * as gisApi from "@/api/gis/gis";
// 组件
import HealthChart from "../../chart/HealthChart.vue";

// 自定义事件
const emit = defineEmits(['getInsertTime']);

const { proxy } = getCurrentInstance();

const props = defineProps({
    baseData: {
        type: Object,
        default: () => { },
    }
})

/**
 * 工具
 */
// 日期控件
let insertTime = ref(getDateTimeNowFormate("timePicker"));
const shortcuts = [
    {
        text: "Today",
        value: new Date(),
    },
    {
        text: "Yesterday",
        value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
        },
    },
    {
        text: "A week ago",
        value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
        },
    },
];

const refHealthChart = ref(null);
const healthChartData = ref({
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
let healthData = ref(null)

// 获取健康度图表数据
const getPopupData = async () => {
    const { cgi } = props.baseData;

    // 获取接口数据接口
    let params = {
        cgi,
        insertTime: insertTime.value,
    };
    let stationSummary = await apiCommon(gisApi.queryStationSummary, params);

    if (!stationSummary.data) {
        proxy.$modal.msgWarning(`${insertTime.value}没有健康度数据`);
        healthData.value = {};
        healthChartData.value.score = [0, 0, 0, 0, 0];

        return;
    }

    healthData.value = stationSummary.data;

    getHealthChartData(); // 获取健康度图表数据
};

// 获取健康度图表数据
const getHealthChartData = () => {
    const { env, alarm, profit, perception, quality } = healthData.value;

    // 图表赋值
    healthChartData.value.score = [env, alarm, profit, perception, quality];

    resetEcharts(); // 初始化图表
};

// 初始化图表
const resetEcharts = () => {
    setTimeout(() => {
        nextTick(() => {
            refHealthChart.value.resetChart();
        });
    }, 0);
};

// 根据时间搜索
const getHealthByTime = () => {
    getPopupData(); // 健康度数据
    // resetEcharts(); // 初始化图表

    emit("getInsertTime", insertTime.value);
};

getPopupData()

defineExpose({
    getPopupData,
});
</script>

<style lang="scss" scoped>
.health_wrap {
    width: 100%;
    position: relative;
    // display: flex;
    justify-content: space-around;
    padding-top: 35px;

    :deep .health_time {
        position: absolute;
        top: 0;
        left: 0;
    }

    .health_txt {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;

        .health_txt_left {
            width: 35%;

            b {
                position: relative;
                display: block;
                text-align: center;
                margin-bottom: 15px;
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
                    background: url("../../../icon/tongji.svg") top no-repeat;
                    background-size: 100% 100%;
                }
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