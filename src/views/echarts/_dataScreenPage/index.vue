<template>
  <section class="data-screen-page">
    <div class="inner inner1">
      <AgeRatioChart :chartData="chartData" />
    </div>
    <div class="inner inner2"></div>
    <!-- <chart1 /> -->
    <!-- <chart1 /> -->
  </section>
</template>

<script lang="ts" setup>
import { ref, toRefs, toRef, reactive, computed, defineProps } from 'vue' 
import chart1 from './components/chart1/index.vue'
import AgeRatioChart from "./components/AgeRatioChart.vue";

interface ChartProp {
  value: number;
  name: string;
  percentage: string;
}

let chartData: ChartProp[] = ref([
  { value: 200, name: "10岁以下", percentage: "16%" },
  { value: 110, name: "10 - 18岁", percentage: "8%" },
  { value: 150, name: "18 - 30岁", percentage: "12%" },
  { value: 310, name: "30 - 40岁", percentage: "24%" },
  { value: 250, name: "40 - 60岁", percentage: "20%" },
  { value: 260, name: "60岁以上", percentage: "20%" }
]);

</script>

<style lang="scss" scoped>
.data-screen-page {
  width: 100%;
  height: 100%;
  background: #163e70;
  overflow: auto;

  .inner {
    width: 100%;
    height: 900px;
    // background: #f00;
    
    &:not(:last-child) {
      margin-bottom: 100px;
    }
  }
}
</style>