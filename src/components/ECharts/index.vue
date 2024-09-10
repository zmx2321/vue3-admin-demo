<template>
  <div id="echarts" ref="chartRef" :style="echartsStyle" />
</template>

<script setup lang="ts" name="ECharts">
import { ref, onMounted, onBeforeUnmount, watch, computed, markRaw, nextTick, onActivated } from "vue";
import { EChartsType, ECElementEvent } from "echarts/core";
import echarts, { ECOption } from "./config";
import { useDebounceFn } from "@vueuse/core";
import { useGlobalStore } from "@/stores/modules/global";
import { storeToRefs } from "pinia";

interface Props {
  option: ECOption;
  renderer?: "canvas" | "svg";
  resize?: boolean;
  chartAuto?: boolean;
  theme?: Object | string;
  width?: number | string;
  height?: number | string;
  onClick?: (event: ECElementEvent) => any;
}

const props = withDefaults(defineProps<Props>(), {
  renderer: "canvas",
  resize: true,
  chartAuto: false,
});

const echartsStyle = computed(() => {
  return props.width || props.height
    ? { height: props.height + "px", width: props.width + "px" }
    : { height: "100%", width: "100%" };
});

const chartRef = ref<HTMLDivElement | HTMLCanvasElement>();
const chartInstance = ref<EChartsType>();

const draw = () => {
  if (chartInstance.value) {
    chartInstance.value.setOption(props.option, { notMerge: true });

    if (props.chartAuto) {
      chartAuto(props.option);
    }
  }
};

watch(props, () => {
  draw();
});

const handleClick = (event: ECElementEvent) => props.onClick && props.onClick(event);

const init = () => {
  if (!chartRef.value) return;
  chartInstance.value = echarts.getInstanceByDom(chartRef.value);

  if (!chartInstance.value) {
    chartInstance.value = markRaw(
      echarts.init(chartRef.value, props.theme, {
        renderer: props.renderer
      })
    );
    chartInstance.value.on("click", handleClick);
    draw();
  }
};

const resize = () => {
  if (chartInstance.value && props.resize) {
    chartInstance.value.resize({ animation: { duration: 300 } });
  }
};

const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 });

const globalStore = useGlobalStore();
const { maximize, isCollapse, tabs, footer } = storeToRefs(globalStore);

// 轮播
const chartAuto = (option) => {
  // console.log('轮播开始')
  switch (option.series[0].type) {
    case "pie":
      // console.log('pie')
      chartAutoPie(option)
      break;
    case "bar":
      // console.log('bar')
      chartAutoBar(option)
      break;
    case "line":
      console.log('line')
      break;
    case "radar":
      console.log('radar')
      break;
    case "scatter":
      console.log('scatter')
      break;
  }
}

/************************
 * 轮播
 *************************/
let changeChartInterval = null
let intervaltime = 2000
const chartAutoShape = (option, highlightChart)=> {
  if (changeChartInterval) {
    clearInterval(changeChartInterval)
  }

  let currentIndex = -1; // 当前高亮图形在饼图数据中的下标
  changeChartInterval = setInterval(selectChart, intervaltime); // 设置自动切换高亮图形的定时器

  if (!chartInstance.value) {
    return
  }

  // 取消所有高亮并高亮当前图形  
  highlightChart(currentIndex)

  // 用户鼠标悬浮到某一图形时，停止自动切换并高亮鼠标悬浮的图形
  chartInstance.value.on('mouseover', (params) => {
    if (changeChartInterval) {
      clearInterval(changeChartInterval);
    }
    currentIndex = params.dataIndex;
    highlightChart(currentIndex);
  });

  // 用户鼠标移出时，重新开始自动切换
  chartInstance.value.on('mouseout', (params) => {
    if (changeChartInterval) {
      clearInterval(changeChartInterval);
    }
    changeChartInterval = setInterval(selectChart, intervaltime);
  });

  // 高亮效果切换到下一个图形
  function selectChart() {
    if (option.series[0].data) {
      var dataLen = option.series[0].data.length;
      currentIndex = (currentIndex + 1) % dataLen;
      highlightChart(currentIndex);
    }
  }
}
const chartAutoPie = (option) => {
  chartAutoShape(option, currentIndex=> {
    if (!chartInstance.value) {
      return
    }

    for (var idx in option.series[0].data)
      // 遍历饼图数据，取消所有图形的高亮效果
      chartInstance.value.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: idx
      });
    // 高亮当前图形
    chartInstance.value.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex
    });
  })
}
const chartAutoBar = (option) => {
  chartAutoShape(option, currentIndex=> {
    if (!chartInstance.value) {
      return
    }

    for (var idx in option.series[0].data) {
      // 遍历饼图数据，取消所有图形的高亮效果
      chartInstance.value.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: idx
      });
    }
    // 高亮当前图形
    chartInstance.value.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: currentIndex
    });
  })
}

/************************
 * 轮播
 *************************/
watch(
  () => [maximize, isCollapse, tabs, footer],
  () => {
    debouncedResize();
  },
  { deep: true }
);

onMounted(() => {
  nextTick(() => init());
  window.addEventListener("resize", debouncedResize);
});

onActivated(() => {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
});

onBeforeUnmount(() => {
  chartInstance.value?.dispose();
  window.removeEventListener("resize", debouncedResize);
});

defineExpose({
  getInstance: () => chartInstance.value,
  resize,
  draw,
});
</script>
