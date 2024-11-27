<template>
  <scale-box class="data_screen_container">
    <!-- 头部 -->
    <div class="data_screen_header">
      <img src="./images/header_bg.png" alt="">

      <ul class="btn_list" @click="btnListLink">
        <li>
          <div class="box"><b></b></div>
          <span>xxxx1</span>
        </li>
        <li>
          <div class="box"><b></b></div>
          <span>xxxx2</span>
        </li>
        <li>
          <div class="box"><b></b></div>
          <span>xxxx3</span>
        </li>
        <li>
          <div class="box"><b></b></div>
          <span>xxxx4</span>
        </li>
        <li>
          <div class="box"><b></b></div>
          <span>xxxx5</span>
        </li>
      </ul>

      <!-- <div class="title" @click="linkTo"> -->
      <div class="title" @click="setFullScreen(isFullscreen)">
        <h3>标题标题标题标题标题</h3>
        <b>YouSheBiaoTiHei YouSheBiaoTiHei</b>
      </div>

      <span class="time">当前时间：{{ cruuentTime }}</span>

      <span class="btn" @click="linkTo">{{ linkToBtn }}</span>
      <!-- <span class="btn" @click="setFullScreen(isFullscreen, () => { isFullscreen = !isFullscreen })">全屏</span> -->
    </div>

    <!-- 主体 -->
    <div class="data_screen_main">
      <!-- 主体左 -->
      <left-page ref="refLeftPage" />

      <!-- 主体中 -->
      <center-page ref="refCenterPage" />

      <!-- 主体右 -->
      <right-page ref="refRightPage" />
    </div>
  </scale-box>
</template>

<script setup>
// vue - core
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { useRouter /* useRoute */ } from "vue-router";
// pages
import LeftPage from "./components/LeftPage.vue";
import CenterPage from "./components/CenterPage.vue";
import RightPage from "./components/RightPage.vue";
// utils
import ScaleBox from "@/components/SacaleAuto/index.vue";
import { getDateTimeNowFormate, setFullScreen } from "@/utils/index.ts";
// api
// api相关
// import { apiCommon, setFullScreen } from "@/utils/index.js";
// import * as screenApi from "@/api/screen/screen";

/** props 参数 */
const props = defineProps({
  width: {
    type: Number,
    default: window.screen.width,
  },
  height: {
    type: Number,
    default: window.screen.height,
  },
  linkToBtn: {
    type: String,
    default: '返回',
  },
});

const btnListLink = (e) => {
  // router.push("/screen");
  router.push("/");

  const { target } = e
  const { innerText } = target
  // console.log(innerText)

  switch (innerText) {
    case 'xxxx1':
      console.log('xxxx1')
      break
    case 'xxxx2':
      console.log('xxxx2')
      break
    case 'xxxx3':
      console.log('xxxx3')
      break
    case 'xxxx4':
      console.log('xxxx4')
      break
    case 'xxxx5':
      console.log('xxxx5')
      break
  }
}

const refLeftPage = ref(null);
const refCenterPage = ref(null);
const refRightPage = ref(null);

let cruuentTime = ref(getDateTimeNowFormate());
let timmer = ref(null);
const router = useRouter();

let isFullscreen = ref(false)  // 是否全屏

watch(() => isFullscreen.value, () => {
  // resetAllChart()
})

// 监听
const getWatch = () => {
  // 监听esc退出全屏
  window.addEventListener('keydown', (e) => {
    // console.log('监听esc')
    if (e.keyCode === 39) {
      resetAllChart()
    }
  });

  // 创建Observer实例，并指定回调函数
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutations => {
      // 处理DOM变化
      resetAllChart()
    });
  });

  const targetNode = document.querySelector('.app-wrapper');
  // observer.observe(targetNode, { childList: true, subtree: true, attributes: true, characterData: true });

  if (targetNode) {
    observer.observe(targetNode, { attributes: true, attributeFilter: ['class'] });
  }
}

// 判断是否全屏
const getIsFullScreenStatus = (into, out) => {
  if (document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen) {
    isFullscreen.value = true

    if (into) { into() }
  } else {
    isFullscreen.value = false

    if (out) { out() }
  }
}

// 监听全屏状态修改标识
const setFullScreenFlag = (e) => {
  getIsFullScreenStatus() // 判断是否全屏

  window.addEventListener('fullscreenchange', (event) => {
    getIsFullScreenStatus(() => {
      // console.log('进入全屏模式');
    }, () => {
      // console.log('退出全屏模式');
    })
  });
}

const linkTo = () => {
  const { fullPath } = router.currentRoute.value

  switch (fullPath) {
    case '/index':
      router.push("/screen");
      break
    case '/screen':
      router.push("/");
      break
  }

  setFullScreenFlag()
};

const resetAllChart = () => {
  setTimeout(() => {
    nextTick(() => {
      refLeftPage.value && refLeftPage.value.resetChart()
      refCenterPage.value && refCenterPage.value.resetChart()
      refRightPage.value && refRightPage.value.resetChart()
    })
  }, 500)
}

// 页面初始化
const initPage = () => {
  // console.log('页面初始化')
  getcurrntTime(); //获取当前时间
  setFullScreenFlag() // 监听全屏状态修改标识

  getWatch() // 监听
};

// 获取当前时间
const getcurrntTime = () => {
  timmer.value = setInterval(() => {
    cruuentTime.value = getDateTimeNowFormate();
  }, 1000);
};

/**
 * 钩子
 */
// 挂载
onMounted(() => {
  initPage(); // 页面初始化
});

// 注销
onUnmounted(() => {
  clearInterval(timmer.value);
});

</script>

<style lang="scss" scoped>
$topHeight: 92px;
$mainBg: linear-gradient(to bottom, #163E70, rgb(1 11 58 / 30%));
$titleHeight: 35px;
$marginBetween: 8px;
$dotColor: #4ABEFE;
$mainFontFamily: YouSheBiaoTiHei;

* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.data_screen_container {
  overflow-x: auto;
  overflow-y: hidden;

  ::v-deep(.scale_box) {
    background: url("./images/bg.png") top no-repeat;
    background-size: 100% 100%;
    min-width: 1380px;
    // overflow-x: auto;
    // overflow-y: hidden;

    .data_screen_header {
      position: relative;
      width: 100%;
      max-height: $topHeight;
      color: #fff;
      overflow: hidden;

      img {
        position: relative;
        width: 100%;
        height: 120px;
        // height: 100px;
        z-index: 0;
      }

      .btn_list,
      .title,
      .time,
      .btn {
        position: absolute;
        z-index: 1;
        cursor: pointer;
      }

      ul.btn_list {
        top: 7px;
        left: 10px;

        li {
          position: relative;
          display: inline-block;
          width: 88px;
          height: 26px;
          cursor: pointer;

          &:not(:last-child) {
            margin-right: 10px;
          }

          .box,
          span {
            position: absolute;
            top: 0;
            left: 0;
            min-width: 88px
          }

          .box {
            display: block;
            width: 100%;
            height: 100%;
            transform: skew(-20deg);
            // transform: skew(23deg);
            background: linear-gradient(to left, #1F4F8A, #0f275a);
            border-radius: 5px;

            b {
              display: block;
              width: 100%;
              height: 100%;
              background: linear-gradient(to right, #1F4F8A, #0f275a);
              opacity: 0;
              transition: .5s linear;
              border-radius: 5px;
            }

            &+span {
              display: block;
              left: 51%;
              top: 50%;
              transform: translate(-50%, -50%);
              font-family: $mainFontFamily;
              font-size: 16px;
              color: #4ABEFE;
              line-height: 100%;
              text-align: center;
              opacity: .8;
              transition: .8s linear;
            }
          }

          &:hover {
            .box {

              &+span,
              b {
                opacity: 1;
                transition: .8s linear;
              }
            }
          }
        }
      }

      .title {
        // top: .6vw;
        top: 6px;
        left: 50%;
        transform: translateX(-50%);

        h3 {
          // font-size: 2.7vw;
          margin-bottom: .1vw;
          height: 50px;
          font-size: 45px;
          font-family: $mainFontFamily;
          font-weight: initial;
          -webkit-text-stroke: 1px rgba(25, 66, 129, 0.8);
          text-shadow: 0px 1px 10px #5470C6;
          letter-spacing: 3px;
          color: rgb(255 255 255 / 64%);
        }

        b {
          display: block;
          text-align: center;
          font-family: 'Aksara Bali Galang';
          color: rgba(204, 204, 204, 0.5);
          font-weight: initial;
          font-size: 12px;
          letter-spacing: 2px;
        }
      }

      .time {
        /* right: 1vw;
        top: 11px;
        font-size: .65vw; */
        right: 10px;
        top: 13px;
        font-size: 12px;
      }

      .btn {
        top: 3px;
        right: 24.5%;
        width: 85px;
        height: 38px;
        background: url("./images/link_btn.png") top no-repeat;
        background-size: 85% 105%;
        background-position: 6px -3px;
        text-align: center;
        /* line-height: 33px;
        font-size: 0.6vw; */
        line-height: 34px;
        font-size: 12px;
        cursor: pointer;
      }
    }

    .data_screen_main {
      display: flex;
      justify-content: space-between;
      width: 99%;
      margin: .3vw auto 0;
      height: calc(100% - $topHeight - .3vw * 2);
      z-index: 1;

      .data_screen_lf,
      .data_screen_ct,
      .data_screen_rg {
        overflow: auto;
        scrollbar-width: none;

        .scroll_auto {
          width: 100%;
          height: 100%;
          min-height: 678px;
          overflow: hidden;

          .dt_scrn_item {
            &.main_bg {
              background: $mainBg;
            }

            .scritm_title {
              position: relative;
              display: flex;
              justify-content: space-between;
              width: 100%;
              height: $titleHeight;
              background: linear-gradient(to right, #1F4F8A, rgba(31, 79, 138, 0));

              &::before,
              &::after {
                content: "";
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
              }

              &::before {
                left: 10px;
                width: 10px;
                height: 10px;
                background: url("./images/title_left.png") center no-repeat;
                background-size: 100% 100%;
                // cursor: pointer;
              }

              &::after {
                right: 10px;
                width: 17px;
                height: 17px;
                background: url("./images/title_right.png") center no-repeat;
                background-size: 100% 100%;
              }

              span {
                display: block;
                line-height: calc($titleHeight - 0px);
                color: #fff;

                &.title {
                  margin-left: 28px;
                  font-family: $mainFontFamily;
                  font-weight: initial;
                  color: #fff;

                }

                &.time {
                  font-size: 12px;
                  margin-right: 35px;
                  // margin-top: 1px;
                }
              }
            }

            .scritm_cont {
              width: 100%;
              min-height: 100px;
              height: calc(100% - $titleHeight);
              color: #fff;

              .data_dot_list {
                ul {
                  display: flex;

                  li {
                    dl {

                      dt,
                      dd {
                        display: inline-block;
                      }

                      dt {
                        position: relative;
                        top: -2px;
                        width: 6px;
                        height: 6px;
                        background: $dotColor;
                        border-radius: 50%;
                        margin-right: 10px;
                      }

                      dd {
                        font-size: 12px;

                        b {
                          color: $dotColor;
                          font-size: 20px;
                          margin: 0 6px;
                        }
                      }
                    }
                  }
                }

                &.inline {
                  ul {
                    display: flex;
                    // justify-content: space-between;
                    width: 92%;
                    // margin: 16px auto 0;

                    li {
                      dl {
                        dt {
                          width: 4px;
                          height: 4px;
                          margin-right: 3px;
                        }

                        dd {
                          span {
                            font-size: 11.5px;

                            b {
                              // margin-left: 5px;
                              font-size: 18px;
                            }
                          }
                        }
                      }
                    }
                  }
                }

                &.block {
                  ul {
                    width: 80%;
                    margin: 2.6% auto 0;

                    li {
                      dl {
                        dd {
                          font-size: 13.5px;

                          b {
                            margin: 0 6px;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .data_screen_lf,
      .data_screen_rg {
        min-height: 300px;
        // max-height: 878px;
        position: relative;
        // top: -2.5vw;
        // height: calc(100% + 2.5vw);
        top: -48px;
        height: calc(100% + 48px);
        width: 26%;
        background: $mainBg;

        .dt_scrn_item {
          height: calc(100% / 3);
          overflow: hidden;

          /* .scritm_cont {
            height: 83%;
          } */
        }
      }

      .data_screen_ct {
        flex: 1;
        margin: 0 $marginBetween;

        .dsren_ct_top,
        .dsren_ct_bot {
          display: flex;
          width: 100%;
          min-height: 100px;

          .dt_scrn_item {
            .scritm_cont {
              overflow: hidden;
            }
          }

          .dt_scrn_item:first-child {
            width: 65%;
            margin-right: $marginBetween;
          }

          .dt_scrn_item:last-child {
            flex: 1;
          }
        }

        .dsren_ct_top {
          margin-bottom: $marginBetween;
          height: 63%;
          overflow: hidden;

          .dt_scrn_item {
            .scritm_cont {
              // height: 93%;
            }
          }
        }

        .dsren_ct_bot {
          // height: calc(100% - 63% - $marginBetween);
          height: calc(100% - 63% - 1%);
          overflow: hidden;

          .dt_scrn_item {
            .scritm_cont {
              height: 87%;
            }
          }
        }
      }
    }
  }
}
</style>
