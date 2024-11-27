<template>
  <section class="block">
    <el-tooltip placement="top-start" effect="light">
      <!-- 提示信息 -->
      <template #content>
        <slot name="info" />
      </template>
      <!-- 文本 -->
      <slot name="btn" />
    </el-tooltip>
  </section>
</template>

<style lang="scss" scoped>
@use '../../scss/common.scss' as *;

.block {
  position: absolute;
  top: 0;
  right: 50%;
  width: 100px;
  height: 100px;
  opacity: 1;
  background: #fff;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transform: initial;
  transition: 0.2s linear;
  // text-align: center;

  &:hover {
    opacity: 1;
    transition: 0.2s linear;
    background: $normalHoverColor;
    color: #fff;

    ::v-deep span {

      .blank,
      .blank1,
      .blank2 {
        opacity: 1;
        transition: 0.2s linear;
        background: $normalHoverColor;
      }
    }
  }

  &.soon {
    background: $soonColor;

    &:hover {
      background: $soonHoverColor;

      ::v-deep span {

        .blank,
        .blank1,
        .blank2 {
          background: $soonHoverColor;
        }
      }
    }
  }

  &.empty {
    background: $emptyColor;

    &:hover {
      background: $emptyHoverColor;

      ::v-deep span {

        .blank,
        .blank1,
        .blank2 {
          background: $emptyHoverColor;
        }
      }
    }
  }
}

/* .el-popper.is-light {
  background: #f00;

  &:not(.el-cascader__dropdown.is-pure) {
    border: none !important;
    box-shadow: 0px 2px 8px 1px #747474;
    width: 195px;

    .popper__arrow {
      border-top-color: #6e6e6e !important;
    }
  }
} */

/* .block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  opacity: 1;
  background: $normalColor;
  cursor: pointer;
  // overflow: hidden;
  padding: 0;
  margin: 0;
  transform: initial;
  // border: none;
  transition: 0.2s linear;

  ::v-deep b {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-weight: initial;
    color: #ffffff;
  }

  &:hover {
    opacity: 1;
    transition: 0.2s linear;
    background: $normalHoverColor;

    ::v-deep span {
      .blank,
      .blank1,
      .blank2 {
        opacity: 1;
        transition: 0.2s linear;
        background: $normalHoverColor;
      }
    }
  }

  &.soon {
    background: $soonColor;

    &:hover {
      background: $soonHoverColor;

      ::v-deep span {
        .blank,
        .blank1,
        .blank2 {
          background: $soonHoverColor;
        }
      }
    }
  }

  &.empty {
    background: $emptyColor;

    &:hover {
      background: $emptyHoverColor;

      ::v-deep span {
        .blank,
        .blank1,
        .blank2 {
          background: $emptyHoverColor;
        }
      }
    }
  }
} */
</style>