<template>
  <section class="data-screen-page">
    <ul>
        <li>
          <my-chart-1 :chartData="chart1Data" />
        </li>
        <li>
          <my-chart-2 :chartData="chart2Data" />
        </li>
        <li></li>
        <li></li>
      </ul>
  </section>
</template>

<script lang="ts" setup>
import { ref, toRefs, toRef, reactive, computed, defineProps } from 'vue' 
import myChart1 from './components/myChart1.vue'
import myChart2 from './components/myChart2.vue'

/**
 * chart1Data
 */
interface Chart1Prop {
  name: string;
  monthlyAverage: number;
  dailyAverage: number;
}

let chart1Data: Chart1Prop[] = ref([
  { name: '慈溪市', monthlyAverage: 85, dailyAverage: 33 },
  { name: '余姚市', monthlyAverage: 66, dailyAverage: 44 },
  { name: '海曙区', monthlyAverage: 88, dailyAverage: 55 },
  { name: '江北区', monthlyAverage: 78, dailyAverage: 75 },
  { name: '镇海区', monthlyAverage: 70, dailyAverage: 99 },
  { name: '奉化区', monthlyAverage: 12, dailyAverage: 69 },
  { name: '鄞州区', monthlyAverage: 72, dailyAverage: 75 },
  { name: '北仑区', monthlyAverage: 33, dailyAverage: 44 },
  { name: '宁海县', monthlyAverage: 95, dailyAverage: 65 },
  { name: '象山县', monthlyAverage: 75, dailyAverage: 66 },
]);

/**
 * chart2Data
 */
 interface Chart2Prop {
  value: number;
  name: string;
  percentage: string;
}

let chart2Data: Chart2Prop[] = [
  { value: 200, name: "10岁以下", percentage: "16%" },
  { value: 110, name: "10 - 18岁", percentage: "8%" },
  { value: 150, name: "18 - 30岁", percentage: "12%" },
  { value: 310, name: "30 - 40岁", percentage: "24%" },
  { value: 250, name: "40 - 60岁", percentage: "20%" },
];
</script>

<style lang="scss" scoped>
.data-screen-page {
  width: 100%;
  height: 100%;
  background: #163e70;
  overflow: auto;


  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;

    li {
      width: calc(100% / 3 - 30px);
      height: 400px;
      background: #15509c;
      list-style-type: none;

      &:nth-child(n+1) {
        margin-bottom: 30px;
      }
    }
  }
}
</style>