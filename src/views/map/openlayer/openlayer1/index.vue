<template>
  <openlayer-base-map class="empty_map" ref="refOpenlayerBaseMap" :isShowLend="false" :currentPageType="'empty-map'"
    @getOlMapInstance="getOlMapInstance" @getCurrentViewData="getCurrentViewData">

  </openlayer-base-map>
</template>

<script setup>
// vue - core
import { ref, onUnmounted } from "vue";
import { getCurrentInstance } from 'vue';
// 组件
import OpenlayerBaseMap from "@/components/OpenlayerBaseMap/index.vue";

const refOpenlayerBaseMap = ref(null); // 地图核心元素
const { proxy } = getCurrentInstance();

let myOlMap = null;
let myMapCommonData = null;

/**
* 业务方法
*/
// 获取地图实例 - 地图加载完初始化做的一些操作[业务相关]
const getOlMapInstance = (olMap, mapCommonData) => {
  // console.log("获取地图实例 - 地图加载完初始化做的一些操作[业务相关]", olMap);

  myOlMap = olMap; // 赋值全局变量,为后续业务操作做准备
  myMapCommonData = mapCommonData;

  // console.log(myOlMap, myMapCommonData)
};
// 获取可视区域数据 (主入口)
const getCurrentViewData = async (olMap) => {
  console.log('获取可视区域数据 (主入口)', olMap, getCurrentPositionParams(olMap))
};

/**
* 工具方法
*/
// 获取可视区域坐标参数
const getCurrentPositionParams = (olMap) => {
  let viewPosition = refOpenlayerBaseMap.value.getCurrentViewPosition(olMap);
  // console.log("获取可视区域的左上角和右下角坐标", viewPosition)

  return {
<<<<<<< HEAD
    minLatitude: viewPosition.bottomRight[1],
    maxLatitude: viewPosition.topLeft[1],
    minLongitude: viewPosition.topLeft[0],
    maxLongitude: viewPosition.bottomRight[0],
=======
      minLatitude: viewPosition.bottomRight[1],
      maxLatitude: viewPosition.topLeft[1],
      minLongitude: viewPosition.topLeft[0],
      maxLongitude: viewPosition.bottomRight[0],
>>>>>>> 8b2a916cf71ad1355157d2b5fd2471c3a450d1dc
  };
};
</script>