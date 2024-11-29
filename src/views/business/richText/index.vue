<template>
  <section class="rich_text_wrap">
    <quill-editor v-model="content" v-model:modelValue="modelValue" />
    <!-- {{ modelValue }}
    <br />
    {{ content }} -->
  </section>
</template>

<script setup>
import { ref } from 'vue';
import QuillEditor from "@/components/RichText/QuillEditor/index.vue";

const content = ref('<p>初始内容</p>');
let modelValue = ref('');
</script>

<style scoped lang="scss">
.rich_text_wrap {}
</style>
