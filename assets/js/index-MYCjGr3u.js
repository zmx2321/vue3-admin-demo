import{d as f,h as i,s as T,I as C,r as c,o as u,c as _,b as n,w as s,u as F,v as O,x as R,g as k,a as y,F as j,f as z,y as E,t as P,e as m}from"./index-B9g2qbht.js";import{_ as w}from"./plugin-vueexport-helper-DlAUqK2U.js";const h={class:"icon-box"},q={class:"icon-list"},A=["onClick"],G=f({name:"SelectIcon"}),H=f({...G,props:{iconValue:{default:""},title:{default:"请选择图标"},clearable:{type:Boolean,default:!0},placeholder:{default:"请选择图标"}},emits:["update:iconValue"],setup(I,{emit:r}){const e=i(I.iconValue),a=i(!1),v=()=>a.value=!0,d=r,$=l=>{a.value=!1,e.value=l.name,d("update:iconValue",l.name),setTimeout(()=>V.value.blur(),0)},V=i(),L=()=>{e.value="",d("update:iconValue",""),setTimeout(()=>V.value.blur(),0)},p=i(""),b=C,g=T(()=>{if(!p.value)return C;let l={};for(const o in b)o.toLowerCase().indexOf(p.value.toLowerCase())>-1&&(l[o]=b[o]);return l});return(l,o)=>{const U=c("el-button"),x=c("el-input"),D=c("el-scrollbar"),N=c("el-empty"),S=c("el-dialog");return u(),_("div",h,[n(x,O({ref_key:"inputRef",ref:V,modelValue:e.value,"onUpdate:modelValue":o[0]||(o[0]=t=>e.value=t)},l.$attrs,{placeholder:l.placeholder,clearable:l.clearable,onClear:L,onClick:v}),{append:s(()=>[n(U,{icon:F(b)[l.iconValue]},null,8,["icon"])]),_:1},16,["modelValue","placeholder","clearable"]),n(S,{modelValue:a.value,"onUpdate:modelValue":o[2]||(o[2]=t=>a.value=t),title:l.placeholder,top:"50px",width:"66%"},{default:s(()=>[n(x,{modelValue:p.value,"onUpdate:modelValue":o[1]||(o[1]=t=>p.value=t),placeholder:"搜索图标",size:"large","prefix-icon":R},null,8,["modelValue","prefix-icon"]),Object.keys(g.value).length?(u(),k(D,{key:0},{default:s(()=>[y("div",q,[(u(!0),_(j,null,z(g.value,t=>(u(),_("div",{key:t,class:"icon-item",onClick:W=>$(t)},[(u(),k(E(t))),y("span",null,P(t.name),1)],8,A))),128))])]),_:1})):(u(),k(N,{key:1,description:"未搜索到您要找的图标~"}))]),_:1},8,["modelValue","title"])])}}}),J=w(H,[["__scopeId","data-v-95a96df3"]]),K={class:"card content-box"},M=f({name:"selectIcon"}),Q=f({...M,setup(I){const r=i("");return(B,e)=>{const a=c("el-descriptions-item"),v=c("el-descriptions");return u(),_("div",K,[e[5]||(e[5]=y("span",{class:"text"}," 图标选择器 🍓🍇🍈🍉",-1)),n(J,{"icon-value":r.value,"onUpdate:iconValue":e[0]||(e[0]=d=>r.value=d)},null,8,["icon-value"]),n(v,{title:"配置项 📚",column:1,border:""},{default:s(()=>[n(a,{label:"iconValue"},{default:s(()=>e[1]||(e[1]=[m(' 双向绑定的icon值，使用示例：v-model:icon-value="iconValue" ')])),_:1}),n(a,{label:"title"},{default:s(()=>e[2]||(e[2]=[m(" 弹窗标题 ")])),_:1}),n(a,{label:"clearable"},{default:s(()=>e[3]||(e[3]=[m(" 是否可清空，默认为 true ")])),_:1}),n(a,{label:"placeholder"},{default:s(()=>e[4]||(e[4]=[m(" 输入框占位文本 ")])),_:1})]),_:1})])}}}),Z=w(Q,[["__scopeId","data-v-634262bd"]]);export{Z as default};
