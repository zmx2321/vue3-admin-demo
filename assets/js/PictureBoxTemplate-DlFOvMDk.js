import{m as i}from"./mittBus-rOgeEvW-.js";import{b as m}from"./business-HRy26dEV.js";import{_ as l}from"./plugin-vueexport-helper-DlAUqK2U.js";import{o as p,i as u,b as d,d as f}from"./index-eXa7AXcn.js";const _=["src"],B={__name:"PictureBoxTemplate",props:{areaImage:{type:String,default:()=>{}}},setup(s){const{setCurrentBunkNo:n}=m();let t="";const r=o=>{let{target:e,type:c}=o,{nodeName:a}=e;a==="DIV"&&(t=e.parentNode.textContent),e.nodeName==="B"&&(t=e.textContent),c==="click"&&(a==="DIV"||a==="B")&&i.emit("clickArea",t),n(t)};return(o,e)=>(p(),u("section",{class:"picture_box",onMouseover:r,onClick:r},[d("img",{src:s.areaImage},null,8,_),f(o.$slots,"default",{},void 0,!0)],32))}},I=l(B,[["__scopeId","data-v-75e3fa91"]]);export{I as default};