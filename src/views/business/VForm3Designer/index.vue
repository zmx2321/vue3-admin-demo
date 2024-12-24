<template>
  <div class="card content-box">
    <span class="text">业务示例0 🍓🍇🍈🍉</span>
    <el-input v-model="value" placeholder="测试缓存"></el-input>
    <!-- <v-form-designer></v-form-designer> -->
    <VFormDesignerDialog />
  </div>
</template>

<script setup name="serviceArea">
import { ref } from "vue";
import VFormDesignerDialog from '@/components/VForm3Designer/VFormDesignerForNewDialog.vue'
// import VFormRenderForDetailDialog from '@/components/VForm3Designer/VFormRenderForDetailDialog.vue'

</script>

<style scoped lang="scss">
@use "./index";
</style>
