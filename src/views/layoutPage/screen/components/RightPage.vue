<template>
  <section class="data_screen_rg">
    <div class="scroll_auto">
      <div class="dt_scrn_item">
        <div class="scritm_title">
          <span class="title">xxxxxxx</span>
        </div>
        <div class="scritm_cont">
        </div>
      </div>
      <div class="dt_scrn_item">
        <div class="scritm_title">
          <span class="title">xxxxxxx</span>
        </div>
        <div class="scritm_cont">
        </div>
      </div>
      <div class="dt_scrn_item">
        <div class="scritm_title">
          <span class="title">xxxxxxx</span>
          <span class="time">24年6月</span>
        </div>
        <div class="scritm_cont complaint">
          <div class="data_dot_list inline">
            <ul>
              <li>
                <dl>
                  <dt></dt>
                  <dd>
                    <span>xxx<b>2.93</b>%</span>
                  </dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt></dt>
                  <dd>
                    <span>xxx<b>20</b>%</span>
                  </dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt></dt>
                  <dd>
                    <span>xxx<b>{{ formatNumber(236) }}</b>个</span>
                  </dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt></dt>
                  <dd>
                    <span>xxx<b>{{ formatNumber(3257) }}</b>个</span>
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatNumber } from '@/utils/index.ts'
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.data_screen_rg {
  .dt_scrn_item {
    .scritm_cont {
      &.complaint {
        .data_dot_list {
          &.inline {
            ul {
              flex-wrap: wrap;
              margin: 1% auto 0;

              li {
                width: 50%;

                &:not(:nth-child(n+3)) {
                  margin-bottom: .8%;
                }
              }
            }
          }
        }

        .chart_wrap {
          // height: calc(100% - 40px) !important;
        }
      }
    }
  }
}
</style>