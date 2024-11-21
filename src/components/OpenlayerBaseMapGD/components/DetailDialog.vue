<template>
  <el-dialog :width="dialogWidth" v-model="showDialog" :close-on-click-modal="false" :modal-append-to-body="false"
    :close-on-press-escape="false">
    <template #header>
      <slot name="DialogTitle"></slot>
    </template>
    <div class="container">
      <slot name="DialogContainer"></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <slot name="extendBtn"></slot>
        <el-button @click="showDialog = false">关闭</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
// core
import { ref } from "vue";

let dialogWidth = '75%'

const showDialog = ref(false);

// 可以通过这个方法动态设置宽度
const setDialogWidth = (width) => {
  dialogWidth = width;
}

/**
 * 父组件调弹框显示方法
 */
const show = () => {
  showDialog.value = true;
};
const hide = () => {
  showDialog.value = false;
};

defineExpose({ show, hide, setDialogWidth });
</script>
