<template>
  <section class="switch_base_layer_wrap">
    <div class="switch_content" v-show="toggleFlag">
      <el-radio-group v-model="ruleForm.layerType" @change="switchBaseLayerType">
        <el-radio value="t0vec">街道底图</el-radio>
        <el-radio value="t3img">卫星(影像)底图</el-radio>
        <el-radio value="t4ter">地形底图</el-radio>
      </el-radio-group>
    </div>
    <div class="toggle" :title="`点击${!toggleFlag ? '显示' : '隐藏'}`" @click="toggleLend"></div>
  </section>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
// 组件传参
import mittBus from "@/utils/mittBus"; // mitt

// 根据不同token初始化地图
mittBus.on("resetSwitchLayer", () => {
  ruleForm.value.layerType = 't0vec'
});

// 自定义事件
const emit = defineEmits(['switchBaseLayerType'])

let toggleFlag = ref(false);
const ruleForm = ref({
  layerType: 't0vec'
})

const toggleLend = () => {
  toggleFlag.value = !toggleFlag.value;
};

const switchBaseLayerType = (val) => {
  // console.log(val)

  emit('switchBaseLayerType', val)
}
</script>

<style lang="scss" scoped>
.switch_base_layer_wrap {
  position: absolute;
  bottom: 82px;
  left: 42px;

  .switch_content {
    position: relative;
    top: -9px;
    padding: 6px 0 3px 8px;
    // width: 130px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;

    .el-radio-group {
      flex-direction: column;
      align-items: flex-start;

      .el-radio {
        margin-right: 10px;
      }
    }
  }

  .toggle {
    position: absolute;
    bottom: -22px;
    left: -22px;
    width: 33px;
    height: 30px;
    background: url("../icon/switch_layer.svg") center center no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>