<template>
  <!-- 年龄比例 -->
  <div class="echarts">
    <ECharts :option="option" :resize="false" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ECharts from "@/components/ECharts/index.vue";
import echarts, { ECOption } from "@/components/ECharts/config";

// 接收父组件参数，并设置默认值
interface chartProps {
  chartData: []; // 数据 ==> 必传
}
const props = withDefaults(defineProps<chartProps>(), {
  chartData: () => [],
});

const setLinearGradient = (color1, color2) => {
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: color1 },
    { offset: 1, color: color2 }
  ])
}

const chartConfig = {
  barWidth: '12',
  textStyle: {
    color: '#fff',
    fontSize: 10.5,
  },
  lineStyle: {
    color: 'rgba(255, 255, 255, .6)', // 设置横坐标线颜色
    // width: 2, // 设置横坐标线宽度
  }
}

const indicator = computed(() => {
  if (JSON.stringify(props.chartData) === '[]') {
    return [  //配置各个维度的最大值
      { name: '', max: 0 },
    ]
  }
  return props.chartData.map(item => {
    return {
      name: item.name,
      max: 100
    }
  })
})

const option: ECOption = {
  tooltip: {
    trigger: 'item',
    textStyle: {
      color: '#000',
      fontSize: 11,
    },
  },
  legend: {
    itemWidth: 9,
    itemHeight: 9,
    icon: "rect",
    textStyle: {
      color: "#fff",
      fontSize: 10
    },
    // left: 'left',
    top: '3.5%',
    left: '3.1%',
  },
  radar: {
    center: ['50%', '57.5%'],
    radius: '60%',
    splitNumber: 5,
    shape: 'circle', // 设置为圆形
    indicator: indicator.value,
    axisLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,0.6)',
        type: 'dashed'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: 'rgba(255,255,255,0.5)',
        type: 'dashed'
      }
    },
    splitArea: {
      show: true,
      areaStyle: {
        color: ['rgba(17,85,231,.3)', 'transparent']
      }
    }
  },
  series: [
    {
      type: 'radar',
      animation: true,
      data: [{
        name: "评分(分)",
        value: props.chartData.map(item => item.value),
        areaStyle: {
          // 填充区颜色
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(22, 62, 112, .8)' },
            { offset: 1, color: 'rgb(74,190,254,.6)' },
          ])
        },
        // 线条样式
        lineStyle: {
          color: 'rgb(74,194,254,.5)',
          width: 1.5
        },
        symbol: 'circle', // 拐点形状，rect=矩形，circle=圆形
        // 拐点的大小
        symbolSize: 5,
        // 小圆点（拐点）设置为白色
        itemStyle: {
          color: '#4abefe'
        },
      }]
    },
  ]
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
