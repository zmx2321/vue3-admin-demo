<template>
  <div class="echarts">
    <ECharts :option="option" :resize="false" />
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
  chartData: ()=> [],
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
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: color1 },
    { offset: 1, color: color2 }
  ])
}

const option: ECOption = {
      title: {
        text: '单位(分)',
        top: "2.5%",
        right: '2%',
        textStyle: {
          color: '#fff',
          fontSize: 10,
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
      legend: {
        itemWidth: 8,
        itemHeight: 8,
        right: 0,
        top: '4%',
        left: '5.2%',
        textStyle: chartConfig.textStyle,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '5%',
        height: '76%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        offset: 18,
        axisTick: {
          show: false,  // 隐藏刻度线
        },
        axisLine: {
          lineStyle: chartConfig.lineStyle
        },
        axisLabel: {
          padding: [0, 0, 0, -11],
          interval: 0, // 横轴信息全部显示
          rotate: 30,
          ...chartConfig.textStyle,
          align: 'left',
        },
        data: props.chartData.map(item => item.name),
      },
      yAxis: {
        type: 'value',
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
          name: '月平均',
          type: 'bar',
          barWidth: chartConfig.barWidth,
          itemStyle: {
            color: setLinearGradient('rgb(17,85,231)', 'rgba(22, 62, 112, 0)')
          },
          data: props.chartData.map(item => item.monthlyAverage),
        },
        {
          name: '日平均',
          type: 'bar',
          barWidth: chartConfig.barWidth,
          itemStyle: {
            color: setLinearGradient('rgb(63,222,172)', 'rgba(22, 62, 112, 0)')
          },
          data: props.chartData.map(item => item.dailyAverage),
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
