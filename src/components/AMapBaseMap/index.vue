<template>
    <section class="map_wrap">
        <div class="map_tool">
            <slot></slot>
        </div>

        <el-amap ref="refAmap" :center="center" :zoom="zoom" @init="initMap" @click="handleClickMap" />
    </section>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { ElAmap } from "@vuemap/vue-amap";
// 工具
import * as mapUtils from './mapUtils' // map-core
// geoData
import chongQingGeo from './mapData/geoData/chongQing.json' // 重庆

/* import {ElAmap, useCitySearch ,lazyAMapApiLoaderInstance} from "@vuemap/vue-amap";

const center = ref<number[]>(null)

onBeforeMount(() => {
  lazyAMapApiLoaderInstance.then(() => {
    useCitySearch().then(res => {
      const {getLocalCity} = res;
      getLocalCity().then(cityResult => {
        center.value = cityResult.bounds.getCenter().toArray()
        console.log('cityResult: ', cityResult)
      })
    })
  })
}) */

const emit = defineEmits(['setMapLayer'])

const props = defineProps({
    center: {
        type: Array,
        default: mapUtils.mapConfig.center,
    },
    zoom: {
        type: Number,
        default: 7,
    },
})

const refAmap = ref(null)

// 初始化地图
const initMap = (aMap) => {
    console.log('地图实例', aMap === refAmap.value.$$getInstance(), aMap)

    setMapControl(aMap)  // 设置地图控件

    // getGeoJson()  // 获取GeoJson数据
    setMapLayer(aMap)  // 设置地图图层(点、线、面、geojson等)

    setMapEvent(aMap)  // 设置地图事件 - 点击事件单独提取
}

// 设置地图控件
const setMapControl = (aMap) => {
    // console.log('设置地图控件')

    // 鹰眼
    const eye = new AMap.HawkEye();
    aMap.addControl(eye);

    // 工具栏
    /* const toolBar = new AMap.ToolBar();
    aMap.addControl(toolBar); */
    const tool = new AMap.ToolBar({
        position: 'RT',
    });
    aMap.addControl(tool);

    // 比例尺
    const scale = new AMap.Scale({
        position: 'LB',
    });
    aMap.addControl(scale);

    // 定位
    /* const locate = new AMap.Geolocation({
        position: 'RB',
        offset: [10, 20],
        showCircle: false,
        showMarker: true,
        showButton: true,
        zoomToAccuracy: true,
    });
    aMap.addControl(locate); */
}

// 设置地图图层(点、线、面、geojson等
const setMapLayer = (aMap) => {
    // console.log('设置地图图层(点、线、面、geojson等)')

    emit('setMapLayer', aMap)
}

// 设置地图事件
const setMapEvent = (aMap) => {
    // 地图加载完成
    aMap.on('complete', () => {
        // console.log("地图加载完成")
        // console.log(aMap.getCanvasLayer())
    })

    /* // 点击
    aMap.on('click', e => {
        // console.log("地图点击事件", e)

        // 地图坐标
        mapUtils.getPosition(e)
    }) */

    // 移动
    aMap.on('moveend', () => {
        // mapUtils.logMapinfo(aMap)
    })
}

// 地图点击事件
const handleClickMap = (e) => {
    // console.log('地图点击事件')

    // 地图坐标
    mapUtils.getPosition(e)
}

/**
 * 暴露给外部使用
 */
// 飞到指定地点
const flyToCenter = (center, zoom) => {
    mapUtils.setMapCenter(refAmap.value.$$getInstance(), center);
    mapUtils.setMapZoom(refAmap.value.$$getInstance(), zoom);
}

// 获取GeoJson数据
const getGeoJson = (city) => {
    switch (city) {
        case '重庆':
            return chongQingGeo
    }
}

// 供出方法
defineExpose({
    flyToCenter,
    getGeoJson
})
</script>

<style lang="scss" scoped>
.map_wrap {
    position: relative;
    width: 100%;
    height: 100%;

    .map_tool {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;
    }
}
</style>