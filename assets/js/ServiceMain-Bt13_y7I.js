import{m as f}from"./mittBus-rOgeEvW-.js";import{b as n}from"./business-DEvFIr8w.js";import k from"./jiaXingPictureBox1-DEZtmLBE.js";import d from"./jiaXingPictureBox2-CAVBROhr.js";import y from"./AreaDetail-CwuPpUY_.js";import{_ as N}from"./plugin-vueexport-helper-DlAUqK2U.js";import{r as c,o as s,i as b,b as i,c as u,Y as m,e as B,F as v,O as x}from"./index-CCA_-42S.js";import"./PictureBoxContent-DNjYxYNi.js";import"./PictureBoxTemplate-AY71zI24.js";import"./ToolTip-DA3_VNIT.js";import"./InfoContent-CSjMjKpZ.js";const D=0,g=!0,h=[{name:"店铺1-1",bunkNo:"No-1-1",detail:"店铺1-1信息",status:"正常",type:1},{name:"店铺1-2",bunkNo:"No-1-2",detail:"店铺1-2信息",status:"空铺",type:1},{name:"店铺1-3",bunkNo:"No-1-3",detail:"店铺1-3信息",status:"临期",type:1},{name:"店铺2-1",bunkNo:"No-2-1",detail:"店铺2-1信息",status:"临期",type:2},{name:"店铺2-2",bunkNo:"No-2-2",detail:"店铺2-2信息",status:"正常",type:2},{name:"店铺2-3",bunkNo:"No-2-3",detail:"店铺2-3信息",status:"空铺",type:2}],l={code:D,success:g,content:h},A={class:"service_main_wrap"},C={class:"pic_box"},S={__name:"ServiceMain",setup(w,{expose:p}){const{setCurrentBunkList:o}=n(),_=n(),a=c(""),r=c(null);return f.on("clickArea",e=>{r.value.showDetailDialog(e,_.currentBunkList)}),p({setImgUrlByCity:e=>{switch(e){case"1-1":o(l.content.filter(t=>t.type===1));break;case"1-2":o(l.content.filter(t=>t.type===2));break}x(()=>{a.value=e})}}),(e,t)=>(s(),b(v,null,[i("section",A,[i("div",C,[a.value==="1-1"?(s(),u(k,{key:0})):m("",!0),a.value==="1-2"?(s(),u(d,{key:1})):m("",!0)])]),B(y,{ref_key:"refAreaDetail",ref:r},null,512)],64))}},Y=N(S,[["__scopeId","data-v-043ffda4"]]);export{Y as default};
