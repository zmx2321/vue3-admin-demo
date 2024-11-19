<template>
  <section class="data_screen_ct">
    <div class="scroll_auto">
      <div class="dsren_ct_top">
        <div class="dt_scrn_item">
          <div class="scritm_title">
            <span class="title">xxxxxx</span>
          </div>
          <div class="scritm_cont">
          </div>
        </div>
        <div class="dt_scrn_item main_bg">
          <div class="scritm_title">
            <span class="title">xxxxxx</span>
          </div>
          <div class="scritm_cont keydata">
            <div class="data_dot_list block">
              <ul>
                <li>
                  <dl>
                    <dt></dt>
                    <dd>
                      <span>xxxx <b>90</b> 分</span>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt></dt>
                    <dd>
                      <span>xxxx <b>0%</b></span>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt></dt>
                    <dd>
                      <span>xxxx <b>{{ formatNumber(97799) }}</b> 个</span>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt></dt>
                    <dd>
                      <span>xxxx <b>{{ formatNumber(45221) }}</b> 个</span>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt></dt>
                    <dd>
                      <span>xxxx <b>{{ formatNumber(11775) }}</b> 个</span>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt></dt>
                    <dd>
                      <span>xxxx <b>{{ formatNumber(2964) }}</b> 个</span>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt></dt>
                    <dd>
                      <span>xxxx <b>{{ formatNumber(125) }}</b> 个</span>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl>
                    <dt></dt>
                    <dd>
                      <span>xxxx <b>{{ formatNumber(236) }}</b> 个</span>
                    </dd>
                  </dl>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="dsren_ct_bot">
        <div class="dt_scrn_item">
          <div class="scritm_title">
            <span class="title">xxxxxxxx</span>
            <span class="time">24年01期</span>
          </div>
          <div class="scritm_cont">
          </div>
        </div>
        <div class=" dt_scrn_item">
          <div class="scritm_title">
            <span class="title">xxxxxxxx</span>
          </div>
          <div class="scritm_cont">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { formatNumber } from "@/utils/index.ts";
</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
  }

.scritm_cont {
  &.keydata {
    .data_dot_list {
      &.block {
        height: 100%;

        ul {
          flex-direction: column;
          height: 100%;

          li {
            position: relative;
            height: calc(100% / 8 - .6%);

            dl {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
      }
    }
  }

  :deep .chart3_wrap {
    width: 97%;
    // margin: 0 auto;
    cursor: pointer;

    .row-item {
      // margin-bottom: -3px;

      .ranking-info {
        .rank {
          color: #4bbefe;
        }

        .info-name {}

        .ranking-value {}
      }

      .ranking-column {
        .inside-column {
          // background: linear-gradient(to right, rgb(21 60 110 / 30%), #507AFC);
          background: linear-gradient(to right, rgba(22, 62, 112, 0), #507AFC);
          // { offset: 1, color: 'rgba(22, 62, 112, 0)' },
        }

        .shine {
          background: rgb(75 190 254 / 30%)
        }
      }
    }
  }
}
</style>
