<template>
  <mapbox-base-map ref="refMapBoxBaseMap" :tabCurrent="tabCurrent">

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

// 可选择的城市
const tabListData = ref(['全国', '首页浙江', '浙江', '上海', '江苏', '新疆', '广西', '四川', '江西']) // 选项卡

let tabCurrent = ref('全国') // 当前城市

const lendConfigData = ref([])

const refMapBoxBaseMap = ref(null)


// 获取标注列表
const getMarkerList = async () => {
  lendConfigData.value = []

  let res = null
  switch (tabCurrent.value) {
    case '全国':
      const getData = (cityRes) => {
        let resData = cityRes.data
        return resData
      }
      res = {
        data: getData(await mapApi.getShangHaiPoint()).concat(getData(await mapApi.getJiangSuPoint())).concat(getData(await mapApi.getXinJiangPoint())).concat(getData(await mapApi.getGuangXiPoint())).concat(getData(await mapApi.getSiChuanPoint())).concat(getData(await mapApi.getJiangXiPoint()))
      }
      break;
    case '首页浙江':
      res = await mapApi.getServiceAreaPoint();
      break;
    case '浙江':
      res = await mapApi.getGasStationPoint();
      break;
    case '上海':
      res = await mapApi.getShangHaiPoint();
      break;
    case '江苏':
      res = await mapApi.getJiangSuPoint();
      break;
    case '新疆':
      res = await mapApi.getXinJiangPoint();
      break;
    case '广西':
      res = await mapApi.getGuangXiPoint();
      break;
    case '四川':
      res = await mapApi.getSiChuanPoint();
      break;
    case '江西':
      res = await mapApi.getJiangXiPoint();
      break;
  }

  refMapBoxBaseMap.value.setMapLoading(false)

  if (res) {
    setImgMarker(res.data, tabCurrent.value)
    return
  }
  console.log('没有标注')
}

// 设置图片标注
const setImgMarker = (dataList, tab) => {
  // console.log('设置图片标注', dataList, tab)

  switch (tab) {
    case '首页浙江':
      setZjIndexMarker(dataList)
      break
    case '浙江':
      setZjMarker(dataList)
      break
    default:
      setCityMarker(dataList)
  }
}

const setZjIndexMarker = (dataList) => {
  lendConfigData.value = [
    {
      name: '图例1',
      markerClass: 'lend_mark_type_0'
    },
    {
      name: '图例2',
      markerClass: 'lend_mark_type_1'
    }
  ]

  dataList.forEach((item) => {
    const popData = popupConfig.zheJiangIndexPopup(item)

    switch (item.region_name) {
      case '浙东区域':
      case '浙西区域':
        refMapBoxBaseMap.value.setMarkerConfig([item.longitude, item.latitude], 'mark_type_0', item, popData)
        break
      default:
        refMapBoxBaseMap.value.setMarkerConfig([item.longitude, item.latitude], 'mark_type_1', item, popData)
        break
    }
  })
}

const setZjMarker = (dataList) => {
  lendConfigData.value = [
    {
      name: '图例',
      markerClass: 'lend_mark_type_0'
    }
  ]

  dataList.forEach((item) => {
    refMapBoxBaseMap.value.setMarkerConfig([item.longitude, item.latitude], 'mark_type_0', item, popupConfig.zheJiangPopup(item))
    // refMapBoxBaseMap.value.setMarkerConfig([item.longitude, item.latitude], lendConfigData.value[0].markerClass.replace(/lend_/g, ''), item, popupConfig.zheJiangPopup(item))
  })
}

const setCityMarker = (dataList) => {
  lendConfigData.value = [
    {
      name: '图例',
      markerClass: 'lend_mark_type_0'
    }
  ]

  dataList.forEach((item) => {
    refMapBoxBaseMap.value.setMarkerConfig([item.longitude, item.latitude], 'mark_type_0', item, popupConfig.cityPopup(item))
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
