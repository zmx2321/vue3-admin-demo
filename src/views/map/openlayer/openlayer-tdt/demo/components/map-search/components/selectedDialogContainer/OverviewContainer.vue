<template>
    <section class="overview_cont">
        <div class="health_txt">
            health_txt
        </div>
        <div class="health_chart">
            health_chart
        </div>
    </section>
</template>

<script setup>
import { ref, defineProps } from 'vue'

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

// 获取概览数据
const getOverviewDarta = (val) => {
    console.log('获取概览数据', val)

    currentData.value = val
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

    ::v-deep(.health_time) {
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