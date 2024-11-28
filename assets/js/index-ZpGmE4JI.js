import{h as p,D as u,r as h,T as f,an as S,X as A,o as g,i as C,b as t,u as i,Q as x,t as w,e}from"./index-DTHai-rY.js";import R from"./AgeRatioChart-DZy4pJx7.js";import Y from"./AnnualUseChart-CIGpTRIQ.js";import E from"./ChinaMapChart-B0Ak1sjC.js";import M from"./HotPlateChart-BQZfutXY.js";import D from"./MaleFemaleRatioChart-3iDdxYKv.js";import I from"./OverNext30Chart-C0GlHF3f.js";import H from"./PlatformSourceChart-BXge2KBk.js";import b from"./RealTimeAccessChart-By335Q7x.js";import{_ as k}from"./plugin-vueexport-helper-DlAUqK2U.js";import"./index.vuevuetypescriptsetuptruenameEChartslang-vqZWlf7X.js";import"./index-DM3mYl3E.js";const n="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAHCAYAAACx3+twAAAAAXNSR0IArs4c6QAAAZ9JREFUSEvNlb9LHFEQxz/fE4MXsJEUVhaCndcKqSxVUspZHeS0zIGChYIEXcXGxuLQgzSiohD8Ucr5BwRBWxvRzkJSCXqFsuqOuIrE7O5bDQfxtW/m+2bmzWdGVqWIUUFkSTrGKRny6uXgbxPboIFrZhHjgBwaBxh5feX0Txubp4VG1hB9ib6PF8v4fNMoV5EYZshhrAM5x/s+YoxJyhKWZBcmYDvkEOsoRTDDGD3xgrZGH0GYWIsjqHMyFFSg+qIohlhgAjENNDj8Dwno1wgnkaLMk+Uy/NhiSmGrGAV5nMfZPf+o7ZHlggqkCBrVMKneqKCt0IZYRXQ7gjKMOZqY0gD+i8JU6CbgJ9Dq8K8hhlViOc7GPIoozMPd8ZCXF+34SIv/d4QWaSVgqQ4IbQMdb0UolvknhLZRiuB7RmiOZq4ovxWhxCFov2imRrkOCG0iul6B0HcNcPePCA2pxFY9EEreCk/qtksXxkfnoAo40xeOYwPa4APXfEaODfTgeMuRBvkdGZY/+IRPZ8qghBv24zZQuDQ82oG2FA1fHnv3y0m/CFsHcS4AAAAASUVORK5CYII=",B={class:"dataScreen-container"},Z={class:"dataScreen-header"},G={class:"header-lf"},U={class:"header-ri"},q={class:"header-time"},F={class:"dataScreen-main"},O={class:"dataScreen-lf"},V={class:"dataScreen-top"},y={class:"dataScreen-main-chart"},P={class:"dataScreen-center"},Q={class:"dataScreen-main-chart"},X={class:"dataScreen-bottom"},N={class:"dataScreen-main-chart"},z={class:"dataScreen-ct"},K={class:"dataScreen-map"},W={class:"dataScreen-cb"},L={class:"dataScreen-main-chart"},j={class:"dataScreen-rg"},J={class:"dataScreen-top"},T={class:"dataScreen-main-chart"},$={class:"dataScreen-center"},tt={class:"dataScreen-main-chart"},at={class:"dataScreen-bottom"},et={class:"dataScreen-main-chart"},st=p({name:"dataScreen"}),nt=p({...st,setup(rt){const _=u(),s=h(null);f(()=>{s.value&&(s.value.style.transform=`scale(${d()}) translate(-50%, -50%)`,s.value.style.width="1920px",s.value.style.height="1080px"),window.addEventListener("resize",o)});const o=()=>{s.value&&(s.value.style.transform=`scale(${d()}) translate(-50%, -50%)`)},d=(m=1920,a=1080)=>{let r=window.innerWidth/m,v=window.innerHeight/a;return r<v?r:v};let l=null,c=h(S().format("YYYY年MM月DD HH:mm:ss"));return l=setInterval(()=>{c.value=S().format("YYYY年MM月DD HH:mm:ss")},1e3),A(()=>{window.removeEventListener("resize",o),clearInterval(l)}),(m,a)=>(g(),C("div",B,[t("div",{class:"dataScreen-content",ref_key:"dataScreenRef",ref:s},[t("div",Z,[t("div",G,[t("span",{class:"header-screening",onClick:a[0]||(a[0]=r=>i(_).push(i(x)))},"首页")]),a[2]||(a[2]=t("div",{class:"header-ct"},[t("div",{class:"header-ct-title"},[t("span",null,"智慧旅游可视化大数据展示平台"),t("div",{class:"header-ct-warning"},"平台高峰预警信息（2条）")])],-1)),t("div",U,[a[1]||(a[1]=t("span",{class:"header-download"},"统计报告",-1)),t("span",q,"当前时间："+w(i(c)),1)])]),t("div",F,[t("div",O,[t("div",V,[a[3]||(a[3]=t("div",{class:"dataScreen-main-title"},[t("span",null,"实时游客统计"),t("img",{src:n,alt:""})],-1)),t("div",y,[e(b)])]),t("div",P,[a[4]||(a[4]=t("div",{class:"dataScreen-main-title"},[t("span",null,"男女比例"),t("img",{src:n,alt:""})],-1)),t("div",Q,[e(D)])]),t("div",X,[a[5]||(a[5]=t("div",{class:"dataScreen-main-title"},[t("span",null,"年龄比例"),t("img",{src:n,alt:""})],-1)),t("div",N,[e(R)])])]),t("div",z,[t("div",K,[a[6]||(a[6]=t("div",{class:"dataScreen-map-title"},"景区实时客流量",-1)),e(E)]),t("div",W,[a[7]||(a[7]=t("div",{class:"dataScreen-main-title"},[t("span",null,"未来30天游客量趋势图"),t("img",{src:n,alt:""})],-1)),t("div",L,[e(I)])])]),t("div",j,[t("div",J,[a[8]||(a[8]=t("div",{class:"dataScreen-main-title"},[t("span",null,"热门景区排行"),t("img",{src:n,alt:""})],-1)),t("div",T,[e(M)])]),t("div",$,[a[9]||(a[9]=t("div",{class:"dataScreen-main-title"},[t("span",null,"年度游客量对比"),t("img",{src:n,alt:""})],-1)),t("div",tt,[e(Y)])]),t("div",at,[a[10]||(a[10]=t("div",{class:"dataScreen-main-title"},[t("span",null,"预约渠道数据统计"),t("img",{src:n,alt:""})],-1)),t("div",et,[e(H)])])])])],512)]))}}),ft=k(nt,[["__scopeId","data-v-82a3a3db"]]);export{ft as default};