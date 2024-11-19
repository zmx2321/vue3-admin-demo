<template>
  <section class="empty-page">
    <div class="inner inner1">2222{{ currentData }}</div>
    <div class="inner inner2"></div>
  </section>
</template>
<script setup lang="ts" name="useTreeFilter">
import { ref, reactive } from "vue";
// api
import { User } from "@/api/interface";
import { Test } from "@/api/interface";
import { getUserList } from "@/api/modules/user";
import { getMockTest } from "@/api/modules/test";

let currentData = ref([]);
const getList = async () => {
  const userRes = await getUserList();
  const myMockRes = await getMockTest();
  currentData.value = myMockRes.data
  console.log(userRes, myMockRes);
}
getList()
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
