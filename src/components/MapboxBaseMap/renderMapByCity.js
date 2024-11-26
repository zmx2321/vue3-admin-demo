// map-core
import * as mapUtils from './mapUtils'

import chinaGeo from './mapData/geoData/china.json' // 全国
import zhejiangIndexGeo from './mapData/geoData/zhejiangIndex' // 首页浙江
import zhejiangGeo from './mapData/geoData/zhejiang' // 浙江
import shanghaiGeo from './mapData/geoData/shanghai' // 上海
import jiangsuGeo from './mapData/geoData/jiangsu' // 江苏
import xinJiangGeo from './mapData/geoData/xinjiang' // 新疆
import guangXiGeo from './mapData/geoData/guangxi' // 广西
import sichuanGeo from './mapData/geoData/sichuan' // 四川
import jiangXiGeo from './mapData/geoData/jiangxi' // 江西

let glMap = null

// 根据城市初始化地图
export default function renderMapByCity(val) {
    switch (val) {
        case '全国':
            return initMapByCity(chinaGeo, { center: [106, 31], zoom: 3.3 }, 'china', name => {
                console.log('全国 - 点击文字标注', name)
            })
        case '首页浙江':
            return initMapByCity(zhejiangIndexGeo, {}, 'zhejiang_index', name => {
                console.log('首页浙江 - 点击文字标注', name)
            }, (item, name) => {
                // 自定义地图
                setTimeout(() => {
                    switch (name) {
                        case '浙北':
                            mapUtils.addMapLayer(glMap, item, 'zhebei', '#73BBBF', 0.4)
                            break
                        case '浙南':
                            mapUtils.addMapLayer(glMap, item, 'zhenan', '#C29E35')
                            break
                        case '浙西':
                            mapUtils.addMapLayer(glMap, item, 'zhexi', '#7BAD84', 0.6)
                            break
                        case '浙东':
                            mapUtils.addMapLayer(glMap, item, 'zhedong', '#C6716D')
                            break
                    }
                }, 0)
            })
        case '浙江':
            return initMapByCity(zhejiangGeo, {}, 'zhejiang', name => {
                console.log('全国 - 点击文字标注', name)
            })
        case '上海':
            return initMapByCity(shanghaiGeo, { center: [121.4, 31.2], zoom: 8.9 }, 'shanghai', name => {
                console.log('上海 - 点击文字标注', name)
            })
        case '江苏':
            return initMapByCity(jiangsuGeo, { center: [119.5, 33.1], zoom: 6.3 }, 'jiangsu', name => {
                console.log('江苏 - 点击文字标注', name)
            })
        case '新疆':
            return initMapByCity(xinJiangGeo, { center: [85, 41], zoom: 5 }, 'xinjiang', name => {
                console.log('新疆 - 点击文字标注', name)
            })
        case '广西':
            return initMapByCity(guangXiGeo, { center: [108.3, 23.7], zoom: 6 }, 'guangxi', name => {
                console.log('广西 - 点击文字标注', name)
            })
        case '四川':
            return initMapByCity(sichuanGeo, { center: [103, 30.28], zoom: 5.5 }, 'sichuan', name => {
                console.log('四川 - 点击文字标注', name)
            })
        case '江西':
            return initMapByCity(jiangXiGeo, { center: [116, 26.6], zoom: 6 }, 'jiangxi', name => {
                console.log('江西 - 点击文字标注', name)
            })
        default:
            return initMapByCity(zhejiangGeo, {}, 'zhejiang')
    }
}

/**
 * 初始化地图
 * @param {*} geoData 
 * @param {*} { center, zoom }  中心点坐标, zoom 
 * @param {*} className 
 * @param {*} next 标注的点击事件
 * @param {*} customize 自定义地图渲染完成后的回调
 * @returns 
 */
const initMapByCity = (geoData, { center, zoom }, className, next, customize) => {
    glMap = mapUtils.setMapLayer(geoData, center, zoom)

    mapUtils.renderGeo(geoData, glMap, className, (el, item, name) => {
        // console.log(el, item, name)

        // 自定义地图渲染完成后的回调
        if (customize) {
            customize(item, name)
        }

        // 点击事件
        if (next) {
            el.addEventListener('click', (e) => {
                e.stopPropagation() // 阻止冒泡，防止父层事件影响到文字标注事件
                next(name)

                // 获取城市标注数据
                // let { textContent } = e.target
                // next(textContent)
            })
        }
    })

    return glMap
}