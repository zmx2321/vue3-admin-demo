<template>
  <section class="ol_map_wrap" v-if="env === 'development'">
    <!-- 插槽 -->
    <slot></slot>

    <!-- 地图 -->
    <section id="olMap" class="ol_map"></section>

    <!-- 图例 -->
    <lend ref="refLend" :currentPageType="currentPageType" :isShowLend="isShowLend" />

    <!-- 切换底图控件 -->
    <switch-base-layer @switchBaseLayerType="switchBaseLayerType" />

    <!--  气泡窗 -->
    <popup-common ref="refPopupCommon" :currentPageType="currentPageType" />

    <!-- 底部信息 -->
    <div class="copyright_info" v-show="true">
      <p>Copyright © CMDI.vip All Rights Reserved.</p>
      <ul>
        <li>
          <dl>
            <dt>经纬度：</dt>
            <dd>{{ currentLonlat }}</dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>当前层级：</dt>
            <dd>{{ currentZoomLevel }}</dd>
          </dl>
        </li>
      </ul>
    </div>

    <!-- 切换天地图token 弹窗 -->
    <set-token-dialog ref="refSetTokenDialog" />
  </section>
  <section v-else>
    天地图服务暂不可用,即将跳转高德地图服务页面！
  </section>
</template>

<script setup name="gis">
// vue - core
import { ref, onMounted, defineEmits, nextTick } from "vue";
import { getCurrentInstance } from 'vue';
import { useRoute, useRouter } from "vue-router";
// map - core
import * as mapUtils from "./mapUtils.js";
import menuUtils from './menuUtils.js'
import { boundingExtent } from 'ol/extent'
// 组件
import PopupCommon from "./components/popup/PopupCommon.vue"; // 气泡窗
import Lend from "./components/Lend.vue"; // 图例
import SwitchBaseLayer from "./components/SwitchBaseLayer.vue"; // 切换底图控件
import SetTokenDialog from "./components/SetTokenDialog.vue"; // 切换天地图token
// 工具
import { objIsEmpty } from "@/utils/index.ts";
// 组件传参
import mittBus from "@/utils/mittBus"; // mitt
// 其他工具
import * as popupInner from "./components/popup/popupInner.js";
/* import { gisDataStore } from '@/store/modules/gis.js'  // store

const gisStoreData = gisDataStore() */

// 自定义事件
const emit = defineEmits([
  // 全局
  "getOlMapInstance",
  "getCurrentViewData",
  "reflashMap",
  'toggleOverviewInfo',
  // gis
  // ......
  // 投诉
  "getCircleData",
  "setCircleDialogData",
]);

const props = defineProps({
  // 当前页面类型
  currentPageType: {
    type: String,
    default: "",
  },
  // 是否需要自动加载数据 - false地图移动不加载,点击刷新加载
  isAutoRenderData: {
    type: Boolean,
    default: false,
  },
  // 是否显示图例
  isShowLend: {
    type: Boolean,
    default: true,
  },
});

const { proxy } = getCurrentInstance();

const router = useRouter();

const env = import.meta.env.VITE_USER_NODE_ENV
let myOlMap = null;

const refPopupCommon = ref(null);
const refLend = ref(null);
const refSetTokenDialog = ref(null);

let toggleFlag = ref(true);  // 概览信息默认显示

const currentZoomLevel = ref(0);
const currentLonlat = ref("");

const isRemoveMap = ref(true); // 判断渲染地图时是否移除当前地图要素

let currentSingleObjData = ref({}); // 当前检索到的数据

const mapCommonData = {
  minRenderZoom: mapUtils.minRenderZoom, // 最小渲染层级
};

// 概览信息显示隐藏
const toggleOverviewInfo = () => {
  toggleFlag.value = !toggleFlag.value;

  emit('toggleOverviewInfo', toggleFlag.value)
}

// 地图加载完初始化做的一些操作
const mapInit = (olMap) => {
  // console.log('地图加载完初始化做的一些操作', olMap)
  myOlMap = olMap; // 赋值全局变量,为后续业务操作做准备

  // 地图加载完初始化做的一些操作[业务相关]
  emit("getOlMapInstance", olMap, mapCommonData); // 向外供出olMap实例,以及一些公共数据

  mapUtils.resetControls(olMap); // 初始化所有控件

  // 设置鼠标右键属性
  mapUtils.setContextmenu(
    olMap,
    (option) => {
      // console.log(option, mapUtils.menuMethods);
      setMenuMethods(option);
    },
    (next) => {
      // 根据具体页面配置菜单栏
      next(props.currentPageType);
    }
  );
};

// 设置鼠标右键菜单栏方法
const setMenuMethods = ({ option, feature, pixelPoint }) => {
  // console.log("设置鼠标右键菜单栏方法", option, feature, pixelPoint);

  // 点击地图隐藏气泡窗
  refPopupCommon.value.hidePopup();

  menuUtils.setMenuMethods(myOlMap, option, feature, pixelPoint, proxy)
};

// 地图加载完初始化后获取地图的一些信息
const getMapInitInfo = (olMap) => {
  // console.log("地图加载完初始化后获取地图的一些信息", olMap)

  // 获取可视区域数据 - 如果不需要自动加载
  if (!props.isAutoRenderData) {
    // console.log('刷新加载地图', props.isAutoRenderData)
    emit("getCurrentViewData", olMap); // 地图加载时会自动触发一次
  }

  // 圆数据
  emit("getCircleData", olMap);
};

// 设置地图
const setOlmap = (olMap) => {
  mapEvent(olMap); // 地图事件
};

// 切换底图
const switchBaseLayerType = (val) => {
  // console.log('切换底图', val)

  mapUtils.switchBaseLayer(myOlMap, val)
}

/**
 * 业务方法
 */
// 根据数据渲染Feature
const renderFeatureByData = (olMap, dataList, renderFeature, isLoop = true) => {
  // console.log("根据数据渲染Feature", dataList);

  refPopupCommon.value.hidePopup();

  if (isRemoveMap.value) {
    // removeAllLayer(myOlMap); // 移除所有默认图层
    removeAllDefaultLayer(myOlMap); // 移除所有默认图层
  }
  // }

  setTimeout(() => {
    if (isLoop) {
      // console.log(dataList)
      dataList.forEach((item) => {
        renderFeature(olMap, item);
      });
    } else {
      renderFeature(olMap, dataList);
    }
  }, 500);
};

// 通过气泡数据设置地图
const setMapByAutoPopupData = async (olMap, itemData, fixData, renderFeature) => {
  // console.log('通过气泡数据设置地图', olMap, itemData)

  const { arrData } = itemData

  if (fixData) {
    fixData(itemData);
  }

  // 选择数据隐藏气泡
  refPopupCommon.value.hidePopup();

  olMap.getView().setZoom(18);

  // 调用函数飞到指定的坐标
  flyToCoordinate(myOlMap, [itemData.longitude, itemData.latitude]);
  // mapUtils.flyToCoordinate(myOlMap, [itemData.longitude, itemData.latitude]);

  // 只显示一个Feature暂时使用此方案
  mapUtils.removeAllLayer(myOlMap); // 移除所有图层

  if (renderFeature) {
    renderFeature(olMap, [itemData]);
  }

  // 检索到当前要素
  setTimeout(() => {
    // 获取所有图层
    mapUtils.getAllFeature(olMap, (featureItem) => {
      let featureData = {};

      switch (featureItem.get("type")) {
        case "Marker":
          featureData = featureItem.get("pointData");
          break;
        case "Curve":
          featureData = featureItem.get("curveData");
          break;
      }

      if (featureData.cgi === itemData.cgi) {
        currentSingleObjData.value = { featureData, featureItem };
      }
    });
  }, 1000);

  // 将经纬度转换为屏幕坐标
  const pixelPoint = transformToPixelPoint(
    itemData.longitude,
    itemData.latitude
  );

  // 展示气泡窗
  mapUtils.setAutoPopup(pixelPoint, itemData, (popupObj) => {
    if (arrData) {
      popupObj.popupData = arrData
      popupObj.noFeature = true
    } else {
      let popupBack = document.querySelector(`#popupBack`)
      if (popupBack) {
        // 判断是否有返回图标,有则删除
        popupBack.remove();
      }
    }
    mapUtils.popupCommonConfig(
      olMap,
      pixelPoint,
      arrData ? popupInner.featuresPopupInner(popupObj) : popupInner.commonPopupInner(popupObj),
      (e) => {
        const { target } = e; // 事件对象

        // 点击气泡窗获取更多
        if (target.getAttribute("data-function") === "getMore") {
          /* if (JSON.stringify(gisStoreData.currentPopupData) !== '{}') {
            itemData.currentPopupData = gisStoreData.currentPopupData
          } else {
            itemData.currentPopupData = popupObj.popupData
          } */

          mittBus.emit("popupDataGetMore", {
            currentPopupObj: itemData,
            callback: (popupData) => {
              // console.log(popupData);

              mittBus.emit("showPopupDialog", popupData)
            },
          });
        }

        // 点击唯一标识显示具体气泡信息
        if (target.getAttribute("data-function") === "getSingleByFeatures") {
          mittBus.emit("getSingleByFeatures", { unique: target.getAttribute("data-unique").trim(), itemData });
        }

        // 返回
        // 点击popupDom返回
        if (target.getAttribute("data-function") === "popupBack") {
          mittBus.emit("popupBack");
        }
      }
    );
  });
};

/**
 * 接收其他组件派发的方法
 */
// 根据不同token初始化地图
mittBus.on("initOlMapByToken", () => {
  resetOlMap()  // 初始化地图
});
/**
 * 刷新地图
 * 各个组件如果需要刷新地图通过派发组件,最终到这个文件里面去做最终地图的刷新
 * resetFlag true 不带任何条件查询,查全部
 */
mittBus.on("reflashMap", (resetFlag) => {
  // console.log("刷新地图", resetFlag);

  // 判断是否需要带条件
  if (
    Boolean(resetFlag) &&
    myOlMap.getView().getZoom() > mapUtils.minRenderZoom
  ) {
    // 如果需要带条件,需要出发点全局派发事件去修改按钮dom
    mittBus.emit("resetBtn");
  }

  mapUtils.removeByReflashMap(myOlMap)  // 刷新地图需要移除的元素

  // 最终的刷新需要自组件派发事件到父组件完成派发
  emit("reflashMap", resetFlag, () => {
    nextTick(() => {
      setTimeout(() => {
        // 刷新完成之后,需要对检索到的数据去做定位
        if (!objIsEmpty(currentSingleObjData.value)) {
          // console.log("当前有检索条件", currentSingleObjData.value);

          let { featureData, featureItem } = currentSingleObjData.value;
          // console.log(featureItem);

          // 置顶图层
          mapUtils.featureToMaxTop(myOlMap, featureItem);
        }
      }, 1000);
    });
  });
});

// 删除所有绘制内容并取消状态 - 取消绘制(点线面)
mittBus.on("cancelDrawInteraction", () => {
  // console.log('drawPolygon')

  // 根据条件移除要素
  mapUtils.removeByCondition(myOlMap, currentFeature => {
    return currentFeature.get('drawType')
  })

  mapUtils.cancelDrawInteraction(myOlMap); // 绘制多边形
});

// 绘制多边形
mittBus.on("drawPolygon", () => {
  // console.log('drawPolygon')

  mapUtils.drawPolygon(myOlMap); // 绘制多边形
});

// 取消绘制多边形
mittBus.on("cancelPolygon", () => {
  // console.log('取消绘制多边形')

  mapUtils.cancelPolygon(myOlMap); // 绘制多边形
});

// 绘制圆形
mittBus.on("drawCircle", () => {
  // console.log('绘制圆形')

  mapUtils.drawCircle(myOlMap); // 绘制圆形
});

// 取消绘制圆形
mittBus.on("cancelCircle", () => {
  // console.log('取消绘制圆形')
});

// 测距
mittBus.on("testDistance", (next) => {
  // console.log("测距");

  // 测距
  mapUtils.testDistance(myOlMap, next);
});

// 取消测距
mittBus.on("cancelTestDistance", () => {
  // console.log("取消测距");

  mapUtils.cancelTestDistance(myOlMap); // 取消测距
});

// 切换天地图token
mittBus.on("showSetTokenDialog", () => {
  refSetTokenDialog.value?.show();
})

/**
 * menu方法接收
 */
// 显示当前要素信息
mittBus.on("singleFeaturesClick", ({ feature, pixelPoint }) => {
  // console.log("显示当前要素信息", feature, pixelPoint);

  if (props.currentPageType === "complain") {
    emit("setCircleDialogData", feature);

    return;
  }
  // 点击单个feature - map - click事件
  singleFeaturesClick(myOlMap, feature, pixelPoint);
});

/**
 * 地图工具方法
 */
// 地图事件
const mapEvent = (olMap) => {
  // 监听鼠标移动事件
  olMap.on("pointermove", (e) => {
    // 鼠标移动到feature区域时变为手形
    let pixel = olMap.getEventPixel(e.originalEvent);
    let hit = olMap.hasFeatureAtPixel(pixel);
    olMap.getTargetElement().style.cursor = hit ? "pointer" : "";

    currentLonlat.value = mapUtils.transformToLonlat(e.coordinate);
  });

  // 监听鼠标单击事件
  olMap.on("singleclick", (e) => {
    // console.log("点击地图", mapUtils.transformToLonlat(e.coordinate));

    // 判断当前是否为绘制状态
    if (mapUtils.getDrawInteraction(olMap)) {
      return
    }

    // 点击地图隐藏气泡窗
    refPopupCommon.value.hidePopup();

    // 点击地图隐藏右键菜单
    mapUtils.resetContextMenu();

    // const pixelPoint = e.coordinate; // 屏幕坐标
    let pixel = olMap.getEventPixel(e.originalEvent);
    let featureList = olMap.getFeaturesAtPixel(pixel); // 点击时获取所有features
    // console.log('wwww', featureList)

    const currentShapeFeature = (shape) => {
      return featureList.filter((item) => item.get("type") === shape);
    };

    const judgeShape = (shape) => {
      return JSON.stringify(currentShapeFeature(shape)) !== "[]";
    };

    // 在选区中点击时触发
    const innerClick = () => {
      // 图形中的要素
      let pointFeatureList = (currentShapeFeature("Marker")[0] || currentShapeFeature("Curve")[0])

      // 如果只有2个要素
      if (featureList.length === 2) {
        // 是标注
        if (pointFeatureList && pointFeatureList.get("type")) {
          singleFeaturesClick(myOlMap, pointFeatureList, e.coordinate);
        }
      } else {
        refPopupCommon.value.setFeaturesPopup(
          olMap,
          e.coordinate,
          featureList
        );
      }
    }

    // 如果feature数组存在(不为空)
    if (featureList) {
      // console.log("featureList", featureList);

      // 点击单个feature
      if (featureList.length === 1) {
        // console.log("无重叠,单个feature", featureList);

        // refPopupCommon.value.showPopup(); // 需要气泡时弹出

        // 不显示气泡窗的要素禁止弹窗
        if (currentShapeFeature("Circle").length !== 0) {
          refPopupCommon.value.hidePopup();
        }

        // 点击单个feature - map - click事件
        singleFeaturesClick(olMap, featureList[0], e.coordinate);
      }

      // 多个feature
      if (featureList.length > 1) {
        // console.log("有重叠,多个feature", featureList);

        // console.log(currentShapeFeature("Circle"))

        // 如果存在聚合
        if (judgeShape("Cluster")) {
          // 点击地图隐藏气泡窗
          refPopupCommon.value.hidePopup();
          // console.log(featureList)
          singleFeaturesClick(olMap, featureList[0], e.coordinate);
        }

        // 点击时需要显示标注的选区
        if (judgeShape("Circle") || judgeShape("Polygon")) {
          innerClick()
        }

        // 如果重叠区存在圆形
        if (judgeShape("Circle")) {
          // console.log('点击圆区域内要素', featureList)

          /* if (pointFeatureList.get("bussinessType") === "analysisMarker") {
            return
          } */
        } else if (judgeShape("Polygon")) {
          // console.log('点击多边形区域内要素', featureList)
          /* let featureItem = featureList.filter(
            (item) => item.get("type") === "Polygon"
          );
          setPolygonDialogData(featureItem[0]); */
        } else {
          // 点击扇形弹出气泡
          if (
            featureList[0].get("type") === "Curve" ||
            featureList[0].get("type") === "Marker"
          ) {
            // refPopupCommon.value.showPopup(); // 需要气泡时弹出
            refPopupCommon.value.setFeaturesPopup(
              olMap,
              e.coordinate,
              featureList
            );
          }
        }
      }
    }
  });

  // 监听鼠标拖动地图事件
  olMap.on("moveend", (e) => {
    // console.log('拖拽移动触发事件', e)

    let view = myOlMap.getView();
    let zoom = view.getZoom();
    currentZoomLevel.value = zoom.toFixed(2);
    // console.log("当前缩放级别为：", zoom, mapUtils.minRenderZoom);

    // 获取当前中心点坐标
    let center = view.getCenter();
    mittBus.emit("getCurrentCenter", mapUtils.transformToLonlat(center));

    mittBus.emit("getCurrentZoom", {
      zoom,
      minRenderZoom: mapUtils.minRenderZoom,
    });

    if (props.isAutoRenderData) {
      // console.log('移动加载地图', props.isAutoRenderData)
      mapUtils.removeAllDefaultLayer(olMap)  // 移除默认要素
      emit("getCurrentViewData", olMap); // 刷新地图
    }
  });
};

// 点击单个feature - map - click事件
const singleFeaturesClick = (olMap, featureItem, pixelPoint) => {
  // console.log("无重叠,单个feature", featureItem, featureItem.get("type"));

  if (featureItem && featureItem.get('drawType') && mapUtils.getDrawInteraction(olMap)) {
    return
  }

  let popupData = null;

  // 点击聚合
  if (featureItem && featureItem.get("type") === "Cluster") {
    refPopupCommon.value.hidePopup();

    let clusterFeatureList = featureItem.get('features')

    if (clusterFeatureList.length === 1) {
      popupData = clusterFeatureList[0].get("pointData");
      refPopupCommon.value.setCommonPopup(olMap, pixelPoint, popupData, clusterFeatureList[0]);

      return
    }

    const extent = boundingExtent(
      clusterFeatureList.map((r) => r.getGeometry().getCoordinates())
    );
    console.log(extent)
    olMap
      .getView()
      .fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });

    /* console.log(mapUtils.getLayerByFeature(olMap, featureItem))

    let currentLayer = mapUtils.getLayerByFeature(olMap, featureItem)

    currentLayer.getFeatures(pixelPoint).then(clickedFeatures => {
      console.log(clickedFeatures)
    }) */


    /* olMap.getAllLayers().forEach((item, index) => {
      if (item.get('type') === 'clusterLayer') {
        console.log(item)
      }
    }) */
  }

  // 点击点标注
  if (featureItem && featureItem.get("type") === "Marker") {
    // console.log('Marker点标注', featureItem);

    popupData = featureItem.get("pointData");
    // console.log('获取点标注数据', popupData)

    refPopupCommon.value.setCommonPopup(olMap, pixelPoint, popupData, featureItem);
  }

  // 点击扇形区域
  if (featureItem && featureItem.get("type") === "Curve") {
    // console.log('点击扇形区域', featureItem);

    popupData = featureItem.get("curveData");
    // console.log('获取扇形区数据', popupData)

    refPopupCommon.value.setCommonPopup(olMap, pixelPoint, popupData);
  }

  // 点击圆形区域
  if (featureItem && featureItem.get("type") === "Circle") {
    // console.log("点击圆形区域", featureItem);

    setCircleDialogData(featureItem);
  }

  // 点击多边形
  if (featureItem && featureItem.get("type") === "Polygon") {
    // console.log("点击多边形", featureItem.get("polygonData"));

    const polygonData = featureItem.get("polygonData");

    // 网格
    if (featureItem.get('businessType') === "grid") {
      // console.log("点击网格数据", polygonData);
      // return;
    }

    // 弹出多边形数据
    setPolygonDialogData(featureItem);
  }
};

// 点击圆形区域获取数据
const setCircleDialogData = (feature) => {
  let circleData = feature.get('circleData')
  // console.log(circleData)

  mittBus.emit("setCircleDialogData", circleData);
};

// 弹出多边形数据
const setPolygonDialogData = (featureItem) => {
  const { coords, lonlat, name } = featureItem.get("polygonData");

  mittBus.emit("setPolygonDialogData", { lonlat, name });
};

/**
 * 地图方法供出
 */

// 获取可视区域坐标
const getCurrentViewPosition = (olMap) => {
  return mapUtils.getCurrentViewPosition(olMap);
};

// 屏幕坐标转换
const transformToPixelPoint = (lon, lat) => {
  return mapUtils.transformToPixelPoint(lon, lat)
}

// 添加圆
const addCircle = (olMap, item, circleConfig = {}, isFlicker, isHide) => {
  mapUtils.addCircle(olMap, item, circleConfig, isFlicker, isHide);
};

// 添加闪烁点
const addFlickerPoint = (olMap, pixelPoint, className, next) => {
  mapUtils.addFlickerPoint(olMap, pixelPoint, className, next);
}

// 加载kml
const loadKML = (olMap, text) => {
  mapUtils.loadKML(olMap, text);
};

// 移除所有图层
const removeAllLayer = (olMap) => {
  // console.log(olMap, type);

  mapUtils.removeAllLayer(olMap);
};

// 根据类型移除图层
const removeLayerByType = (olMap, type) => {
  // console.log(olMap, type);

  mapUtils.removeLayerByType(olMap, type); // 移除所有图层
};
// 根据业务类型移除图层
const removeLayerByBusinessType = (olMap, type) => {
  // console.log(olMap, type);

  mapUtils.removeLayerByBusinessType(olMap, type); // 移除所有图层
};

// 批量添加点
const addPoint = (olMap, pointList, src, pointConfig = {}, zIndex) => {
  mapUtils.addPoint(olMap, pointList, src, pointConfig, zIndex);
};

// 点聚合
const setCluster = (olMap, dataList, src) => {
  mapUtils.setCluster(olMap, dataList, src);
};

// 移除所有默认图层
const removeAllDefaultLayer = (olMap) => {
  mapUtils.removeAllDefaultLayer(olMap);
}

// 设置 Features 样式
const setFeaturesStyle = (fillColor, strokeColor) => {
  return mapUtils.setFeaturesStyle(fillColor, strokeColor);
};

// 批量添加扇形
const addCurve = (olMap, pointList, isResetStyle) => {
  if (isResetStyle) {
    mapUtils.addCurve(olMap, pointList, (item) => {
      return isResetStyle(item);
    });
  } else {
    mapUtils.addCurve(olMap, pointList);
  }
};

const flyToCoordinate = (OlMap, lonlat) => {
  mapUtils.flyToCoordinate(OlMap, lonlat);
};

// 创建多边形
const createPolygon = (olMap, { coords, lonlat, polygonData }, polygonConfig, next, style) => {
  mapUtils.createPolygon(olMap, { coords, lonlat, polygonData }, polygonConfig, next, style);
};

// 创建文字图层
const addTextPoint = (olMap, text, position, businessType, textOverlayConfig = {}, isRemove) => {
  mapUtils.addTextPoint(olMap, text, position, { businessType, ...textOverlayConfig }, isRemove);
};

// 获取多边形中心点
const getPolygonCenter = (feature) => {
  return mapUtils.getPolygonCenter(feature);
};

// 添加带箭头的线
const addArrowLine = (olMap, position, src, businessType) => {
  mapUtils.addArrowLine(olMap, position, src, businessType)
}

// 初始化地图
const resetOlMap = () => {
  if (env !== 'development') {
    let timer = setTimeout(() => {
      router.push('/map/openlayer/openlayer-gd')
      clearTimeout(timer)
    }, 5000);
  }
  // console.log("地图初始化");
  /* if (myOlMap) {
    mapUtils.destroyMap(myOlMap)
  } */
  destroyMap(myOlMap)

  const olMap = mapUtils.initOlMap("olMap"); // 初始化地图

  mapInit(olMap); // 地图加载完初始化做的一些操作
  getMapInitInfo(olMap); // 地图加载完初始化后获取地图的一些信息
  setOlmap(olMap); // 设置地图

  // console.log("地图加载完成");
}

// 销毁地图
const destroyMap = (olMap) => {
  if (olMap) {
    mapUtils.destroyMap(olMap)
  }
}

/**
 * vue生命周期函数
 * 挂载后触发
 */
onMounted(() => {
  resetOlMap()  // 初始化地图
});

/**
 * 暴露方法
 */
defineExpose({
  renderFeatureByData, // 根据数据渲染Feature
  setMapByAutoPopupData, // 通过气泡数据设置地图

  // 地图方法供出
  getCurrentViewPosition, // 获取可视区域坐标
  transformToPixelPoint,  // 屏幕坐标转换
  addCircle, // 添加圆
  addFlickerPoint, // 添加闪烁点
  loadKML, // 加载kml
  removeAllLayer, // 移除所有图层
  removeLayerByType, // 根据类型移除图层
  removeLayerByBusinessType, // 根据业务类型移除图层
  addPoint, // 批量添加点
  setCluster,  // 点聚合
  removeAllDefaultLayer,  // 移除所有默认图层
  addCurve, // 批量添加扇形
  createPolygon, // 创建多边形
  flyToCoordinate, // 飞到指定的坐标
  setFeaturesStyle, // 设置 Features 样式
  addTextPoint, // 创建文字图层
  getPolygonCenter, // 获取多边形中心点
  addArrowLine,  // 添加带箭头的线
});
</script>

<style lang="scss">
$zoomMargin: 10em;

dl,
dt,
dd,
ul,
li,
p {
  margin: 0;
  padding: 0;
}

.ol_map_wrap {
  position: absolute;
  width: 98%;
  height: 100%;
  // min-width: 1250px;

  &.nav_ol_map {
    .ol_map {

      // 控件相关
      .ol-overlaycontainer-stopevent {
        .ol-scale-line {
          bottom: 76px;
        }
      }
    }
  }

  .ol_map {
    width: 100%;
    height: 100%;
    // overflow: hidden;

    .ol-overlaycontainer-stopevent {
      .ol-overlay-container {
        &:first-child {
          z-index: 1;
        }

        &:not(:first-child) {
          z-index: -999;
          pointer-events: none !important;
        }
      }
    }

    .flicker_point {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      background: rgba(255, 0, 0, 0.9);
      transform: scale(0);
      animation: flickerAnimation 3s;
      animation-iteration-count: infinite;
      cursor: pointer;

      &.complain_flicker_point {
        height: 75px;
        width: 75px;
      }
    }

    @keyframes flickerAnimation {
      to {
        transform: scale(2);
        background: rgba(255, 0, 0, 0.1);
      }
    }

    .ol-viewport {
      overflow: initial !important;
    }

    // 控件相关
    .ol-overlaycontainer-stopevent {
      // 全屏
      /* .ol-full-screen {
        position: absolute;
        top: -34px;
        right: 108px;
      } */

      // 缩放
      .ol-zoom,
      .ol-zoomslider {
        left: initial;
        right: 0.5em;
      }

      .ol-zoom {
        top: calc(0.5em + $zoomMargin);
      }

      .ol-zoomslider {
        top: calc(4.5em + $zoomMargin);
      }

      // 比例尺
      .ol-scale-line {
        position: absolute;
        // bottom: 76px;
        bottom: 38px;
        background: initial;
      }

      /* // 鹰眼
      .ol-overviewmap {
        position: absolute;
        left: 0;
        bottom: 20px;

        .ol-overviewmap-map {
          width: 100px;
          height: 100px;
        }
      } */
    }
  }
}

.menu_wrap {
  padding: 3px;
  max-height: 157px;
  background: rgba(255, 255, 255, 0.8);
  border: solid 1px #777777;
  border-radius: 5px;
  overflow: auto;

  ul {
    padding: 0;
    margin: 0;

    li {
      padding: 5px 10px;
      font-size: 12px;
      color: #000;
      border-radius: 3px 3px 0 0;
      cursor: pointer;
      transition: 0.3s linear;
      list-style-type: none;

      &:hover {
        color: #715f5f;
        background: rgba(128, 128, 128, 0.25);
        transition: 0.3s linear;
      }

      &:not(:last-child) {
        margin-bottom: 3px;
        border-bottom: solid 1px #b3b3b3;
      }
    }
  }
}

.overview_info_toggle {
  position: absolute;
  right: 9px;
  top: 45px;
  width: 25px;
  height: 25px;
  z-index: 1;
  background: url("./icon/expand.svg") center center no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
}

.copyright_info {
  position: absolute;
  left: 0;
  bottom: 10px;
  width: 100%;
  min-width: 800px;
  min-height: 20px;
  display: flex;
  justify-content: space-between;
  z-index: 1;
  background: #8a8888c4;
  overflow: hidden;

  p,
  dt,
  dd {
    height: 25px;
    line-height: 28px;
    font-size: 12px;
  }

  p {
    padding-left: 25px;
  }

  ul {
    padding-right: 25px;

    li {
      display: inline-block;

      &:first-child {
        dd {
          min-width: 350px;
        }
      }

      dl {

        dt,
        dd {
          display: inline-block;
        }
      }
    }
  }
}
</style>
