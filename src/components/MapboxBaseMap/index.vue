<template>
    <section class="map_wrap">
        <slot></slot>

        <div id="glMap" class="gl_map_cont" v-loading="mapLoading"></div>
    </section>
</template>

<script setup>
// core
import { ref, onMounted, nextTick } from 'vue'
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
    mapLoading.value = true

    if (!val) {
        val = props.tabCurrent
    }

    renderMap(val)
}
// 渲染地图
const renderMap = (val) => {
    initMapConfig(() => {
        glMap = renderMapByCity(val)

        mapLoading.value = false
    })
}
// 地图所有事件绑定
const glMapEvent = () => {
    glMap.on('click', (e) => {
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
// 设置图片标注
const setImgMarker = (dataList) => {
    // console.log('设置图片标注', dataList)

    dataList.forEach((item) => {
        // console.log(item)

        switch (item.region_name) {
            case '浙东区域':
            case '浙西区域':
                setIndexMarkerConfig([item.longitude, item.latitude], 'map0_mksty0', item)
                break
            default:
                setIndexMarkerConfig([item.longitude, item.latitude], 'map0_mksty1', item)
                break
        }
    })
}
// 定制首页地图标注
const setIndexMarkerConfig = (lonlat, markerClass, item) => {
    if (item.latitude <= -90 || item.latitude > 90) {
        // item.latitude = 30
        return
    }

    let el = document.createElement('div')
    el.className = `map_marker no_popup_map_marker index_marker ${markerClass}`
    console.log(el)

    // console.log(document.querySelector('.map_marker'))

    /* let aaael = document.querySelectorAll('.map_marker')
    console.log(aaael)
    if (aaael.length > 0) {
        aaael.forEach((item) => {
            item.addEventListener('click', (e) => {
                e.stopPropagation()
                console.log('点击标注', item)
            })
        })
    } */
    /* aaael.addEventListener('click', e => {
        e.stopPropagation()
        console.log('点击标注', item)
    }) */

    // el.addEventListener('click', (e) => {
    //     // e.stopPropagation()
    //     console.log('点击标注', item)

    // })
    // el.addEventListener('mouseout', () => {
    //     console.log('移出标注')
    //     // removePopup()
    // })
    // el.addEventListener('mouseover', () => {
    //     /* mainPopupData.value = {
    //         mpdt0: item.serverpart_name
    //     } */
    //     // mapUtils.setPopupCommon(glMap, lonlat, mainPopup) // 首页大屏气泡
    //     // mapUtils.setPopupCommon(glMap, lonlat, popupConfig.mainPopup(mainPopupData.value.mpdt0)) // 首页大屏气泡
    // })

    // 设置标注
    mapUtils.setMarkerCommon(el, lonlat, glMap)
}

onMounted(() => {
    initMap() // 渲染地图
})

defineExpose({
    initMap,
    setImgMarker
})
</script>

<style lang="scss" scoped>
@import './scss/marker.scss';

.map_wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background: #08203f;
    overflow: hidden;

    .gl_map_cont {
        width: 100%;
        height: 100%;
    }
}
</style>