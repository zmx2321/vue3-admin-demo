import{d as c,h as p,r as d,o as t,c as u,b as f,g as a,w as l,F as y,f as v,y as r,v as s,u as n,a6 as x}from"./index-CzX2ZHHe.js";import{_ as I}from"./plugin-vueexport-helper-DlAUqK2U.js";const w={class:"card content-box"},g=c({name:"proForm"}),N=c({...g,setup(V){let o=p({});const m=p({form:{inline:!1,labelPosition:"right",labelWidth:"80px",size:"default",disabled:!1,labelSuffix:" :"},columns:[{formItem:{label:"用户名",prop:"username",labelWidth:"80px",required:!0},attrs:{typeName:"input",clearable:!0,placeholder:"请输入用户名",disabled:!0}},{formItem:{label:"密码",prop:"password",class:"data"},attrs:{typeName:"input",clearable:!0,autofocus:!0,placeholder:"请输入密码",type:"password"}},{formItem:{label:"邮箱",prop:"email"},attrs:{typeName:"input",placeholder:"请输入邮箱",clearable:!0,style:"width:500px"}}]});return(i,k)=>{const _=d("el-alert"),b=d("el-form-item");return t(),u("div",w,[f(_,{title:"通过 component :is 组件属性 && v-bind 属性透传，可以将 template 中的 html 代码全部改变为 columns 配置项，具体配置请看代码。",type:"warning",closable:!1}),(t(),a(r("el-form"),s(m.value.form,{ref:"proFormRef",model:n(o)}),{default:l(()=>[(t(!0),u(y,null,v(m.value.columns,e=>(t(),a(r("el-form-item"),s({key:e.prop,ref_for:!0},e.formItem),{default:l(()=>[(t(),a(r(`el-${e.attrs.typeName}`),s({ref_for:!0},e.attrs,{modelValue:n(o)[e.formItem.prop],"onUpdate:modelValue":h=>n(o)[e.formItem.prop]=h}),null,16,["modelValue","onUpdate:modelValue"]))]),_:2},1040))),128)),f(b,null,{default:l(()=>[x(i.$slots,"operation",{},void 0,!0)]),_:3})]),_:3},16,["model"]))])}}}),B=I(N,[["__scopeId","data-v-967f127b"]]);export{B as default};