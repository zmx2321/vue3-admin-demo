<template>
  <section class="health_overview_wrap">
    <!-- <div class="controlBtn" >
      <el-button v-if="showDiv"  :icon="DArrowRight" circle  @click="fnButton"/>
      <el-button v-else :icon="DArrowRight" circle />
    </div> -->
    <div class="health_overview_cont">
      <div class="title">
        概览
        <!-- <span class="titleSpan">{{ nowDate }}</span> -->
      </div>
      <div class="dataSection">
        <el-row :gutter="24" class="rowClass">
          <el-col :span="12">
            <el-card shadow="hover">
              <!-- <img src="../icon/healthScore4.svg" alt="" style="float: left; padding-right: 8px" /> -->
              <div class="box">
                <!-- <div class="boxtop">{{ averageScore }}</div> -->
                <div class="boxbottom">xxxx</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <!-- <img src="../icon/count.svg" alt="" style="float: left; padding-right: 8px" /> -->
              <div class="box">
                <!-- <div class="boxtop">{{ stationTotal }}</div> -->
                <div class="boxbottom">xxxx</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="rowClass">
          <el-col :span="12">
            <el-card shadow="hover">
              <!-- <img src="../icon/4Gsource.svg" alt="" style="float: left; padding-right: 8px" /> -->
              <div class="box">
                <!-- <div class="boxtop">{{ sourceTotal4g }}</div> -->
                <div class="boxbottom">xxxx</div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="hover">
              <!-- <img src="../icon/5Gsource.svg" alt="" style="float: left; padding-right: 8px" /> -->
              <div class="box">
                <!-- <div class="boxtop">{{ sourceTotal5g }}</div> -->
                <div class="boxbottom">xxxx</div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <!-- <el-divider></el-divider> -->
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { Message, DArrowRight, DArrowLeft } from "@element-plus/icons-vue";

const thisTime = new Date();
//const nowDate = thisTime.toLocaleDateString("zh").replaceAll("/", "-");
const nowDate = ref("")
//获取昨天的日期
const yesterday = new Date(thisTime - 24 * 60 * 60 * 1000);
//将yesterday转换为YYYY-MM-DD格式的日期字符串
const yesterdayStr = yesterday.toLocaleDateString("zh").replaceAll("/", "-");
const showDiv = ref(true);

const averageScore = ref();
const stationTotal = ref();
const sourceTotal4g = ref();
const sourceTotal5g = ref();



const loadOverview = () => {
  console.log("loadOverview");
};

loadOverview()

function dateFormatter(row, column, cellValue, index) {
  if (!cellValue) {
    return;
  }
  // 创建一个新的 Date 对象
  var originalDate = new Date(cellValue);

  // 获取年、月、日、时、分、秒
  var year = originalDate.getFullYear();
  var month = ("0" + (originalDate.getMonth() + 1)).slice(-2);
  var day = ("0" + originalDate.getDate()).slice(-2);
  var hours = ("0" + originalDate.getHours()).slice(-2);
  var minutes = ("0" + originalDate.getMinutes()).slice(-2);
  var seconds = ("0" + originalDate.getSeconds()).slice(-2);

  // 格式化输出
  var formattedDateTimeString = year + "-" + month + "-" + day;
  return formattedDateTimeString;
}

function fnButton() {
  showDiv.value = false;
}
</script>

<style lang="scss" scoped>
.health_overview_wrap {
  display: block;
  position: absolute;
  top: 70px;
  right: 32px;
  padding: 0;
  width: 467px;
  z-index: 1;

  .controlBtn {
    display: block;
    float: left;
    padding: 0;
    z-index: 1;
  }

  .health_overview_cont {
    width: 100%;
    min-height: 100px;
    max-height: 70vh;
    padding: 10px 10px 0 10px;
    /* overflow: auto; */
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    /* box-sizing: border-box; */

    .title {
      width: 100%;
      font-weight: bold;
      margin-bottom: 20px;

      .titleSpan {
        /* border: 1px solid #000; */
        float: right;
        margin-right: 20px;
        font-weight: 100;
        font-size: small;
      }
    }

    .dataSection {
      /* margin-bottom: 20px; */

      .rowClass {
        margin-bottom: 20px;
        /* padding-left: 20px; */

        .box {
          display: inline-block;
          height: 100%;
          /* padding-left: 3px; */

          .boxtop {
            /* height: 0%;  */
            /* margin-bottom: 10px; */
            font-size: 25px;
            /* font-weight: bold;   */
            color: #4b4a4a;
          }

          .boxbottom {
            font-size: 12px;
            color: #5c5a5a;
          }
        }
      }
    }
  }
}

:deep(.el-card__body) {
  padding: 0;
}
</style>