import{h as v,r as x,R as C,g as r,o as u,i as _,e as t,w as a,f as i,F,j as w,c as D,v as R}from"./index-CZ7w4WwZ.js";import{_ as B}from"./plugin-vueexport-helper-DlAUqK2U.js";const U={class:"card content-box"},$=v({name:"dynamicForm"}),q=v({...$,setup(I){const d=x(),n=C({domains:[{key:1,value:""}],email:""}),y=l=>{const e=n.domains.indexOf(l);e!==-1&&n.domains.splice(e,1)},b=()=>{n.domains.push({key:Date.now(),value:""})},g=async l=>{l&&await l.validate((e,s)=>{})},k=l=>{l&&l.resetFields()};return(l,e)=>{const s=r("el-button"),p=r("el-input"),m=r("el-form-item"),V=r("el-form");return u(),_("div",U,[t(s,{class:"add",type:"primary",plain:"",onClick:b},{default:a(()=>e[3]||(e[3]=[i(" Add Input ")])),_:1}),t(V,{ref_key:"formRef",ref:d,model:n,"label-width":"100px",class:"demo-dynamic"},{default:a(()=>[t(m,{prop:"email",label:"Email",rules:[{required:!0,message:"Please input email address",trigger:"blur"},{type:"email",message:"Please input correct email address",trigger:["blur","change"]}]},{default:a(()=>[t(p,{modelValue:n.email,"onUpdate:modelValue":e[0]||(e[0]=o=>n.email=o)},null,8,["modelValue"])]),_:1}),(u(!0),_(F,null,w(n.domains,(o,f)=>(u(),D(m,{key:o.key,label:"Domain"+f,prop:"domains."+f+".value",rules:{required:!0,message:"domain can not be null",trigger:"blur"}},{default:a(()=>[t(p,{modelValue:o.value,"onUpdate:modelValue":c=>o.value=c},{append:a(()=>[t(s,{type:"danger",plain:"",class:"mt-2",onClick:R(c=>y(o),["prevent"])},{default:a(()=>e[4]||(e[4]=[i(" Delete ")])),_:2},1032,["onClick"])]),_:2},1032,["modelValue","onUpdate:modelValue"])]),_:2},1032,["label","prop"]))),128)),t(m,null,{default:a(()=>[t(s,{type:"primary",onClick:e[1]||(e[1]=o=>g(d.value))},{default:a(()=>e[5]||(e[5]=[i(" Submit ")])),_:1}),t(s,{onClick:e[2]||(e[2]=o=>k(d.value))},{default:a(()=>e[6]||(e[6]=[i(" Reset ")])),_:1})]),_:1})]),_:1},8,["model"])])}}}),j=B(q,[["__scopeId","data-v-ea63a832"]]);export{j as default};
