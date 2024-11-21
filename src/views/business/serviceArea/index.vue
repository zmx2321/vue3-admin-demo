<template>
  <div class="card content-box">
    <span class="text">服务区平面图 🍓🍇🍈🍉</span>
    <el-input v-model="value" placeholder="测试缓存"></el-input>
  </div>
</template>

<script setup lang="ts" name="serviceArea">
import { ref } from "vue";
const value = ref<string>("");
</script>

<style scoped lang="scss">
@import "./index";
</style>
