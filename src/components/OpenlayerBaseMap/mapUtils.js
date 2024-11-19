// map core
import 'ol/ol.css'
import { Map, View } from 'ol';
// map 加载底图相关
import { /* OSM, */ XYZ, Vector as VectorSource, Cluster } from 'ol/source';
// map 坐标相关
import { fromLonLat, transform, toLonLat } from 'ol/proj';
import { getTopLeft, getBottomRight, getCenter } from 'ol/extent';
import { toStringHDMS } from 'ol/coordinate';
// map 控件相关
import { FullScreen, Zoom, ZoomSlider, ScaleLine } from "ol/control";
// map 图层相关
import Feature from 'ol/Feature';
import { Point, Circle, Polygon, LineString } from "ol/geom";
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';  // VectorLayer表示珊格图层
import LinearRing from 'ol/geom/LinearRing';
import Overlay from 'ol/Overlay';  // 气泡
import { getLength } from 'ol/sphere';
// map 样式
import { Circle as CircleStyle, Fill, Stroke, Style, Text, Icon } from 'ol/style';
// kml
import { KML, GeoJSON } from 'ol/format';
// 选择多边形
import { Draw, defaults/* , Modify, Snap */ } from 'ol/interaction';
// render
import { getVectorContext } from "ol/render";
// 菜单栏
import menuUtils from './menuUtils.js'

import WebGLTile from 'ol/layer/WebGLTile';
import WebGLPointsLayer from 'ol/layer/WebGLPoints';

/******************************
 * 变量(非地图)
 * ****************************
 */
let count = 0  // 地图点击打点变量

/******************************
 * 地图变量(工具)
 * ****************************
 */
// 普通搜索
// https://api.tianditu.gov.cn/v2/search?postStr={%22queryType%22:13,%22start%22:0,%22count%22:5,%22specify%22:%22156110000%22,%22dataTypes%22:%22%E6%B3%95%E9%99%A2,%E5%85%AC%E5%9B%AD%22}&type=query&tk=02dd5ea16a6b869b3b37e12f269b1463
// 周边搜索
// https://api.tianditu.gov.cn/v2/search?postStr={%22keyWord%22:%22%E5%85%AC%E5%9B%AD%22,%22level%22:12,%22queryRadius%22:5000,%22pointLonlat%22:%22121.6262019920349,29.879795341283085%22,%22queryType%22:3,%22start%22:0,%22count%22:10}&type=query&tk=02dd5ea16a6b869b3b37e12f269b1463

const tdtTk = import.meta.env.VITE_APP_MapToken  // 全局配置 - 天地图密钥
// const tdtTk = '6b94eac741fe8a50f283b9b11d9d60d2'  // 全局配置 - 天地图密钥
console.log(tdtTk, import.meta, import.meta.env.VITE_USER_NODE_ENV)

// 设置底图url
const setLayerUrl = (url) => {
  return url + tdtTk
}
// 创建底图基础配置
const createBaseLayerConfig = (url, layerSourceConfig = {}, layerConfig = {}) => {
  return new WebGLTile({
    // return new TileLayer({
    source: new XYZ({
      url,
      ...layerSourceConfig
    }),
    type: 'baseLayer',
    ...layerConfig
  })
}

// 配置地图底图
const setBaseMapLayer = (url) => {
  return createBaseLayerConfig(url, {
    wrapX: false,
    crossOrigin: "anonymous",
  }, { layerType: 'baseMapLayer' })
}

// 配置地图注记
const setBaseMapTxt = (url) => {
  return createBaseLayerConfig(url, {}, { layerType: 'baseMapTxt' })
}

/**
 * 天地图底图配置
    天地图图层类型
    vec: 矢量底图
    cva: 矢量注记图层
    eva: 矢量注记图层-英文注记
    img: 影像底图
    cia: 影像注记图层
    eia: 影像注记图层 -英文
    ter: 地形底图
    cta: 地形注记图层
 */
const baseLayerUrlConfig = {
  // 天地图底图
  baseMapLayer: {
    t0vec: setLayerUrl("http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk="),  // 街道底图
    t3img: setLayerUrl("http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk="),  // 卫星(影像)底图
    t4ter: setLayerUrl("http://t4.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk="),  // 地形底图
    t07vec: setLayerUrl("http://t{0-7}.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk="),  // 街道底图2
    t07img: setLayerUrl("http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk="),  // 卫星底图2
  },
  // 天地图注记
  baseMapTxt: {
    t0cva: setLayerUrl("http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk="),  // 街道图注记
    t4cva: setLayerUrl("http://t4.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk="),  // 地形图注记
    t07cia: setLayerUrl("http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk="),  // 卫星图注记
    t07cva: setLayerUrl("http://t{0-7}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=")  // 卫星图注记
  }
}

export const minRenderZoom = 15
// 地图初始化配置
const mapInitConfig = {
  // ol地图底图 - 默认街道底图
  layers: [
    // 天地图底图
    setBaseMapLayer(baseLayerUrlConfig.baseMapLayer.t0vec),
    // 天地图注记
    setBaseMapTxt(baseLayerUrlConfig.baseMapTxt.t0cva),
  ],
  // ol地图基本配置
  // center: fromLonLat([116.400819, 39.916263]),
  // View默认使用EPSG3857坐标系
  // projection: 'EPSG:4326',
  // zoom: 15,
  view: new View({
    center: fromLonLat([121.63, 29.88]),
    zoom: 16,
    maxZoom: 17,
    minZoom: 13,
    constrainResolution: true,  // 设置缩放级别为整数 
    smoothResolutionConstraint: false,  // 关闭无级缩放地图
  }),
}

/******************************
 * 地图核心辅助方法
 * ****************************
 */
// 公共动态选项判断
const setCommonMenuMethod = (condition, commonDynamicMenuMethod) => {
  if (condition) {
    if (condition instanceof Array) {
      if (condition.length !== 0) {
        // console.log(condition.get('tempType'))

        menuAddSingleMethod(commonDynamicMenuMethod)
      }

      if (condition.length === 0) {
        menuUtils.commonMenuMethodsArr = menuUtils.commonMenuMethodsArr.filter(item => item !== commonDynamicMenuMethod)
      }
    } else {
      if (condition instanceof Feature) {
        if (!condition.get('tempType')) {
          menuAddSingleMethod(commonDynamicMenuMethod)
        }
      } else {
        menuAddSingleMethod(commonDynamicMenuMethod)

        if (condition.length === 0) {
          menuUtils.commonMenuMethodsArr = menuUtils.commonMenuMethodsArr.filter(item => item !== commonDynamicMenuMethod)
        }
      }
    }
  }
  if (!condition && menuUtils.commonMenuMethodsArr.includes(commonDynamicMenuMethod)) {
    menuUtils.commonMenuMethodsArr = menuUtils.commonMenuMethodsArr.filter(item => item !== commonDynamicMenuMethod)
  }
}

/**
 * 标注点样式
 */
const pointCircleStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    fill: new Fill({
      color: '#f49d41'
    }),
    stroke: new Stroke({
      color: '#836365',
      width: 1
    })
  }),
})
const pointIconleStyle = (olMap, src) => {
  return new Style({
    image: new Icon({
      src,
      // image: new CircleStyle({
      anchor: [0.5, 15],//图标的锚点,经纬度点所对应的图标的位置，默认是[0.5, 0.5]，即为标注图标的中心点位置
      anchorOrigin: 'top-right',//锚点的偏移位置，默认是top-left，
      anchorXUnits: 'fraction',//锚点X的单位，默认为百分比，也可以使用px
      anchorYUnits: 'pixels',//锚点Y的单位，默认为百分比，也可以使用px
      offsetOrigin: 'top-right',//原点偏移bottom-left, bottom-right, top-left, top-right,默认 top-left
      // offset:[0,10],
      //图标缩放比例
      // scale: 0.5,//可以设置该比例实现，图标跟随地图层级缩放
      scale: olMap.getView().getZoom() / 30,
      //透明度
      opacity: 0.75,//如果想隐藏某个图标，可以单独设置该值，透明度为0时，即可隐藏，此为隐藏元素的方法之一。
    }),
  })
}

/**
 * 绘制扇形核心方法
 * APIMethod:OpenLayers绘制扇形的接口扩展
 * @param origin 圆心
 * @param radius 半径
 * @param sides 边数
 * @param r 弧度
 * @param angel 旋转角度（扇形右边半径与x正向轴的角度）
 * @returns {OpenLayers.Geometry.Polygon}
 */
const createRegularPolygonCurve = (origin, radius, sides, r, angel) => {
  let rotation = 360 - r;
  let angle = Math.PI * ((1 / sides) - (1 / 2));
  if (rotation) {
    angle += (rotation / 180) * Math.PI;
  }
  let rotatedAngle, x, y;
  let points = [];
  for (let i = 0; i < sides; ++i) {
    let an = i * ((360 - rotation) / 360);
    rotatedAngle = angle + (an * 2 * Math.PI / sides);
    x = origin[0] + (radius * Math.cos(rotatedAngle));
    y = origin[1] + (radius * Math.sin(rotatedAngle));
    points.push([x, y]);
  }
  if (rotation != 0) {
    points.push(origin);
  }
  let ring = new LinearRing(points);
  ring.rotate(angel / 57.3, origin);
  let list = ring.getCoordinates()

  return new Polygon([list]);
}

// 移除地图Overlay元素
const removeAllOverlay = () => {
  let flickerPointDom = document.querySelectorAll('.flicker_point')

  flickerPointDom.forEach(item => {
    item.classList.remove('flicker_point')
  })
}

/******************************
 * 地图核心方法供出
 * ****************************
 */
// 初始化地图
export const initOlMap = (target) => {
  return new Map({
    target,
    layers: mapInitConfig.layers,
    view: mapInitConfig.view,
    interactions: defaults({ mouseWheelZoom: true })  // 禁止缩放
  });
}

// 切换地图底图
export const switchBaseLayer = (olMap, type) => {
  let txtType = ''

  switch (type) {
    // 街道底图
    case 't0vec':
      txtType = 't0cva'  // 街道图注记
      break
    // 卫星(影像)底图
    case 't3img':
      txtType = 't07cia'  // 卫星图注记
      break
    // 地形底图
    case 't4ter':
      txtType = 't4cva'  // 地形图注记
      break
  }
  // console.log(type, txtType)

  // 底图layer
  let newBaseMapLayer = setBaseMapLayer(eval(`baseLayerUrlConfig.baseMapLayer.${type}`))
  let newBaseMapTxt = setBaseMapTxt(eval(`baseLayerUrlConfig.baseMapTxt.${txtType}`))
  // 获取当前地图中的所有图层
  const mapLayers = olMap.getLayers();

  olMap.getAllLayers().forEach((item, index) => {
    if (item.get('type') === 'baseLayer') {
      switch (item.get('layerType')) {
        case 'baseMapLayer':
          olMap.removeLayer(item)
          mapLayers.insertAt(index, newBaseMapLayer)
          break
        case 'baseMapTxt':
          olMap.removeLayer(item)
          mapLayers.insertAt(index, newBaseMapTxt)
          break
      }
    }
  })
}

// 获取可视区域的左上角和右下角坐标
export const getCurrentViewPosition = (olMap) => {
  const extent = olMap.getView().calculateExtent(olMap.getSize());

  // 获取投影坐标系
  const topLeftCoord = getTopLeft(extent);  // 左上角
  const bottomRightCoord = getBottomRight(extent);  // 右下角
  // console.log(topLeftCoord, bottomRightCoord)

  // 将投影坐标转换为地理坐标
  const topLeft = transform(topLeftCoord, 'EPSG:3857', 'EPSG:4326');
  const bottomRight = transform(bottomRightCoord, 'EPSG:3857', 'EPSG:4326');
  // console.log(topLeft, bottomRight)

  return {
    topLeft,
    bottomRight,
  }
}

// 初始化所有控件
export const resetControls = (olMap) => {
  olMap.getControls().clear()

  // 重新添加控件（如果需要）
  // olMap.addControl(new FullScreen());  // 全屏
  olMap.addControl(new Zoom());  // 缩放
  olMap.addControl(new ZoomSlider());  // 缩放
  olMap.addControl(new ScaleLine());  // 比例尺


  // olMap.addControl(new OverviewMap());  // 鹰眼
}

// 判断menu是否存在,不存在新增
export const menuAddSingleMethod = (singleMethod) => {
  if (!menuUtils.commonMenuMethodsArr.includes(singleMethod)) {
    menuUtils.commonMenuMethodsArr.push(singleMethod)
  }
}

// 重置右键属性菜单
export const resetContextMenu = (next) => {
  let mapWrap = document.querySelector('.ol_map_wrap')
  let menu = document.querySelector('.menu_wrap')

  // 判断是否存在menu
  if (menu) {
    mapWrap.removeChild(menu);
  }

  if (next) {
    next(mapWrap)
  }
}

// 设置鼠标右键属性
export const setContextmenu = (olMap, next, setMenuConfig) => {
  const { commonDynamicMenu, singleMenu } = menuUtils.menuMethodBtn  // 公共动态选项,每个页面有需要才显示

  // 添加右键菜单监听
  olMap.getViewport().addEventListener('contextmenu', e => {
    // console.log(transformToLonlat(olMap.getEventCoordinate(e)))  // 经纬度

    e.preventDefault(); // 阻止默认的右键菜单弹出

    /**
     * 子页动态选项
     */
    // 根据具体页面配置菜单栏
    if (setMenuConfig) {
      setMenuConfig(currentPageType => {
        // console.log('当前页面', currentPageType)

        // 根据具体页面配置菜单栏 - 子菜单在某些情况可能需要隐藏
        menuUtils.setMentBtnExtendByPage(currentPageType)
      })
    }

    // 屏幕坐标
    const pixelPoint = olMap.getEventCoordinate(e)
    const pixel = olMap.getPixelFromCoordinate(pixelPoint)
    const feature = olMap.forEachFeatureAtPixel(pixel, feature => {
      return feature
    })


    /**
     * 获取所有layer并做判断
     */
    let featureOnPage = []  // 页面所有的feature
    let myPointByMenuFeature = []  // 所有自定义定位点
    let POIPointByMenuFeature = []  // 所有POI定位点
    let drawTypeByMenuFeature = []  // 所有绘制内容
    getAllLayer(olMap, layerItem => {
      let currentFeature = layerItem.getSource().getFeatures()[0]

      if (!currentFeature) {
        return
      }

      featureOnPage.push(currentFeature)

      if (currentFeature.get('tempType') === 'myPointByMenu') {
        myPointByMenuFeature.push(currentFeature)
      }
      if (currentFeature.get('businessType') === 'POIMarker') {
        POIPointByMenuFeature.push(currentFeature)
      }
      if (currentFeature.get('drawType')) {
        drawTypeByMenuFeature.push(currentFeature)
      }
    })

    /**
     * 公共动态选项
     */
    // 判断是否显示清除所有要素
    setCommonMenuMethod(featureOnPage, commonDynamicMenu.commonDynamicMenuMethod1)

    // 判断是否显示当前要素
    setCommonMenuMethod(feature, commonDynamicMenu.commonDynamicMenuMethod2)

    // 判断是否需要显示停止绘制
    // 获取绘制的图形
    const drawInteraction = getDrawInteraction(olMap)
    setCommonMenuMethod(drawInteraction, commonDynamicMenu.commonDynamicMenuMethod3)

    // 自定义定位点
    setCommonMenuMethod(myPointByMenuFeature, '清空自定义标注点')

    // 自定义闪烁点
    let flickerPointDom = document.querySelectorAll('.flicker_point')
    setCommonMenuMethod(flickerPointDom, '清空自定义闪烁点')

    // 展示分析结果
    if (feature) {
      if (feature.get('pointData')?.isNeedAnalysis) {
        setCommonMenuMethod(feature, commonDynamicMenu.commonDynamicMenuMethod4)
      }
    }

    // 删除所有绘制内容  
    setCommonMenuMethod(drawTypeByMenuFeature, commonDynamicMenu.commonDynamicMenuMethod5)

    /**
     * 子页动态选项
     */
    // 清除POI点
    setCommonMenuMethod(POIPointByMenuFeature, singleMenu.singleMenuMethod2)


    // 重置右键属性菜单
    resetContextMenu(mapWrap => {
      let menu = null

      menu = document.createElement('div');
      menu.setAttribute("class", "menu_wrap");

      // 自定义菜单项
      let tempStr = ''
      menuUtils.commonMenuMethodsArr.forEach(item => {
        tempStr += `<li>${item}</li>`
      })

      menu.innerHTML = `
      <ul>
        ${tempStr}
      </ul>
    `;

      // 添加到页面上
      menu.style.position = 'fixed';
      menu.style.left = `${e.clientX}px`;
      menu.style.top = `${e.clientY}px`;
      mapWrap.appendChild(menu);

      // 监听菜单项的点击事件（可选）
      menu.addEventListener('click', (evt) => {
        const option = evt.target.textContent;
        next({ option, feature, pixelPoint })

        // 清理菜单
        mapWrap.removeChild(menu);
      });
    })
  });
}

// 获取当前绘制状态
export const getDrawInteraction = (olMap) => {
  // 获取绘制的图形
  return olMap.getInteractions().getArray().find(
    (interaction) => interaction instanceof Draw
  );
}

// 取消绘制(点线面)
export const cancelDrawInteraction = (olMap) => {
  // console.log('取消绘制(点线面)', olMap)

  // 获取绘制的图形
  const drawInteraction = getDrawInteraction(olMap)

  olMap.removeInteraction(drawInteraction); // 从地图中移除交互
}

// 投影坐标转换
export const transformToLonlat = (coordinate) => {
  return transform(coordinate, "EPSG:3857", "EPSG:4326")
}

// 屏幕坐标转换
export const transformToPixelPoint = (lon, lat) => {
  return fromLonLat([lon, lat])
}

// 获取经纬度
export const getHdms = (pixelPoint) => {
  return toStringHDMS(toLonLat(pixelPoint)); // 转换为经纬度显示
}

// 获取多边形中心点
export const getPolygonCenter = (feature) => {
  const geometry = feature.getGeometry();
  if (geometry.getType() === "Polygon") {
    const polygon = geometry.clone();
    polygon.transform("EPSG:3857", "EPSG:4326"); // 如果多边形在Web墨卡托坐标系中，需要转换到WGS84
    const extent = polygon.getExtent();
    const center = getCenter(extent);
    return center;
  }
  return null;
}

// 设置标注点
export const addPoint = (olMap, pointBusinessData, src = '/', pointConfig = {}, zIndex = 1) => {
  // 创建点的数据源
  const vectorSource = new VectorSource({
    features: [],
  });

  // 创建点图层
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    zIndex,
    style: src === '/' ? pointCircleStyle : pointIconleStyle(olMap, src)
  });

  olMap.addLayer(vectorLayer);

  const featureConfig = (point, pointData) => {
    return {
      geometry: point,
      type: 'Marker',
      pointData,
      ...pointConfig,
    }
  }

  if (pointBusinessData instanceof Array) {
    pointBusinessData.forEach((item) => {
      const point = new Point(fromLonLat(item.lonlat));
      const feature = new Feature({
        ...featureConfig(point, item.pointData)
      });
      vectorSource.addFeature(feature);
    });
  } else {
    const point = new Point(fromLonLat(pointBusinessData.lonlat));
    const feature = new Feature({
      ...featureConfig(point, pointBusinessData.pointData)
    });
    vectorSource.addFeature(feature);
  }
}

/* // 添加单个点
export const addPointItem = (olMap, pointItem, src = '/', businessType = '', pointConfig) => {
  // 创建点的数据源
  const vectorSource = new VectorSource({
    features: [],
  });

  // 创建点图层
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    zIndex: 1,
    style: src === '/' ? pointCircleStyle : pointIconleStyle(src)
  });

  olMap.addLayer(vectorLayer);

  const point = new Point(fromLonLat(pointItem.lonlat));
  const feature = new Feature({
    geometry: point,
    type: 'Marker',
    businessType,
    ...pointConfig,
    pointData: pointItem.pointData
  });
  vectorSource.addFeature(feature);
} */

// 点聚合
export const setCluster = (olMap, clusterBussinessData, src) => {
  // removeAllDefaultLayer(olMap); // 移除所有默认图层

  let source = new VectorSource();

  if (clusterBussinessData instanceof Array) {
    clusterBussinessData.forEach(item => {
      let coordinates = fromLonLat([item.longitude, item.latitude]);
      let feature = new Feature({
        geometry: new Point(coordinates),
        type: 'Marker',
        pointData: item
      });
      source.addFeature(feature);
    })
  } else {
    let coordinates = fromLonLat([clusterBussinessData.longitude, clusterBussinessData.latitude]);
    let feature = new Feature({
      geometry: new Point(coordinates),
      type: 'Marker',
      pointData: clusterBussinessData
    });
    source.addFeature(feature);
  }

  // 聚合
  let cluster = new Cluster({
    source: source,
    distance: 50
  })

  // 创建图层
  let clusterLayer = new VectorLayer({
    type: 'clusterLayer',
    source: cluster,
    style: function (feature) {
      feature.set('type', 'Cluster')
      let size = feature.get('features').length;

      // console.log(feature.get('features'))

      if (size === 1) {
        return src === '/' ? pointCircleStyle : pointIconleStyle(olMap, src)
      }
      else {
        return new Style({
          image: new CircleStyle({
            radius: 30,
            stroke: new Stroke({
              color: 'white'
            }),
            fill: new Fill({
              color: 'blue'
            })
          }),
          text: new Text({
            text: size.toString(),
            fill: new Fill({
              color: 'white'
            })
          })
        })
      }
    }
  });

  olMap.addLayer(clusterLayer);
}

// 添加线
export const addLine = (olMap, position, lineConfig = {}, style) => {
  // 创建线要素并添加到地图上
  const lineFeature = new Feature({
    // geometry: new LineString([[13538079.386677982, 3488521.2319548605], [13540229.178098504, 3488093.6623278903]]),
    geometry: new LineString(position),
    type: 'Line',
    ...lineConfig
  });

  if (!style) {
    style = setFeaturesStyle('rgba(255, 255, 255, 0.2)', 'rgba(0, 0, 0, 0.5)', false, 3)
  }

  lineFeature.setStyle(style);
  // lineFeature.setStyle(styleFunction);

  const vectorSource = new VectorSource({
    features: [lineFeature],
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    zIndex: 9
  });

  olMap.addLayer(vectorLayer);
}

// 根据feature获取layer
export const getLayerByFeature = (map = {}, feature = {}) => {
  let layers = map.getLayers().getArray();
  for (let i in layers) {
    let source = layers[i].getSource();
    if (source instanceof VectorSource) {
      let features = source.getFeatures();
      if (features.length > 0) {
        for (let j in features) {
          if (features[j] === feature) {
            return layers[i];
          }
        }
      }
    }
  }
  return {};
}

// 设置Features样式
export const setFeaturesStyle = (fillColor, strokeColor, isImg = false, width = 2, radius = 5) => {
  return new Style(!isImg ? {
    fill: new Fill({
      color: fillColor
    }),
    stroke: new Stroke({
      color: strokeColor,
      width
    }),
  } : {
    image: new CircleStyle({
      radius,
      fill: new Fill({
        color: fillColor,
      }),
      stroke: new Stroke({
        color: strokeColor,
        width,
      }),
    }),
  })
}

// 绘制区域样式
const setDrawFeaturesStyle = () => {
  return setFeaturesStyle("rgba(32, 157, 230, 0.2)", "rgb(64 158 255)")
}

// 给某个feature置顶
export const featureToMaxTop = (olMap, feature) => {
  // console.log('给某个feature置顶', olMap, feature)

  let currentStyle = null

  switch (feature.get('type')) {
    case 'Marker':
      currentStyle = setFeaturesStyle('#409eff', '#f00', true, 2, 10)
      break
    case 'Curve':
      currentStyle = setFeaturesStyle('#409eff', '#f00', false, 5)
      break
  }

  feature.setStyle(currentStyle)

  feature.set('temp', true)

  // 顶层图层
  let topLayer = new VectorLayer({
    source: new VectorSource(),
    // style: [selectPointStyle],
    zIndex: 999 // zIndex全地图最大
  });

  /* getAllLayer(olMap, layerItem => {
    let currentFeature = layerItem.getSource().getFeatures()[0]

    if (currentFeature.get('temp')) {
      olMap.removeLayer(layerItem)
    }
  }) */
  // 根据条件移除要素
  removeByCondition(olMap, currentFeature => {
    return currentFeature.get('temp')
  })

  topLayer.setOpacity(1)
  topLayer.getSource().addFeature(feature);

  olMap.addLayer(topLayer)
}

// 创建文字图层
export const addTextPoint = (olMap, text, position, textPointConfig = {}, isRemove) => {
  // console.log('创建文字图层', olMap, gridData)

  // 创建文本样式
  const textStyle = new Style({
    text: new Text({
      text,
      fill: new Fill({ color: '#333333' }),
      // stroke: new Stroke({ color: '#fff', width: 2 }),
      font: '18px pingfang',
      textAlign: 'center', // 文本对齐
      textBaseline: 'bottom', // 文本基线
      padding: [5, 10, 5, 10], // 文本周围的填充
      offsetX: -20,
      offsetY: -13,
      overflow: true, // 允许文本溢出
      rotateWithView: false, // 不随地图旋转
      rotation: 0, // 文本旋转角度
      // scale: olMap.getView().getZoom() / 30,
    }),
  });

  if (isRemove) {
    // 根据条件移除要素
    removeByCondition(olMap, currentFeature => {
      return isRemove(currentFeature)
    })
  }

  // 创建文本特征
  const feature = new Feature({
    geometry: new Point(fromLonLat(position)),
    type: 'textPoint',
    ...textPointConfig
  });

  // 设置特征的样式
  feature.setStyle(textStyle);

  // 创建文本图层
  const vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [feature],
    }),
    zIndex: 9
  });

  // 将文本图层添加到地图
  olMap.addLayer(vectorLayer);
}

/**
 * 气泡窗通用方法
 * @param {*} olMap 地图对象
 * @param {*} pixelPoint 屏幕坐标
 * @param {*} popupData 气泡窗数据
 * @param {*} next 事件方法
 * @param {*} overlayConfig 气泡窗配置 
 */
export const popupCommonConfig = (olMap, pixelPoint, popupInner, next, overlayConfig = null,) => {
  let container = document.getElementById('popup');
  let closer = document.getElementById('popup-closer');
  // let content = document.getElementById('popup-content');
  container.style.display = 'block'

  /* let overlayContainer = document.querySelector('.ol-overlay-container')
  if (overlayContainer) {
    overlayContainer.remove()
  } */

  let overlay = new Overlay({
    element: container, //绑定 Overlay 对象和 DOM 对象的
    ...overlayConfig,
    zIndex: 9999,
  });
  olMap.addOverlay(overlay);

  closer.onclick = () => {
    overlay.setPosition(undefined);
    closer.blur();
    overlay = null;
    return false;
  };

  // console.log(popupInner)
  // content.innerHTML = popupData;  // 使用jsx,不直接进行inner
  overlay.setPosition(pixelPoint); //把 overlay 显示到指定的 x,y坐标

  // 使用addEventListener会无限叠加事件,且不好使用removeEventListener移除(匿名函数)
  overlay.getElement().onclick = e => {
    next(e)
  }
}

/**
 * 添加扇形
 * 绘制扇形核心方法
 * APIMethod:OpenLayers绘制扇形的接口扩展
 * @param origin 圆心
 * @param radius 半径
 * @param sides 边数
 * @param r 弧度
 * @param angel 旋转角度（扇形右边半径与x正向轴的角度）
 * @returns {OpenLayers.Geometry.Polygon}
 */
// 根据频段展示不同颜色 有边缘  
export const addCurve = (olMap, curveDataList, isResetStyle) => {
  let featureList = []  // 扇区feature列表

  // 根据业务数据修改feature数据
  curveDataList.forEach(item => {
    // 频率
    // console.log(item.curveData.workFrequency)

    // 扇区样式
    let curveStyle = setFeaturesStyle(
      "rgba(32, 222, 230, 0.4)",
      'rgba(255, 205, 67, 0.3)'
    )
    // 扇区半径
    let curveRadius = 100

    if (isResetStyle) {
      let { myCurveStyle, myCurveRadius } = isResetStyle(item)

      curveStyle = myCurveStyle
      curveRadius = myCurveRadius
    }

    let origi_point = fromLonLat(item.lonlat);  // 绘制扇形的顶点
    // let circle = createRegularPolygonCurve(origi_point, 150, 100, 45, 90) // 调用绘制扇形的方法得到扇形
    let circle = createRegularPolygonCurve(origi_point, curveRadius, 100, 45, item.curveData.antDirectionAngle) // 调用绘制扇形的方法得到扇形
    let feature = new Feature(circle);  // 把扇形加入 feature

    feature.setStyle(curveStyle)
    feature.set('type', 'Curve')  // 这是给这个扇形添加额外的参数 ， 如果是设置id 用 setId方法
    // 这是给这个扇形添加额外的参数，这里的id和 setId的id没关系
    feature.set('curveData', item.curveData)
    featureList.push(feature)
  })

  let vectorSource = new VectorSource();  // 创建一个数据源
  vectorSource.addFeatures(featureList);   // 把两个扇形加进数据源
  let vectorLayer = new VectorLayer({     // 创建一个图层，把数据源加进图层
    source: vectorSource,
    zIndex: 1
  });
  olMap.addLayer(vectorLayer);   // 把图层加进地图
}

/**
 * 设置气泡窗
 * @param {*} olMap 地图对象
 * @param {*} pixelPoint 屏幕坐标
 * @param {*} popupData 气泡窗数据
 * @param {*} next 事件处理方法
 */
export const setPopup = (olMap, pixelPoint, popupInner, next) => {
  // const pixelPoint = e.coordinate  // 屏幕坐标
  popupCommonConfig(olMap, pixelPoint, popupInner, next, {
    autoPan: true, // 定义弹出窗口在边缘点击时候可能不完整 设置自动平移效果
    /* autoPanAnimation: {
        duration: 250, // 自动平移效果的动画时间 9毫秒）
    }, */
  })
}

// 自动弹出气泡窗
export const setAutoPopup = (pixelPoint, itemData, next) => {
  // 点击尺 （这里是尺(米)，并不是经纬度）;
  let hdms = getHdms(pixelPoint); // 转换为经纬度显示
  // let hdms = toStringHDMS(toLonLat(pixelPoint)); // 转换为经纬度显示

  const popupObj = {
    name: '通用信息展示弹窗',
    hdms,
    coordinate: [itemData.longitude, itemData.latitude],
    popupData: itemData  // 气泡窗业务数据
  }

  next(popupObj)
}

// 获取所有图层
export const getAllLayer = (olMap, next) => {
  // 获取当前地图上的所有图层
  let layers = olMap.getLayers().getArray();

  // 获取所有图层(从地图中移除所有图层)
  for (let i = layers.length - 1; i >= 0; --i) {
    if (layers[i] instanceof VectorLayer) {
      next(layers[i])
    };
  }
}

// 移除所有图层
export const removeAllLayer = (olMap) => {
  removeAllOverlay()  // 移除地图Overlay元素

  cancelDrawInteraction(olMap)  // 取消绘制(点线面)

  getAllLayer(olMap, layerItem => {
    olMap.removeLayer(layerItem)
  })
}

// 根据条件获取FeatureList
export const getFeaturesByCondition = (olMap, condition) => {
  let featureList = []
  getAllLayer(olMap, layerItem => {
    let currentFeature = layerItem.getSource().getFeatures()[0]

    if (condition(currentFeature)) {
      featureList.push(currentFeature)
    }
  })

  return featureList
}

// 根据条件移除要素
export const removeByCondition = (olMap, condition) => {
  getAllLayer(olMap, layerItem => {
    let currentFeature = layerItem.getSource().getFeatures()[0]

    if (condition(currentFeature)) {
      olMap.removeLayer(layerItem)
    }
  })
}

// 根据类型移除图层
export const removeLayerByType = (olMap, type) => {
  removeByCondition(olMap, currentFeature => {
    if (currentFeature) {
      return currentFeature.get('type') === type
    }
  })
}

// 根据业务类型移除图层
export const removeLayerByBusinessType = (olMap, type) => {
  removeByCondition(olMap, currentFeature => {
    if (currentFeature) {
      return currentFeature.get('businessType') === type
    }
  })
}

// 移除所有默认图层
export const removeAllDefaultLayer = (olMap) => {
  removeByCondition(olMap, currentFeature => {
    if (currentFeature) {
      return (currentFeature.get('type') === 'Marker' || currentFeature.get('type') === 'Curve' || currentFeature.get('type') === 'Cluster') && (!currentFeature.get('bussinessType'))
    }
  })
}

// 刷新地图需要移除的元素
export const removeByReflashMap = (olMap) => {
  // 根据条件移除要素
  removeByCondition(olMap, currentFeature => {
    return currentFeature.get('tempType')
  })

  removeAllOverlay()  // 移除地图Overlay元素
}

// 飞到指定坐标
export const flyToCoordinate = (olMap, lonlat) => {
  olMap.getView().animate({
    center: fromLonLat(lonlat),
    duration: 800, // 飞行时间，单位毫秒
  });
}

// 获取所有feature
export const getAllFeature = (olMap, next) => {
  olMap.getLayers().forEach(item => {
    let source = null;
    if (item) {
      source = item.getSource();
    }
    if (source instanceof VectorSource) {
      source.forEachFeature(feature => {
        // console.log(feature.get('type'))

        next(feature)
      });
    }
  });
}

// 加载kml
export const loadKML = (olMap, text) => {
  // console.log('加载kml', olMap, text)

  const format = new KML({
    extractStyles: false //至关重要
  });
  const features = format.readFeatures(text);
  features.forEach(item => {
    // 从EPSG:4326转换到EPSG:3857
    item.getGeometry().transform('EPSG:4326', 'EPSG:3857')
  })
  const vectorSource = new VectorSource({
    features: features,
  });
  olMap.getView().fit(vectorSource.getExtent());
  olMap.getLayers().push(
    new VectorLayer({
      source: vectorSource,
      style: setFeaturesStyle('blue', 'red'),
      zIndex: 100
    })
  );
}

// 创建多边形(选区)
export const drawPolygon = (olMap) => {
  // console.log('创建多边形(选区)', olMap)

  olMap.addInteraction(new Draw({
    source: new VectorSource(),
    type: 'Polygon',
  }));

  // 获取绘制完成的多边形
  olMap.getInteractions().getArray().forEach(interaction => {
    if (interaction instanceof Draw) {
      interaction.on('drawend', (event) => {
        const { feature } = event
        const geometry = feature.getGeometry();
        const coords = geometry.getCoordinates()[0]
        const lonlat = geometry.transform('EPSG:3857', 'EPSG:4326').getCoordinates()[0]
        // console.log(lonlat, coords)
        if (geometry instanceof Polygon) {
          // console.log("所选点位坐标", geometry.getCoordinates());

          createPolygon(olMap, { coords, lonlat }, { drawType: 'polygon' })

          olMap.removeInteraction(interaction); // 从地图中移除交互
        }
      });
    }
  });
}

/**
 * 绘制多边形
 * 
 * @param {*} olMap 
 * @param {*} coords 多边形的坐标数组
 */
export const createPolygon = (olMap, { coords, lonlat, polygonData }, polygonConfig = {}, next, polygonStyle = setDrawFeaturesStyle()) => {
  // console.log(olMap, coords, lonlat)

  // 创建多边形
  let polygon = new Feature({
    geometry: new Polygon([coords]),
    type: 'Polygon',
    ...polygonConfig,
    polygonData: {
      coords,
      lonlat,
      ...polygonData
    }
  });

  // 设置多边形样式
  polygon.setStyle(polygonStyle)

  // 创建矢量图层并添加多边形
  let vectorLayer = new VectorLayer({
    source: new VectorSource({
      features: [polygon]
    })
  });

  olMap.addLayer(vectorLayer);

  if (next) {
    next(polygon)
  }
}

// 取消绘制多边形(取消选区)
export const cancelPolygon = (olMap) => {
  console.log('取消绘制多边形(取消选区)', olMap)

  // cancelDrawInteraction(olMap)
}

// 创建圆形(选区)
export const drawCircle = (olMap) => {
  // console.log('创建圆形(选区)', olMap)

  olMap.addInteraction(new Draw({
    source: new VectorSource(),
    type: 'Circle',
  }));

  // 获取绘制完成的多边形
  olMap.getInteractions().getArray().forEach(interaction => {
    if (interaction instanceof Draw) {
      interaction.on('drawend', (event) => {
        const { feature } = event
        const geometry = feature.getGeometry();
        const lonlat = transform(geometry.getCenter(), 'EPSG:3857', 'EPSG:4326')
        // console.log(geometry, geometry.getRadius(), lonlat)

        let circleItem = {
          lonlat,
          radius: geometry.getRadius()
        }
        addCircle(olMap, circleItem, { drawType: 'Circle' })

        olMap.removeInteraction(interaction); // 从地图中移除交互
      });
    }
  });
}

// 绘制圆
export const addCircle = (olMap, circleItem, circleConfig = {}, isFlicker, isHide = false) => {
  if (!circleItem.radius) {
    circleItem.radius = 550
  }

  let features = []

  /* const fillStyle = new Fill({
    color: 'rgba(32, 157, 230, 0.2)'
  }) */

  let feature = new Feature({
    type: "Circle",
    ...circleConfig,
    circleData: circleItem,
    // 圆心 - 半径
    geometry: new Circle(fromLonLat(circleItem.lonlat), circleItem.radius),
  })
  // feature.setStyle(
  //   /* style ? style : new Style({
  //     fill: fillStyle,
  //   }) */
  //   new Style({
  //     fill: fillStyle,
  //   })
  // )

  feature.setStyle(!isHide ? setDrawFeaturesStyle() : new Style({
    fill: new Fill({
      color: 'rgba(255, 0, 0, 0)'
    }),
    stroke: new Stroke({
      color: '#f00',
      color: 'rgba(255, 0, 0, 0)'
    }),
  }))

  // if (!isHide) {

  // } else {
  //   feature.setStyle()
  // }
  // feature.setStyle(circleStyle ? circleStyle : setDrawFeaturesStyle())
  // feature.setStyle(setDrawFeaturesStyle())
  /* feature.setStyle(new Style({
    fill: new Fill({
      color: 'rgba(255, 0, 0, 0)'
    }),
    stroke: new Stroke({
      color: '#f00',
      color: 'rgba(255, 0, 0, 0)'
    }),
  })) */
  features.push(feature)
  let source = new VectorSource()
  source.addFeatures(features)
  let layer = new VectorLayer({
    // opacity: 0.2,
    zIndex: 100,
  })
  layer.setSource(source)
  olMap.addLayer(layer)

  // 需要闪烁时调用
  if (isFlicker) {
    let radius = 0
    layer.on('postrender', evt => {
      if (radius >= 20) radius = 0;
      var opacity = (20 - radius) * (1 / 20); // 不透明度
      var pointStyle = new Style({
        radius: radius,
        stroke: new Stroke({
          color: "rgba(255,0,0" + opacity + ")",
          width: 22 - radius / 2, // 设置宽度
        }),
      });
      // 获取矢量要素上下文
      let vectorContext = getVectorContext(evt);
      vectorContext.setStyle(pointStyle);
      vectorContext.drawGeometry(feature.getGeometry());
      radius = radius + 0.3; //调整闪烁速度
      //请求地图渲染（在下一个动画帧处）
      olMap.render();
    })
  }
}

// 测距
export const testDistance = (olMap, next) => {
  // console.log("测距", olMap)

  let measure = new Draw({
    source: new VectorSource(),
    type: 'LineString',
    /* style: new Style({
      fill: new Fill({ color: 'rgba(255, 255, 255, 0.2)' }),
      stroke: new Stroke({ color: 'rgba(0, 0, 0, 0.5)', width: 2 })
    }) */
  })
  olMap.addInteraction(measure);

  measure.on('drawend', (event) => {
    const { feature } = event
    const line = feature.getGeometry();

    let length = getLength(line);
    length = length.toFixed(2)

    const coords = line.getCoordinates()
    const lonlat = line.transform('EPSG:3857', 'EPSG:4326').getCoordinates()
    // console.log('Line length: ' + length + ' meters');

    // 如果需要外部提供数据
    if (next) {
      next(length)
    }

    // 创建线要素并添加到地图上
    addLine(olMap, coords, { drawType: 'TestDistance' })

    // 创建文本要素以显示距离
    addTextPoint(olMap, length + '米', lonlat[0], { drawType: 'TestDistance' })

    // olMap.removeInteraction(measure); // 从地图中移除交互
  });
}

// 取消测距
export const cancelTestDistance = (olMap) => {
  // console.log('取消测距', olMap)

  // 根据条件移除要素
  removeByCondition(olMap, currentFeature => {
    currentFeature.get('drawType') === 'TestDistance'
  })
}

// 添加带箭头的线
export const addArrowLine = (olMap, position, src = '../src/components/OpenlayerBaseMap/icon/arrow.svg', businessType = 'arrowLine') => {
  // console.log('添加带箭头的线', olMap)

  function stylefunction(feature) {
    const geometry = feature.getGeometry()
    // 轨迹地理长度
    const totalLength = geometry.getLength()
    // 像素间隔步长
    let step = 50
    // 将像素步长转实际地理距离步长
    let StepLength = step * olMap.getView().getResolution()
    // 箭头总数
    let arrowNum = Math.floor(totalLength / StepLength)

    const styles = [
      // linestring
      new Style({
        stroke: new Stroke({
          // color: 'rgb(164 164 162 / 88%)',
          color: '#42b983',
          width: 5,
        }),
      }),
    ];

    const rotations = [];
    const distances = [0];
    geometry.forEachSegment(function (start, end) {
      let dx = end[0] - start[0];
      let dy = end[1] - start[1];
      let rotation = Math.atan2(dy, dx);
      distances.unshift(Math.sqrt(dx ** 2 + dy ** 2) + distances[0]);
      rotations.push(rotation);
    });

    for (let i = 1; i < arrowNum; i++) {
      let arrow_coor = geometry.getCoordinateAt(i * 1.0 / arrowNum)
      const d = i * StepLength;
      const grid = distances.findIndex((x) => x <= d);
      styles.push(
        new Style({
          geometry: new Point(arrow_coor),
          image: new Icon({
            src,
            opacity: 1,
            anchor: [0.5, 0.5],
            rotateWithView: true,
            rotation: - rotations[distances.length - grid - 1],
            scale: 0.8
          })
        })
      )
    }

    return styles
  }



  /* const styleFunction = function (feature) {
    const geometry = feature.getGeometry();
    const styles = [
      // linestring
      new Style({
        stroke: new Stroke({
          color: 'rgb(164 164 162 / 88%)',
          width: 5,
        }),
      }),
    ];

    geometry.forEachSegment(function (start, end) {
      const dx = end[0] - start[0];
      const dy = end[1] - start[1];
      const rotation = Math.atan2(dy, dx);
      const coord = [start[0] + dx / 2, start[1] + dy / 2]
      // arrows
      styles.push(
        new Style({
          geometry: new Point(coord),
          image: new Icon({
            src,
            anchor: [0.75, 0.5],
            rotateWithView: true,
            rotation: -rotation,
            scale: 0.03
          }),
        })
      );
    });

    return styles;
  }; */

  addLine(olMap, position, { businessType }, stylefunction)
  // addLine(olMap, position, { businessType }, styleFunction)
}

// 右键添加标注点
export const addMyPointByMenu = (olMap, pixelPoint) => {
  const features = [];

  const iconFeature = new Feature({
    geometry: new Point(pixelPoint),
    name: count++,
    location: pixelPoint,
    tempType: 'myPointByMenu'
  });
  const style = new Style({
    image: new CircleStyle({
      radius: 15,
      fill: new Fill({
        color: '#409eff'
      }),
      stroke: new Stroke({
        color: '#4440ff',
        width: 1
      })
    })
  });
  iconFeature.setStyle(style);
  features.push(iconFeature);
  const vectorSource = new VectorSource({
    features
  });
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    opacity: 0.8
  });
  olMap.addLayer(vectorLayer);
}

// 添加闪烁点
export const addFlickerPoint = (olMap, pixelPoint, className = '', next) => {
  // console.log('添加闪烁点', olMap, pixelPoint)

  let point_div = document.createElement('div');
  point_div.className = `flicker_point ${className}`;
  let point_overlay = new Overlay({
    element: point_div,
    position: pixelPoint,
    // positioning: 'center-center'
    zIndex: 0
  });
  olMap.addOverlay(point_overlay);

  if (next) {
    point_div.addEventListener('click', () => {
      next()
    })
  }
}

/******************************
 * 测试 
 * ****************************
 */

// 地图功能测试
export const olMapTestCommon = (olMap, feature, pixelPoint) => {
  console.log('地图功能测试', olMap, feature, pixelPoint)
  console.log('经纬度', transformToLonlat(pixelPoint))

  // 创建图层
  var layer = new WebGLPointsLayer({
    source: new VectorSource(),
    style: {
      symbol: {
        symbolType: 'circle',
        size: 20,
        color: 'red'
      }
    }
  });

  // 创建要素
  let source = new VectorSource()
  for (var i = 1; i <= 100000; i++) {
    var coordinates = [120.00 + Math.random(), 30.00 + Math.random()];
    var feature = new Feature(new Point(coordinates));
    source.addFeature(feature);
  }

  olMap.addLayer(layer);

  /* // 创建地图
  var map = new ol.Map({
    target: 'map',
    layers: [
      layer
    ],
    view: new ol.View({
      projection: 'EPSG:4326',
      center: [120, 30],
      zoom: 10
    })
  }); */


  /* olMap.addLayer(new WebGLPointsLayer({
    source: new VectorSource({
      url: 'https://openlayers.org/en/latest/examples/data/geojson/world-cities.geojson',
      format: new GeoJSON(),
      wrapX: true,
    }),
    style: {
      symbol: {
        symbolType: 'circle',
        size: 8,
        color: 'rgb(255, 0, 0)',
        opacity: 0.2,
      },
    }
  })); */


  /* console.log('feature', polygonGeoJSON)

  // 创建多边形数据源
  const vectorSource = new VectorSource({
    features: (new GeoJSON()).readFeatures(polygonGeoJSON) // 替换为你的GeoJSON多边形数据
  });

  // 创建多边形图层并使用WebGL渲染
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    renderMode: 'webgl' // 指定使用WebGL渲染
  });

  olMap.addLayer(vectorLayer); */


  // console.log()
  // console.log(feature.get('type') === 'Cluster')

  /*  // 随机创建1000个要素
   var source = new VectorSource();
   for (var i = 1; i <= 200; i++) {
     var coordinates = [120.00 + Math.random(), 30.00 + Math.random()];
     var feature = new Feature(new Point(coordinates));
     source.addFeature(feature);
   }
   for (var i = 1; i <= 200; i++) {
     var coordinates = [120.01 + Math.random(), 30.01 + Math.random()];
     var feature = new Feature(new Point(coordinates));
     source.addFeature(feature);
   }
   for (var i = 1; i <= 200; i++) {
     var coordinates = [120.02 + Math.random(), 30.02 + Math.random()];
     var feature = new Feature(new Point(coordinates));
     source.addFeature(feature);
   }
   for (var i = 1; i <= 200; i++) {
     var coordinates = [120.03 + Math.random(), 30.03 + Math.random()];
     var feature = new Feature(new Point(coordinates));
     source.addFeature(feature);
   }
   for (var i = 1; i <= 200; i++) {
     var coordinates = [120.04 + Math.random(), 30.04 + Math.random()];
     var feature = new Feature(new Point(coordinates));
     source.addFeature(feature);
   }
 
   // 聚合
   var cluster = new Cluster({
     source: source,
     distance: 100
   })
 
   // 创建图层
   var layer = new VectorLayer({
     source: cluster,
     style: function (feature, resolution) {
       var size = feature.get('features').length;
       if (size == 1) {
         return pointCircleStyle
       }
       else {
         return new Style({
           image: new CircleStyle({
             radius: 30,
             stroke: new Stroke({
               color: 'white'
             }),
             fill: new Fill({
               color: 'blue'
             })
           }),
           text: new Text({
             text: size.toString(),
             fill: new Fill({
               color: 'white'
             })
           })
         })
       }
     }
   });
 
   olMap.addLayer(layer);
 
   // 监听地图分辨率改变事件
   olMap.getView().on('change:resolution', function (event) {
     if (olMap.getView().getZoom() == olMap.getView().getMaxZoom()) {
       cluster.setDistance(0);
     }
     else {
       cluster.setDistance(100);
     }
   })
  */




  /* const source = new VectorSource({
    url: 'https://openlayers.org/en/latest/examples/data/geojson/photovoltaic.json',
    format: new GeoJSON()
  })
  const clusterSource = new Cluster({
    source: source,
    distance: 40,

  })
  const vectorLayer = new VectorLayer({
    source: clusterSource,
    // 聚合样式
    style: function (feature) {
      // 点的个数
      const size = feature.get('features').length
      return new Style({
        image: new CircleStyle({ // 圆形
          radius: 15, // 半径
          stroke: new Stroke({ // 边框
            color: '#fff'
          }),
          fill: new Fill({ // 填充
            color: '#3399CC'
          })
        }),
        text: new Text({ // 文字样式
          font: '15px sans-serif',
          text: size.toString(),
          fill: new Fill({
            color: '#fff'
          })
        })
      })
    }
  })
  olMap.addLayer(vectorLayer); */




  /* let featureList = getFeaturesByCondition(olMap, currentFeature => {
    return currentFeature.get('type') === 'Marker'
  })

  console.log(featureList)

  // 聚合
  var cluster = new Cluster({
    source: new VectorSource({
      features: featureList
    }),
    distance: 100,
    minDistance: 20, // 聚合块之间的最小像素距离，默认为零
  })

  // 创建图层
  var clusterLayer = new VectorLayer({
    source: cluster,
    style: function (feature, resolution) {
      var size = feature.get('features').length;
      if (size == 1) {
        return pointCircleStyle
      }
      else {
        return new Style({
          image: new CircleStyle({
            radius: 30,
            stroke: new Stroke({
              color: 'white'
            }),
            fill: new Fill({
              color: 'blue'
            })
          }),
          text: new Text({
            text: size.toString(),
            fill: new Fill({
              color: 'white'
            })
          })
        })
      }
    }
  });

  olMap.addLayer(clusterLayer); */

  /* let clusterSource = new Cluster({
    distance: 3,
    minDistance: 20, // 聚合块之间的最小像素距离，默认为零
    source: new VectorSource({
      features: featureList
    })
  }); */

  // const baseLayerList = olMap.getAllLayers().filter(item => item.get('type') === 'baseLayer')



  //创建一个聚合source
  // let clusterSource = new Cluster({
  //   distance: 3,
  //   minDistance: 20, // 聚合块之间的最小像素距离，默认为零
  //   source: new VectorSource({
  //     features: features
  //   })
  // });
  // let styleCache = {};
  // const clusterLayer = new VectorLayer({
  //   id: 'clusterLayer',
  //   source: clusterSource,
  //   zIndex: 11,
  //   style: function (feature) {
  //     let size = feature.get('features').length;
  //     let clusterFeatures = feature.get('features');
  //     // let fillColor = me.getColor(size);
  //     if (size > 1) {
  //       let style = new Style({
  //         image: new CircleStyle({
  //           radius: 5,
  //           /*stroke: new Stroke({
  //             color: '#fff'
  //           }),*/
  //           fill: new Fill({
  //             color: '#000'
  //           })
  //         })
  //       });
  //       return style;
  //     } else {
  //       return clusterFeatures[0].getStyle();
  //     }
  //   }
  // });
  // olMap.addLayer(clusterLayer);

  // 切换底图函数
  /* function switchBaseLayer(newBaseLayer) {
    // 获取地图中当前的图层
    var currentBaseLayer = olMap.getLayers().getArray().find(function (lyr) {
      return lyr.get('type') === 'base';
    });

    // 如果当前图层存在，则将其移除
    if (currentBaseLayer) {
      olMap.removeLayer(currentBaseLayer);
    }

    // 将新的图层添加到地图，并设置其为当前图层
    olMap.addLayer(newBaseLayer);
  } */

  /* const baseLayerList = olMap.getAllLayers().filter(item => item.get('type') === 'baseLayer')
  // console.log(baseLayerList)

  baseLayerList.forEach(item => {
    switch (item.get('layerType')) {
      case 'baseMapLayer':
        break
      case 'baseMapTxt':
        break
    }
  }) */
  /* // 天地图底图
  const newBaseMapLayer = createBaseLayerConfig(baseLayerUrlConfig.baseMapLayer.t3img)
  const newBaseMapTxt = createBaseLayerConfig(baseLayerUrlConfig.baseMapTxt.t07cia)
  const mapLayers = olMap.getLayers();//获取当前地图中的所有图层

  olMap.getAllLayers().forEach((item, index) => {
    if (item.get('type') === 'baseLayer') {
      console.log(item)
      switch (item.get('layerType')) {
        case 'baseMapLayer':
          olMap.removeLayer(item)
          mapLayers.insertAt(index, newBaseMapLayer)
          break
        case 'baseMapTxt':
          olMap.removeLayer(item)
          mapLayers.insertAt(index, newBaseMapTxt)
          break
      }
    }
  }) */

  // const baseLayer = olMap.getAllLayers()[0]//获取当前map的底图
  // console.log(baseLayer, baseLayer.get('type'))
  /* olMap.removeLayer(baseLayer)//移除该底图
  const mapLayers = olMap.getLayers();//获取当前地图中的所有图层

  // 天地图底图
  let newBaseLayer = createBaseLayerConfig(baseLayerUrlConfig.baseMapLayer.t3img)

  mapLayers.insertAt(0, newBaseLayer)//将新的图层对象插入到第一个位置。 */

  /* // 使用示例：切换到OpenStreetMap
  var osmLayer = createNewBaseLayer(baseLayerUrlConfig.baseMapLayer.t3img);
  osmLayer.set('type', 'base'); // 设置一个标识，以便识别是底图层

  // 切换到新创建的OpenStreetMap图层
  switchBaseLayer(osmLayer); */

  // olMap.addLayer(baseLayerUrlConfig.baseMapLayer.t3img);

  /* getAllLayer(olMap, layerItem => {
    let currentFeature = layerItem.getSource().getFeatures()

    if (currentFeature[0].get('type') === 'POIMarker') {
      console.log(currentFeature[0])
    }
  }) */

}

// 打点测试
export const setPointTest = (olMap) => {
  // fromLonLat([121.63, 29.88])

  const features = [];
  // console.log(e.coordinate); // 获取坐标

  const iconFeature = new Feature({
    geometry: new Point(fromLonLat([121.63, 29.88])),
    // name: count++,
    location: fromLonLat([121.63, 29.88])
  });
  const style = new Style({
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({
        color: '#f49d41'
      }),
      stroke: new Stroke({
        color: '#836365',
        width: 1
      })
    })
  });
  iconFeature.setStyle(style);
  features.push(iconFeature);
  const vectorSource = new VectorSource({
    features
  });
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    opacity: 0.8
  });
  olMap.addLayer(vectorLayer);
}

// 移除标注测试
export const removePointTest = (olMap) => {
  const layers = olMap.getLayers();
  layers.forEach(item => {
    if (item instanceof VectorLayer) olMap.removeLayer(item);
  });
}

// 点击打点测试
export const clickSetPointTest = (olMap, e) => {
  const features = [];
  // console.log(e.coordinate); // 获取坐标

  const iconFeature = new Feature({
    geometry: new Point(e.coordinate),
    name: count++,
    location: e.coordinate
  });
  const style = new Style({
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({
        color: '#f49d41'
      }),
      stroke: new Stroke({
        color: '#836365',
        width: 1
      })
    })
  });
  iconFeature.setStyle(style);
  features.push(iconFeature);
  const vectorSource = new VectorSource({
    features
  });
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    opacity: 0.8
  });
  olMap.addLayer(vectorLayer);
}

// 绘制扇形测试
export const addCurveTest = (olMap) => {
  let origi_point = fromLonLat([121.63, 29.88]);  // 绘制扇形的顶点
  let circle = createRegularPolygonCurve(origi_point, 500, 100, 30, 90) // 调用绘制扇形的方法得到扇形
  let feature = new Feature(circle);  // 把扇形加入 feature
  feature.setStyle(  // 设置一下这个扇形的样式
    new Style({
      fill: new Fill({
        color: 'rgba(32, 157, 230, 0.3)'
      }),
      stroke: new Stroke({
        color: 'rgba(255, 205, 67, 0.3)',
        width: 2
      }),
    })
  )
  feature.set('type', 'Curve')  // 这是给这个扇形添加额外的参数 ， 如果是设置id 用 setId方法
  feature.set('curve', {   // 这是给这个扇形添加额外的参数，这里的id和 setId的id没关系
    id: 1,
    title: '测试001',
    msg: '测试001-1',
    msg2: '测试001-2',
  })

  // 创建第二个扇形，和第一个一样
  let circle1 = createRegularPolygonCurve(origi_point, 500, 100, 30, 45)
  let feature1 = new Feature(circle1);
  feature1.setStyle(
    new Style({
      fill: new Fill({
        color: 'rgba(32, 157, 230, 0.3)'
      }),
      stroke: new Stroke({
        color: 'rgba(255, 205, 67, 0.3)',
        width: 2
      }),
    })
  )
  feature1.set('type', 'Curve')
  feature1.set('curve', {
    id: 2,
    title: '超级无敌炫酷爆龙战神',
    msg: '超级无敌炫酷爆龙战神 描述001',
    msg2: '超级无敌炫酷爆龙战神 描述002',
  })

  let vectorSource = new VectorSource();  // 创建一个数据源
  vectorSource.addFeatures([feature, feature1]);   // 把两个扇形加进数据源
  let vectorLayer = new VectorLayer({     // 创建一个图层，把数据源加进图层
    source: vectorSource
  });
  olMap.addLayer(vectorLayer);   // 把图层加进地图
}

// 绘制圆测试
export const addCircleTest = (olMap, circleList) => {
  let features = []

  circleList.forEach((item, index) => {
    let feature = new Feature({
      type: "Circle",
      title: item.name,
      geometry: new Circle(fromLonLat(item.site), 200),
    })
    feature.setStyle(
      new Style({
        fill: new Fill({
          color: 'rgba(32, 157, 230, 1)'
        }),
      })
    )
    features.push(feature)
  })
  let source = new VectorSource()
  source.addFeatures(features)
  let layer = new VectorLayer({
    opacity: 0.2
  })
  layer.setSource(source)
  olMap.addLayer(layer)
}

// 获取所有要素测试
export const getAllFeatureTest = (olMap) => {
  let layers = olMap.getLayers().getArray();
  layers.forEach(item => {
    if (item instanceof VectorLayer) {
      let currentFeature = item.getSource().getFeatures()
      console.log(currentFeature[0].get('type'))
    }
  })
}

// 获取闪烁点测试
export const addFlickerPointByMenuTest = (olMap, pixelPoint) => {
  // console.log('添加闪烁点', olMap, pixelPoint)

  let point_div = document.createElement('div');
  point_div.className = "flicker_point";
  let point_overlay = new Overlay({
    element: point_div,
    // positioning: 'center-center'
  });
  olMap.addOverlay(point_overlay);

  point_overlay.setPosition(pixelPoint); //把 overlay 显示到指定的 x,y坐标

  addFlickerPoint(olMap, pixelPoint)
}