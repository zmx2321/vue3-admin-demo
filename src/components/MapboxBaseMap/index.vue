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

const initMap = (val) => {
    mapLoading.value = true

    if (!val) {
        val = props.tabCurrent
    }

    renderMap(val)
}

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
            // console.log('点击非layer请求所有数据')
            console.log('点击地图外,执行自定义事件')

            // refLend.value.goBack()
        }
    })

    // reload - 地图加载时执行
    glMap.on('load', () => {
        // 业务
        nextTick(() => {
            // setImgMarker() // 设置图片标注
        })
    })

    // indexMapClick() // 首页地图点击
}

onMounted(() => {
    initMap() // 渲染地图
})

defineExpose({
    initMap
})
</script>

<style lang="scss" scoped>
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