<template>
    <section class="map_wrap">
        <slot></slot>

        <div id="glMap" class="gl_map_cont" v-loading="mapLoading"></div>
    </section>
</template>

<script setup>
// core
import { ref, onMounted, nextTick } from 'vue'
// 组件
import MapLend from './components/MapLend.vue'
// 工具
import * as mapUtils from './mapUtils' // map-core
import renderMapByCity from './renderMapByCity' // map-render

const props = defineProps({
    tabCurrent: {
        type: String,
        default: ''
    }
})

let glMap = null // 地图核心数据

let mapLoading = ref(true)

let refLend = ref(null) // 图例

/**
 * tools
 */
const setMapLoading = flag => {
    mapLoading.value = flag
}

/**
 * map init
 */
// 重置地图
const resetMap = (next) => {
    // removeAllMarker()

    if (glMap) {
        glMap.remove()
    }

    if (next) {
        next()
    }
}

// 初始化地图
const initMapConfig = (next) => {
    resetMap(() => {
        next()

        mapUtils.setMapConfig(glMap) // 地图初始化配置

        glMapEvent() // 地图所有事件绑定
    })
}

// 加载地图
const initMap = (val) => {
    setMapLoading(true)

    if (!val) {
        val = props.tabCurrent
    }

    renderMap(val)
}

// 渲染地图
const renderMap = (val) => {
    initMapConfig(() => {
        glMap = renderMapByCity(val)
    })
}

// 地图所有事件绑定
const glMapEvent = () => {
    glMap.on('click', (e) => {
        console.log('地图点击事件', e.lngLat)

        // 点击非layer请求所有数据
        let isOut = e.target.queryRenderedFeatures(e.point).length === 0
        if (isOut) {
            console.log('点击地图外,执行自定义事件')
        }
    })

    // reload - 地图加载时执行
    glMap.on('load', () => {
        // 业务
        nextTick(() => {
            // console.log('地图加载完成')
        })
    })

    indexMapClick() // 首页地图点击
}

// 首页地图点击
const indexMapClick = () => {
    // 浙北
    glMap.on('click', 'zhebei', () => {
        console.log('点击面-浙北')
    })
    // 浙南 - 浙东
    glMap.on('click', 'zhenan', () => {
        console.log('点击面-浙东')
    })
    // 浙西 - 浙南
    glMap.on('click', 'zhexi', () => {
        console.log('点击面-浙南')
    })
    // 浙东 - 浙西
    glMap.on('click', 'zhedong', () => {
        console.log('点击面-浙西')
    })
}

/**
 * 地图标注相关
 */
const setMarkerConfig = (lonlat, markerClass, item, popupData) => {
    if (item.latitude <= -90 || item.latitude > 90) {
        // item.latitude = 30
        return
    }

    let el = document.createElement('div')
    el.className = `map_marker no_popup_map_marker index_marker ${markerClass}`

    el.addEventListener('click', (e) => {
        e.stopPropagation()

        console.log(item)
    })
    el.addEventListener('mouseout', () => {
        mapUtils.removePopup('glMap')
    })
    el.addEventListener('mouseover', () => {
        mapUtils.setPopupCommon(glMap, lonlat, popupData)
    })

    // 设置标注
    mapUtils.setMarkerCommon(el, lonlat, glMap)
}

onMounted(() => {
    initMap() // 渲染地图
})

defineExpose({
    initMap,
    setMarkerConfig,
    setMapLoading
})
</script>

<style lang="scss" scoped>
@use './scss/marker.scss';
@use './scss/popup.scss';

.map_wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: #08203f;
    overflow: hidden;

    .gl_map_cont {
        width: 100%;
        height: 100%;

        ::v-deep(.maplibregl-ctrl-bottom-right) {
            // display: none;
        }
    }
}
</style>