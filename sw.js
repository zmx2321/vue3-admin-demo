if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>l(s,r),a={module:{uri:r},exports:u,require:t};e[r]=Promise.all(i.map((s=>a[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-3e8df8c8"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/css/403-BzyIkoOx.css",revision:null},{url:"assets/css/404-BGQTKSpA.css",revision:null},{url:"assets/css/500-CuffNYCh.css",revision:null},{url:"assets/css/AgeRatioChart-CQmVNcIt.css",revision:null},{url:"assets/css/AnnualUseChart-DQTxURRB.css",revision:null},{url:"assets/css/AreaDetail-DnUbDX7I.css",revision:null},{url:"assets/css/CenterPage-ByrxE3um.css",revision:null},{url:"assets/css/ChinaMapChart-H7Ge5uyz.css",revision:null},{url:"assets/css/curve-3A_ZExg9.css",revision:null},{url:"assets/css/demo0-MxHVVpf4.css",revision:null},{url:"assets/css/DialogInfo-BUs3AiVk.css",revision:null},{url:"assets/css/gis-CaRfXGuS.css",revision:null},{url:"assets/css/HotPlateChart-CySMn06I.css",revision:null},{url:"assets/css/Imgs-B_45leEF.css",revision:null},{url:"assets/css/index-_R7NyLnY.css",revision:null},{url:"assets/css/index-aGb0-O6o.css",revision:null},{url:"assets/css/index-B_riHQFN.css",revision:null},{url:"assets/css/index-BDGGk7wz.css",revision:null},{url:"assets/css/index-BDUbiZ20.css",revision:null},{url:"assets/css/index-BWWvOmHy.css",revision:null},{url:"assets/css/index-BZNVwDKe.css",revision:null},{url:"assets/css/index-C8Kd4vqA.css",revision:null},{url:"assets/css/index-CBrcif5d.css",revision:null},{url:"assets/css/index-CCYfvrAR.css",revision:null},{url:"assets/css/index-CiWKLJOl.css",revision:null},{url:"assets/css/index-CLER0PLd.css",revision:null},{url:"assets/css/index-CndoNt-j.css",revision:null},{url:"assets/css/index-CNUuBISI.css",revision:null},{url:"assets/css/index-CpFznlQC.css",revision:null},{url:"assets/css/index-CT9MZJwt.css",revision:null},{url:"assets/css/index-CwA4scbF.css",revision:null},{url:"assets/css/index-Cy2NwjuC.css",revision:null},{url:"assets/css/index-CZIAyRYV.css",revision:null},{url:"assets/css/index-D_ndS9v7.css",revision:null},{url:"assets/css/index-DdCQjGx9.css",revision:null},{url:"assets/css/index-DdGh2urO.css",revision:null},{url:"assets/css/index-DDnUMMV9.css",revision:null},{url:"assets/css/index-DdrdG2yo.css",revision:null},{url:"assets/css/index-DegdPuFi.css",revision:null},{url:"assets/css/index-DJvUWAhu.css",revision:null},{url:"assets/css/index-DQnTXGAM.css",revision:null},{url:"assets/css/index-DWgHrBot.css",revision:null},{url:"assets/css/index-h3w0RYvz.css",revision:null},{url:"assets/css/index-lYWjBWev.css",revision:null},{url:"assets/css/index-NE0zjad1.css",revision:null},{url:"assets/css/index-OFUOBeuo.css",revision:null},{url:"assets/css/index-oJ0fuGvk.css",revision:null},{url:"assets/css/index-sUOmWrid.css",revision:null},{url:"assets/css/index-tn0RQdqM.css",revision:null},{url:"assets/css/InfoContent-CAgLkKTN.css",revision:null},{url:"assets/css/jiaXingPictureBox1-Cnx8Pmqd.css",revision:null},{url:"assets/css/jiaXingPictureBox2-88JAYCUL.css",revision:null},{url:"assets/css/LeftPage--Zck4JNx.css",revision:null},{url:"assets/css/LoginForm-CtVqcsgy.css",revision:null},{url:"assets/css/MaleFemaleRatioChart-Byc59_zx.css",revision:null},{url:"assets/css/myChart1-aMpAk_4r.css",revision:null},{url:"assets/css/myChart2-BkV66U8G.css",revision:null},{url:"assets/css/myChart3-D6CpYqcl.css",revision:null},{url:"assets/css/myChart4-DUL-Cqnx.css",revision:null},{url:"assets/css/myChart5-B-gqgN5c.css",revision:null},{url:"assets/css/myChart6-DNcTIYxm.css",revision:null},{url:"assets/css/OverNext30Chart-B5uVNMZr.css",revision:null},{url:"assets/css/PictureBoxContent-CVXI501J.css",revision:null},{url:"assets/css/PictureBoxTemplate-C7J5CIDU.css",revision:null},{url:"assets/css/pie-p0RNEZZd.css",revision:null},{url:"assets/css/PlatformSourceChart-C_phFD1m.css",revision:null},{url:"assets/css/RealTimeAccessChart-CvSqJk22.css",revision:null},{url:"assets/css/RightPage-65VPrpqv.css",revision:null},{url:"assets/css/ServiceMain-DbDE8_fB.css",revision:null},{url:"assets/css/ToolTip-CSyLmERz.css",revision:null},{url:"assets/js/403-DCLeZ1Tl.js",revision:null},{url:"assets/js/404-DhBnzRyf.js",revision:null},{url:"assets/js/500-Db2grbHD.js",revision:null},{url:"assets/js/AgeRatioChart-DZy4pJx7.js",revision:null},{url:"assets/js/AnnualUseChart-CIGpTRIQ.js",revision:null},{url:"assets/js/AreaDetail-BpCHYN-Q.js",revision:null},{url:"assets/js/business-e0o4Of6i.js",revision:null},{url:"assets/js/CenterPage-CfUer_IA.js",revision:null},{url:"assets/js/ChinaMapChart-B0Ak1sjC.js",revision:null},{url:"assets/js/curve-BRpfPJTa.js",revision:null},{url:"assets/js/demo0-K7zW_KfB.js",revision:null},{url:"assets/js/demo1-USyuCanT.js",revision:null},{url:"assets/js/detail-B5xGVKPZ.js",revision:null},{url:"assets/js/detail-BU0-Rzav.js",revision:null},{url:"assets/js/detail-CMJq_yDQ.js",revision:null},{url:"assets/js/DialogInfo-CLgoIyiY.js",revision:null},{url:"assets/js/gis-D6l7OrnZ.js",revision:null},{url:"assets/js/HotPlateChart-BQZfutXY.js",revision:null},{url:"assets/js/Imgs-CofYZTmF.js",revision:null},{url:"assets/js/index-_UDBoyyZ.js",revision:null},{url:"assets/js/index--262CdSb.js",revision:null},{url:"assets/js/index-0CuFfyC6.js",revision:null},{url:"assets/js/index-5fK3QSRI.js",revision:null},{url:"assets/js/index-63KQqegS.js",revision:null},{url:"assets/js/index-B_owgr-2.js",revision:null},{url:"assets/js/index-B0lAzwxI.js",revision:null},{url:"assets/js/index-B2HOqPj7.js",revision:null},{url:"assets/js/index-B6mkK_jd.js",revision:null},{url:"assets/js/index-B8UfDQLG.js",revision:null},{url:"assets/js/index-BCDEVJDC.js",revision:null},{url:"assets/js/index-BfTbTnBH.js",revision:null},{url:"assets/js/index-BFudQMCf.js",revision:null},{url:"assets/js/index-BQn7W6uC.js",revision:null},{url:"assets/js/index-BQpz90BV.js",revision:null},{url:"assets/js/index-Bu4pwSNw.js",revision:null},{url:"assets/js/index-BUpUcane.js",revision:null},{url:"assets/js/index-Bv2xjWyP.js",revision:null},{url:"assets/js/index-BvMZ9S15.js",revision:null},{url:"assets/js/index-BWcsXoTy.js",revision:null},{url:"assets/js/index-BWr4aYqt.js",revision:null},{url:"assets/js/index-BWX-T0LQ.js",revision:null},{url:"assets/js/index-Bz2Jc3uD.js",revision:null},{url:"assets/js/index-BzBsxvio.js",revision:null},{url:"assets/js/index-C4y0owZ6.js",revision:null},{url:"assets/js/index-C5kWcZJb.js",revision:null},{url:"assets/js/index-C5L3DThk.js",revision:null},{url:"assets/js/index-CA6iIP7a.js",revision:null},{url:"assets/js/index-CAel4u9A.js",revision:null},{url:"assets/js/index-CCka3Oo_.js",revision:null},{url:"assets/js/index-CdOz3_OF.js",revision:null},{url:"assets/js/index-CEjNez0c.js",revision:null},{url:"assets/js/index-CGrOPZyB.js",revision:null},{url:"assets/js/index-CGXyXFLr.js",revision:null},{url:"assets/js/index-CJQB0WAY.js",revision:null},{url:"assets/js/index-CJypuTFL.js",revision:null},{url:"assets/js/index-CkHiZJmJ.js",revision:null},{url:"assets/js/index-Ckn5cAhR.js",revision:null},{url:"assets/js/index-CKnZPvav.js",revision:null},{url:"assets/js/index-ClT58ZbK.js",revision:null},{url:"assets/js/index-CmX7aazv.js",revision:null},{url:"assets/js/index-Cn9NKlMo.js",revision:null},{url:"assets/js/index-CoTbhXvF.js",revision:null},{url:"assets/js/index-CsSpPOTE.js",revision:null},{url:"assets/js/index-CSWxwRZn.js",revision:null},{url:"assets/js/index-CTkZMJar.js",revision:null},{url:"assets/js/index-CY_MMSg2.js",revision:null},{url:"assets/js/index-CY0xsw8f.js",revision:null},{url:"assets/js/index-CyAv7yGv.js",revision:null},{url:"assets/js/index-CyopCmbH.js",revision:null},{url:"assets/js/index-D87eQVPC.js",revision:null},{url:"assets/js/index-DacEVaZH.js",revision:null},{url:"assets/js/index-DhDzoL6D.js",revision:null},{url:"assets/js/index-DHhsYfWY.js",revision:null},{url:"assets/js/index-DI27DJc2.js",revision:null},{url:"assets/js/index-DiUbg45M.js",revision:null},{url:"assets/js/index-DJfwO-s6.js",revision:null},{url:"assets/js/index-DjWvBe5t.js",revision:null},{url:"assets/js/index-DkcHiZv7.js",revision:null},{url:"assets/js/index-DM3mYl3E.js",revision:null},{url:"assets/js/index-DNeH9-Of.js",revision:null},{url:"assets/js/index-DQS4Px5E.js",revision:null},{url:"assets/js/index-Dr7_ejlr.js",revision:null},{url:"assets/js/index-Dsi5Xx6N.js",revision:null},{url:"assets/js/index-DswLun0B.js",revision:null},{url:"assets/js/index-DTHai-rY.js",revision:null},{url:"assets/js/index-DtT3eeh2.js",revision:null},{url:"assets/js/index-DZ6HhbKu.js",revision:null},{url:"assets/js/index-iyPku2CI.js",revision:null},{url:"assets/js/index-ju8NCUHF.js",revision:null},{url:"assets/js/index-kBUCrU29.js",revision:null},{url:"assets/js/index-oWdnTaUy.js",revision:null},{url:"assets/js/index-sEvjeNXa.js",revision:null},{url:"assets/js/index-skejI9pb.js",revision:null},{url:"assets/js/index-UQXHphPa.js",revision:null},{url:"assets/js/index-vFjUZVPb.js",revision:null},{url:"assets/js/index-VkDVG3Bk.js",revision:null},{url:"assets/js/index-VOyhVbs-.js",revision:null},{url:"assets/js/index-yYvu9WKH.js",revision:null},{url:"assets/js/index-ZpGmE4JI.js",revision:null},{url:"assets/js/index.vuevuetypescriptsetuptruenameEChartslang-vqZWlf7X.js",revision:null},{url:"assets/js/index.vuevuetypescriptsetuptruenameProTablelang-B1f4lF78.js",revision:null},{url:"assets/js/index.vuevuetypescriptsetuptruenameSwitchDarklang-tOxSv_6y.js",revision:null},{url:"assets/js/index0-qn-rFlFh.js",revision:null},{url:"assets/js/InfoContent-9QLNovVj.js",revision:null},{url:"assets/js/jiaXingPictureBox1-DrUjTk4i.js",revision:null},{url:"assets/js/jiaXingPictureBox2-Bd0Q16Us.js",revision:null},{url:"assets/js/LeftPage-BsNCyiX4.js",revision:null},{url:"assets/js/LoginForm-gbptLmZd.js",revision:null},{url:"assets/js/MaleFemaleRatioChart-3iDdxYKv.js",revision:null},{url:"assets/js/maplibre-gl-D40m6uOh.js",revision:null},{url:"assets/js/mittBus-rOgeEvW-.js",revision:null},{url:"assets/js/myChart1-ULodWmq1.js",revision:null},{url:"assets/js/myChart2-BZFozqVG.js",revision:null},{url:"assets/js/myChart3-B0zJuVz4.js",revision:null},{url:"assets/js/myChart4-rHWWeAbZ.js",revision:null},{url:"assets/js/myChart5-DYsBO1Uo.js",revision:null},{url:"assets/js/myChart6-Bk1CRYWk.js",revision:null},{url:"assets/js/OverNext30Chart-C0GlHF3f.js",revision:null},{url:"assets/js/PictureBoxContent-wQAwPI64.js",revision:null},{url:"assets/js/PictureBoxTemplate-DwjJgdey.js",revision:null},{url:"assets/js/pie-B2VLzx60.js",revision:null},{url:"assets/js/PlatformSourceChart-BXge2KBk.js",revision:null},{url:"assets/js/plugin-vueexport-helper-DlAUqK2U.js",revision:null},{url:"assets/js/RealTimeAccessChart-By335Q7x.js",revision:null},{url:"assets/js/RightPage-DfI5hG4f.js",revision:null},{url:"assets/js/ServiceMain-DRjXswGJ.js",revision:null},{url:"assets/js/servicePort-D3LIsGOm.js",revision:null},{url:"assets/js/sortable.esm-DkKE9Vxu.js",revision:null},{url:"assets/js/tabs-DN5Ywm1o.js",revision:null},{url:"assets/js/ToolTip-DlIXG4QH.js",revision:null},{url:"assets/js/upload-CI0VVAFm.js",revision:null},{url:"assets/js/useAuthButtons-DTwWFMSV.js",revision:null},{url:"assets/js/useHandleData-6x2nfGIG.js",revision:null},{url:"assets/js/user-Bm8FeX5X.js",revision:null},{url:"assets/js/UserDrawer-DP4HEij9.js",revision:null},{url:"assets/js/UserDrawer.vuevuetypescriptsetuptruenameUserDrawerlang-CXK-dpni.js",revision:null},{url:"index.html",revision:"b96166db009129a83f11bcc416703870"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"manifest.webmanifest",revision:"6edb9e25f90c02bfef7e91cf536db6d1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
