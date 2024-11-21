/**
 * 气泡窗管理
 * @param {*} popupObj 
 * @returns 
 */

// 工具
import mittBus from "@/utils/mittBus"; // mitt - 组件传参工具
import { render } from 'vue';  // jsx渲染到dom需要使用vue自带的render函数

const innerDom = () => {
    return document.querySelector('#popup-content')
}

// 通用气泡窗
export const commonPopupInner = (popupObj, featureItem) => {
    mittBus.emit('setCommonPopupInner', {
        popupObj, featureItem, callback: (popupInnerDom) => {
            // 使用jsx,不需要return,直接将jsx结构render到dom即可
            render(popupInnerDom, innerDom())
        }
    })
}

// 多个feature气泡窗
export const featuresPopupInner = (popupObj, next) => {
    // console.log('多个feature气泡窗', popupObj)

    let featureDataList = []
    // 设置重叠要素气泡窗html
    mittBus.emit('setFeaturesPopupInner', {
        popupObj, callback: (popupInnerDom) => {
            render(popupInnerDom, innerDom())
        }, next: currentDataList => {
            featureDataList = currentDataList
        }
    })

    if (next) {
        next(featureDataList)
    }
}

