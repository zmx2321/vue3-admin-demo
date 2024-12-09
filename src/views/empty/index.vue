<template>
  <section class="empty-page">
    <div class="inner inner1">{{ currentData0 }}</div>
    <div class="inner inner2">{{ currentData }}</div>
  </section>
</template>
<script setup lang="ts" name="useTreeFilter">
import { ref, reactive } from "vue";
// api
import { User } from "@/api/interface";
import { Test } from "@/api/interface";
import { getUserList } from "@/api/modules/user";
import * as mockTest from "@/api/modules/test";

let currentData = ref([]);
let currentData0 = ref(null);
const getList = async () => {
  const userRes = await getUserList();
  const myMockRes = await mockTest.getMockTest();
  let myMockRes0 = null;
  try {
    myMockRes0 = await mockTest.getHelloServlet()
  } catch (e) {
    console.warn(e);
  }
  currentData.value = myMockRes.data
  currentData0.value = myMockRes0
  console.log(userRes, myMockRes, myMockRes0);
}
getList()
</script>

<style lang="scss" scoped>
.empty-page {
  width: 100%;
  height: 100%;
  background: #c3c3c3;
  overflow: auto;

  .inner {
    width: 100%;
    height: 900px;
    // background: #f00;

    &:not(:last-child) {
      margin-bottom: 100px;
    }
  }
}
</style>
