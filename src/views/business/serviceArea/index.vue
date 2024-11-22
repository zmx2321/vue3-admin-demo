<template>
  <section class="demo_cont">
    <ul class="demo_btn_cont">
      <li><el-button @click="linkTo('demo0')">平面图页面</el-button></li>
      <li><el-button @click="linkTo('demo1')">空页面</el-button></li>
      <p style="margin-top: 20px">当前页面：{{ currentItemPage === 'demo0' ? '平面图页面' : '空页面' }} - 为了演示切换效果</p>
    </ul>

    <div class="demo_item_cont">
      <demo3T1 v-if="currentItemPage === 'demo0'" />
      <demo3T2 v-if="currentItemPage === 'demo1'" />
    </div>
  </section>
</template>

<script setup>
/**
 * 引入
 */
import { ref } from 'vue'
import demo3T1 from './demo0.vue'
import demo3T2 from './demo1.vue'

/**
 * 公共数据
 */
let currentItemPage = ref('demo0')

/**
 *
 * 方法
 */
const linkTo = (val) => {
  // console.log(val)

  currentItemPage.value = val
}
</script>

<style lang="scss" scoped>
// @import url(../styles/demoCommonStyle.scss);
.demo_cont {
  padding: 10px;
}

ul.demo_btn_cont li {
  display: inline-block;

  &:not(:first-child) {
    margin-left: 10px;
  }
}

.demo_item_cont {
  width: 100%;
  min-height: 300px;
  margin: 20px auto 0;
  border: solid 1px #a7a7a7;
}
</style>
