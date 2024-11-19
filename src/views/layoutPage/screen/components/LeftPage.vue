<template>
  <section class="data_screen_lf">
    <div class="scroll_auto">
      <div class="dt_scrn_item">
        <div class="scritm_title">
          <span class="title">xxxxxx</span>
        </div>
        <div class="scritm_cont">
        </div>
      </div>
      <div class="dt_scrn_item">
        <div class="scritm_title">
          <span class="title">xxxxxx</span>
        </div>
        <div class="scritm_cont">
        </div>
      </div>
      <div class="dt_scrn_item">
        <div class="scritm_title">
          <span class="title">xxxxxx</span>
        </div>
        <div class="scritm_cont radar_wrap">
          <div class="data_dot_list inline">
            <ul>
              <li>
                <dl>
                  <dt></dt>
                  <dd>
                    <span>xx<b>85</b></span>
                  </dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt></dt>
                  <dd>
                    <span>xx<b>80</b></span>
                  </dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt></dt>
                  <dd>
                    <span>xx<b>82</b></span>
                  </dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt></dt>
                  <dd>
                    <span>xx<b>87</b></span>
                  </dd>
                </dl>
              </li>
              <li>
                <dl>
                  <dt></dt>
                  <dd>
                    <span>xx<b>81</b></span>
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

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.data_screen_lf {
  .dt_scrn_item {
    .scritm_cont {
      &.radar_wrap {
        .data_dot_list {
          &.inline {
            ul {
              margin: 1.5% auto 0;
              justify-content: space-between;
            }
          }
        }

        .chart_wrap {
          height: calc(100% - 26px) !important;
        }
      }
    }
  }
}
</style>