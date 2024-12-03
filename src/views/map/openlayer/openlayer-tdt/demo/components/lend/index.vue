<template>
  <el-table :data="tableData">
    <el-table-column prop="lendType" :label="currentType"></el-table-column>
    <el-table-column label="颜色" prop="lendType">
      <template #default="scope">
        <b class="lend_color" :style="{ background: scope.row.color }"></b>
      </template>
    </el-table-column>
    <el-table-column prop="size" label="半径(px)"></el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from "vue";
// 数据
import { tableDataFrequency, tableDataHealth } from "./data";
// 组件传参
import mittBus from "@/utils/mittBus"; // mitt

let currentType = ref("频率");
let tableData = ref(tableDataFrequency);

// 切换渲染方式
mittBus.on("setRenderType", (val) => {
  // console.log("切换渲染方式", val);

  switch (val) {
    case "频率":
      tableData.value = tableDataFrequency;
      break;
    case "健康度":
      tableData.value = tableDataHealth;
      break;
  }

  currentType.value = val;
});
</script>
