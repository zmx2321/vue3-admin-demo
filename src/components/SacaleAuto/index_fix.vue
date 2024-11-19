<template>
  <section class="container">
    <!-- 大屏展示区 -->
    <div class="scale_box">
      <slot></slot>
    </div>
  </section>
</template>

<script setup name="ScaleBox">
import { onMounted, ref, watch, onUnmounted } from "vue";
import { myDebounce } from "@/utils/index.js";

import autofit /* , { elRectification } */ from "autofit.js";

/** props 参数 */
const props = defineProps({
  width: {
    type: Number,
    default: 1920,
  },
  height: {
    type: Number,
    default: 1080,
  },
});

const setScale = () => {
  console.log(props);
  autofit.init(
    {
      dw: props.width,
      dh: props.height,
      el: ".container",
    },
    false
  );
};

/** 生命周期 */
onMounted(() => {
  setScale();
});

console.log(
  "%cautofit.js is running",
  "font-weight: bold; color: #ffb712; background:linear-gradient(-45deg, #bd34fe 50%, #47caff 50% );background: -webkit-linear-gradient( 120deg, #bd34fe 30%, #41d1ff );background-clip: text;-webkit-background-clip: text; -webkit-text-fill-color:linear-gradient( -45deg, #bd34fe 50%, #47caff 50% ); padding: 8px 12px; border-radius: 4px;"
);
</script>

<style lang="scss" scoped>
.container {
  // width: 100vw;
  // height: 100vh;
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.3);
  background-size: cover;

  .scale_box {
    // position: absolute;
    // transform: scale(v-bind('scale.h')) translate(-50%, -50%);
    // transform: scale(v-bind("scale.w"), v-bind("scale.h")) translate(-50%, -50%);
    // display: flex;
    // flex-direction: column;
    // transform-origin: top left;
    // left: 50%;
    // top: 50%;
    // transition: 0.2s;
    // z-index: 999;
    width: 100%;
    height: 100%;
    background: #c8f8e3;
  }
}
</style>
