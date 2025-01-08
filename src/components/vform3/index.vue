<template>
    <v-form-designer class="vform_designer_wrap" ref="VFormDesignerRef" :banned-widgets="bannedWidgets"
        :designer-config="designerConfig" :form-templates="formTemplates"></v-form-designer>
</template>

<script setup>
import { ref } from 'vue'

const VFormDesignerRef = ref(null)

// 禁止显示的表单组件
const bannedWidgets = [
    // 'tab',
    /* 'tab',
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
    'cascader' */
]
// 显示的内容
const designerConfig = {
    /* //是否显示语言切换菜单
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
    presetCssCode: '' */
}

// 模板
const formTemplates = [
    {
        title: '一个简单的人员信息登记表',
        imgUrl: '/vform-template/image/test1.png',
        jsonUrl: '/vform-template/json/test1.json',
        // description: '表单模板详细说明...'
    },
    {
        title: 'test2',
        imgUrl: '/vform-template/image/drone.jpg',
        jsonUrl: '/vform-template/json/drone.json',
        // description: '表单模板详细说明...'
    },
    {
        title: 'test3',
        imgUrl: '/vform-template/image/highway.jpg',
        jsonUrl: '/vform-template/json/highway.json',
        // description: '表单模板详细说明...'
    }
]

// 保存表单
function saveFormJson() {
    formJson = VFormDesignerRef.value.getFormJson()
    formData.config = JSON.stringify(formJson)

    console.log('formData数据', formData)
}
</script>

<style lang="scss" scoped>
.vform_designer_wrap {
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden;

    :deep .main-content {
        aside.el-aside {
            height: 90vh !important;
            overflow-y: auto;
        }

        section.el-container {
            main.el-main {
                height: 84vh !important;
                overflow-y: auto;
            }
        }
    }

    :deep .float-right.external-link {
        display: none;
    }

    :deep .el-header.main-header {
        display: none;
    }

    :deep .el-container.full-height {
        overflow-y: auto;
    }
}
</style>