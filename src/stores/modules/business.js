import { defineStore } from 'pinia'

export const businessStoreData = defineStore({
  id: 'business',

  state: () => ({
    /**
     * serviceArea
     */
    currentBunkList: [], // 过滤后的店铺数据
    currentBunkNo: '' // 当前选择的tooltip编号
  }),

  actions: {
    /**
     * serviceArea
     */
    setCurrentBunkList(currentBunkList) {
      this.currentBunkList = currentBunkList
    },
    setCurrentBunkNo(currentBunkNo) {
      this.currentBunkNo = currentBunkNo
    }
  }
})
