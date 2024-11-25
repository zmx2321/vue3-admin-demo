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

export default function renderMapByCity(val) {
    switch (val) {
        case '全国':
            return initChina() // 全国渲染
        case '首页浙江':
            return initZheJiangIndex() // 首页浙江渲染
        case '浙江普通':
        case '省内':
            return initZheJiang() // 浙江普通渲染
        case '上海':
            return initShangHai()
        case '江苏':
            return initJiangSu()
        case '新疆':
            return initXingJiang()
        case '广西':
            return initGuangXi()
        case '四川':
            return initSichuan()
        case '江西':
            return initJiangXi()
        default:
            return initZheJiang()
    }
}

// 全国渲染
const initChina = () => {
    glMap = chinaMap()
    renderGeoToChina(glMap, textContent => {
        console.log('全国渲染 - 点击文字标注', textContent)
    })

    return glMap
}
// 首页浙江渲染
const initZheJiangIndex = () => {
    glMap = zhejiangMapIndex()
    renderGeoToZheJiangIndex(glMap, textContent => {
        console.log('首页浙江 - 点击文字标注', textContent)
    })

    return glMap
}
// 浙江渲染
const initZheJiang = () => {
    glMap = zhejiangMap()
    renderGeoToZheJiang(glMap, textContent => {
        console.log('浙江渲染 - 点击文字标注', textContent)
    })

    return glMap
}
// 上海渲染
const initShangHai = () => {
    glMap = shanghaiMap()
    renderGeoToShangHai(glMap, textContent => {
        console.log('上海渲染 - 点击文字标注', textContent)
    })

    return glMap
}
// 江苏渲染
const initJiangSu = () => {
    glMap = jiangsuMap()
    renderGeoToJiangSu(glMap, textContent => {
        console.log('江苏渲染 - 点击文字标注', textContent)
    })

    return glMap
}
// 新疆渲染
const initXingJiang = () => {
    glMap = xinJiangMap()
    renderGeoToXingJiang(glMap, textContent => {
        console.log('新疆渲染 - 点击文字标注', textContent)
    })

    return glMap
}
// 广西
const initGuangXi = () => {
    glMap = guangXiMap()
    renderGeoToGuangXi(glMap)

    return glMap
}
// 四川
const initSichuan = () => {
    glMap = sichuanMap()
    renderGeoToSichuan(glMap)

    return glMap
}
// 江西
const initJiangXi = () => {
    glMap = jiangXiMap()
    renderGeoToJiangXi(glMap)

    return glMap
}



/** ****************************
 * 地图数据及渲染方法
 * ****************************
 */
/**
 * 全国
 */
const chinaMap = () => mapUtils.setMapLayer(chinaGeo, [106, 31], 3.3, 2)
const renderGeoToChina = (map, next) => {
    mapUtils.renderGeo(chinaGeo, map, 'china', (el, item, name) => {
        console.log(el, item, name)
        // 标注点击事件
        el.addEventListener('click', (e) => {
            e.stopPropagation() // 阻止冒泡，防止父层事件影响到文字标注事件

            let { textContent } = e.target
            // console.log(textContent)

            // 获取城市标注数据
            next(textContent)
        })
    })
}
/**
 * 首页浙江
 */
// 地图初始化
const zhejiangMapIndex = () => mapUtils.setMapLayer(zhejiangIndexGeo)
// 渲染geoData
const renderGeoToZheJiangIndex = (map, next) => {
    // 定制首页地图geojson
    mapUtils.renderGeo(zhejiangIndexGeo, map, 'zhejiang_index', (el, item, name) => {
        // console.log(el, item, name)

        setTimeout(() => {
            switch (name) {
                case '浙北':
                    mapUtils.addMapLayer(map, item, 'zhebei', '#73BBBF', 0.4)
                    break
                case '浙南':
                    mapUtils.addMapLayer(map, item, 'zhenan', '#C29E35')
                    break
                case '浙西':
                    mapUtils.addMapLayer(map, item, 'zhexi', '#7BAD84', 0.6)
                    break
                case '浙东':
                    mapUtils.addMapLayer(map, item, 'zhedong', '#C6716D')
                    break
            }
        }, 0)

        // 标注点击事件
        el.addEventListener('click', (e) => {
            e.stopPropagation() // 阻止冒泡，防止父层事件影响到文字标注事件

            let { textContent } = e.target
            // console.log(textContent)

            // 获取城市标注数据
            next(textContent)
        })
    })
}

/**
 * 浙江
 */
const zhejiangMap = () => mapUtils.setMapLayer(zhejiangGeo)
const renderGeoToZheJiang = (map, next) => {
    mapUtils.renderGeo(zhejiangGeo, map, 'zhejiang', (el, item, name) => {
        // console.log(el, item, name)

        // 标注点击事件
        el.addEventListener('click', (e) => {
            e.stopPropagation() // 阻止冒泡，防止父层事件影响到文字标注事件

            let { textContent } = e.target
            // console.log(textContent)

            // 获取城市标注数据
            next(textContent)
        })
    })
}

/**
 * 上海
 */
const shanghaiMap = () => mapUtils.setMapLayer(shanghaiGeo, [121.4, 31.2], 8.9, 7)
const renderGeoToShangHai = (map, next) => {
    mapUtils.renderGeo(shanghaiGeo, map, 'shanghai', (el, item, name) => {
        // console.log(el, item, name)

        // 标注点击事件
        el.addEventListener('click', (e) => {
            e.stopPropagation() // 阻止冒泡，防止父层事件影响到文字标注事件

            let { textContent } = e.target
            // console.log(textContent)

            // 获取城市标注数据
            next(textContent)
        })
    })
}

/**
 * 江苏
 */
const jiangsuMap = () => mapUtils.setMapLayer(jiangsuGeo, [119.5, 33.1], 6.3)
const renderGeoToJiangSu = (map, next) => {
    mapUtils.renderGeo(jiangsuGeo, map, 'jiangsu', (el, item, name) => {
        // console.log(el, item, name)

        // 标注点击事件
        el.addEventListener('click', (e) => {
            e.stopPropagation() // 阻止冒泡，防止父层事件影响到文字标注事件

            let { textContent } = e.target
            // console.log(textContent)

            // 获取城市标注数据
            next(textContent)
        })
    })
}

/**
 * 新疆
 */
const xinJiangMap = () => mapUtils.setMapLayer(xinJiangGeo, [85, 41], 5)
const renderGeoToXingJiang = (map, next) => {
    mapUtils.renderGeo(xinJiangGeo, map, 'xinjiang', (el, item, name) => {
        // console.log(el, item, name)

        // 标注点击事件
        el.addEventListener('click', (e) => {
            e.stopPropagation() // 阻止冒泡，防止父层事件影响到文字标注事件

            let { textContent } = e.target
            // console.log(textContent)

            // 获取城市标注数据
            next(textContent)
        })
    })
}

/**
 * 广西
 */
const guangXiMap = () => mapUtils.setMapLayer(guangXiGeo, [108.3, 23.7], 6)
const renderGeoToGuangXi = (map) => {
    mapUtils.renderGeo(guangXiGeo, map, 'guangxi')
}

/**
 * 四川
 */
const sichuanMap = () => mapUtils.setMapLayer(sichuanGeo, [103, 30.28], 5.5)
const renderGeoToSichuan = (map) => {
    mapUtils.renderGeo(sichuanGeo, map, 'sichuan')
}

/**
 * 江西
 */
const jiangXiMap = () => mapUtils.setMapLayer(jiangXiGeo, [116, 26.6], 6)
const renderGeoToJiangXi = (map) => {
    mapUtils.renderGeo(jiangXiGeo, map, 'sichuan')
}