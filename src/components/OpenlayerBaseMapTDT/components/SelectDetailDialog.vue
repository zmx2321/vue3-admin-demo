<template>
  <detail-dialog ref="refDetailDialog">
    <!-- 标题 -->
    <template #DialogTitle>
      <span>{{ title }}</span>
    </template>

    <!-- 内容 -->
    <template #DialogContainer>
      <div class="select_area_wrap">
        <div class="select_area_item">
          <h3>数据概览</h3>
          <div class="container">
            <slot name="SelectAreaOverviewContainer"></slot>
          </div>
        </div>
        <div class="select_area_item">
          <h3>数据筛选</h3>
          <div class="container">
            <slot name="SelectAreaTableContainer"></slot>
          </div>
        </div>
      </div>
    </template>
  </detail-dialog>
</template>

<script setup>
import { ref } from 'vue'
import DetailDialog from '@/components/global/DialogInfo.vue'

const props = defineProps({
  title: {
    type: String,
    default: "选区",
  },
  with: {
    type: String,
    default: "75%",
  }
});

const refDetailDialog = ref(null);
const currentData = ref({});

/**
* 业务
*/
const show = (val) => {
  refDetailDialog.value.show();

  refDetailDialog.value.setDialogWidth(props.with);

  currentData.value = val; // 基本信息数据
};

defineExpose({
  show,
});

</script>

<style lang="scss" scoped>
.select_area_wrap {
  .select_area_item {
    margin-bottom: 20px;

    h3 {
      margin-bottom: 10px;
      color: #333333;
    }
  }
}
</style>