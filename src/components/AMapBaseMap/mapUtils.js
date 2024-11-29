// https://a.amap.com/jsapi_demos/static/geojson/chongqing.json  // 重庆geojson数据

/** ****************************
 * 地图数据
 * ****************************
 */
export const mapConfig = {
    zoom: 12,
    center: [120.198244, 30.235935],
}

/** ****************************
 * 地图方法
 * ****************************
 */
// 获取地图坐标
export const getPosition = e => {
    console.log('您在 [' + e.lnglat.getLng() + ',' + e.lnglat.getLat() + '] 的位置点击了地图');
}

// 获取地图信息
export const logMapinfo = aMap => {
    console.log("当前级别", aMap.getZoom())
    console.log("当前中心点", aMap.getCenter())
}

// 设置地图中心点
export const setMapCenter = (aMap, center) => {
    console.log(aMap, center)
    aMap.setCenter(center);
}

// 设置地图层级
export const setMapZoom = (aMap, zoom) => {
    aMap.setZoom(zoom);
}