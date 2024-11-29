import{u as d}from"./useHandleData-DbhuhTZJ.js";import{_ as T}from"./index.vuevuetypescriptsetuptruenameProTablelang-DSnEshnF.js";import{h as w,r as L,R as N,g as c,o as R,i as $,e as n,w as s,u as i,a0 as D,f as p,aH as U,a2 as m,t as E,H,b as P,P as b}from"./index-rmEceGgx.js";import{b as V,c as A,a as B,d as f,r as q}from"./user-pGiYfmjU.js";import"./sortable.esm-DkKE9Vxu.js";import"./plugin-vueexport-helper-DlAUqK2U.js";import"./servicePort-D3LIsGOm.js";const M={class:"table-box"},j=w({name:"complexProTable"}),Y=w({...j,setup(G){const o=L(),g=N([{type:"selection",width:80},{type:"index",label:"#",width:80},{type:"expand",label:"Expand",width:100},{prop:"base",label:"基本信息",headerRender:t=>n(c("el-button"),{type:"primary",onClick:()=>b.success("我是通过 tsx 语法渲染的表头")},{default:()=>[t.column.label]}),_children:[{prop:"username",label:"用户姓名",width:110},{prop:"user.detail.age",label:"年龄",width:100},{prop:"gender",label:"性别",width:100,enum:V,fieldNames:{label:"genderLabel",value:"genderValue"}},{prop:"details",label:"详细资料",_children:[{prop:"idCard",label:"身份证号"},{prop:"email",label:"邮箱"},{prop:"address",label:"居住地址"}]}]},{prop:"status",label:"用户状态",tag:!0,enum:A,fieldNames:{label:"userLabel",value:"userStatus"}},{prop:"createTime",label:"创建时间",width:200},{prop:"operation",label:"操作",fixed:"right",width:230}]),y=()=>{var t,e,a,l,r,u;(a=(t=o.value)==null?void 0:t.element)==null||a.setCurrentRow((e=o.value)==null?void 0:e.tableData[4]),(u=(l=o.value)==null?void 0:l.element)==null||u.toggleRowSelection((r=o.value)==null?void 0:r.tableData[4],!0)},_=t=>{const{columns:e}=t,a=[];return e.forEach((l,r)=>{if(r===0)return a[r]="合计";a[r]="N/A"}),a},C=({rowIndex:t,columnIndex:e})=>{if(e===3)return t%2===0?{rowspan:2,colspan:1}:{rowspan:0,colspan:0}},v=({rowIndex:t})=>t===2?"warning-row":t===6?"success-row":"",k=(t,e)=>{e.property=="radio"||e.property=="operation"||b.success("当前行被点击了！")},h=async t=>{var e;await d(f,{id:[t.id]},`删除【${t.username}】用户`),(e=o.value)==null||e.getTableList()},x=async t=>{var e,a;await d(f,{id:t},"删除所选用户信息"),(e=o.value)==null||e.clearSelection(),(a=o.value)==null||a.getTableList()},S=async t=>{var e;await d(q,{id:t.id},`重置【${t.username}】用户密码`),(e=o.value)==null||e.getTableList()};return(t,e)=>{const a=c("el-button");return R(),$("div",M,[n(T,{ref_key:"proTable",ref:o,title:"用户列表","highlight-current-row":"",columns:g,"request-api":i(B),"row-class-name":v,"span-method":C,"show-summary":!0,"summary-method":_,onRowClick:k},{tableHeader:s(l=>{var r,u;return[n(a,{type:"primary",icon:i(D),onClick:(u=(r=o.value)==null?void 0:r.element)==null?void 0:u.toggleAllSelection},{default:s(()=>e[0]||(e[0]=[p("全选 / 全不选")])),_:1},8,["icon","onClick"]),n(a,{type:"primary",icon:i(U),plain:"",onClick:y},{default:s(()=>e[1]||(e[1]=[p("选中第五行")])),_:1},8,["icon"]),n(a,{type:"danger",icon:i(m),plain:"",disabled:!l.isSelected,onClick:z=>x(l.selectedListIds)},{default:s(()=>e[2]||(e[2]=[p(" 批量删除用户 ")])),_:2},1032,["icon","disabled","onClick"])]}),expand:s(l=>[p(E(l.row),1)]),operation:s(l=>[n(a,{type:"primary",link:"",icon:i(H),onClick:r=>S(l.row)},{default:s(()=>e[3]||(e[3]=[p("重置密码")])),_:2},1032,["icon","onClick"]),n(a,{type:"primary",link:"",icon:i(m),onClick:r=>h(l.row)},{default:s(()=>e[4]||(e[4]=[p("删除")])),_:2},1032,["icon","onClick"])]),append:s(()=>e[5]||(e[5]=[P("span",{style:{color:"var(--el-color-primary)"}},"我是插入在表格最后的内容。若表格有合计行，该内容会位于合计行之上。",-1)])),_:1},8,["columns","request-api"])])}}});export{Y as default};
