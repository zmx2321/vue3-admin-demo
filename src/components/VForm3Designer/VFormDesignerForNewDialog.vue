<template>
  <el-dialog title="表单设计" v-model="showDialog" :close-on-click-modal="false" :close-on-press-escape="false" fullscreen>
    <div class="vform-design-wrap">
      <v-form-designer :banned-widgets="bannedWidgets" :designer-config="designerConfig" ref="VFormDesignerRef"
        :form-templates="formTemplates"></v-form-designer>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="saveFormJson">下一步</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, toRefs, reactive, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()

let formTemplates = ref()

let showDialog = ref(true)
const VFormDesignerRef = ref(null)
let formJson = {}
let currentStatus = '创建'
let formData = {
  config: '',
  row: {}
}
// 保存表单
function saveFormJson() {
  /* formJson = VFormDesignerRef.value.getFormJson()
  formData.formConfig.content = JSON.stringify(formJson)
  http('apiReportPost', { ...formData }).then((res) => {
    showDialog.value = false
    ElMessage({
      message: '保存成功',
      type: 'success'
    })
    instance?.proxy?.emitter.emit('refreshReportTable')
  }) */

  // if (currentStatus === '创建') {
  formJson = VFormDesignerRef.value.getFormJson()
  formData.config = JSON.stringify(formJson)
  // }

  // console.log(formData)
  // if (formData.formConfig) {
  // }
  // formData = {
  //   formConfig: {
  //     content: JSON.stringify(formJson)
  //   }
  // }

  console.log('formData数据', formData)

  showDialog.value = false
}
// 显示弹框
function show() {
  nextTick(() => {
    VFormDesignerRef.value.clearDesigner()
  })
}
// 能源管理平台
const nyJson = [
  {
    title: '高速公路板块能耗',
    imgUrl: '/vformtemplates/highway.jpg',
    jsonUrl: '/vformtemplates/highway.json',
    description: '表单模板详细说明...'
  }
]
// 数字手机平台
const szJson = [
  {
    title: '交通无人机现状问卷',
    imgUrl: '/vformtemplates/drone.jpg',
    jsonUrl: '/vformtemplates/drone.json',
    description: '表单模板详细说明...'
  }
]

//  初始化表单模板
const initFormTemplates = () => {
  formTemplates.value = import.meta.env.VITE_APP_NAME === '能源管理平台' ? nyJson : szJson
}

// 导出方法
defineExpose({ show })

// 禁止显示的表单组件
const bannedWidgets = [
  'tab',
  'time-range',
  'date-range',
  'table',
  'rate',
  'html-text',
  'color',
  'slider',
  'picture-upload',
  'file-upload',
  'rich-editor',
  'cascader'
]
// 显示的内容
const designerConfig = {
  //是否显示语言切换菜单
  languageMenu: false,
  //是否显示GitHub、文档等外部链接
  externalLink: false,
  //是否显示表单模板
  formTemplates: true,
  //是否禁止修改唯一名称
  widgetNameReadonly: false,
  //是否显示组件事件属性折叠面板
  eventCollapse: true,
  //是否显示清空设计器按钮
  clearDesignerButton: true,
  //是否显示预览表单按钮
  previewFormButton: true,
  //是否显示导入JSON按钮
  importJsonButton: true,
  //是否显示导出JSON器按钮
  exportJsonButton: true,
  //是否显示导出代码按钮
  exportCodeButton: false,
  //是否显示生成SFC按钮
  generateSFCButton: false,
  toolbarMaxWidth: 300,
  toolbarMinWidth: 300,
  //表单设计器预设CSS代码
  presetCssCode: ''
}
</script>
<style lang="scss" scoped>
.vform-design-wrap {
  height: 76vh;

  ::v-deep(.float-right.external-link) {
    display: none;
  }

  ::v-deep(.el-header.main-header) {
    display: none;
  }

  ::v-deep(.el-container.full-height) {
    overflow-y: auto;
  }
}
</style>

<style lang="scss">
.el-dialog.is-fullscreen {
  position: relative;

  .el-dialog__footer {
    position: fixed;
    right: 0;
    bottom: 0;
  }
}
</style>
