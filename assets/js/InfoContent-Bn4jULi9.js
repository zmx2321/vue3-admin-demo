import{b as d}from"./business-EjGEyhiS.js";import{_ as a}from"./plugin-vueexport-helper-DlAUqK2U.js";import{r as i,o as f,i as p,b as l,t as u}from"./index-CZ7w4WwZ.js";const m={class:"info_content"},k={__name:"InfoContent",setup(B){const o=d(),e=o.currentBunkNo,r=o.currentBunkList,t=i(...r.filter(s=>s.bunkNo===e));return(s,n)=>(f(),p("section",m,[l("ul",null,[l("li",null,[l("dl",null,[n[0]||(n[0]=l("dt",null,"归属：",-1)),l("dd",null,u(t.value.type===1?"嘉兴二楼":"嘉兴三楼"),1)])]),l("li",null,[l("dl",null,[n[1]||(n[1]=l("dt",null,"编号：",-1)),l("dd",null,u(t.value.bunkNo),1)])]),l("li",null,[l("dl",null,[n[2]||(n[2]=l("dt",null,"名称：",-1)),l("dd",null,u(t.value.name),1)])]),l("li",null,[l("dl",null,[n[3]||(n[3]=l("dt",null,"详情：",-1)),l("dd",null,u(t.value.detail),1)])]),l("li",null,[l("dl",null,[n[4]||(n[4]=l("dt",null,"状态：",-1)),l("dd",null,u(t.value.status),1)])])])]))}},c=a(k,[["__scopeId","data-v-f76b29d4"]]);export{c as default};