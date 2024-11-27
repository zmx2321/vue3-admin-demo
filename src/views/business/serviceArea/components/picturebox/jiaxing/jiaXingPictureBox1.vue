<template>
  <picture-box-content :area-image="areaImage" />
</template>

<script setup>
import areaImage from '../../../image/jx2.png' // 二楼
import PictureBoxContent from '../../service-tools/PictureBoxContent.vue'
</script>

<style lang="scss" scoped>
@use './scss/box1.scss';
</style>
