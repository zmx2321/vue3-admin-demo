<template>
  <dialog-info ref="refPopupDetailDialog">
    <!-- 标题 -->
    <template #DialogTitle>
      <span>{{ currentPopupData.newCellName }}</span>
    </template>
    <!-- 内容 -->
    <template #DialogContainer>
      <!-- {{ currentPopupData }} -->
      <el-descriptions class="margin-top" border>
        <el-descriptions-item>
          <template #label>
            <span class="cell-item"> 省市区 </span>
          </template>
          <span>{{ currentPopupData.province
            }}{{ currentPopupData.city }}市{{
              currentPopupData.county
            }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="cell-item"> 站点名称 </span>
          </template>
          <!-- <span>{{ currentPopupData.stationName }}</span> -->
          <span>xxxxxxx</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="cell-item"> cgi </span>
          </template>
          <span>{{ currentPopupData.cgi }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="cell-item"> 基站类型 </span>
          </template>
          <span>{{ currentPopupData.coverType }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="cell-item"> 站号 </span>
          </template>
          <span>{{ currentPopupData.stationNo }}</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="cell-item"> 频段 </span>
          </template>
          <span>{{ currentPopupData.workFrequency }}</span>
        </el-descriptions-item>
        <el-descriptions-item v-if="currentPopupData.antDirectionAngle">
          <template #label>
            <span class="cell-item">方位角 </span>
          </template>
          <span>{{ currentPopupData.antDirectionAngle }}°</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="cell-item"> 经纬度 </span>
          </template>
          <span>[{{
            currentPopupData.longitude.toFixed(positionFix)
          }},
            {{
              currentPopupData.latitude.toFixed(positionFix)
            }}]</span>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <span class="cell-item"> 小区生命周期状态 </span>
          </template>
          <span>{{ currentPopupData.cellLifeStatus }}</span>
        </el-descriptions-item>
      </el-descriptions>
    </template>

    <!-- 按钮扩展 -->
    <template #extendBtn>
      <el-button v-show="isShowHealth" type="primary" @click="linkToDetail">查看详情</el-button>
    </template>
  </dialog-info>
</template>

<script setup>
import { ref, nextTick } from "vue";
// 工具
import { useRouter /* useRoute */ } from "vue-router";

const router = useRouter();
const refPopupDetailDialog = ref(null);

// 当前气泡弹出框信息
const currentPopupData = ref({});
const positionFix = ref(3);

let isShowHealth = ref(true);


/**
 * 业务
 */
const show = (val) => {
  refPopupDetailDialog.value.show();

  currentPopupData.value = val; // 基本信息数据
};

const linkToDetail = () => {
  console.log("查看详情", currentPopupData.value);
}

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
