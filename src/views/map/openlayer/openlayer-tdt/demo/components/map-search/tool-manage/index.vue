<template>
  <el-radio-group>
    <el-radio-button v-for="(item, index) in layerTabList" :key="index" :label="item" @click="setLayerEvent(item)">
      {{ item }}
    </el-radio-button>

    <div class="copy_form" v-show="isShowCopy">
      {{ copyData }}
      <el-input v-model="copyData" :placeholder="copyPlace" clearable disabled />
      <el-button type="primary" @click="copyCurrentData(copyData, copyCallback)"
        :disabled='copyData === ""'>拷贝</el-button>
      <!-- <el-button type="primary" @click="copyTextToClipboard(copyData, copyCallback)"
        :disabled='copyData === ""'>拷贝</el-button> -->
    </div>
  </el-radio-group>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from 'element-plus'
// 组件传参
import mittBus from "@/utils/mittBus"; // mitt
// 工具
import { copyTextToClipboard } from "@/utils/index.js";

// const { proxy } = getCurrentInstance();

let copyData = ref('')
let copyPlace = ref('')
let isShowCopy = ref(false)

const btnList = ["多边形选区", '圆形选区', "测距"]

const layerTabList = ref(btnList);

// 设置取消多边形选区按钮
mittBus.on("setCancelPolygonBtn", () => {
  layerTabList.value[0] = "多边形选区";
});

const resetBtn = () => {
  isShowCopy.value = false
  copyData.value = ''

  layerTabList.value = JSON.parse(JSON.stringify(btnList))

  mittBus.emit("cancelDrawInteraction");
}

const setLayerEvent = (tag) => {
  console.log(tag)
  resetBtn()

  switch (tag) {
    case "多边形选区":
      layerTabList.value[0] = "取消多边形选区";
      drawPolygon();
      break;
    case "取消多边形选区":
      layerTabList.value[0] = "多边形选区";
      cancelPolygon();
      break;
    case "圆形选区":
      layerTabList.value[1] = "取消圆形选区";
      drawCircle();
      break;
    case "取消圆形选区":
      layerTabList.value[1] = "圆形选区";
      cancelCircle();
      break;
    case "测距":
      layerTabList.value[2] = "取消测距";
      isShowCopy.value = true
      copyPlace.value = '测距数据'

      testDistance();
      break;
    case "取消测距":
      layerTabList.value[2] = "测距";
      cancelTestDistance();
      break;
  }
};

/**
 * 多边形选区
 */
const drawPolygon = () => {
  // console.log('drawPolygon')

  mittBus.emit("drawPolygon");
};

// 取消多边形选区多边形选区
const cancelPolygon = () => {
  // console.log('cancelPolygon')

  mittBus.emit("cancelPolygon");
};

/**
 * 圆形选区
 */
const drawCircle = () => {
  // console.log('drawCircle')

  mittBus.emit("drawCircle");
};

// 取消多边形选区多边形选区
const cancelCircle = () => {
  // console.log('cancelCircle')

  mittBus.emit("cancelCircle");
};

/**
 * 测距
 */
const testDistance = () => {
  // console.log("测距");

  mittBus.emit("testDistance", length => {
    // console.log(length)

    copyData.value = length.toString()
  });
};

//    取消测距
const cancelTestDistance = () => {
  // console.log("取消测距");

  mittBus.emit("cancelTestDistance");
};

// 拷贝成功回调
const copyCurrentData = () => {
  copyTextToClipboard(copyData.value, () => {
    ElMessage.success(`当前测距 ${copyData.value} 米, 拷贝成功`);
  })
}
</script>

<style lang="scss" scoped>
.copy_form {
  position: relative;
  top: 1px;
  display: flex;
  margin-left: 30px;

  .el-input {
    margin-right: 10px
  }

  /* .el-input,
  .el-button {
    display: inline-block;
  } */
}
</style>
