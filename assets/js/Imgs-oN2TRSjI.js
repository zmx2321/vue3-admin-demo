import{h as C,af as Z,r as h,ag as A,G as I,x as q,g as u,o as m,i as _,e as s,w as p,F as J,b as o,v as F,Y as w,d as S,q as M,c as N,a9 as f,Z as P,_ as H,U as O,u as Q,ah as W}from"./index-CCA_-42S.js";import{u as K}from"./upload-B3J7jE1u.js";import{_ as G}from"./plugin-vueexport-helper-DlAUqK2U.js";const X={class:"upload-box"},x=["src"],ee={key:1,class:"upload-empty"},le={class:"el-upload__tip"},te=C({name:"UploadImg"}),ae=C({...te,props:{imageUrl:{default:""},api:{},drag:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},fileSize:{default:5},fileType:{default:()=>["image/jpeg","image/png","image/gif"]},height:{default:"150px"},width:{default:"150px"},borderRadius:{default:"8px"}},emits:["update:imageUrl"],setup(z,{emit:E}){Z(t=>({"21cec5b4":t.width,"4ba7e472":t.height,"7492ff04":t.borderRadius}));const i=z,c=h("id-"+A()),g=h(!1),r=I(P,void 0),n=I(H,void 0),y=q(()=>i.disabled||(r==null?void 0:r.disabled)),U=E,k=async t=>{let a=new FormData;a.append("file",t.file);try{const e=i.api??K,{data:l}=await e(a);U("update:imageUrl",l.fileUrl),n!=null&&n.prop&&(r==null||r.validateField([n.prop]))}catch(e){t.onError(e)}},T=()=>{U("update:imageUrl","")},D=()=>{const t=document.querySelector(`#${c.value} .el-upload__input`);t&&t.dispatchEvent(new MouseEvent("click"))},B=t=>{const a=t.size/1024/1024<i.fileSize,e=i.fileType.includes(t.type);return e||f({title:"温馨提示",message:"上传图片不符合所需的格式！",type:"warning"}),a||setTimeout(()=>{f({title:"温馨提示",message:`上传图片大小不能超过 ${i.fileSize}M！`,type:"warning"})},0),e&&a},L=()=>{f({title:"温馨提示",message:"图片上传成功！",type:"success"})},$=()=>{f({title:"温馨提示",message:"图片上传失败，请您重新上传！",type:"error"})};return(t,a)=>{const e=u("Edit"),l=u("el-icon"),d=u("ZoomIn"),b=u("Delete"),V=u("Plus"),j=u("el-upload"),R=u("el-image-viewer");return m(),_("div",X,[s(j,{id:c.value,action:"#",class:M(["upload",y.value?"disabled":"",t.drag?"no-border":""]),multiple:!1,disabled:y.value,"show-file-list":!1,"http-request":k,"before-upload":B,"on-success":L,"on-error":$,drag:t.drag,accept:t.fileType.join(",")},{default:p(()=>[t.imageUrl?(m(),_(J,{key:0},[o("img",{src:t.imageUrl,class:"upload-image"},null,8,x),o("div",{class:"upload-handle",onClick:a[1]||(a[1]=F(()=>{},["stop"]))},[y.value?w("",!0):(m(),_("div",{key:0,class:"handle-icon",onClick:D},[s(l,null,{default:p(()=>[s(e)]),_:1}),a[3]||(a[3]=o("span",null,"编辑",-1))])),o("div",{class:"handle-icon",onClick:a[0]||(a[0]=v=>g.value=!0)},[s(l,null,{default:p(()=>[s(d)]),_:1}),a[4]||(a[4]=o("span",null,"查看",-1))]),y.value?w("",!0):(m(),_("div",{key:1,class:"handle-icon",onClick:T},[s(l,null,{default:p(()=>[s(b)]),_:1}),a[5]||(a[5]=o("span",null,"删除",-1))]))])],64)):(m(),_("div",ee,[S(t.$slots,"empty",{},()=>[s(l,null,{default:p(()=>[s(V)]),_:1})],!0)]))]),_:3},8,["id","class","disabled","drag","accept"]),o("div",le,[S(t.$slots,"tip",{},void 0,!0)]),g.value?(m(),N(R,{key:0,"url-list":[t.imageUrl],onClose:a[2]||(a[2]=v=>g.value=!1)},null,8,["url-list"])):w("",!0)])}}}),ge=G(ae,[["__scopeId","data-v-6d73ecbd"]]),se={class:"upload-box"},ie={class:"upload-empty"},oe=["src"],ne=["onClick"],de=["onClick"],ue={class:"el-upload__tip"},re=C({name:"UploadImgs"}),pe=C({...re,props:{fileList:{default:()=>[]},api:{},drag:{type:Boolean,default:!0},disabled:{type:Boolean,default:!1},limit:{default:5},fileSize:{default:5},fileType:{default:()=>["image/jpeg","image/png","image/gif"]},height:{default:"150px"},width:{default:"150px"},borderRadius:{default:"8px"}},emits:["update:fileList"],setup(z,{emit:E}){Z(e=>({"8b546a3e":e.borderRadius,"62eeec23":e.width,"3dc0c32c":e.height}));const i=z,c=I(P,void 0),g=I(H,void 0),r=q(()=>i.disabled||(c==null?void 0:c.disabled)),n=h(i.fileList);O(()=>i.fileList,e=>{n.value=e});const y=e=>{const l=e.size/1024/1024<i.fileSize,d=i.fileType.includes(e.type);return d||f({title:"温馨提示",message:"上传图片不符合所需的格式！",type:"warning"}),l||setTimeout(()=>{f({title:"温馨提示",message:`上传图片大小不能超过 ${i.fileSize}M！`,type:"warning"})},0),d&&l},U=async e=>{let l=new FormData;l.append("file",e.file);try{const d=i.api??K,{data:b}=await d(l);e.onSuccess(b)}catch(d){e.onError(d)}},k=E,T=(e,l)=>{e&&(l.url=e.fileUrl,k("update:fileList",n.value),g!=null&&g.prop&&(c==null||c.validateField([g.prop])),f({title:"温馨提示",message:"图片上传成功！",type:"success"}))},D=e=>{n.value=n.value.filter(l=>l.url!==e.url||l.name!==e.name),k("update:fileList",n.value)},B=()=>{f({title:"温馨提示",message:"图片上传失败，请您重新上传！",type:"error"})},L=()=>{f({title:"温馨提示",message:`当前最多只能上传 ${i.limit} 张图片，请移除后上传！`,type:"warning"})},$=h(""),t=h(!1),a=e=>{$.value=e.url,t.value=!0};return(e,l)=>{const d=u("el-icon"),b=u("ZoomIn"),V=u("Delete"),j=u("el-upload"),R=u("el-image-viewer");return m(),_("div",se,[s(j,{"file-list":n.value,"onUpdate:fileList":l[1]||(l[1]=v=>n.value=v),action:"#","list-type":"picture-card",class:M(["upload",r.value?"disabled":"",e.drag?"no-border":""]),multiple:!0,disabled:r.value,limit:e.limit,"http-request":U,"before-upload":y,"on-exceed":L,"on-success":T,"on-error":B,drag:e.drag,accept:e.fileType.join(",")},{file:p(({file:v})=>[o("img",{src:v.url,class:"upload-image"},null,8,oe),o("div",{class:"upload-handle",onClick:l[0]||(l[0]=F(()=>{},["stop"]))},[o("div",{class:"handle-icon",onClick:Y=>a(v)},[s(d,null,{default:p(()=>[s(b)]),_:1}),l[3]||(l[3]=o("span",null,"查看",-1))],8,ne),r.value?w("",!0):(m(),_("div",{key:0,class:"handle-icon",onClick:Y=>D(v)},[s(d,null,{default:p(()=>[s(V)]),_:1}),l[4]||(l[4]=o("span",null,"删除",-1))],8,de))])]),default:p(()=>[o("div",ie,[S(e.$slots,"empty",{},()=>[s(d,null,{default:p(()=>[s(Q(W))]),_:1})],!0)])]),_:3},8,["file-list","class","disabled","limit","drag","accept"]),o("div",ue,[S(e.$slots,"tip",{},void 0,!0)]),t.value?(m(),N(R,{key:0,"url-list":[$.value],onClose:l[2]||(l[2]=v=>t.value=!1)},null,8,["url-list"])):w("",!0)])}}}),ve=G(pe,[["__scopeId","data-v-5c930775"]]);export{ve as U,ge as a};
