import{U as x,a as f}from"./Imgs-oN2TRSjI.js";import{h as z,r as n,R as I,g as p,o as N,i as A,b as o,e,w as t,f as i}from"./index-CCA_-42S.js";import{_ as P}from"./plugin-vueexport-helper-DlAUqK2U.js";import"./upload-B3J7jE1u.js";import"./servicePort-D3LIsGOm.js";const S={class:"upload content-box"},T={class:"card img-box"},E={class:"upload-list"},H={class:"card img-box"},K={class:"upload-list"},D={class:"form-box"},G={class:"card"},J={class:"card"},O=z({name:"uploadFile"}),W=z({...O,setup(X){const V=n([{name:"img",url:"https://i.imgtg.com/2023/01/16/QRBHS.jpg"}]),y=n([]),C=n(""),w=n(""),L=n(""),M=n(""),R=n("https://i.imgtg.com/2023/01/16/QRqMK.jpg"),Q=I({avatar:[{required:!0,message:"请上传用户头像"}],photo:[{required:!0,message:"请上传用户照片"}],username:[{required:!0,message:"请填写用户姓名"}],idCard:[{required:!0,message:"请填写身份证号"}],email:[{required:!0,message:"请填写邮箱"}]}),u=n({avatar:"",photo:[{name:"img",url:"https://i.imgtg.com/2023/01/16/QR57a.jpg"}],username:"",idCard:"",email:""}),r=n({avatar:"",photo:[{name:"img",url:"https://i.imgtg.com/2023/01/16/QR57a.jpg"}],username:"",idCard:"",email:""}),k=n(),q=()=>{k.value.validate(F=>{})};return(F,l)=>{const g=p("Picture"),m=p("el-icon"),s=p("el-descriptions-item"),_=p("el-descriptions"),U=p("Avatar"),j=p("el-alert"),d=p("el-form-item"),v=p("el-input"),b=p("el-button"),B=p("el-form");return N(),A("div",S,[o("div",T,[l[23]||(l[23]=o("span",{class:"text"},"多图片上传组件 🍓🍇🍈🍉",-1)),o("div",E,[e(x,{"file-list":V.value,"onUpdate:fileList":l[0]||(l[0]=a=>V.value=a),drag:!1,"border-radius":"50%"},{empty:t(()=>[e(m,null,{default:t(()=>[e(g)]),_:1}),l[17]||(l[17]=o("span",null,"请上传照片",-1))]),tip:t(()=>l[18]||(l[18]=[i(" 圆形组件，图片最大为 5M（禁止拖拽上传） ")])),_:1},8,["file-list"]),e(x,{"file-list":y.value,"onUpdate:fileList":l[1]||(l[1]=a=>y.value=a),width:"250px"},{empty:t(()=>[e(m,null,{default:t(()=>[e(g)]),_:1}),l[19]||(l[19]=o("span",null,"请上传照片",-1))]),tip:t(()=>l[20]||(l[20]=[i(" 长方形组件（可拖拽上传） ")])),_:1},8,["file-list"])]),e(_,{title:"配置项 📚（其它参数和单图上传组件相同）",column:1,border:""},{default:t(()=>[e(s,{label:"fileList"},{default:t(()=>l[21]||(l[21]=[i(' 双向绑定的 fileList 值，使用示例： v-model:file-list="fileList" ')])),_:1}),e(s,{label:"limit"},{default:t(()=>l[22]||(l[22]=[i(" 最大图片上传数，默认为 5 张 ")])),_:1})]),_:1})]),o("div",H,[l[40]||(l[40]=o("span",{class:"text"},"单图片上传组件 🍓🍇🍈🍉",-1)),o("div",K,[e(f,{"image-url":C.value,"onUpdate:imageUrl":l[2]||(l[2]=a=>C.value=a),"file-size":3},{tip:t(()=>l[24]||(l[24]=[i(" 上传图片最大为 3M ")])),_:1},8,["image-url"]),e(f,{"image-url":w.value,"onUpdate:imageUrl":l[3]||(l[3]=a=>w.value=a),drag:!1,"border-radius":"50%"},{empty:t(()=>[e(m,null,{default:t(()=>[e(U)]),_:1}),l[25]||(l[25]=o("span",null,"请上传头像",-1))]),tip:t(()=>l[26]||(l[26]=[i(" 圆形组件（禁止拖拽上传） ")])),_:1},8,["image-url"]),e(f,{"image-url":L.value,"onUpdate:imageUrl":l[4]||(l[4]=a=>L.value=a),width:"250px"},{empty:t(()=>[e(m,null,{default:t(()=>[e(g)]),_:1}),l[27]||(l[27]=o("span",null,"请上传 Banner 图",-1))]),tip:t(()=>l[28]||(l[28]=[i(" 长方形组件（可拖拽上传） ")])),_:1},8,["image-url"]),e(f,{"image-url":M.value,"onUpdate:imageUrl":l[5]||(l[5]=a=>M.value=a),disabled:""},{tip:t(()=>l[29]||(l[29]=[i(" 无图（禁用上传） ")])),_:1},8,["image-url"]),e(f,{"image-url":R.value,"onUpdate:imageUrl":l[6]||(l[6]=a=>R.value=a),disabled:""},{tip:t(()=>l[30]||(l[30]=[i(" 有图（禁用编辑、删除） ")])),_:1},8,["image-url"])]),e(_,{title:"配置项 📚",column:1,border:""},{default:t(()=>[e(s,{label:"imageUrl"},{default:t(()=>l[31]||(l[31]=[i(' 双向绑定的 imageUrl 值，使用示例： v-model:image-url="avatar" ')])),_:1}),e(s,{label:"api"},{default:t(()=>l[32]||(l[32]=[i(" 上传图片的 api 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可（非必传） ")])),_:1}),e(s,{label:"drag"},{default:t(()=>l[33]||(l[33]=[i(" 是否支持拖拽上传图片，默认为 true ")])),_:1}),e(s,{label:"disabled"},{default:t(()=>l[34]||(l[34]=[i(" 是否禁用 上传、删除 功能，可查看图片 ")])),_:1}),e(s,{label:"fileSize"},{default:t(()=>l[35]||(l[35]=[i(" 单个图片文件大小限制，默认为 5M ")])),_:1}),e(s,{label:"fileType"},{default:t(()=>l[36]||(l[36]=[i(' 图片类型限制，默认类型为 ["image/jpeg", "image/png", "image/gif"] ')])),_:1}),e(s,{label:"height"},{default:t(()=>l[37]||(l[37]=[i(' 组件高度样式，默认为 "150px" ')])),_:1}),e(s,{label:"width"},{default:t(()=>l[38]||(l[38]=[i(' 组件宽度样式，默认为 "150px" ')])),_:1}),e(s,{label:"borderRadius"},{default:t(()=>l[39]||(l[39]=[i(' 组件边框圆角样式，默认为 "8px" ')])),_:1})]),_:1})]),o("div",D,[o("div",G,[e(j,{title:"图片上传组件在 form 表单中使用，上传之后成功会自动重新校验",type:"warning",effect:"dark",closable:!1,class:"mb20"}),e(B,{ref_key:"ruleFormRef",ref:k,"label-width":"100px","label-suffix":" :",rules:Q,model:u.value},{default:t(()=>[e(d,{label:"用户头像",prop:"avatar"},{default:t(()=>[e(f,{"image-url":u.value.avatar,"onUpdate:imageUrl":l[7]||(l[7]=a=>u.value.avatar=a),width:"135px",height:"135px","file-size":3},{empty:t(()=>[e(m,null,{default:t(()=>[e(U)]),_:1}),l[41]||(l[41]=o("span",null,"请上传头像",-1))]),tip:t(()=>l[42]||(l[42]=[i(" 头像大小不能超过 3M ")])),_:1},8,["image-url"])]),_:1}),e(d,{label:"用户照片",prop:"photo"},{default:t(()=>[e(x,{"file-list":u.value.photo,"onUpdate:fileList":l[8]||(l[8]=a=>u.value.photo=a),limit:3,height:"140px",width:"140px","border-radius":"50%"},{empty:t(()=>[e(m,null,{default:t(()=>[e(g)]),_:1}),l[43]||(l[43]=o("span",null,"请上传照片",-1))]),tip:t(()=>l[44]||(l[44]=[i(" 最多上传 3 张照片 ")])),_:1},8,["file-list"])]),_:1}),e(d,{label:"用户姓名",prop:"username"},{default:t(()=>[e(v,{modelValue:u.value.username,"onUpdate:modelValue":l[9]||(l[9]=a=>u.value.username=a),placeholder:"请填写用户姓名",clearable:""},null,8,["modelValue"])]),_:1}),e(d,{label:"身份证号",prop:"idCard"},{default:t(()=>[e(v,{modelValue:u.value.idCard,"onUpdate:modelValue":l[10]||(l[10]=a=>u.value.idCard=a),placeholder:"请填写身份证号",clearable:""},null,8,["modelValue"])]),_:1}),e(d,{label:"邮箱",prop:"email"},{default:t(()=>[e(v,{modelValue:u.value.email,"onUpdate:modelValue":l[11]||(l[11]=a=>u.value.email=a),placeholder:"请填写邮箱",clearable:""},null,8,["modelValue"])]),_:1}),e(d,null,{default:t(()=>[e(b,null,{default:t(()=>l[45]||(l[45]=[i(" 取消 ")])),_:1}),e(b,{type:"primary",onClick:q},{default:t(()=>l[46]||(l[46]=[i(" 确定 ")])),_:1})]),_:1})]),_:1},8,["rules","model"])]),o("div",J,[e(j,{title:"图片上传组件在 form 表单中使用，如果该表单禁用，则上传组件会自动禁用",type:"warning",effect:"dark",closable:!1,class:"mb20"}),e(B,{"label-width":"100px","label-suffix":" :",disabled:"",model:r.value},{default:t(()=>[e(d,{label:"用户头像",prop:"avatar"},{default:t(()=>[e(f,{"image-url":r.value.avatar,"onUpdate:imageUrl":l[12]||(l[12]=a=>r.value.avatar=a),width:"135px",height:"135px","file-size":3},{empty:t(()=>[e(m,null,{default:t(()=>[e(U)]),_:1}),l[47]||(l[47]=o("span",null,"请上传头像",-1))]),tip:t(()=>l[48]||(l[48]=[i(" 头像大小不能超过 3M ")])),_:1},8,["image-url"])]),_:1}),e(d,{label:"用户照片",prop:"photo"},{default:t(()=>[e(x,{"file-list":r.value.photo,"onUpdate:fileList":l[13]||(l[13]=a=>r.value.photo=a),height:"140px",width:"140px","border-radius":"50%"},{empty:t(()=>[e(m,null,{default:t(()=>[e(g)]),_:1}),l[49]||(l[49]=o("span",null,"请上传照片",-1))]),tip:t(()=>l[50]||(l[50]=[i(" 照片大小不能超过 5M ")])),_:1},8,["file-list"])]),_:1}),e(d,{label:"用户姓名",prop:"username"},{default:t(()=>[e(v,{modelValue:r.value.username,"onUpdate:modelValue":l[14]||(l[14]=a=>r.value.username=a),placeholder:"请填写用户姓名",clearable:""},null,8,["modelValue"])]),_:1}),e(d,{label:"身份证号",prop:"idCard"},{default:t(()=>[e(v,{modelValue:r.value.idCard,"onUpdate:modelValue":l[15]||(l[15]=a=>r.value.idCard=a),placeholder:"请填写身份证号",clearable:""},null,8,["modelValue"])]),_:1}),e(d,{label:"邮箱",prop:"email"},{default:t(()=>[e(v,{modelValue:r.value.email,"onUpdate:modelValue":l[16]||(l[16]=a=>r.value.email=a),placeholder:"请填写邮箱",clearable:""},null,8,["modelValue"])]),_:1}),e(d,null,{default:t(()=>[e(b,null,{default:t(()=>l[51]||(l[51]=[i(" 取消 ")])),_:1}),e(b,{type:"primary",onClick:q},{default:t(()=>l[52]||(l[52]=[i(" 确定 ")])),_:1})]),_:1})]),_:1},8,["model"])])])])}}}),ll=P(W,[["__scopeId","data-v-8caf452d"]]);export{ll as default};
