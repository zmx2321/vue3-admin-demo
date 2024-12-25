<template>
  <section class="lend_wrap" v-show="isShowLend">
    <div class="lent_tb_wrap" v-show="toggleFlag">
      <!-- 显示具体页面图例 -->
      <demo-lend v-show="currentPageType === 'demo'" />
    </div>
    <div class="toggle" :title="`点击${!toggleFlag ? '显示' : '隐藏'}图例`" @click="toggleLend"></div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import DemoLend from "@/views/map/openlayer/openlayer-tdt/demo/components/lend/index.vue";

import mittBus from "@/utils/mittBus"; // mitt

// 显示图例
mittBus.on("showLend", () => {
  toggleFlag.value = true
});

const props = defineProps({
  currentPageType: {
    type: String,
    default: "",
  },
  isShowLend: {
    type: Boolean,
    default: true,
  },
});

let toggleFlag = ref(false);

const toggleLend = () => {
  toggleFlag.value = !toggleFlag.value;
};
</script>

<style lang="scss" scoped>
$bgColorHeader: rgba(24, 102, 237, 0.8);
$bgColorBody: rgba(24, 102, 237, 0.4);

.lend_wrap {
  position: fixed;
  bottom: 88px;
  right: 58px;

  ::v-deep(.el-table) {
    cursor: pointer;
    border-radius: 10px;

    .el-table__inner-wrapper {
      .el-table__header-wrapper {
        table.el-table__header {
          thead {
            tr {
              th {
                background: $bgColorHeader !important;
                padding: 0;
                margin: 0;

                .cell {
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .el-table__body-wrapper {
        // background: #f00 !important;
        background: $bgColorBody !important;

        table.el-table__body {
          // background: $bgColorBody !important;

          tbody {
            // background: $bgColorBody !important;

            tr {
              background: $bgColorBody !important;

              &:hover {
                background: $bgColorBody !important;

                td.el-table__cell {
                  cursor: pointer;
                  background: $bgColorBody;
                }
              }

              td {
                .cell {
                  color: #fff;
                }
              }
            }
          }
        }
      }
    }

    .lend_color {
      display: block;
      width: 15px;
      height: 15px;
      text-align: center;
    }
  }

  .toggle {
    position: absolute;
    bottom: -22px;
    right: -22px;
    width: 25px;
    height: 24px;
    background: url("../icon/toggle_lend.svg") center center no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }
}
</style>
