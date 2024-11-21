import { defineStore } from 'pinia'

export const gisDataStore = defineStore({
  id: 'gis',

  state: () => ({
    mapToken: '',  // gis token
    kmlTempFile: [],  // kml测试数据
    gisSearchData: [],  // gis查询数据
    currentPopupData: {},  // 当前popup数据
  }),

  actions: {
    setMapToken(mapToken) {
      this.mapToken = mapToken
    },
    setKmlTempFile(kmlTempFile) {
      this.kmlTempFile = kmlTempFile
    },
    setGisSearchData(gisSearchData) {
      this.gisSearchData = gisSearchData
    },
    setCurrentPopupData(currentPopupData) {
      this.currentPopupData = currentPopupData
    }
  }
})
