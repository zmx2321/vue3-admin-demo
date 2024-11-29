<template>
  <mapbox-base-map ref="refMapBoxBaseMap" :tabCurrent="'首页浙江'">

    <map-lend :lendConfigData="lendConfigData" />
  </mapbox-base-map>
</template>

<script setup lang="ts" name="mapbox1">
// core
import { ref, onMounted } from "vue";
import MapboxBaseMap from "@/components/MapboxBaseMap/index.vue";
// api
import { Map } from "@/api/interface";
import * as mapApi from "@/api/modules/map";
// 组件
import MapLend from "@/components/MapboxBaseMap/components/MapLend.vue";
// data
import * as popupConfig from './mapData/popupConfig.jsx'

const lendConfigData = ref([])

const refMapBoxBaseMap = ref(null)

// 获取标注列表
const getMarkerList = async () => {
  lendConfigData.value = []

  let res = await mapApi.getGasStationPoint();
  // console.log("浙江标注", await mapApi.getZheJiangPoint())

  refMapBoxBaseMap.value.setMapLoading(false)

  lendConfigData.value = [
    {
      name: '图例',
      markerClass: 'lend_mark_type_0'
    }
  ]

  res.data.forEach((item) => {
    refMapBoxBaseMap.value.setMarkerConfig([item.longitude, item.latitude], 'mark_type_0', item, popupConfig.zheJiangPopup(item))
  })
}

const initPage = () => {
  getMarkerList()
}
initPage()
</script>

<style scoped lang="scss">
@use "./index";

.map_tab {
  position: absolute;
  left: 30px;
  top: 20px;
  z-index: 1;
}
</style>
