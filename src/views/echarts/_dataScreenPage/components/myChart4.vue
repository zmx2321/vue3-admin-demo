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
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: color1 },
    { offset: 1, color: color2 }
  ])
}

const option: ECOption = {
  color: 'white',
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
  legend: [
    {
      data: [
        {
          name: '满意度(分)',
          icon: 'rect'
        }
      ],
      itemWidth: 12,
      itemHeight: 12,
      // left: 'left',
      left: '3.5%', // 调整位置
      top: chartConfig.lendTop,
      textStyle: chartConfig.textStyle
    },
    {
      data: [
        {
          name: '领先度(分)',
          icon: 'rect'
        }
      ],
      itemWidth: 15,
      itemHeight: 2,
      // left: 'right',
      left: '83.6%',
      top: chartConfig.lendTop,
      textStyle: chartConfig.textStyle
    },
  ],
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
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
      /* formatter(val) {
        var strs = val.split(""); // 字符串数组
        var str = "";
        for (var i = 0, s; (s = strs[i++]);) {
          //遍历字符串数组
          str += s;
          if (!(i % 4)) str += "\n"; //按需要求余
        }
        return str;
      } */
    },
    data: props.chartData.map(item => item.name),
  },
  yAxis: [
    {
      type: 'value',
      min: 50,
      max: 100,
      scale: true,
      position: 'left',
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true, // 显示y轴线
        lineStyle: chartConfig.lineStyle
      },
      axisLabel: {
        // formatter: '{value} 分',
        color: "#fff"
      }
    },
    {
      type: 'value',
      min: 0,
      max: 10,
      position: 'right',
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true, // 显示y轴线
        lineStyle: chartConfig.lineStyle
      },
      axisLabel: {
        // formatter: '{value} 分',
        color: "#fff"
      },
    }
  ],
  series: [
    {
      name: '满意度(分)',
      type: 'bar',
      barWidth: 15,
      data: props.chartData.map(item => item.satisfaction),
      yAxisIndex: 0,
      itemStyle: {
        color: setLinearGradient('#8677CF', 'rgba(22, 62, 112, 0)'),
      },
    },
    {
      name: '领先度(分)',
      type: 'line',
      smooth: true,
      showSymbol: false, // 在 tooltip hover 的时候显示
      data: props.chartData.map(item => item.leadership),
      yAxisIndex: 1,
      lineStyle: {
        color: '#00D3FC',
        width: 2, // 设置线宽
      },
      itemStyle: {
        color: setLinearGradient('#00D3FC', 'rgba(0,211,252,0)'),
      },
      areaStyle: {
        color: setLinearGradient('rgba(0,211,252,30%)', 'rgba(0,211,252,0)'),
      }
    }
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
