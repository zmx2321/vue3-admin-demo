import{_ as v}from"./plugin-vueexport-helper-DlAUqK2U.js";import{h as d,r,o as x,g as F,w as l,a as u,b as n,p,e as g,u as _,M as J,c as N,d as y}from"./index-CzX2ZHHe.js";const M={class:"vform-design-wrap"},R={class:"dialog-footer"},T={__name:"VFormDesignerForNewDialog",setup(V,{expose:a}){let t=d(),e=d(!0);const s=d(null);let f={},m={config:"",row:{}};function b(){f=s.value.getFormJson(),m.config=JSON.stringify(f),e.value=!1}function C(){J(()=>{s.value.clearDesigner()})}a({show:C});const D=["tab","time-range","date-range","table","rate","html-text","color","slider","picture-upload","file-upload","rich-editor","cascader"],w={languageMenu:!1,externalLink:!1,formTemplates:!0,widgetNameReadonly:!1,eventCollapse:!0,clearDesignerButton:!0,previewFormButton:!0,importJsonButton:!0,exportJsonButton:!0,exportCodeButton:!1,generateSFCButton:!1,toolbarMaxWidth:300,toolbarMinWidth:300,presetCssCode:""};return(S,o)=>{const B=r("v-form-designer"),c=r("el-button"),k=r("el-dialog");return x(),F(k,{title:"表单设计",modelValue:_(e),"onUpdate:modelValue":o[1]||(o[1]=i=>p(e)?e.value=i:e=i),"close-on-click-modal":!1,"close-on-press-escape":!1,fullscreen:""},{footer:l(()=>[u("div",R,[n(c,{onClick:o[0]||(o[0]=i=>p(e)?e.value=!1:e=!1)},{default:l(()=>o[2]||(o[2]=[g("取消")])),_:1}),n(c,{type:"primary",onClick:b},{default:l(()=>o[3]||(o[3]=[g("下一步")])),_:1})])]),default:l(()=>[u("div",M,[n(B,{"banned-widgets":D,"designer-config":w,ref_key:"VFormDesignerRef",ref:s,"form-templates":_(t)},null,8,["form-templates"])])]),_:1},8,["modelValue"])}}},W=v(T,[["__scopeId","data-v-3fe18c2c"]]),h={class:"card content-box"},I=y({name:"serviceArea"}),O=Object.assign(I,{setup(V){return(a,t)=>{const e=r("el-input");return x(),N("div",h,[t[1]||(t[1]=u("span",{class:"text"},"业务示例0 🍓🍇🍈🍉",-1)),n(e,{modelValue:a.value,"onUpdate:modelValue":t[0]||(t[0]=s=>a.value=s),placeholder:"测试缓存"},null,8,["modelValue"]),n(W)])}}}),j=v(O,[["__scopeId","data-v-0321c93d"]]);export{j as default};