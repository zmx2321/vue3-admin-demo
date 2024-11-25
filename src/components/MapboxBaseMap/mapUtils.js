/**
 * 地图相关工具方法
 */
import maplibregl from 'maplibre-gl'

import { glMapConfigDev } from './mapData/mapConfig' // config

/** ****************************
 * 地图供出方法 - 初始化地图
 * ****************************
 */
// 初始化地图
const mapInitTool = (mapConfig, geoData, center, zoom, minZoom) => new maplibregl.Map(mapConfig('glMap', geoData, center, zoom, minZoom)) // 初始化地图

// 根据开发环境区分底图
export const setMapLayer = (geoData, center, zoom) => {
  return mapInitTool(glMapConfigDev, geoData, center, zoom)
}

// 渲染geojson
export const renderGeo = (geoData, map, className, next) => {
  // console.log(geoData)

  geoData.features.forEach((item) => {
    let { properties } = item
    let { name, centroid } = properties

    if (!centroid) {
      centroid = properties.center
    }

    let el = document.createElement('div')
    el.innerHTML = `<div class="title">${name}</div>`
    el.className = `city-label ${className}`

    if (next) {
      next(el, item, name)
    }

    if (centroid) {
      new maplibregl.Marker({ element: el, anchor: 'center' }).setLngLat(centroid).addTo(map)
    }
  })
}

// 地图配置
export const setMapConfig = (map) => {
  // 添加相关的地图控件
  map.addControl(new maplibregl.FullscreenControl(), 'top-right')

  // this.glMap.addControl(new maplibregl.NavigationControl());
  // this.glMap.scrollZoom.disable();  // 禁用地图缩放
}

/** ****************************
 * 地图供出方法 - 点线面
 * ****************************
 */
// 添加面和线图层
export const addMapLayer = (map, geoData, idName, color, opacity) => {
  // 添加Source，类型是geojson
  map.addSource(idName, {
    type: 'geojson',
    data: geoData
  })
  // 添加面
  map.addLayer({
    id: idName,
    type: 'fill', // fill类型layer
    source: idName,
    layout: {},
    paint: {
      'fill-color': color, // fill颜色
      'fill-opacity': opacity || 0.7 // fill透明度
    }
  })
  // 添加线
  map.addLayer({
    id: `${idName}_line`,
    type: 'line',
    source: idName,
    layout: {},
    // eslint-disable-next-line no-dupe-keys
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#fff',
      'line-width': 1,
      'line-dasharray': [2, 4]
    }
  })
}

// 设置标注
export const setMarkerCommon = (el, lonlat, popup, map) => {
  // 如果map为空，表示三个参数
  if (!map) {
    // 无气泡
    // eslint-disable-next-line no-shadow
    let map = popup
    new maplibregl.Marker(el).setLngLat(lonlat).addTo(map)
  } else {
    // 有气泡
    new maplibregl.Marker(el)
      .setLngLat(lonlat)
      .setPopup(popup) // sets a popup on this marker
      .addTo(map)
  }
}
// 设置气泡
export const setPopupCommon = (map, linlat, inner) => new maplibregl.Popup({ closeOnClick: true }).setLngLat(linlat).setHTML(inner).addTo(map)