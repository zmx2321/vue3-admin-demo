<template>
  <section class="data-screen-page">
    <ul>
        <li>
          <my-chart-1 :chartData="chart1Data" />
        </li>
        <li>
          <my-chart-2 :chartData="chart2Data" />
        </li>
        <li>
          <my-chart-3 :chartData="chart3Data" />
        </li>
        <li>
          <my-chart-4 :chartData="chart4Data" />
        </li>
        <li>
          <my-chart-5 :chartData="chart5Data" />
        </li>
        <li>
          <my-chart-6 :chartData="chart6Data" />
        </li>
        <li></li>
      </ul>
  </section>
</template>

<script lang="ts" setup>
import { ref, toRefs, toRef, reactive, computed, defineProps } from 'vue' 
import myChart1 from './components/myChart1.vue'
import myChart2 from './components/myChart2.vue'
import myChart3 from './components/myChart3.vue'
import myChart4 from './components/myChart4.vue'
import myChart5 from './components/myChart5.vue'
import myChart6 from './components/myChart6.vue'

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

/**
 * chart3Data
 */
 interface Chart3Prop {
  name: string;
  enName: string;
  value: number;
}

let chart3Data: Chart3Prop[] = [
    { name: '维度1', enName: 'envAvgScore', value: 82 },
    { name: '维度2', enName: 'profitAvgScore', value: 87 },
    { name: '维度3', enName: 'alarmAvgScore', value: 80 },
    { name: '维度4', enName: 'qualityAvgScore', value: 85 },
    { name: '维度5', enName: 'perceptionAvgScore', value: 81 }
  ];

/**
 * chart4Data
 */
 interface Chart4Prop {
  name: string;
  satisfaction: number;
  leadership: number;
}

let chart4Data: Chart4Prop[] = ref([
    { name: '慈溪市', satisfaction: 85, leadership: 7.5 },
    { name: '余姚市', satisfaction: 90, leadership: 8.2 },
    { name: '海曙区', satisfaction: 88, leadership: 6.9 },
    { name: '江北区', satisfaction: 78, leadership: 7.5 },
    { name: '镇海区', satisfaction: 70, leadership: 8.2 },
    { name: '奉化区', satisfaction: 92, leadership: 6.9 },
    { name: '鄞州区', satisfaction: 72, leadership: 7.5 },
    { name: '北仑区', satisfaction: 85, leadership: 8.2 },
    { name: '宁海县', satisfaction: 95, leadership: 6.5 },
    { name: '象山县', satisfaction: 75, leadership: 5.9 },
]);

/**
 * chart5Data
 */
 interface Chart5Prop {
  name: string;
  wirelessIndicators: number;
}

let chart5Data: Chart5Prop[] = ref([
    { name: '慈溪市', wirelessIndicators: 85 },
    { name: '余姚市', wirelessIndicators: 66 },
    { name: '海曙区', wirelessIndicators: 88 },
    { name: '江北区', wirelessIndicators: 78 },
    { name: '镇海区', wirelessIndicators: 70 },
    { name: '奉化区', wirelessIndicators: 12 },
    { name: '鄞州区', wirelessIndicators: 72 },
    { name: '北仑区', wirelessIndicators: 33 },
    { name: '宁海县', wirelessIndicators: 95 },
    { name: '象山县', wirelessIndicators: 75 },
  ]);

/**
 * chart6Data
 */
 interface Chart6Prop {
  name: string;
  wirelessIndicators: number;
}

let chart6Data: Chart6Prop[] = ref([
    {
      name: "慈溪市",
      data1: 99, // 近30天健康度平均分
      data2: 7046, // 投诉数量
      data3: 33, // 故障工单
      data4: 7045, // 采编未处理
      data5: 8845, // 其他关键信息
    },
    {
      name: "余姚市",
      data1: 85, // 近30天健康度平均分
      data2: 7046, // 投诉数量
      data3: 7045, // 故障工单
      data4: 454, // 采编未处理
      data5: 8845, // 其他关键信息
    },
    {
      name: "海曙区",
      data1: 88, // 近30天健康度平均分
      data2: 66, // 投诉数量
      data3: 7045, // 故障工单
      data4: 7045, // 采编未处理
      data5: 8845, // 其他关键信息
    },
    {
      name: "江北区",
      data1: 98, // 近30天健康度平均分
      data2: 7046, // 投诉数量
      data3: 7045, // 故障工单
      data4: 323, // 采编未处理
      data5: 8845, // 其他关键信息
    },
    {
      name: "北仑区",
      data1: 96, // 近30天健康度平均分
      data2: 334, // 投诉数量
      data3: 7045, // 故障工单
      data4: 7045, // 采编未处理
      data5: 8845, // 其他关键信息
    },
    {
      name: "镇海区",
      data1: 94, // 近30天健康度平均分
      data2: 7046, // 投诉数量
      data3: 7045, // 故障工单
      data4: 654, // 采编未处理
      data5: 8845, // 其他关键信息
    },
    {
      name: "鄞州区",
      data1: 94, // 近30天健康度平均分
      data2: 7046, // 投诉数量
      data3: 7045, // 故障工单
      data4: 7045, // 采编未处理
      data5: 44, // 其他关键信息
    },
    {
      name: "奉化区",
      data1: 89, // 近30天健康度平均分
      data2: 46, // 投诉数量
      data3: 7045, // 故障工单
      data4: 705, // 采编未处理
      data5: 8845, // 其他关键信息
    },
    {
      name: "象山县",
      data1: 96, // 近30天健康度平均分
      data2: 7046, // 投诉数量
      data3: 7045, // 故障工单
      data4: 705, // 采编未处理
      data5: 8845, // 其他关键信息
    },
    {
      name: "宁海县",
      data1: 95, // 近30天健康度平均分
      data2: 7046, // 投诉数量
      data3: 7045, // 故障工单
      data4: 7045, // 采编未处理
      data5: 885, // 其他关键信息
    },
  ]);
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