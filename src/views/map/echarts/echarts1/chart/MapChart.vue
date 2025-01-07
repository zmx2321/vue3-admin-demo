<template>
  <section class="chart_map_wrap">
    <ul>
      <li>
        <el-button @click="resetChart">重置地图到中国</el-button>
        <el-button @click="handleBack">返回上一级</el-button>
      </li>
    </ul>
    <div ref="refChart" class="chart_wrap" :class="className" :style="{ height: height, width: width, }"></div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import * as echarts from "echarts";
import areaDataNum from "./data/areaDataNum.js";

const emit = defineEmits(['selectCity'])

/**
 * 父组件参数
 */
const props = defineProps({
  className: {
    type: String,
    default: "chart",
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  chartFontColor: {
    type: String,
    default: "#000",
  },
  autoResize: {
    type: Boolean,
    default: true,
  },
  chartData: {
    type: Object,
    required: true,
  },
  txtFontSize: {
    type: Number,
    default: 15,
  },
});

const refChart = ref(null);
const chartInstance = ref(null);

const place = ref("中国"); // 要获取哪个地区的地图数据
const pro = ref("中国"); // 上一级地区

// 销毁图表
const destroyChart = (next) => {
  if (chartInstance.value) {
    chartInstance.value.dispose();
    chartInstance.value = null;

    if (next) {
      next();
    }
  }
};

// 重置图表
const resetChart = () => {
  // console.log("初始化图表")

  destroyChart(() => {
    // 重新启动图表
    place.value = "中国";
    pro.value = "中国";
    getOptions(place.value);
    initChart();
  });
};

// 点击地图区域时触发的事件，参数 params 包含当前点击的地图区域的信息
const handleMapClick = (params) => {
  if (pro.value !== place.value) {
    pro.value = place.value; // 记录上一级地区
  }
  place.value = params.name;
  getOptions(place.value);

  emit('selectCity', { pro: pro.value, place: place.value })
};
// 获取并设置图表配置项
const getOptions = (val) => {
  areaDataNum(val).then((res) => {
    chartInstance.value.hideLoading();
    echarts.registerMap("cityMap", res.data);
    // setOption(props.chartData);
    setOption(res.data);
  });
};

// 设置图表
const setOption = (chartData) => {
  if (JSON.stringify(chartData) === '[]') {
    return
  }

  let option = {
    /* visualMap: {
      min: 0,
      max: 40,
      calculable: false, // 是否显示拖拽用的手柄，设置成true后可以拖拽数据
      realTime: true, // 拖拽时，是否实时更新  
      inRange: {
        color: ["#FFFFE0", "#E6E6FA", "lightskyblue", "#90EE90", "#ff6363"],
      },
    }, */
    //提示框组件配置项
    tooltip: {
      textStyle: {
        fontSize: 12,
        color: "#fff",
      },
      trigger: "item",
      backgroundColor: "rgba(0,0,0,0.5)",
      formatter: (params) => {
        let { data } = params;
        //提示内容【省份名称】以及其下有多少个市区
        return `${params.name}<br/>下设区域：${params.data.value}`;
      },
    },
    series: [
      {
        type: "map",
        map: "cityMap",
        layoutCenter: ["50%", "66%"],
        layoutSize: "135%",
        // data: chartData,
        // 添加 data 属性，并为每个区域指定数据值
        data: chartData.features.map((item) => ({
          name: item.properties.name, // 地图区域的名称
          value: item.properties.childrenNum, // 地图区域的数据值
        })),
        roam: true, // 开启拖拽和缩放
        itemStyle: {
          // 地图样式
          borderColor: "rgba(0, 178, 255, 1)",
          borderWidth: 1,
          areaColor: new echarts.graphic.LinearGradient(
            0,
            1,
            0,
            0,
            [
              { offset: 0, color: "rgba(0, 137, 208, 0.32)" },
              { offset: 1, color: "rgba(0, 66, 164, 0.32)" },
            ],
            false
          ),
          shadowColor: "RGBA(7, 59, 115, .1)",
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 10,
        },
        emphasis: {
          // 鼠标移入动态的时候显示的默认样式
          itemStyle: {
            areaColor: "#78defd",
            borderColor: "#00ade0",
            borderWidth: 1,
          },
          label: {
            // 文字
            show: true,
            color: "#fff",
            fontSize: 13,
          },
        },
        // 选中样式
        select: {
          label: {
            // 选中区域的label(文字)样式
            color: "#fff",
          },
          itemStyle: {
            color: "#fff",
            // 选中区域
            areaColor: "#00ade0",
            // 选中区域边框
            borderColor: "#00ade0",
            borderWidth: 3,
          },
        },
        // 地图默认label样式
        label: {
          show: true,
          color: "#fff",
          fontSize: 11,
          fontWeight: 600,
        },
      },
    ],
  };
  chartInstance.value.setOption(option);
};

const initChart = () => {
  chartInstance.value = echarts.init(refChart.value);
  chartInstance.value.showLoading();
  getOptions(place.value);
  // 添加点击事件监听器
  chartInstance.value.on("click", handleMapClick);
  window.onresize = () => {
    chartInstance.value.resize();
  };
}

onMounted(() => {
  initChart()
});

onUnmounted(() => {
  // 页面销毁的时候，让地图实例也销毁
  destroyChart()
});


// 返回上一级
const handleBack = () => {
  getOptions(pro.value);
  console.log(111, pro.value, place.value);
};
</script>

<style lang="scss" scoped>
.chart_map_wrap {
  position: relative;
  width: 100%;
  height: 100%;

  ul {
    position: absolute;
    z-index: 1;
    list-style: none;
  }
}
</style>