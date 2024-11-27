<template>
  <div class="echarts">
    <ECharts :option="option" :resize="false" :chartAuto="true" />
  </div>
</template>

<script setup lang="ts">
import ECharts from "@/components/ECharts/index.vue";
import echarts, { ECOption } from "@/components/ECharts/config";

// 接收父组件参数，并设置默认值
interface chartProps {
  chartData: []; // 数据 ==> 必传
}
const props = withDefaults(defineProps<chartProps>(), {
  chartData: () => [],
});

const chartConfig = {
  barWidth: '10',
  textStyle: {
    color: '#fff',
    fontSize: 10.5,
  },
  lineStyle: {
    color: 'rgba(255, 255, 255, .6)', // 设置横坐标线颜色
    // width: 2, // 设置横坐标线宽度
  }
}

const setLinearGradient = (color1, color2) => {
  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: color1 },
    { offset: 1, color: color2 }
  ])
}

const option: ECOption = {
  title: {
    text: '退服工单数量(个)',
    top: "2.5",
    right: '1%',
    textStyle: {
      color: '#fff',
      fontSize: 11,
    }
  },
  tooltip: {
    trigger: 'axis',
    textStyle: {
      color: '#000',
      fontSize: 11,
    },
    axisPointer: {
      type: 'cross',
      crossStyle: {
        color: '#fff'
      }
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    top: '7.8%',
    height: '88%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    offset: -2,
    min: 0,
    axisLine: {
      show: true, // 显示y轴线
      lineStyle: chartConfig.lineStyle
    },
    axisLabel: {
      padding: [0, 0, 0, -11],
      interval: 0, // 横轴信息全部显示
      rotate: 0,
      ...chartConfig.textStyle,
      align: 'left',
    },
    axisTick: {
      show: false,  // 隐藏刻度线
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: "category",
    data: props.chartData.map(item => item.name),
    /* axisLabel: {
      interval: 0,
      margin: 20,
      textStyle: {
        color: "#fff"
      }
    }, */
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,  // 隐藏刻度线
    },
    axisLine: {
      show: true, // 显示y轴线
      lineStyle: chartConfig.lineStyle
    },
    axisLabel: {
      color: '#fff',
      fontSize: 10,
    }
  },
  series: [
    {
      name: '无线维护指标',
      type: 'bar',
      barWidth: 8,
      data: props.chartData.map(item => item.wirelessIndicators),
      label: {
        show: true, //开启显示
        position: 'right', //在上方显示
        color: '#4ABEFE',
        fontSize: 10.5,
        // formatter: '{c}个',
        fontWeight: 800
      },
      itemStyle: {
        color: setLinearGradient('rgba(197, 163, 86, 0.2)', '#C5A356'),
        /* color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          { offset: 0, color: 'rgba(197, 163, 86, 0.2)' },
          { offset: 1, color: '#C5A356' },
        ]), */
      },
    },
  ]
}
  ;
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
