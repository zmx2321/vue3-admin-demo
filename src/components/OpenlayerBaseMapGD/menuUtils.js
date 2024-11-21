/**
 * 维护右键菜单栏
 */

import { ElMessage } from 'element-plus'
import * as mapUtils from "./mapUtils.js";
import mittBus from "@/utils/mittBus"; // mitt
import { copyTextToClipboard } from "@/utils/index.ts";

// 菜单项
const menuMethodBtn = {
    // 公共选项,常驻菜单
    commonMenu: {
        // commonMenuMethod0: '地图功能测试',  // 公共选项0
        // commonMenuMethod01: '添加自定义标注点',  // 公共选项01
        // commonMenuMethod02: '添加自定义闪烁点',  // 公共选项02
        commonMenuMethod1: '拷贝当前经纬度',  // 公共选项1
        // commonMenuMethod2: '置顶要素',  // 公共选项2
        commonMenuMethod3: '切换天地图token',  // 公共选项3
    },
    // 公共动态选项,每个页面有需要才显示
    commonDynamicMenu: {
        commonDynamicMenuMethod1: '清除所有要素',  // 公共选项3
        commonDynamicMenuMethod2: '显示当前要素信息',  // 公共动态选项1
        commonDynamicMenuMethod3: '仅取消绘制状态',  // 公共动态选项3
        commonDynamicMenuMethod4: '展示分析结果',  // 公共动态选项4
        commonDynamicMenuMethod5: '删除所有绘制内容',  // 公共动态选项5
    },
    // 子页动态选项, 单页面显示或单页面有需要显示
    singleMenu: {
        singleMenuMethod1: '刷新地图',  // 子页动态选项1
        singleMenuMethod2: '清除POI点',  // 子页动态选项2
        // singleMenuMethod2: '展示分析结果'  // 子页动态选项2
    },
}

if (import.meta.env.VITE_USER_NODE_ENV === 'development') {
    menuMethodBtn.commonMenu = {
        ...menuMethodBtn.commonMenu,
        commonMenuMethod0: '地图功能测试',  // 公共选项0
        commonMenuMethod01: '添加自定义标注点',  // 公共选项01
        commonMenuMethod02: '添加自定义闪烁点',  // 公共选项02
    }
}

// 主菜单项
const { commonMenu } = menuMethodBtn  // 公共选项,常驻菜单
let commonMenuMethodsArr = []  // 常驻菜单数组
// 将对象中的值传入数组
for (let i in commonMenu) {
    commonMenuMethodsArr.push(commonMenu[i])
}

export default {
    // 菜单项
    menuMethodBtn,

    // 常驻菜单数组
    commonMenuMethodsArr,

    // 设置鼠标右键菜单栏方法
    setMenuMethods(olMap, option, feature, pixelPoint, proxy) {
        // console.log(olMap, option, feature, pixelPoint, proxy)

        // 经纬度
        let currentLonlat = mapUtils.transformToLonlat(pixelPoint)

        /**
         * 菜单栏
         * commonMenu  // 公共选项,常驻菜单
         * commonDynamicMenu  // 公共动态选项,每个页面有需要才显示
         * singleMenu  // 子页动态选项, 单页面显示或单页面有需要显示
         */
        const { commonMenu, commonDynamicMenu, singleMenu } = this.menuMethodBtn;

        switch (option) {
            /**
             * ===========================
             *      公共选项,常驻菜单
             * ===========================
             */
            // 地图功能测试
            case commonMenu.commonMenuMethod0:
                // console.log("test", commonMenu.commonMenuMethod0);

                mapUtils.olMapTestCommon(olMap, feature, pixelPoint);
                break;
            // 添加标注点
            case commonMenu.commonMenuMethod01:
                // console.log("test", commonMenu.commonMenuMethod1);

                mapUtils.addMyPointByMenu(olMap, pixelPoint);
                break;
            // 清空自定义标注点
            case '清空自定义标注点':
                // console.log("test", '清空自定义标注点');

                // 根据条件移除要素
                mapUtils.removeByCondition(olMap, currentFeature => {
                    return currentFeature.get('tempType') === 'myPointByMenu'
                })
                break;
            // 添加闪烁点
            case commonMenu.commonMenuMethod02:
                // console.log("test", commonMenu.commonMenuMethod2);

                mapUtils.addFlickerPoint(olMap, pixelPoint);
                break;
            // 清空自定义闪烁点
            case '清空自定义闪烁点':
                // console.log("test", '清空自定义闪烁点');

                let flickerPointDom = document.querySelectorAll('.flicker_point')

                flickerPointDom.forEach(item => {
                    item.classList.remove('flicker_point')
                })

                break;
            // 拷贝当前经纬度
            case commonMenu.commonMenuMethod1:
                // console.log("拷贝当前经纬度");
                copyTextToClipboard(`[${currentLonlat}]`, () => {
                    ElMessage.success(`[${currentLonlat}] 拷贝成功`);
                });
                break;
            // 置顶图层
            case commonMenu.commonMenuMethod2:
                // console.log("置顶图层");
                mapUtils.featureToMaxTop(olMap, feature);
                break;
            // 切换天地图token
            case commonMenu.commonMenuMethod3:
                // console.log("切换天地图token");

                mittBus.emit("showSetTokenDialog");
                break;
            /**
             * =======================================
             *      公共动态选项,每个页面有需要才显示
             * =======================================
             */
            // 清除所有要素
            case commonDynamicMenu.commonDynamicMenuMethod1:
                // console.log("清除所有要素");

                mapUtils.removeAllLayer(olMap);
                break;
            // 显示当前要素信息
            case commonDynamicMenu.commonDynamicMenuMethod2:
                // console.log("显示当前要素信息");
                mittBus.emit("singleFeaturesClick", { feature, pixelPoint });
                break;
            // 仅取消绘制状态
            case commonDynamicMenu.commonDynamicMenuMethod3:
                // console.log("仅取消绘制状态");

                mapUtils.cancelDrawInteraction(olMap)
                break;
            // 展示分析结果
            case commonDynamicMenu.commonDynamicMenuMethod4:
                let currentData = feature.get('pointData')
                // console.log("展示分析结果", feature.get('pointData'));
                mittBus.emit("analysisPointData", currentData);
                break;
            // 删除所有绘制内容
            case commonDynamicMenu.commonDynamicMenuMethod5:
                console.log("删除所有绘制内容");

                // 根据条件移除要素
                mapUtils.removeByCondition(olMap, currentFeature => {
                    return currentFeature.get('drawType')
                })

                // let currentData = feature.get('pointData')

                // mittBus.emit("analysisPointData", currentData);
                break;
            /**
             * =============================================
             *      子页动态选项, 单页面显示或单页面有需要显示
             * =============================================
             */
            // 刷新地图
            case singleMenu.singleMenuMethod1:
                // console.log("刷新地图");
                mittBus.emit("reflashMap");
                break;
            // 清除POI点
            case singleMenu.singleMenuMethod2:
                // console.log("清除POI点");
                mapUtils.removeLayerByBusinessType(olMap, "POIMarker"); // 根据类型移除图层
                break;
        }
    },

    // 根据具体页面配置菜单栏
    setMentBtnExtendByPage(currentPageType) {
        const { singleMenu } = this.menuMethodBtn

        switch (currentPageType) {
            case 'gis':
                mapUtils.menuAddSingleMethod(singleMenu.singleMenuMethod1)
                mapUtils.menuAddSingleMethod(singleMenu.singleMenuMethod2)
                break;
        }
    }
}