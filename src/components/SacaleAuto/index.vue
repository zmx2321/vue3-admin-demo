<template>
  <section class="container">
    <!-- 大屏展示区 -->
    <div class="scale_box">
      <slot></slot>
    </div>
  </section>
</template>

<script setup name="ScaleBox">
import { onMounted } from "vue";

/** 生命周期 */
onMounted(() => {
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.3);
  background-size: cover;

  .scale_box {
    width: 100%;
    height: 100%;
    background: #c8f8e3;
  }
}
</style>
