<template>
  <div id="popup" class="ol-popup popup_toggle" v-show="isShowPopup">
    <div class="popup_wrap">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content" class="popup-content"></div>
    </div>
  </div>

  <!-- 气泡详情弹窗 -->
  <!-- demo页面 -->
  <demo-popup-detail-dialog ref="refDemoPopupDetailDialog" />
</template>

<script setup lang="jsx">
// vue core
import { nextTick, ref, h, render } from "vue";
// map data
import * as popupInner from "./popupInner";
// map core
import * as mapUtils from "../../mapUtils.js";
// 组件传参
import mittBus from "@/utils/mittBus"; // mitt
// 组件
import DemoPopupDetailDialog from "@/views/map/openlayer/openlayer-tdt/demo/components/popup/DemoPopupDetailDialog.vue";

// 如果popup不设置overflow的话,会在左下角显示,这里在一开始进行隐藏
let isShowPopup = ref(false);
let currentPopupObj = {};

let refDemoPopupDetailDialog = ref(null);

// const { setCurrentPopupData } = gisDataStore()

const props = defineProps({
  currentPageType: {
    type: String,
    default: "",
  },
});

/**
 * 接收其他组件派发的方法
 */
// 显示气泡弹出窗
mittBus.on("showPopupDialog", (popupData) => {
  // console.log(popupData, props.currentPageType);
  showPopupDialog(popupData, props.currentPageType); // 显示气泡弹出窗
});
// 点击唯一标识显示具体气泡信息
mittBus.on("getSingleByFeatures", ({ unique, itemData }) => {
  // console.log('点击唯一标识显示具体气泡信息', unique, itemData);

  let uniqueArr = unique.split(':')

  const { arrData } = itemData
  currentPopupObj.arrData = arrData

  arrData.forEach(item => {
    if (item[uniqueArr[0]] === uniqueArr[1]) {
      currentPopupObj.currentPopupData = item

      popupInner.commonPopupInner(currentPopupObj)
      setPopupBackDom(currentPopupObj)
    }
  })
});
// 点击popupDom返回
mittBus.on("popupBack", () => {
  // popupObj.popupData = arrData
  currentPopupObj.popupData = currentPopupObj.arrData
  currentPopupObj.noFeature = true
  popupInner.featuresPopupInner(currentPopupObj)
  // popupBack();
});

// 设置返回气泡窗返回dom
const setPopupBackDom = (inner) => {
  let content = document.getElementById("popup-content");
  popupInner.commonPopupInner(inner)  // jsx不需要赋值

  const backDom = document.createElement("b");
  backDom.setAttribute("data-function", "popupBack");
  backDom.setAttribute("id", "popupBack");
  backDom.setAttribute("title", "返回");
  backDom.innerHTML = "";
  content.appendChild(backDom);
}

// 显示气泡弹出窗
const showPopupDialog = (popupData, currentPageType) => {
  console.log(popupData, currentPageType);

  // 弹出相对应气泡窗
  switch (currentPageType) {
    case "demo":
      nextTick(() => {
        refDemoPopupDetailDialog.value.show(popupData);
      });
      break;
  }
};

const showPopup = () => {
  isShowPopup.value = true;
};

const hidePopup = () => {
  isShowPopup.value = false;
};

// 通用信息展示弹窗
const setCommonPopup = (olMap, pixelPoint, popupData, featureItem) => {
  // console.log("点击标注弹出气泡", olMap, popupData, featureItem);

  // 判断是否有返回图标,有则删除 - 不为业务气泡窗不删除
  let popupBackDom = document.querySelector(`#popupBack`)
  if (popupBackDom) {
    if (featureItem && !featureItem.get('businessType')) {
      popupBackDom.remove();
    }
  }

  // 经纬度
  let coordinate = mapUtils.transformToLonlat(pixelPoint);
  // 点击尺 （这里是尺(米)，并不是经纬度）;
  let hdms = mapUtils.getHdms(pixelPoint); // 转换为经纬度显示

  const popupObj = {
    name: "通用信息展示弹窗",
    hdms,
    coordinate,
    popupData, // 气泡窗业务数据
  };
  currentPopupObj = popupObj;

  // 修改通用展示窗数据 - 子组件使用
  mittBus.emit("fixCommonPopupData", popupObj);

  mapUtils.setPopup(
    olMap,
    pixelPoint,
    popupInner.commonPopupInner(popupObj, featureItem),
    (event) => {
      popupClickEvent(event);
    }
  );
};

// 点击多个feature弹出气泡
const setFeaturesPopup = (olMap, pixelPoint, popupData) => {
  // console.log("点击多个feature弹出气泡", olMap);
  // console.log(popupData)

  // 经纬度
  let coordinate = mapUtils.transformToLonlat(pixelPoint);
  // 点击尺 （这里是尺(米)，并不是经纬度）;
  let hdms = mapUtils.getHdms(pixelPoint); // 转换为经纬度显示

  let popupTypeArr = [];
  popupData.forEach((item) => {
    switch (item.get("type")) {
      case "Marker":
        popupTypeArr.push("标注点");
        break;
      case "Curve":
        popupTypeArr.push("扇区");
        break;
    }
  });

  const popupObj = {
    name: popupTypeArr.length + "个重叠要素",
    type: Array.from(new Set(popupTypeArr)).join(","), // 去重转字符串以逗号隔开
    hdms, // 经纬度
    coordinate, // 坐标
    popupData, // 窗口业务数据 - 这里指所有的feature
  };
  //   console.log(hdms);
  currentPopupObj = popupObj;

  mapUtils.setPopup(
    olMap,
    // e.coordinate,
    pixelPoint,
    popupInner.featuresPopupInner(popupObj, (currentDataList) => {
      // console.log("输出业务数据", currentDataList);

      currentPopupObj.currentDataList = currentDataList;
    }),
    (event) => {
      popupClickEvent(event);
    }
  );
};

// 气泡弹出窗点击事件
const popupClickEvent = async (e) => {
  // console.log("气泡弹出窗点击事件", e)

  const { target } = e; // 事件对象
  // console.log("点击气泡窗返回气泡窗中的dom对象", target);

  // 当前dom绑定的函数
  let dataFunction = target.getAttribute("data-function");

  // 点击气泡窗获取更多
  if (dataFunction === "getMore") {
    getMore();
  }

  // 点击唯一标识显示具体气泡信息
  if (dataFunction === "getSingleByFeatures") {
    // console.log(target.getAttribute("data-unique"));

    getSingleByFeatures(target.getAttribute("data-unique"));
  }

  // 点击popupDom返回
  if (dataFunction === "popupBack") {
    popupBack();
  }
};

// 点击唯一标识显示具体气泡信息
const getSingleByFeatures = (unique) => {
  // console.log("点击唯一标识显示具体气泡信息", unique);

  if (!unique) {
    return
  }

  // console.log(currentPopupObj)
  let uniqueArr = unique.split(':')

  const getObjData = (item, type) => {
    if (item.get('noPopup')) {
      return
    }

    if (item.get(type)[uniqueArr[0]] === uniqueArr[1]) {
      currentPopupObj.currentPopupData = item.get(type)
      return item
    }
  }

  currentPopupObj.currentPopupFeature = currentPopupObj.popupData.filter(item => {
    switch (item.get('type')) {
      case 'Marker':
        return getObjData(item, 'pointData')
      case 'Curve':
        return getObjData(item, 'curveData')
    }
  })
  // console.log(currentPopupObj.currentPopupFeature, currentPopupObj.currentPopupData)

  setPopupBackDom(currentPopupObj, currentPopupObj.currentPopupFeature[0])
};

// 点击popupDom返回
const popupBack = () => {
  if (currentPopupObj.popupData instanceof Array) {
    popupInner.featuresPopupInner(currentPopupObj)
  }
};

// 点击气泡窗获取更多
const getMore = () => {
  // 气泡窗点击更多 - 子组件使用
  // console.log('气泡窗点击更多 - 子组件使用', currentPopupObj)
  mittBus.emit("popupDataGetMore", {
    currentPopupObj,
    callback: (popupData) => {
      // console.log(popupData);

      // 获取完数据后进行弹窗
      showPopupDialog(popupData, props.currentPageType); // 显示气泡弹出窗
    },
  });
};

/**
 * 暴露方法 - 供父组件执行
 */
defineExpose({
  showPopup,
  hidePopup,
  setCommonPopup,
  setFeaturesPopup,
});
</script>

<style lang="scss" scoped>
// $popupBg: rgba(111, 168, 247, 0.8);
$popupBg: rgba(255, 255, 255, 0.8);

.ol-popup {
  position: absolute;
  left: -50px;
  bottom: 12px;
  padding: 15px;
  background: $popupBg;

  .popup_wrap {
    margin-top: 10px;
    min-height: 20px;
    overflow: auto;
  }

  &::after,
  &::before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .ol-popup:after {
    border-top-color: $popupBg;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }

  &::before {
    border-top-color: $popupBg;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }

  .ol-popup-closer {
    position: absolute;
    top: 3px;
    right: 6px;
    width: 10px;
    height: 10px;
    cursor: pointer;

    &::after {
      content: "✖";
    }
  }

  /**
     * 此处开始气泡窗内容样式
     */
  ::v-deep(.popup-content) {
    margin-right: 8px;
    margin-top: 5px;

    p,
    span,
    h3,
    li,
    dt,
    dd {
      font-size: 12px;
      color: #514b4b;
    }

    // 重叠feature气泡窗样式
    ul.features_top {
      li {
        margin-bottom: 5px;
        // color: #494949;
        color: #222222;
      }
    }

    .feature_item {
      margin-bottom: 10px;
      padding: 6px;
      transition: 0.2s linear;
      border-bottom: dashed 1px #707070;
      border-radius: 3px 3px 0 0;
      cursor: pointer;

      &:hover {
        background: rgb(193 231 254 / 80%);
        transition: 0.3s linear;
      }

      span {
        display: block;
        margin-bottom: 3px;
      }

      dl {
        margin-bottom: 2px;

        dt,
        dd {
          display: inline-block;
        }
      }
    }

    .common_simple_popup_item,
    .common_popup_item {
      &+b {
        position: absolute;
        top: 4px;
        left: 8px;
        width: 17px;
        height: 20px;
        background: url("../../icon/back.svg") center center no-repeat;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }

    .common_simple_popup_item {
      min-width: 88px;
      max-width: 300px;
    }

    .common_features_popup_item {
      position: relative;
      min-width: 400px;
      max-height: 260px;
    }

    // 通用气泡窗样式
    .common_popup_item {
      position: relative;

      min-width: 400px;
      max-height: 260px;

      // background: #f00;
      h3 {
        font-size: 15px;
        margin-bottom: 10px;
        color: #494949;
      }

      ul {
        li {
          margin-bottom: 6px;

          dl {

            dt,
            dd {
              display: inline-block;
            }

            dt {
              font-weight: bold;
              margin-right: 5px;
              font-size: 13px;
            }
          }
        }
      }

      span.get_more {
        position: absolute;
        // right: -5px;
        left: 50%;
        transform: translateX(-50%);
        bottom: -33px;
        padding: 6px 10px;
        background: #70b5fa;
        color: #fff;
        border-radius: 6px;
        transition: 0.2s linear;
        cursor: pointer;

        &:hover {
          background: #2c94fe;
          transition: 0.3s linear;
        }
      }
    }
  }
}
</style>
