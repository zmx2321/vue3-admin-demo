<template>
  <a-map-base-map ref="refAMapBaseMap" :center="originCenter" :zoom="7" @setMapLayer="setMapLayer">
    <el-button type="primary" @click="toChongqing">重庆</el-button>
    <el-button type="primary" @click="toShangHe">上河镇</el-button>

    <el-select v-model="selCityName" placeholder="请选择城市" @change="selectName">
      <el-option v-for="item in cityArr" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </a-map-base-map>
</template>

<script setup lang="ts" name="menu1">
import { ref } from "vue";
import AMapBaseMap from "@/components/AMAPBaseMap/index.vue";

let selCityName = ref("")  // 点击按钮选择城市
let cityArr = ref([])  // 下拉框

const refAMapBaseMap = ref(null);

const originCenter = ref([107.943579, 30.131735])  // 原始中心点


/**
     * geojson相关
     */
// 初始化geojson配置，返回面
const initGeojsonLayer = (data, fillColor) => {
  console.log(data)
  /* return new AMap.GeoJSON({
    // 要加载的标准GeoJSON对象
    geoJSON: data,

    // 指定面要素的绘制方式，缺省时为Polygon的默认样式。
    // geojson为当前要素对应的GeoJSON对象，lnglats为对应的面的路径
    getPolygon(geojson, lnglats) {
      // console.log(geojson)

      let area = AMap.GeometryUtil.ringArea(lnglats[0])

      return new AMap.Polygon({
        // 路径
        path: lnglats,
        // 面
        fillOpacity: 1 - Math.sqrt(area / 8000000000),// 面积越大透明度越高
        // fillOpacity: 0.5,
        fillColor: fillColor,
        // 线
        strokeColor: '#fff',
        strokeWeight: 0.6,    //线宽
        strokeStyle: "solid",
        strokeOpacity: 1, //线透明度
      });
    }
  }) */
}

// 初始化geojson并绑定事件
const setGeoJsonLayer = (aMap, geoData, color, event, next) => {
  console.log('aaaaa', AMap.GeoJSON)
  // console.log('初始化geojson并绑定事件', aMap, geoData, color, event, next)
  // 获取第一层geojson地图对象
  // let geojsonLayer = initGeojsonLayer(geoData, color)

  // 第一层地图对象触发事件 - 初始化geojson并在地图上渲染
  // geojsonLayer.setMap(aMap);

  // 遍历第一层地图对象遮罩层
  /* geojsonLayer.eachOverlay(iterator => {
    iterator.on(event, e => {
      // geojson地图对象事件内容 - 高亮
      next(e, iterator)
    })
  }) */
}



// 设置地图图层(点、线、面、geojson等)
const setMapLayer = (aMap) => {
  // console.log('设置地图图层(点、线、面、geojson等)')

  const chongQingGeo = refAMapBaseMap.value.getGeoJson('重庆')
  getcityArray(chongQingGeo)  // 获取城市列表

  setMapByGeoData(aMap, chongQingGeo)
}

// 获取城市列表 - 下拉框
const getcityArray = (geoData) => {
  // console.log(geoData)

  geoData.features.forEach(item => {
    // console.log(item.properties.name)
    cityArr.value.push({
      label: item.properties.name,
      value: item.properties.name
    })
  })
}

// 根据按钮选择地图
const selectName = (val) => {
  toChongqing()

  // this.initGeojsonPolygon()  // 初始化初始化geojson

  /* let pointPolygon = {}  // 选中面

  this.chongqingGeojson.features.forEach(item => {
    let geojsonLayerItem = this.initGeojsonLayer(item, this.polygonMarkerColor)

    if (item.properties.name === val) {
      // 深拷贝对象
      pointPolygon = geojsonLayerItem
      // console.log(pointPolygon)

      // 第二层触发事件 - 鼠标移除
      geojsonLayerItem.on('mouseout', e => {
        console.log("鼠标移除事件")
        console.log(e)

        // e.preventDefault()

        geojsonLayerItem.hide()
      })

      // 第二层触发事件 - 鼠标点击
      geojsonLayerItem.on('click', () => {
        console.log("鼠标点击事件")

        geojsonLayerItem.hide()

        // 使用重庆geojson示例
        console.log(val)
        this.getChonQingData(val)
      })
    }
  })

  window.amapview.add(pointPolygon) */
  // pointPolygon.setMap(window.amapview);
}

// 渲染geo
const setMapByGeoData = (aMap, geoData) => {
  // console.log(aMap, geoData)

  // 初始化geojson，获取geojson地图对象
  setGeoJsonLayer(aMap, geoData, "#f00", 'click', (e, iterator) => {
    /* this.toChongqing()

    // 给当前面添加事件
    this.getGeoEvent(e, iterator, geojsonItem => {
      // 处理业务流程
      // console.log("处理geojson业务流程")

      // 使用重庆geojson示例
      this.getChonQingData(geojsonItem)
    }) */
  })
}

const toChongqing = () => {
  // console.log("toChongqing");

  refAMapBaseMap.value.flyToCenter(originCenter.value, 7)
}

const toShangHe = () => {
  // console.log("toShangHe");

  refAMapBaseMap.value.flyToCenter([120.21272954752699, 29.93745044968425], 12)
}
</script>

<style scoped lang="scss">
@use "./index";

.el-select {
  position: absolute;
  margin-left: 15px;
}
</style>
