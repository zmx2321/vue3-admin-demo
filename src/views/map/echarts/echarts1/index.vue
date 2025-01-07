<template>
  <div class="card content-box" style="background-color: #163e70;">
    <map-chart ref="refCenterChart1" :chartData="[{}]" @selectCity="selectCity" />
  </div>
</template>

<script setup name="echarts1">
import { ref } from "vue";
import MapChart from './chart/MapChart.vue'
</script>
