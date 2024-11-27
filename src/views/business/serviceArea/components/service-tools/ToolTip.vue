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

    ::v-deep(span) {

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

      ::v-deep(span) {

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

      ::v-deep(span) {

        .blank,
        .blank1,
        .blank2 {
          background: $emptyHoverColor;
        }
      }
    }
  }
}
</style>