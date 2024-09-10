<template>
  <!-- 年龄比例 -->
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
  chartData: ()=> [],
});

const setLinearGradient = (color1, color2) => {
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: color1 },
    { offset: 1, color: color2 }
  ])
}

const opacity = 0.5
const colors = [
  setLinearGradient('#D65755', `rgba(214, 87, 85, ${opacity})`),
  setLinearGradient('#8B6BE9', `rgba(139, 107, 233, ${opacity})`),
  setLinearGradient('#F0D18C', `rgba(240, 107, 140, ${opacity})`),
  setLinearGradient('#4389F6', `rgba(67, 137, 246, ${opacity})`),
  setLinearGradient('#EE9D73', `rgba(238, 157, 115, ${opacity})`)
]


const option: ECOption = {
  color: colors,
  tooltip: {
    show: true,
    trigger: "item",
    formatter: "{b} <br/>占比：{d}%"
  },
  legend: {
    orient: "vertical",
    right: "20px",
    top: "15px",
    itemGap: 15,
    itemWidth: 14,
    formatter: function (name: string) {
      let text = "";
      props.chartData.forEach((val: ChartProp) => {
        if (val.name === name) text = " " + name + "　 " + val.percentage;
      });
      return text;
    },
    textStyle: { color: "#fff" }
  },
  grid: { top: "bottom", left: 10, bottom: 10 },
  series: [
    {
      zlevel: 1,
      name: "年龄比例",
      type: "pie",
      selectedMode: "single",
      radius: [50, 90],
      center: ["35%", "50%"],
      startAngle: 60,
      label: {
        position: "inside",
        show: true,
        color: "#fff",
        formatter: function (params) {
          return (params.data as ChartProp).percentage;
        },
        rich: {
          b: {
            fontSize: 16,
            lineHeight: 30,
            color: "#fff"
          }
        }
      },
      itemStyle: {
        shadowColor: "rgba(0, 0, 0, 0.2)",
        shadowBlur: 10
      },
      data: props.chartData.map((val: ChartProp, index: number) => {
        return {
          value: val.value,
          name: val.name,
          percentage: val.percentage,
          itemStyle: {
            borderColor: colors[index],
          }
        };
      })
    },
    {
      name: "",
      type: "pie",
      selectedMode: "single",
      radius: [50, 90],
      center: ["35%", "50%"],
      startAngle: 60,
      data: [
        {
          value: 1000,
          name: "",
          label: {
            show: true,
            formatter: "{a|本日总数}",
            rich: {
              a: {
                align: "center",
                color: "rgb(98,137,169)",
                fontSize: 14
              }
            },
            position: "center"
          }
        }
      ]
    }
  ]
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
