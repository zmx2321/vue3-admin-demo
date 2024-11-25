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

        // mapUtils.setMapConfig(glMap) // 地图初始化配置

        // glMapEvent() // 地图所有事件绑定
    })
}

const initMap = (val) => {
    mapLoading.value = false

    if (!val) {
        val = props.tabCurrent
    }

    /* initMapConfig(() => {
        // initZheJiang() // 浙江普通渲染
        glMap = mapUtils.zhejiangMap()
        mapUtils.renderGeoToZheJiang(glMap, (textContent) => {
            console.log(textContent)
        })
        mapLoading.value = false
    }) */
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