<template>
  <openlayer-base-map class="empty_map" ref="refOpenlayerBaseMap" :isShowLend="true" :isControlOverviewInfo="true"
    :currentPageType="'demo'" @getOlMapInstance="getOlMapInstance" @getCurrentViewData="getCurrentViewData"
    @toggleOverviewInfo="toggleOverviewInfo">

    <!-- 搜索组件 -->
    <map-search />

    <!-- 右侧信息 - 健康度概览 -->
    <overview-info v-show="isShowHealthOverview" />
  </openlayer-base-map>
</template>

<script setup>
// vue - core
import { ref, getCurrentInstance, onUnmounted } from "vue";
// 工具
import mittBus from "@/utils/mittBus"; // mitt - 组件传参工具
import { getPopupInnerDom, getPOIPopupInnerDom, getFeaturesPopupInnerDom, getNoFeaturesPopupInnerDom } from "./components/popup/DemoPopup.jsx"; // 气泡窗dom
// 组件
import OpenlayerBaseMap from "@/components/OpenlayerBaseMapTDT/index.vue";

import MapSearch from "./components/map-search/index.vue"; // 搜索组件
import OverviewInfo from "./components/OverviewInfo.vue"; // 健康度概览

import list from "./data/list.json";

const refOpenlayerBaseMap = ref(null); // 地图核心元素
const { proxy } = getCurrentInstance();

let myOlMap = null;
let myMapCommonData = null;

let currentRenderType = "频率"; // 当前渲染方式

let isShowHealthOverview = ref(true)

/**
 * 接收其他组件派发的方法
 */
/**
 * 气泡窗
 */
//  修改通用展示窗数据
mittBus.on("fixCommonPopupData", (popupObj) => {
  // console.log("修改通用展示窗数据", popupObj);

  switch (popupObj.popupData.networkType) {
    case "4g":
      popupObj.popupData.newCellName = popupObj.popupData.cellName;
      break;
    case "5g":
      popupObj.popupData.newCellName = popupObj.popupData.nrCellName;
      break;
  }
});
// 设置通用气泡窗html
mittBus.on("setCommonPopupInner", ({ popupObj, featureItem, callback }) => {
  // console.log("设置通用气泡窗html", popupObj, featureItem);

  if (!featureItem) {
    let currentPopupData = popupObj.currentPopupData
    if (!currentPopupData) {
      currentPopupData = popupObj.popupData
    }
    if (currentPopupData.searchType === 'POI') {
      callback(getPOIPopupInnerDom(popupObj));
      return
    }
    callback(getPopupInnerDom(popupObj));
    return
  }

  if (featureItem.get('businessType') === 'POIMarker') {
    callback(getPOIPopupInnerDom(popupObj));
    return
  }
  callback(getPopupInnerDom(popupObj));
});
// 设置重叠要素气泡窗html
mittBus.on('setFeaturesPopupInner', ({ popupObj, callback, next }) => {
  // console.log(popupObj, callback, next)

  if (!popupObj.noFeature) {
    callback(getFeaturesPopupInnerDom(popupObj, currentDataList => {
      next(currentDataList)
    }));
  } else {
    callback(getNoFeaturesPopupInnerDom(popupObj, currentDataList => {
      // console.log(currentDataList)
      next(currentDataList)
    }));
  }
})
//  气泡窗点击更多 - 子组件使用
mittBus.on("popupDataGetMore", async ({ currentPopupObj, callback }) => {
  // console.log("气泡窗点击更多", currentPopupObj);

  if (!currentPopupObj.currentPopupData && currentPopupObj.popupData) {
    currentPopupObj.currentPopupData = currentPopupObj.popupData
  }

  // 或者走接口,根据cgi获取详情
  // ......

  // 获取完数据后进行弹窗
  callback(currentPopupObj.currentPopupData);
});

// 根据数据渲染Feature
const renderFeatureByData = (olMap, dataList) => {
  // console.log("根据数据渲染Feature", dataList);
  refOpenlayerBaseMap.value.renderFeatureByData(
    olMap,
    dataList,
    (olMap, item) => {
      if (item.coverType === "室内") {
        let innerPoint = [];
        innerPoint = {
          lonlat: [item.longitude, item.latitude],
          pointData: item,
        };

        refOpenlayerBaseMap.value.addPoint(olMap, innerPoint);
      }

      if (item.coverType === "室外") {
        // console.log(item.workFrequency)

        let outPoint = [];
        outPoint.push({
          lonlat: [item.longitude, item.latitude],
          // 需要有antDirectionAngle字段
          curveData: item,
        });
        // 批量添加扇形
        refOpenlayerBaseMap.value.addCurve(olMap, outPoint, (item) => {
          return renderCurveByField(item.curveData);
        });
      }
    }
  );
};

// 根据字段渲染扇形
const renderCurveByField = (curveData, optity = 0.4) => {
  switch (currentRenderType) {
    case "频率":
      return renderCurveByFrequency(curveData, (optity = 0.4));
    case "健康度":
      return renderCurveByHealth(curveData, (optity = 0.4));
  }
};

// 根据频率渲染扇形
const renderCurveByFrequency = (curveData, optity = 0.4) => {
  // console.log("根据频率渲染扇形");

  let myCurveStyle = null; // 扇区样式
  let myStrokeColor = "rgba(255, 205, 67, 0.3)";
  let myCurveRadius = 0; // 扇区半径

  /**
   * 根据频率获取数据
   *
   * A频段  100  填充: rgba(200, 22, 100, 0.4)   线:
   * D频段  110  填充: rgba(55, 33, 188, 0.4)   线:
   * E频段  120  填充: rgba(88, 99, 200, 0.4)   线:
   * F频段  130  填充: rgba(255, 255, 0, 0.4)   线:
   * FDD  140   填充:  rgba(255, 76, 127, 0.4)  线:
   * 其他  150  填充:  rgba(32, 222, 230, 0.4)   线 : rgba(255, 205, 67, 0.3)
   */
  switch (curveData.workFrequency) {
    case "A频段":
      myCurveStyle = refOpenlayerBaseMap.value.setFeaturesStyle(
        `rgba(200, 22, 100, ${optity})`,
        myStrokeColor
      );
      myCurveRadius = 100;
      break;
    case "D频段":
      myCurveStyle = refOpenlayerBaseMap.value.setFeaturesStyle(
        `rgba(55, 33, 188, ${optity})`,
        myStrokeColor
      );
      myCurveRadius = 110;
      break;
    case "E频段":
      myCurveStyle = refOpenlayerBaseMap.value.setFeaturesStyle(
        `rgba(88, 99, 200, ${optity})`,
        myStrokeColor
      );
      myCurveRadius = 120;
      break;
    case "F频段":
      myCurveStyle = refOpenlayerBaseMap.value.setFeaturesStyle(
        `rgba(255, 255, 0, ${optity})`,
        myStrokeColor
      );
      myCurveRadius = 130;
      break;
    case "FDD":
      myCurveStyle = refOpenlayerBaseMap.value.setFeaturesStyle(
        `rgba(255, 76, 127, ${optity})`,
        myStrokeColor
      );
      myCurveRadius = 140;
      break;
    default:
      myCurveStyle = refOpenlayerBaseMap.value.setFeaturesStyle(
        `rgba(32, 222, 230, ${optity})`,
        myStrokeColor
      );
      myCurveRadius = 150;
      break;
  }

  return { myCurveStyle, myCurveRadius };
};

// 根据健康度渲染扇形
const renderCurveByHealth = (curveData, optity = 0.4) => {
  // console.log("根据健康度渲染扇形");

  let myCurveStyle = null; // 扇区样式
  let myStrokeColor = "rgba(255, 205, 67, 0.3)";
  let myCurveRadius = 0; // 扇区半径

  /**
   * 根据频率获取数据
   *
   * A频段  100  填充: rgba(200, 22, 100, 0.4)   线:
   * D频段  110  填充: rgba(55, 33, 188, 0.4)   线:
   * E频段  120  填充: rgba(88, 99, 200, 0.4)   线:
   * F频段  130  填充: rgba(255, 255, 0, 0.4)   线:
   * FDD  140   填充:  rgba(255, 76, 127, 0.4)  线:
   * 其他  150  填充:  rgba(32, 222, 230, 0.4)   线 : rgba(255, 205, 67, 0.3)
   */
  switch (curveData.workFrequency) {
    case "A频段":
      myCurveStyle = refOpenlayerBaseMap.value.setFeaturesStyle(
        `rgba(200, 22, 100, ${optity})`,
        myStrokeColor
      );
      myCurveRadius = 100;
      break;
    case "D频段":
      myCurveStyle = refOpenlayerBaseMap.value.setFeaturesStyle(
        `rgba(55, 33, 188, ${optity})`,
        myStrokeColor
      );
      myCurveRadius = 110;
      break;
    case "E频段":
      myCurveStyle = refOpenlayerBaseMap.value.setFeaturesStyle(
        `rgba(88, 99, 200, ${optity})`,
        myStrokeColor
      );
      myCurveRadius = 120;
      break;
    case "F频段":
      myCurveStyle = refOpenlayerBaseMap.value.setFeaturesStyle(
        `rgba(255, 255, 0, ${optity})`,
        myStrokeColor
      );
      myCurveRadius = 130;
      break;
    case "FDD":
      myCurveStyle = refOpenlayerBaseMap.value.setFeaturesStyle(
        `rgba(255, 76, 127, ${optity})`,
        myStrokeColor
      );
      myCurveRadius = 140;
      break;
    default:
      myCurveStyle = refOpenlayerBaseMap.value.setFeaturesStyle(
        `rgba(32, 222, 230, ${optity})`,
        myStrokeColor
      );
      myCurveRadius = 150;
      break;
  }

  return { myCurveStyle, myCurveRadius };
};

/**
* 业务方法
*/
// 获取地图实例 - 地图加载完初始化做的一些操作[业务相关]
const getOlMapInstance = (olMap, mapCommonData) => {
  // console.log("获取地图实例 - 地图加载完初始化做的一些操作[业务相关]", olMap);

  myOlMap = olMap; // 赋值全局变量,为后续业务操作做准备
  myMapCommonData = mapCommonData;

  // console.log(myOlMap, myMapCommonData)
};
// 获取可视区域数据 (主入口)
const getCurrentViewData = async (olMap) => {
  console.log('获取可视区域数据 (主入口)', olMap, getCurrentPositionParams(olMap))
  console.log('获取可视区域数据 (主入口)', list)

  const { cell4gList, cell5gList } = list.data;

  cell5gList.forEach((item) => {
    item.networkType = "5g";
  });

  console.log(cell4gList, cell5gList)

  renderFeatureByData(olMap, cell4gList);
  renderFeatureByData(olMap, cell5gList);

  // networkType
  // const
};

/**
* 工具方法
*/
// 显示隐藏概览
const toggleOverviewInfo = (val) => {
  // console.log('显示隐藏概览', val)

  isShowHealthOverview.value = val
}
// 获取可视区域坐标参数
const getCurrentPositionParams = (olMap) => {
  let viewPosition = refOpenlayerBaseMap.value.getCurrentViewPosition(olMap);
  // console.log("获取可视区域的左上角和右下角坐标", viewPosition)

  return {
    minLatitude: viewPosition.bottomRight[1],
    maxLatitude: viewPosition.topLeft[1],
    minLongitude: viewPosition.topLeft[0],
    maxLongitude: viewPosition.bottomRight[0],
  };
};
</script>