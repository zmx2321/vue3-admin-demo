const SOURCES = {
  WMS: 'WMS',
  CITIES: 'CITIES'
}
const LAYERS = {
  STATE_FILL: 'city-fills1'
}

// 不带底图
export const glMapConfigDev = (id, geoData, center, zoom, minZoom) => ({
  container: id, // 容器的id
  center: center || [120.5, 28.8], // 初始位置，经度纬度 [lng, lat]
  zoom: zoom || 6.5, // 初始缩放
  minZoom: minZoom || 4,
  pitch: 20,
  antialias: true, // 抗锯齿
  style: {
    version: 8,
    sources: {
      [SOURCES.CITIES]: {
        type: 'geojson',
        data: geoData,
        generateId: true
      }
    },
    layers: [
      {
        id: 'city-shadow',
        type: 'fill',
        source: SOURCES.CITIES,
        layout: {},
        paint: {
          'fill-color': '#0239A8',
          'fill-translate': [5, 10],
          'fill-translate-anchor': 'viewport'
        }
      },
      {
        id: 'city-shadow-light',
        type: 'line',
        source: SOURCES.CITIES,
        layout: {},
        paint: {
          'line-color': '#02FDFE',
          'line-width': 2,
          'line-translate': [5, 10],
          'line-translate-anchor': 'viewport'
        }
      },
      {
        // 市
        id: LAYERS.STATE_FILL,
        type: 'fill',
        source: SOURCES.CITIES,
        layout: {},
        paint: {
          'fill-color': ['case', ['boolean', ['feature-state', 'hover'], false], '#26E3F0', '#1151B1']
        }
      },
      {
        // 市界
        id: 'city-borders',
        type: 'line',
        source: SOURCES.CITIES,
        layout: {},
        paint: {
          'line-color': '#1cccff',
          'line-width': 0.5,
          'line-opacity': 0.7
        }
      }
    ]
  }
})
