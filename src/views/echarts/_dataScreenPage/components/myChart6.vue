<template>
  <div class="chart_wrap">
    <ECharts :option="option" :resize="false" :chartAuto="true" @beforeSetOption="beforeSetOption" />
  </div>
</template>

<script setup lang="ts">
import ECharts from "@/components/ECharts/index.vue";
import echarts, { ECOption } from "@/components/ECharts/config";
import 'echarts-gl';
import nbGeoJSON from "./GEOJSON/nbGeoJSON.json";
import mapbg from '@/assets/images/mapbg.png'
import { formatNumber } from "@/utils/index.ts";

// 接收父组件参数，并设置默认值
interface chartProps {
  chartData: []; // 数据 ==> 必传
}
const props = withDefaults(defineProps<chartProps>(), {
  chartData: ()=> [],
});

const chartConfig = {
  barWidth: '10',
  textStyle: {
    color: '#fff',
    fontSize: 10.5,
  },
  lineStyle: {
    color: 'rgba(255, 255, 255, .6)', // 设置横坐标线颜色
    // width: 2, // 设置横坐标线宽度
  }
}

const setLinearGradient = (color1, color2) => {
  return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
    { offset: 0, color: color1 },
    { offset: 1, color: color2 }
  ])
}

const beforeSetOption = ()=> {
  echarts.registerMap("ningbo", nbGeoJSON);
}

const option: ECOption = {
    tooltip: {
      show: true,
      textStyle: {
        fontSize: 13,
        color: "#fff",
      },
      trigger: "item",
      backgroundColor: "rgba(0,0,0,0.3)",
      borderColor: 'rgba(74,190,254,0.5)',
      borderWidth: 2.5,
      formatter: (params) => {
        let { data } = params;

        let str = `
            <div class="chart_tooltip">
              <h3>${data.name}</h3>
              <ul>
                <li>
                  <dl>
                    <dt>近30天健康度平均分:</dt>
                    <dd>${data.data1} 分</dd>
                  </dl>  
                </li>  
                <li>
                  <dl>
                    <dt>投诉数量:</dt>
                    <dd>${formatNumber(data.data2)} 个</dd>
                  </dl>  
                </li>  
                <li>
                  <dl>
                    <dt>故障工单:</dt>
                    <dd>${formatNumber(data.data3)} 个</dd>
                  </dl>  
                </li>  
                <li>
                  <dl>
                    <dt>采编未处理:</dt>
                    <dd>${formatNumber(data.data4)} 个</dd>
                  </dl>  
                </li>  
                <li>
                  <dl>
                    <dt>其他关键信息:</dt>
                    <dd>${formatNumber(data.data5)} 个</dd>
                  </dl>  
                </li>  
              </ul>
            </div>
          `;

        return str;
      },
    },
    series: [
      {
        type: 'map3D', // 系列类型
        map: "ningbo",
        data: props.chartData,
        label: {
          // 标签的相关设置
          show: true, // (地图上的城市名称)是否显示标签 [ default: false ]
          // 标签的字体样式
          color: '#fff', // 地图初始化区域字体颜色
          fontSize: 11, // 字体大小
          opacity: .8, // 字体透明度
        },

        itemStyle: {
          color: '#0b3eb3', // 地图板块的颜色
          borderWidth: 0.5, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域   [ default: 0 ]
          borderColor: 'rgba(0, 178, 255, 1)' // 图形描边的颜色。[ default: #333 ]
        },
        emphasis: {
          label: {
            show: true, // 是否显示高亮
            color: '#fff', // 高亮文字颜色
            fontSize: 15,
          },
          itemStyle: {
            color: '#00ade0', // 地图高亮颜色
            borderWidth: 10, // 分界线wdith
            borderColor: '#00ade0' // 分界线颜色
          }
        },
        shading: 'realistic',
        groundPlane: {
          // 地面可以让整个组件有个“摆放”的地方，从而使整个场景看起来更真实，更有模型感。
          show: false, // 是否显示地面。[ default: false ]
          color: '#0C264D' // 地面颜色。[ default: '#aaa' ]
        },

        shading: 'realistic', // 三维地理坐标系组件中三维图形的着色效果，echarts-gl 中支持下面三种着色方式:
        realisticMaterial: {
          // detailTexture: 'https://cdn.polyhaven.com/asset_img/primary/kloppenheim_06_puresky.png?height=780', // 纹理贴图
          detailTexture: mapbg, // 纹理贴图
          textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
          roughness: .8, // 材质粗糙度，0完全光滑，1完全粗糙
          metalness: 0, // 0材质是非金属 ，1金属
        }, // 真实感材质相关的配置项，在 shading 为'realistic'时有效。
        light: {
          // 光照相关的设置。在 shading 为 'color' 的时候无效。  光照的设置会影响到组件以及组件所在坐标系上的所有图表。合理的光照设置能够让整个场景的明暗变得更丰富，更有层次。
          main: {
            color: '#ffe',
            intensity: 1.1,
            shadow: true,
            shadowQuality: 'high',
            alpha: 25,
            beta: 40
          },
          ambient: {
            // 全局的环境光设置。
            color: '#fff', // 环境光的颜色。[ default: #fff ]
            intensity: 1 // 环境光的强度。[ default: 0.2 ]
          }
        },

        viewControl: {
          // 用于鼠标的旋转，缩放等视角控制。
          projection: 'orthographic', // 投影方式，默认为透视投影'perspective'，也支持设置为正交投影'orthographic'。
          autoRotate: true, // 是否开启视角绕物体的自动旋转查看。[ default: false ]
          autoRotateDirection: 'ccw', // 物体自传的方向。默认是 'cw' 也就是从上往下看是顺时针方向，也可以取 'ccw'，既从上往下看为逆时针方向。
          autoRotateSpeed: 10, // 物体自传的速度。单位为角度 / 秒，默认为10 ，也就是36秒转一圈。
          autoRotateAfterStill: 3, // 在鼠标静止操作后恢复自动旋转的时间间隔。在开启 autoRotate 后有效。[ default: 3 ]
          damping: 0, // 鼠标进行旋转，缩放等操作时的迟滞因子，在大于等于 1 的时候鼠标在停止操作后，视角仍会因为一定的惯性继续运动（旋转和缩放）。[ default: 0.8 ]
          rotateSensitivity: 1, // 旋转操作的灵敏度，值越大越灵敏。支持使用数组分别设置横向和纵向的旋转灵敏度。默认为1, 设置为0后无法旋转。	rotateSensitivity: [1, 0]——只能横向旋转； rotateSensitivity: [0, 1]——只能纵向旋转。
          zoomSensitivity: 1, // 缩放操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法缩放。
          panSensitivity: 1, // 平移操作的灵敏度，值越大越灵敏。默认为1,设置为0后无法平移。支持使用数组分别设置横向和纵向的平移灵敏度
          panMouseButton: 'middle', // 平移操作使用的鼠标按键，支持：'left' 鼠标左键（默认）;'middle' 鼠标中键 ;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)
          rotateMouseButton: 'left', // 旋转操作使用的鼠标按键，支持：'left' 鼠标左键;'middle' 鼠标中键（默认）;'right' 鼠标右键(注意：如果设置为鼠标右键则会阻止默认的右键菜单。)

          alpha: 23, // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
          beta: 40, // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
          minAlpha: 5, // 上下旋转的最小 alpha 值。即视角能旋转到达最上面的角度。[ default: 5 ]
          maxAlpha: 50, // 上下旋转的最大 alpha 值。即视角能旋转到达最下面的角度。[ default: 90 ]
          minBeta: -360, // 左右旋转的最小 beta 值。即视角能旋转到达最左的角度。[ default: -80 ]
          maxBeta: 360, // 左右旋转的最大 beta 值。即视角能旋转到达最右的角度。[ default: 80 ]

          center: [-3, 3, -1.5], // 视角中心点，旋转也会围绕这个中心点旋转，默认为[0,0,0]。

          animation: true, // 是否开启动画。[ default: true ]
          animationDurationUpdate: 1000, // 过渡动画的时长。[ default: 1000 ]
          animationEasingUpdate: 'cubicInOut', // 过渡动画的缓动效果。[ default: cubicInOut ]

          // 缩放大小，数值越大，地图越小
          zoomSensitivity: 0.5
        },
      },
    ],
  }
;
</script>
<style lang="scss" scoped>
.chart_wrap {
  width: 100%;
  height: 100%;

  :deep .chart_tooltip {
    ul, li, dl, dt, dd {
      margin: 0;
      padding: 0;
      list-style: none;
    }

    h3 {
      margin-bottom: 6px;
      letter-spacing: 1.5px;
    }

    ul {
      li {
        margin-bottom: 1px;

        dl {

          dt,
          dd {
            display: inline-block;
          }

          dt {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
