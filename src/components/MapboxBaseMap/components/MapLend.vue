<template>
  <!-- 图例 -->
  <section class="glmap_lend" @click="getLend" id="glmapLend">
    <!-- 图例 -->
    <ul>
      <li v-for="(item, index) in lendConfigData" :key="index">
        <dl>
          <dt :class="item.markerClass"></dt>
          <dd>{{ item.name }}</dd>
        </dl>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  lendConfigData: {
    type: Array,
    default: () => []
  }
})

// 自定义事件
const emit = defineEmits(['removePopup'])

// 点击显示隐藏
const toggleLend = (calss) => {
  if (calss.indexOf('lend_') !== -1) {
    console.log(calss)
    calss = `.${calss.replace(/lend_/g, '')}`
  }

  let dnCls = 'f-dn'

  document
    .getElementById('glmapLend')
    .parentNode.querySelectorAll(calss)
    .forEach((item) => {
      if (!item.classList.contains(dnCls)) {
        item.classList.add(dnCls)
      } else {
        item.classList.remove(dnCls)
      }
    })
}

// 配置lend封装
const setLendConfig = (nodeTxt, txt, nodeDom) => {
  if (nodeTxt === txt) {
    console.log(nodeTxt, txt, nodeDom)
    toggleLend(nodeDom)
  }
}
// lend事件
const getLend = (e) => {
  let { target } = e
  let { nodeName, textContent } = target
  let nodeTxt = ''

  if (nodeName === 'IMG') {
    nodeTxt = target.parentNode.parentNode.textContent
  }
  if (nodeName === 'DL' || nodeName === 'DD') {
    nodeTxt = textContent
  }

  // 移除气泡
  emit('removePopup')

  // console.log(nodeTxt)
  lendConfig(nodeTxt) // lend配置
}
// lend配置 - 显示隐藏
const lendConfig = (nodeTxt) => {
  // console.log(nodeTxt)
  /**
   * 首页大屏图例
   */
  props.lendConfigData.forEach((item) => {
    setLendConfig(nodeTxt, item.name, item.markerClass)
  })
}
</script>

<style lang="scss" scoped>
// 图例
.glmap_lend {
  position: absolute;
  bottom: 38px;
  right: 28px;
  z-index: 1;

  ul,
  li,
  dl,
  dt,
  dd {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ul {
    li {
      display: inline-block;

      &:not(:last-child) {
        margin-right: 25px;
      }

      dl {
        cursor: pointer;

        &::after {
          content: '';
          display: block;
          clear: both;
          height: 0;
          overflow: hidden;
          visibility: hidden;
        }

        dt,
        dd {
          float: left;
        }

        dt {
          width: 21px;
          height: 24px;
          overflow: hidden;
          margin-right: 10px;
          background-size: 100%;
        }

        dd {
          font-size: 14px;
          color: #adb1bc;
        }
      }
    }
  }
}
</style>
