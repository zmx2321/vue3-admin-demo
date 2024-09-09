<template>
  <section class="empty-page">
    <div class="inner inner1"></div>
    <div class="inner inner2"></div>
  </section>
</template>

<script setup>
import { ref, toRefs, toRef, reactive, computed, defineProps } from 'vue' 
</script>

<style lang="scss" scoped>
.empty-page {
  width: 100%;
  height: 100%;
  background: #163e70;
  overflow: auto;

  .inner {
    width: 100%;
    height: 900px;
    background: #f00;
    
    &:not(:last-child) {
      margin-bottom: 100px;
    }
  }
}
</style>