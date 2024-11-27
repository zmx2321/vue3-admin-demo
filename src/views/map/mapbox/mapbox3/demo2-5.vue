<template>
  <div class="card content-box">
    <span class="text">我是three1 🍓🍇🍈🍉</span>
    <el-input v-model="value" placeholder="测试缓存"></el-input>
  </div>
</template>

<script setup>
// 引入库
import { ref, onMounted, nextTick /* computed */ /* unmounted */ } from 'vue' // vue-core
import * as mapUtils from './mapUtils' // map-core
// 引入组件
import Tab from './components/Tab.vue'
import MapLend from './components/MapLend.vue'
// 引入工具
/* import { http } from '@/api'
import { showReqError } from '@/hooks/useError' */
// mock
// import serverArea from './mapData/mock/serverArea.json'
// import * as popupConfig from './mapData/popupConfig'
</script>
