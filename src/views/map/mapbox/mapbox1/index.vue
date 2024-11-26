<template>
  <mapbox-base-map ref="refMapBoxBaseMap" :tabCurrent="tabCurrent">
    <tab ref="tabRef" class="map_tab f-fl" :tab-list="tabListData" :current-index="currentIndex" @checkTab="checkTab"
      v-if="tabListData.length !== 0" />
  </mapbox-base-map>
</template>

<script setup lang="ts" name="mapbox1">
// core
import { ref, onMounted } from "vue";
import MapboxBaseMap from "@/components/MapboxBaseMap/index.vue";
// api
import { Map } from "@/api/interface";
import { getServiceAreaPoint } from "@/api/modules/map";

import Tab from "./components/Tab.vue";

const tabListData = ref(['全国', '首页浙江', '浙江', '上海', '江苏', '新疆', '广西', '四川', '江西']) // 选项卡

let tabCurrent = ref('浙江')// 当前选项卡
let currentIndex = 0

const refMapBoxBaseMap = ref(null)

let serviceAreaPoint = ref([])

// 点击选项卡
const checkTab = (val) => {
  tabCurrent.value = val

  refMapBoxBaseMap.value.initMap(val)
}


// 默认tab
const setDefaultTab = () => {
  // 默认tab
  tabListData.value.forEach((item, index) => {
    if (item === tabCurrent.value) {
      currentIndex = index
    }
  })
}

// 获取标注列表
const getMarkerList = async () => {
  let res = await getServiceAreaPoint();
  console.log(res)

  serviceAreaPoint.value = res.data
}

const initPage = () => {
  setDefaultTab()
  getMarkerList()
}
initPage()
</script>

<style scoped lang="scss">
@import "./index";

.map_tab {
  position: absolute;
  left: 30px;
  top: 20px;
  z-index: 1;
}
</style>
