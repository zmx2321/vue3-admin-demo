import{aE as bt,N as Fe,aC as $e,h as _,M as Ve,o as Y,c as le,a2 as re,aD as se,u as N,a as C,b as $,F as Dt,r as te,w as Z,e as ne,R as Oe,g as Tt,t as oe,n as _t,Y as Mt,aF as St,a6 as xt,d as Bt,aG as At}from"./index-CzX2ZHHe.js";import{V as Et,f as I,S as G,C as ge,F as U,a as W,W as zt,X as Ft,M as $t,d as Vt,D as H,b as O,c as z,P as Ce,e as V,t as ue,g as Ot,h as It,i as Gt,j as Rt,Z as Zt,k as qt,l as jt,m as Nt,n as Ut,o as Wt,p as X,q as Xt,T as Ie,L as Kt,K as Yt,r as Ht,O as Ge,I as Re,s as Jt,u as Qt}from"./Draw-9J-PLlaz.js";import{m as w}from"./mittBus-rOgeEvW-.js";import{g as we}from"./gis-c5Jhqe25.js";import en from"./DemoPopupDetailDialog-C4gkIufv.js";import{_ as ye}from"./plugin-vueexport-helper-DlAUqK2U.js";const Ze={commonMenu:{commonMenuMethod1:"拷贝当前经纬度",commonMenuMethod3:"切换天地图token"},commonDynamicMenu:{commonDynamicMenuMethod1:"清除所有要素",commonDynamicMenuMethod2:"显示当前要素信息",commonDynamicMenuMethod3:"仅取消绘制状态",commonDynamicMenuMethod4:"展示分析结果",commonDynamicMenuMethod5:"删除所有绘制内容"},singleMenu:{singleMenuMethod1:"刷新地图",singleMenuMethod2:"清除POI点"}},{commonMenu:Se}=Ze;let qe=[];for(let e in Se)qe.push(Se[e]);const F={menuMethodBtn:Ze,commonMenuMethodsArr:qe,setMenuMethods(e,t,o,n,l){let i=J(n);const{commonMenu:s,commonDynamicMenu:c,singleMenu:u}=this.menuMethodBtn;switch(t){case s.commonMenuMethod0:_n(e,o,n);break;case s.commonMenuMethod01:Tn(e,n);break;case"清空自定义标注点":R(e,h=>h.get("tempType")==="myPointByMenu");break;case s.commonMenuMethod02:at(e,n);break;case"清空自定义闪烁点":document.querySelectorAll(".flicker_point").forEach(h=>{h.classList.remove("flicker_point")});break;case s.commonMenuMethod1:bt(`[${i}]`,()=>{Fe.success(`[${i}] 拷贝成功`)});break;case s.commonMenuMethod2:Je(e,o);break;case s.commonMenuMethod3:w.emit("showSetTokenDialog");break;case c.commonDynamicMenuMethod1:Pe(e);break;case c.commonDynamicMenuMethod2:w.emit("singleFeaturesClick",{feature:o,pixelPoint:n});break;case c.commonDynamicMenuMethod3:Le(e);break;case c.commonDynamicMenuMethod4:let P=o.get("pointData");w.emit("analysisPointData",P);break;case c.commonDynamicMenuMethod5:R(e,h=>h.get("drawType"));break;case u.singleMenuMethod1:w.emit("reflashMap");break;case u.singleMenuMethod2:tt(e,"POIMarker");break}},setMentBtnExtendByPage(e){const{singleMenu:t}=this.menuMethodBtn;switch(e){case"gis":ae(t.singleMenuMethod1),ae(t.singleMenuMethod2);break}}};let tn=0,he="6b94eac741fe8a50f283b9b11d9d60d2";const xe=we(),B=(e,t=!0)=>(xe.mapToken!==""&&(he=xe.mapToken),t?e+he:e),je=(e,t={},o={})=>new zt({source:new Ft({url:e,crossOrigin:"anonymous",...t}),type:"baseLayer",url:e,...o}),Ne=e=>je(e,{wrapX:!1},{layerType:"baseMapLayer"}),ve=e=>je(e,{},{layerType:"baseMapTxt"}),pe={getBaseMapLayer(e){switch(e){case"gd0":return B("https://wprd0{1-4}.is.autonavi.com/appmaptile?&x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=8&ltype=11",!1);case"gd1":return B("https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=128_128&scale=1&style=8&x={x}&y={y}&z={z}",!1);case"gd2":return B("http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}",!1);case"gd3":return B("https://webst01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&style=6",!1);case"gd4":return B("http://webrd01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&lang=zh_cn&size=1&scale=1&style=8",!1);case"gd5":return B("https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",!1);case"gd6":return B("http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",!1);case"gd7":return B("https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",!1);case"gd8":return B("https://wprd01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=8<ype=11",!1);case"gd9":return B("https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",!1)}},getBaseMapTxt(e){switch(e){case"gd0":return B("https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=8&x=54658&y=26799&z=16&scl=1&ltype=4",!1);case"gd1":return B("http://webst01.is.autonavi.com/appmaptile?x=54658&y=26799&z=16&lang=zh_cn&size=1&scale=1&style=8",!1);case"gd2":return B("https://wprd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",!1);case"gd1":return B("https://wprd01.is.",!1);case"gd1":return B("https://wprd01.is.",!1)}}},fe=15,Be={layers:[Ne(pe.getBaseMapLayer("gd9")),ve(pe.getBaseMapTxt("gd2"))],view:new Et({center:I([121.63,29.88]),zoom:16,maxZoom:17,minZoom:13,constrainResolution:!0,smoothResolutionConstraint:!1})},j=(e,t)=>{e&&(e instanceof Array?(e.length!==0&&ae(t),e.length===0&&(F.commonMenuMethodsArr=F.commonMenuMethodsArr.filter(o=>o!==t))):e instanceof V?e.get("tempType")||ae(t):(ae(t),e.length===0&&(F.commonMenuMethodsArr=F.commonMenuMethodsArr.filter(o=>o!==t)))),!e&&F.commonMenuMethodsArr.includes(t)&&(F.commonMenuMethodsArr=F.commonMenuMethodsArr.filter(o=>o!==t))},Ue=new G({image:new ge({radius:5,fill:new U({color:"#f49d41"}),stroke:new W({color:"#836365",width:1})})}),We=(e,t)=>new G({image:new Re({src:t,anchor:[.8,80],anchorOrigin:"top-right",anchorXUnits:"fraction",anchorYUnits:"pixels",offsetOrigin:"top-left",size:[100,100],offset:[3,-32],scale:e.getView().getZoom()/30,opacity:.75})}),nn=(e,t,o,n,l)=>{let i=360-n,s=Math.PI*(1/o-1/2);s+=i/180*Math.PI;let c,u,m,P=[];for(let v=0;v<o;++v){let k=v*((360-i)/360);c=s+k*2*Math.PI/o,u=e[0]+t*Math.cos(c),m=e[1]+t*Math.sin(c),P.push([u,m])}P.push(e);let h=new Jt(P);h.rotate(l/57.3,e);let D=h.getCoordinates();return new Ce([D])},Xe=()=>{document.querySelectorAll(".flicker_point").forEach(t=>{t.classList.remove("flicker_point")})},on=e=>{e&&(e.getLayers().forEach(function(t){t.setMap(null)}),e.setView(null),e.setTarget(null),e=null)},an=e=>new $t({target:e,layers:Be.layers,view:Be.view,interactions:Vt({mouseWheelZoom:!0})}),rn=(e,t)=>{let o="";switch(t){case"empty":o="empty";break;case"t0vec":o="t0cva";break;case"t3img":o="t07cia";break;case"t4ter":o="t4cva";break}let n=Ne(pe.getBaseMapLayer(t)),l=ve(pe.getBaseMapTxt(o));n.values_.url,l.values_.url;const i=e.getLayers();e.getAllLayers().forEach((s,c)=>{if(s.get("type")==="baseLayer")switch(s.get("layerType")){case"baseMapLayer":e.removeLayer(s),i.insertAt(c,n);break;case"baseMapTxt":if(l!==""&&(e.removeLayer(s),i.insertAt(c,l)),l===""){let u=ve("");e.removeLayer(s),i.insertAt(c,u)}break}})},sn=e=>{const t=e.getView().calculateExtent(e.getSize()),o=Gt(t),n=Rt(t),l=ue(o,"EPSG:3857","EPSG:4326"),i=ue(n,"EPSG:3857","EPSG:4326");return{topLeft:l,bottomRight:i}},ln=e=>{e.getControls().clear(),e.addControl(new Zt),e.addControl(new qt),e.addControl(new jt)},ae=e=>{F.commonMenuMethodsArr.includes(e)||F.commonMenuMethodsArr.push(e)},Ke=e=>{let t=document.querySelector(".ol_map_wrap"),o=document.querySelector(".menu_wrap");o&&t.removeChild(o),e&&e(t)},cn=(e,t,o)=>{const{commonDynamicMenu:n,singleMenu:l}=F.menuMethodBtn;e.getViewport().addEventListener("contextmenu",i=>{var M;i.preventDefault(),o&&o(y=>{F.setMentBtnExtendByPage(y)});const s=e.getEventCoordinate(i),c=e.getPixelFromCoordinate(s),u=e.forEachFeatureAtPixel(c,y=>y);let m=[],P=[],h=[],D=[];be(e,y=>{let p=y.getSource().getFeatures()[0];p&&(m.push(p),p.get("tempType")==="myPointByMenu"&&P.push(p),p.get("businessType")==="POIMarker"&&h.push(p),p.get("drawType")&&D.push(p))}),j(m,n.commonDynamicMenuMethod1),j(u,n.commonDynamicMenuMethod2);const v=de(e);j(v,n.commonDynamicMenuMethod3),j(P,"清空自定义标注点");let k=document.querySelectorAll(".flicker_point");j(k,"清空自定义闪烁点"),u&&(M=u.get("pointData"))!=null&&M.isNeedAnalysis&&j(u,n.commonDynamicMenuMethod4),j(D,n.commonDynamicMenuMethod5),j(h,l.singleMenuMethod2),Ke(y=>{let p=null;p=document.createElement("div"),p.setAttribute("class","menu_wrap");let f="";F.commonMenuMethodsArr.forEach(b=>{f+=`<li>${b}</li>`}),p.innerHTML=`
      <ul>
        ${f}
      </ul>
    `,p.style.position="fixed",p.style.left=`${i.clientX}px`,p.style.top=`${i.clientY}px`,y.appendChild(p),p.addEventListener("click",b=>{const A=b.target.textContent;t({option:A,feature:u,pixelPoint:s}),y.removeChild(p)})})})},de=e=>e.getInteractions().getArray().find(t=>t instanceof H),Le=e=>{const t=de(e);e.removeInteraction(t)},J=e=>ue(e,"EPSG:3857","EPSG:4326"),un=(e,t)=>I([e,t]),ke=e=>Nt(Ut(e)),pn=e=>{const t=e.getGeometry();if(t.getType()==="Polygon"){const o=t.clone();o.transform("EPSG:3857","EPSG:4326");const n=o.getExtent();return Wt(n)}return null},dn=(e,t,o="/",n={},l=1)=>{const i=new z({features:[]}),s=new O({source:i,zIndex:l,style:o==="/"?Ue:We(e,o)});e.addLayer(s);const c=(u,m)=>({geometry:u,type:"Marker",pointData:m,...n});if(t instanceof Array)t.forEach(u=>{const m=new X(I(u.lonlat)),P=new V({...c(m,u.pointData)});i.addFeature(P)});else{const u=new X(I(t.lonlat)),m=new V({...c(u,t.pointData)});i.addFeature(m)}},gn=(e,t,o)=>{let n=new z;if(t instanceof Array)t.forEach(s=>{let c=I([s.longitude,s.latitude]),u=new V({geometry:new X(c),type:"Marker",pointData:s});n.addFeature(u)});else{let s=I([t.longitude,t.latitude]),c=new V({geometry:new X(s),type:"Marker",pointData:t});n.addFeature(c)}let l=new Xt({source:n,distance:50}),i=new O({type:"clusterLayer",source:l,style:function(s){s.set("type","Cluster");let c=s.get("features").length;return c===1?o==="/"?Ue:We(e,o):new G({image:new ge({radius:30,stroke:new W({color:"white"}),fill:new U({color:"blue"})}),text:new Ie({text:c.toString(),fill:new U({color:"white"})})})}});e.addLayer(i)},Ye=(e,t,o={},n)=>{const l=new V({geometry:new Kt(t),type:"Line",...o});l.setStyle(n);const i=new z({features:[l]}),s=new O({source:i,zIndex:9});e.addLayer(s)},Q=(e,t,o=!1,n=2,l=5)=>new G(o?{image:new ge({radius:l,fill:new U({color:e}),stroke:new W({color:t,width:n})})}:{fill:new U({color:e}),stroke:new W({color:t,width:n})}),He=()=>Q("rgba(32, 157, 230, 0.2)","rgb(64 158 255)"),Je=(e,t)=>{let o=null;switch(t.get("type")){case"Marker":o=Q("#409eff","#f00",!0,2,10);break;case"Curve":o=Q("#409eff","#f00",!1,5);break}t.setStyle(o),t.set("temp",!0);let n=new O({source:new z,zIndex:999});R(e,l=>l.get("temp")),n.setOpacity(1),n.getSource().addFeature(t),e.addLayer(n)},Qe=(e,t,o,n={},l)=>{const i=new G({text:new Ie({text:t,fill:new U({color:"#333333"}),font:"18px pingfang",textAlign:"center",textBaseline:"bottom",padding:[5,10,5,10],offsetX:-20,offsetY:-13,overflow:!0,rotateWithView:!1,rotation:0})});l&&R(e,u=>l(u));const s=new V({geometry:new X(I(o)),type:"textPoint",...n});s.setStyle(i);const c=new O({source:new z({features:[s]}),zIndex:9});e.addLayer(c)},et=(e,t,o,n,l=null)=>{let i=document.getElementById("popup"),s=document.getElementById("popup-closer");i.style.display="block";let c=new Ge({element:i,...l,zIndex:9999});e.addOverlay(c),s.onclick=()=>(c.setPosition(void 0),s.blur(),c=null,!1),c.setPosition(t),c.getElement().onclick=u=>{n(u)}},Ae=(e,t,o)=>{let n=[];t.forEach(s=>{let c=Q("rgba(32, 222, 230, 0.4)","rgba(255, 205, 67, 0.3)"),u=100;if(o){let{myCurveStyle:D,myCurveRadius:v}=o(s);c=D,u=v}let m=I(s.lonlat),P=nn(m,u,100,45,s.curveData.antDirectionAngle),h=new V(P);h.setStyle(c),h.set("type","Curve"),h.set("curveData",s.curveData),n.push(h)});let l=new z;l.addFeatures(n);let i=new O({source:l,zIndex:1});e.addLayer(i)},Ee=(e,t,o,n)=>{et(e,t,o,n,{autoPan:!0})},yn=(e,t,o)=>{const l={name:"通用信息展示弹窗",hdms:ke(e),coordinate:[t.longitude,t.latitude],popupData:t};o(l)},be=(e,t)=>{let o=e.getLayers().getArray();for(let n=o.length-1;n>=0;--n)o[n]instanceof O&&t(o[n])},Pe=e=>{Xe(),Le(e),be(e,t=>{e.removeLayer(t)})},R=(e,t)=>{be(e,o=>{let n=o.getSource().getFeatures()[0];t(n)&&e.removeLayer(o)})},mn=(e,t)=>{R(e,o=>{if(o)return o.get("type")===t})},tt=(e,t)=>{R(e,o=>{if(o)return o.get("businessType")===t})},ze=e=>{R(e,t=>{if(t)return(t.get("type")==="Marker"||t.get("type")==="Curve"||t.get("type")==="Cluster")&&!t.get("bussinessType")})},fn=e=>{R(e,t=>{if(t)return t.get("tempType")}),Xe()},wn=(e,t)=>{e.getView().animate({center:I(t),duration:800})},hn=(e,t)=>{e.getLayers().forEach(o=>{let n=null;o&&(n=o.getSource()),n instanceof z&&n.forEachFeature(l=>{t(l)})})},vn=(e,t)=>{const n=new Yt({extractStyles:!1}).readFeatures(t);n.forEach(i=>{i.getGeometry().transform("EPSG:4326","EPSG:3857")});const l=new z({features:n});e.getView().fit(l.getExtent()),e.getLayers().push(new O({source:l,style:Q("blue","red"),zIndex:100}))},kn=e=>{e.addInteraction(new H({source:new z,type:"Polygon"})),e.getInteractions().getArray().forEach(t=>{t instanceof H&&t.on("drawend",o=>{const{feature:n}=o,l=n.getGeometry(),i=l.getCoordinates()[0],s=l.transform("EPSG:3857","EPSG:4326").getCoordinates()[0];l instanceof Ce&&(nt(e,{coords:i,lonlat:s},{drawType:"polygon"}),e.removeInteraction(t))})})},nt=(e,{coords:t,lonlat:o,polygonData:n},l={},i,s=He())=>{let c=new V({geometry:new Ce([t]),type:"Polygon",...l,polygonData:{coords:t,lonlat:o,...n}});c.setStyle(s);let u=new O({source:new z({features:[c]})});e.addLayer(u),i&&i(c)},Pn=e=>{},Cn=e=>{e.addInteraction(new H({source:new z,type:"Circle"})),e.getInteractions().getArray().forEach(t=>{t instanceof H&&t.on("drawend",o=>{const{feature:n}=o,l=n.getGeometry();let s={lonlat:ue(l.getCenter(),"EPSG:3857","EPSG:4326"),radius:l.getRadius()};ot(e,s,{drawType:"Circle"}),e.removeInteraction(t)})})},ot=(e,t,o={},n,l=!1)=>{t.radius||(t.radius=550);let i=[],s=new V({type:"Circle",...o,circleData:t,geometry:new Ot(I(t.lonlat),t.radius)});s.setStyle(l?new G({fill:new U({color:"rgba(255, 0, 0, 0)"}),stroke:new W({color:"#f00",color:"rgba(255, 0, 0, 0)"})}):He()),i.push(s);let c=new z;c.addFeatures(i);let u=new O({zIndex:100});if(u.setSource(c),e.addLayer(u),n){let m=0;u.on("postrender",P=>{m>=20&&(m=0);var h=(20-m)*(1/20),D=new G({radius:m,stroke:new W({color:"rgba(255,60,5"+h+")",width:18-m/1.5})});let v=Ht(P);v.setStyle(D),v.drawGeometry(s.getGeometry()),m=m+.2,e.render()})}},Ln=(e,t)=>{let o=new H({source:new z,type:"LineString"});e.addInteraction(o),o.on("drawend",n=>{const{feature:l}=n,i=l.getGeometry();let s=It(i);s=s.toFixed(2);const c=i.getCoordinates(),u=i.transform("EPSG:3857","EPSG:4326").getCoordinates();t&&t(s),Ye(e,c,{drawType:"TestDistance"}),Qe(e,s+"米",u[0],{drawType:"TestDistance"})})},bn=e=>{R(e,t=>{t.get("drawType")})},Dn=(e,t,o="../src/components/OpenlayerBaseMap/icon/routearrow.svg",n="arrowLine")=>{function l(i){const s=i.getGeometry(),c=s.getLength();let m=50*e.getView().getResolution(),P=Math.floor(c/m);const h=[new G({stroke:new W({color:"#42b983",width:6})})],D=[],v=[0];s.forEachSegment(function(k,M){let y=M[0]-k[0],p=M[1]-k[1],f=Math.atan2(p,y);v.unshift(Math.sqrt(y**2+p**2)+v[0]),D.push(f)});for(let k=1;k<P;k++){let M=s.getCoordinateAt(k*1/P);const y=k*m,p=v.findIndex(f=>f<=y);h.push(new G({geometry:new X(M),image:new Re({src:o,opacity:1,anchor:[.5,.5],rotateWithView:!0,rotation:-D[v.length-p-1],scale:.8})}))}return h}Ye(e,t,{businessType:n},l)},Tn=(e,t)=>{const o=[],n=new V({geometry:new X(t),name:tn++,location:t,tempType:"myPointByMenu"}),l=new G({image:new ge({radius:15,fill:new U({color:"#409eff"}),stroke:new W({color:"#4440ff",width:1})})});n.setStyle(l),o.push(n);const i=new z({features:o}),s=new O({source:i,opacity:.8});e.addLayer(s)},at=(e,t,o="",n)=>{let l=document.createElement("div");l.className=`flicker_point ${o}`;let i=new Ge({element:l,position:t,zIndex:0});e.addOverlay(i),n&&l.addEventListener("click",()=>{n()})},_n=(e,t,o)=>{J(o)},rt=()=>document.querySelector("#popup-content"),ce=(e,t)=>{w.emit("setCommonPopupInner",{popupObj:e,featureItem:t,callback:o=>{$e(o,rt())}})},ie=(e,t)=>{let o=[];w.emit("setFeaturesPopupInner",{popupObj:e,callback:n=>{$e(n,rt())},next:n=>{o=n}}),t&&t(o)},Mn={id:"popup",class:"ol-popup popup_toggle"},Sn={__name:"PopupCommon",props:{currentPageType:{type:String,default:""}},setup(e,{expose:t}){let o=_(!1),n={},l=_(null);const i=e;w.on("showPopupDialog",y=>{c(y,i.currentPageType)}),w.on("getSingleByFeatures",({unique:y,itemData:p})=>{let f=y.split(":");const{arrData:b}=p;n.arrData=b,b.forEach(A=>{A[f[0]]===f[1]&&(n.currentPopupData=A,ce(n),s(n))})}),w.on("popupBack",()=>{n.popupData=n.arrData,n.noFeature=!0,ie(n)});const s=y=>{let p=document.getElementById("popup-content");ce(y);const f=document.createElement("b");f.setAttribute("data-function","popupBack"),f.setAttribute("id","popupBack"),f.setAttribute("title","返回"),f.innerHTML="",p.appendChild(f)},c=(y,p)=>{switch(p){case"demo":Ve(()=>{l.value.show(y)});break}},u=()=>{o.value=!0},m=()=>{o.value=!1},P=(y,p,f,b)=>{let A=document.querySelector("#popupBack");A&&b&&!b.get("businessType")&&A.remove();let q=J(p);const E={name:"通用信息展示弹窗",hdms:ke(p),coordinate:q,popupData:f};n=E,w.emit("fixCommonPopupData",E),Ee(y,p,ce(E,b),me=>{D(me)})},h=(y,p,f)=>{let b=J(p),A=ke(p),q=[];f.forEach(E=>{switch(E.get("type")){case"Marker":q.push("标注点");break;case"Curve":q.push("扇区");break}});const ee={name:q.length+"个重叠要素",type:Array.from(new Set(q)).join(","),hdms:A,coordinate:b,popupData:f};n=ee,Ee(y,p,ie(ee,E=>{n.currentDataList=E}),E=>{D(E)})},D=async y=>{const{target:p}=y;let f=p.getAttribute("data-function");f==="getMore"&&M(),f==="getSingleByFeatures"&&v(p.getAttribute("data-unique")),f==="popupBack"&&k()},v=y=>{if(!y)return;let p=y.split(":");const f=(b,A)=>{if(!b.get("noPopup")&&b.get(A)[p[0]]===p[1])return n.currentPopupData=b.get(A),b};n.currentPopupFeature=n.popupData.filter(b=>{switch(b.get("type")){case"Marker":return f(b,"pointData");case"Curve":return f(b,"curveData")}}),s(n,n.currentPopupFeature[0])},k=()=>{n.popupData instanceof Array&&ie(n)},M=()=>{w.emit("popupDataGetMore",{currentPopupObj:n,callback:y=>{c(y,i.currentPageType)}})};return t({showPopup:u,hidePopup:m,setCommonPopup:P,setFeaturesPopup:h}),(y,p)=>(Y(),le(Dt,null,[re(C("div",Mn,p[0]||(p[0]=[C("div",{class:"popup_wrap"},[C("a",{href:"#",id:"popup-closer",class:"ol-popup-closer"}),C("div",{id:"popup-content",class:"popup-content"})],-1)]),512),[[se,N(o)]]),$(en,{ref_key:"refDemoPopupDetailDialog",ref:l},null,512)],64))}},xn=ye(Sn,[["__scopeId","data-v-bf6b074e"]]),Bn={class:"lend_wrap"},An={class:"lent_tb_wrap"},En=["title"],zn={__name:"Lend",props:{currentPageType:{type:String,default:""},isShowLend:{type:Boolean,default:!0}},setup(e){w.on("showLend",()=>{t.value=!0});let t=_(!1);const o=()=>{t.value=!t.value};return(n,l)=>re((Y(),le("section",Bn,[re(C("div",An,null,512),[[se,N(t)]]),C("div",{class:"toggle",title:`点击${N(t)?"隐藏":"显示"}图例`,onClick:o},null,8,En)],512)),[[se,e.isShowLend]])}},Fn=ye(zn,[["__scopeId","data-v-7149aaf8"]]),$n={class:"switch_base_layer_wrap"},Vn={class:"switch_content"},On=["title"],In={__name:"SwitchBaseLayer",emits:["switchBaseLayerType"],setup(e,{emit:t}){w.on("resetSwitchLayer",()=>{l.value.layerType="t3img"});const o=t;let n=_(!1);const l=_({layerType:"t3img"}),i=()=>{n.value=!n.value},s=c=>{o("switchBaseLayerType",c)};return(c,u)=>{const m=te("el-radio"),P=te("el-radio-group");return Y(),le("section",$n,[re(C("div",Vn,[$(P,{modelValue:l.value.layerType,"onUpdate:modelValue":u[0]||(u[0]=h=>l.value.layerType=h),onChange:s},{default:Z(()=>[$(m,{value:"t0vec"},{default:Z(()=>u[1]||(u[1]=[ne("街道底图")])),_:1}),$(m,{value:"t3img"},{default:Z(()=>u[2]||(u[2]=[ne("卫星(影像)底图")])),_:1}),$(m,{value:"t4ter"},{default:Z(()=>u[3]||(u[3]=[ne("地形底图")])),_:1})]),_:1},8,["modelValue"])],512),[[se,N(n)]]),C("div",{class:"toggle",title:`点击${N(n)?"隐藏":"显示"}`,onClick:i},null,8,On)])}}},Gn=ye(In,[["__scopeId","data-v-0273d3a5"]]),Rn={class:"dialog_wrap"},Zn={key:0},qn={__name:"SetTokenDialog",setup(e,{expose:t}){const{setMapToken:o}=we();we();let n=_("6b94eac741fe8a50f283b9b11d9d60d2");const l=_(null),i=_(""),s=_([]),c=(v,k)=>{const M=v?s.value.filter(u(v)):s.value;k(M)},u=v=>k=>k.value.toLowerCase().indexOf(v.toLowerCase())===0,m=()=>[{name:"token1",value:"02dd5ea16a6b869b3b37e12f269b1463"},{name:"token2",value:"53ce309465e600f242d351b15013397f"},{name:"token3",value:"37c72a79fe4c6a1b3fa6b1435214b378"},{name:"token4",value:"5a257cd2df1b3311723bd77b0de14baf"},{name:"token5",value:"7786923a385369346d56b966bb6ad62f"}],P=v=>{o(v.value)},h=()=>{if(i.value.length!==32){Fe.warning("请输入正确的token");return}w.emit("initOlMapByToken"),w.emit("resetSwitchLayer"),l.value.hide(),n.value=i.value};return Oe(()=>{s.value=m()}),t({show:v=>{l.value.show(),l.value.setDialogWidth("30%"),i.value=""}}),(v,k)=>{const M=te("el-autocomplete"),y=te("el-button"),p=te("dialog-info");return Y(),Tt(p,{ref_key:"refDialogInfo",ref:l,class:"dialog_info_wrap",isShowFotter:!0},{DialogTitle:Z(()=>k[1]||(k[1]=[C("span",null,"切换天地图token",-1)])),DialogContainer:Z(()=>[C("div",Rn,[C("p",null,"当前token: "+oe(N(n)),1),$(M,{modelValue:i.value,"onUpdate:modelValue":k[0]||(k[0]=f=>i.value=f),style:{width:"65%"},"fetch-suggestions":c,"popper-class":"my-autocomplete",placeholder:"请选择或者输入",onSelect:P,clearable:""},{suffix:Z(()=>k[2]||(k[2]=[])),default:Z(({item:f})=>[C("div",{class:_t(["input_wrap",{current_selected:f.value===N(n)}])},[C("h3",null,[ne(oe(f.name)+" ",1),f.value===N(n)?(Y(),le("span",Zn,"- 当前token")):Mt("",!0)]),C("span",null,oe(f.value),1)],2)]),_:1},8,["modelValue"]),$(y,{type:"primary",style:{"margin-left":"25px"},onClick:h,disabled:i.value===""},{default:Z(()=>k[3]||(k[3]=[ne(" 确定 ")])),_:1},8,["disabled"])])]),_:1},512)}}},jn=ye(qn,[["__scopeId","data-v-e0d3be93"]]),Nn={class:"ol_map_wrap"},Un={class:"copyright_info"},Wn=Bt({name:"gis"}),eo=Object.assign(Wn,{props:{currentPageType:{type:String,default:""},isAutoRenderData:{type:Boolean,default:!1},isShowLend:{type:Boolean,default:!0}},emits:["getOlMapInstance","getCurrentViewData","reflashMap","toggleOverviewInfo","getCircleData","setCircleDialogData"],setup(e,{expose:t,emit:o}){const n=o,l=e,{proxy:i}=At();let s=null;const c=_(null),u=_(null),m=_(null);_(!0);const P=_(0),h=_(""),D=_(!0);let v=_({});const k={minRenderZoom:fe},M=a=>{s=a,n("getOlMapInstance",a,k),ln(a),cn(a,r=>{y(r)},r=>{r(l.currentPageType)})},y=({option:a,feature:r,pixelPoint:g})=>{c.value.hidePopup(),F.setMenuMethods(s,a,r,g,i)},p=a=>{l.isAutoRenderData||n("getCurrentViewData",a),n("getCircleData",a)},f=a=>{ee(a)},b=a=>{rn(s,a)},A=(a,r,g,d=!0)=>{c.value.hidePopup(),D.value&&Te(s),setTimeout(()=>{d?r.forEach(L=>{g(a,L)}):g(a,r)},500)},q=async(a,r,g,d)=>{const{arrData:L}=r;g&&g(r),c.value.hidePopup(),a.getView().setZoom(18),_e(s,[r.longitude,r.latitude]),Pe(s),d&&d(a,[r]),setTimeout(()=>{hn(a,x=>{let T={};switch(x.get("type")){case"Marker":T=x.get("pointData");break;case"Curve":T=x.get("curveData");break}T.cgi===r.cgi&&(v.value={featureData:T,featureItem:x})})},1e3);const S=De(r.longitude,r.latitude);yn(S,r,x=>{if(L)x.popupData=L,x.noFeature=!0;else{let T=document.querySelector("#popupBack");T&&T.remove()}et(a,S,L?ie(x):ce(x),T=>{const{target:K}=T;K.getAttribute("data-function")==="getMore"&&w.emit("popupDataGetMore",{currentPopupObj:r,callback:Lt=>{w.emit("showPopupDialog",Lt)}}),K.getAttribute("data-function")==="getSingleByFeatures"&&w.emit("getSingleByFeatures",{unique:K.getAttribute("data-unique").trim(),itemData:r}),K.getAttribute("data-function")==="popupBack"&&w.emit("popupBack")})})};w.on("initOlMapByToken",()=>{Me()}),w.on("reflashMap",a=>{a&&s.getView().getZoom()>fe&&w.emit("resetBtn"),fn(s),n("reflashMap",a,()=>{Ve(()=>{setTimeout(()=>{if(!St(v.value)){let{featureData:r,featureItem:g}=v.value;Je(s,g)}},1e3)})})}),w.on("cancelDrawInteraction",()=>{R(s,a=>a.get("drawType")),Le(s)}),w.on("drawPolygon",()=>{kn(s)}),w.on("cancelPolygon",()=>{Pn(s)}),w.on("drawCircle",()=>{Cn(s)}),w.on("cancelCircle",()=>{}),w.on("testDistance",a=>{Ln(s,a)}),w.on("cancelTestDistance",()=>{bn(s)}),w.on("showSetTokenDialog",()=>{var a;(a=m.value)==null||a.show()}),w.on("singleFeaturesClick",({feature:a,pixelPoint:r})=>{if(l.currentPageType==="complain"){n("setCircleDialogData",a);return}E(s,a,r)});const ee=a=>{a.on("pointermove",r=>{let g=a.getEventPixel(r.originalEvent),d=a.hasFeatureAtPixel(g);a.getTargetElement().style.cursor=d?"pointer":"",h.value=J(r.coordinate)}),a.on("singleclick",r=>{if(de(a))return;c.value.hidePopup(),Ke();let g=a.getEventPixel(r.originalEvent),d=a.getFeaturesAtPixel(g);const L=T=>d.filter(K=>K.get("type")===T),S=T=>JSON.stringify(L(T))!=="[]",x=()=>{let T=L("Marker")[0]||L("Curve")[0];d.length===2?T&&T.get("type")&&E(s,T,r.coordinate):c.value.setFeaturesPopup(a,r.coordinate,d)};d&&(d.length===1&&(L("Circle").length!==0&&c.value.hidePopup(),E(a,d[0],r.coordinate)),d.length>1&&(S("Cluster")&&(c.value.hidePopup(),E(a,d[0],r.coordinate)),(S("Circle")||S("Polygon"))&&x(),S("Circle")||S("Polygon")||(d[0].get("type")==="Curve"||d[0].get("type")==="Marker")&&c.value.setFeaturesPopup(a,r.coordinate,d)))}),a.on("moveend",r=>{let g=s.getView(),d=g.getZoom();P.value=d.toFixed(2);let L=g.getCenter();w.emit("getCurrentCenter",J(L)),w.emit("getCurrentZoom",{zoom:d,minRenderZoom:fe}),l.isAutoRenderData&&(ze(a),n("getCurrentViewData",a))})},E=(a,r,g)=>{if(r&&r.get("drawType")&&de(a))return;let d=null;if(r&&r.get("type")==="Cluster"){c.value.hidePopup();let L=r.get("features");if(L.length===1){d=L[0].get("pointData"),c.value.setCommonPopup(a,g,d,L[0]);return}const S=Qt(L.map(x=>x.getGeometry().getCoordinates()));a.getView().fit(S,{duration:1e3,padding:[50,50,50,50]})}r&&r.get("type")==="Marker"&&(d=r.get("pointData"),c.value.setCommonPopup(a,g,d,r)),r&&r.get("type")==="Curve"&&(d=r.get("curveData"),c.value.setCommonPopup(a,g,d)),r&&r.get("type")==="Circle"&&me(r),r&&r.get("type")==="Polygon"&&(r.get("polygonData"),r.get("businessType"),st(r))},me=a=>{let r=a.get("circleData");w.emit("setCircleDialogData",r)},st=a=>{const{coords:r,lonlat:g,name:d}=a.get("polygonData");w.emit("setPolygonDialogData",{lonlat:g,name:d})},lt=a=>sn(a),De=(a,r)=>un(a,r),ct=(a,r,g={},d,L)=>{ot(a,r,g,d,L)},it=(a,r,g,d)=>{at(a,r,g,d)},ut=(a,r)=>{vn(a,r)},pt=a=>{Pe(a)},dt=(a,r)=>{mn(a,r)},gt=(a,r)=>{tt(a,r)},yt=(a,r,g,d={},L)=>{dn(a,r,g,d,L)},mt=(a,r,g)=>{gn(a,r,g)},Te=a=>{ze(a)},ft=(a,r)=>Q(a,r),wt=(a,r,g)=>{g?Ae(a,r,d=>g(d)):Ae(a,r)},_e=(a,r)=>{wn(a,r)},ht=(a,{coords:r,lonlat:g,polygonData:d},L,S,x)=>{nt(a,{coords:r,lonlat:g,polygonData:d},L,S,x)},vt=(a,r,g,d,L={},S)=>{Qe(a,r,g,{businessType:d,...L},S)},kt=a=>pn(a),Pt=(a,r,g,d)=>{Dn(a,r,g,d)},Me=()=>{Ct(s);const a=an("olMap");M(a),p(a),f(a)},Ct=a=>{a&&on(a)};return Oe(()=>{Me()}),t({renderFeatureByData:A,setMapByAutoPopupData:q,getCurrentViewPosition:lt,transformToPixelPoint:De,addCircle:ct,addFlickerPoint:it,loadKML:ut,removeAllLayer:pt,removeLayerByType:dt,removeLayerByBusinessType:gt,addPoint:yt,setCluster:mt,removeAllDefaultLayer:Te,addCurve:wt,createPolygon:ht,flyToCoordinate:_e,setFeaturesStyle:ft,addTextPoint:vt,getPolygonCenter:kt,addArrowLine:Pt}),(a,r)=>(Y(),le("section",Nn,[xt(a.$slots,"default"),r[3]||(r[3]=C("section",{id:"olMap",class:"ol_map"},null,-1)),$(Fn,{ref_key:"refLend",ref:u,currentPageType:e.currentPageType,isShowLend:e.isShowLend},null,8,["currentPageType","isShowLend"]),$(Gn,{onSwitchBaseLayerType:b}),$(xn,{ref_key:"refPopupCommon",ref:c,currentPageType:e.currentPageType},null,8,["currentPageType"]),re(C("div",Un,[r[2]||(r[2]=C("p",null,"Copyright © CMDI.vip All Rights Reserved.",-1)),C("ul",null,[C("li",null,[C("dl",null,[r[0]||(r[0]=C("dt",null,"经纬度：",-1)),C("dd",null,oe(h.value),1)])]),C("li",null,[C("dl",null,[r[1]||(r[1]=C("dt",null,"当前层级：",-1)),C("dd",null,oe(P.value),1)])])])],512),[[se,!0]]),$(jn,{ref_key:"refSetTokenDialog",ref:m},null,512)]))}});export{eo as _};