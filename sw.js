if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>l(s,r),a={module:{uri:r},exports:u,require:t};e[r]=Promise.all(i.map((s=>a[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-3e8df8c8"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/css/403-Ds-inCsP.css",revision:null},{url:"assets/css/404-DhauGbo8.css",revision:null},{url:"assets/css/500-DCjxp8wL.css",revision:null},{url:"assets/css/AgeRatioChart-CQmVNcIt.css",revision:null},{url:"assets/css/AnnualUseChart-BoM4WGLz.css",revision:null},{url:"assets/css/AreaDetail-DnUbDX7I.css",revision:null},{url:"assets/css/CenterPage-PkQlTIjo.css",revision:null},{url:"assets/css/ChinaMapChart-H7Ge5uyz.css",revision:null},{url:"assets/css/curve-3A_ZExg9.css",revision:null},{url:"assets/css/demo0-Dpzid-Bt.css",revision:null},{url:"assets/css/DialogInfo-BUs3AiVk.css",revision:null},{url:"assets/css/gis-CaRfXGuS.css",revision:null},{url:"assets/css/HotPlateChart-CySMn06I.css",revision:null},{url:"assets/css/Imgs-CWLlMgVf.css",revision:null},{url:"assets/css/index-B0Tvgifx.css",revision:null},{url:"assets/css/index-BA1bnNDj.css",revision:null},{url:"assets/css/index-ba6602zu.css",revision:null},{url:"assets/css/index-BDUbiZ20.css",revision:null},{url:"assets/css/index-BKiPoI_R.css",revision:null},{url:"assets/css/index-ByubR0l5.css",revision:null},{url:"assets/css/index-BZNVwDKe.css",revision:null},{url:"assets/css/index-C4neHRXr.css",revision:null},{url:"assets/css/index-CBrcif5d.css",revision:null},{url:"assets/css/index-CC5Oli1M.css",revision:null},{url:"assets/css/index-CDgqWx7a.css",revision:null},{url:"assets/css/index-CDnRpDIe.css",revision:null},{url:"assets/css/index-CgoBC1AD.css",revision:null},{url:"assets/css/index-Cih3pf2N.css",revision:null},{url:"assets/css/index-CndoNt-j.css",revision:null},{url:"assets/css/index-cvHENb1p.css",revision:null},{url:"assets/css/index-CZIAyRYV.css",revision:null},{url:"assets/css/index-DDUZ8KmH.css",revision:null},{url:"assets/css/index-DFVDoIq1.css",revision:null},{url:"assets/css/index-Dh1qG933.css",revision:null},{url:"assets/css/index-DkLnQsn0.css",revision:null},{url:"assets/css/index-DmQLSq6R.css",revision:null},{url:"assets/css/index-DOFDjL7D.css",revision:null},{url:"assets/css/index-DR3VQr1Q.css",revision:null},{url:"assets/css/index-DTZebKXY.css",revision:null},{url:"assets/css/index-DZh0FfUg.css",revision:null},{url:"assets/css/index-gXbcW9db.css",revision:null},{url:"assets/css/index-PegqVRsq.css",revision:null},{url:"assets/css/index-QwwcNlGf.css",revision:null},{url:"assets/css/index-tn0RQdqM.css",revision:null},{url:"assets/css/index-Tzc1SVI2.css",revision:null},{url:"assets/css/index-u45JCm--.css",revision:null},{url:"assets/css/index-v40xALby.css",revision:null},{url:"assets/css/index-VOSLs3cQ.css",revision:null},{url:"assets/css/index-XCmbNtfz.css",revision:null},{url:"assets/css/InfoContent-CAgLkKTN.css",revision:null},{url:"assets/css/jiaXingPictureBox1-CIhvggmc.css",revision:null},{url:"assets/css/jiaXingPictureBox2-AhBPlUls.css",revision:null},{url:"assets/css/LeftPage--Zck4JNx.css",revision:null},{url:"assets/css/LoginForm-CIoseQ2r.css",revision:null},{url:"assets/css/MaleFemaleRatioChart-Byc59_zx.css",revision:null},{url:"assets/css/MapLend-DQiyDrkQ.css",revision:null},{url:"assets/css/myChart1-aMpAk_4r.css",revision:null},{url:"assets/css/myChart2-BkV66U8G.css",revision:null},{url:"assets/css/myChart3-JLSbOmP6.css",revision:null},{url:"assets/css/myChart4-D9khvUKs.css",revision:null},{url:"assets/css/myChart5-C6mhna62.css",revision:null},{url:"assets/css/myChart6-8NK0aYI8.css",revision:null},{url:"assets/css/OverNext30Chart-D7-GOx61.css",revision:null},{url:"assets/css/PictureBoxContent-CVXI501J.css",revision:null},{url:"assets/css/PictureBoxTemplate-DSGrgZiL.css",revision:null},{url:"assets/css/pie-p0RNEZZd.css",revision:null},{url:"assets/css/PlatformSourceChart-C_phFD1m.css",revision:null},{url:"assets/css/RealTimeAccessChart-CvSqJk22.css",revision:null},{url:"assets/css/RightPage-65VPrpqv.css",revision:null},{url:"assets/css/ServiceMain-DbDE8_fB.css",revision:null},{url:"assets/css/Tab-C5Dc3aCy.css",revision:null},{url:"assets/css/ToolTip-DAxVGLQT.css",revision:null},{url:"assets/js/403-g0ZOjyYS.js",revision:null},{url:"assets/js/404-CHiVSYC8.js",revision:null},{url:"assets/js/500-CgJpGkao.js",revision:null},{url:"assets/js/AgeRatioChart-BwykwC11.js",revision:null},{url:"assets/js/AnnualUseChart-CB88giUV.js",revision:null},{url:"assets/js/AreaDetail-CwuPpUY_.js",revision:null},{url:"assets/js/business-DEvFIr8w.js",revision:null},{url:"assets/js/CenterPage-Lubb2rTl.js",revision:null},{url:"assets/js/ChinaMapChart-BlAYFDv3.js",revision:null},{url:"assets/js/curve-CCCQ0uAK.js",revision:null},{url:"assets/js/demo0--4FVAzQl.js",revision:null},{url:"assets/js/demo1-B5Z404Zn.js",revision:null},{url:"assets/js/detail-BK9EbyeT.js",revision:null},{url:"assets/js/detail-CBprgxiu.js",revision:null},{url:"assets/js/detail-UpPd8N2Z.js",revision:null},{url:"assets/js/DialogInfo-1LTAYosM.js",revision:null},{url:"assets/js/fm-ByyAcWO9.js",revision:null},{url:"assets/js/gis-CVaIaT5-.js",revision:null},{url:"assets/js/HotPlateChart-CYluFkxY.js",revision:null},{url:"assets/js/Imgs-oN2TRSjI.js",revision:null},{url:"assets/js/index-03JYBc5j.js",revision:null},{url:"assets/js/index-0HqsllEi.js",revision:null},{url:"assets/js/index-2tjHPA0w.js",revision:null},{url:"assets/js/index-2XnBRut3.js",revision:null},{url:"assets/js/index-3puyCGI4.js",revision:null},{url:"assets/js/index-3WdUeL1O.js",revision:null},{url:"assets/js/index-5Xwhn5rD.js",revision:null},{url:"assets/js/index-a7C-YWVn.js",revision:null},{url:"assets/js/index-B_A8oVn3.js",revision:null},{url:"assets/js/index-B-yuLJKB.js",revision:null},{url:"assets/js/index-B6WRQr8a.js",revision:null},{url:"assets/js/index-BbRlL5Vh.js",revision:null},{url:"assets/js/index-Bc3h0sxM.js",revision:null},{url:"assets/js/index-Bei00w_F.js",revision:null},{url:"assets/js/index-Bekwwm1p.js",revision:null},{url:"assets/js/index-BeuuZqUB.js",revision:null},{url:"assets/js/index-BIKjDYGE.js",revision:null},{url:"assets/js/index-BKQwwy0E.js",revision:null},{url:"assets/js/index-BPtPb4sd.js",revision:null},{url:"assets/js/index-BQv684-f.js",revision:null},{url:"assets/js/index-BS-jAZ87.js",revision:null},{url:"assets/js/index-BtvdA53Q.js",revision:null},{url:"assets/js/index-BumSOZU2.js",revision:null},{url:"assets/js/index-BvR1BmAs.js",revision:null},{url:"assets/js/index-BvR9IM-5.js",revision:null},{url:"assets/js/index-BXWyD2oU.js",revision:null},{url:"assets/js/index-C0AaWwCT.js",revision:null},{url:"assets/js/index-C1iK802D.js",revision:null},{url:"assets/js/index-C6Blw8xZ.js",revision:null},{url:"assets/js/index-C9tA-qi9.js",revision:null},{url:"assets/js/index-CAkjr9eC.js",revision:null},{url:"assets/js/index-CCA_-42S.js",revision:null},{url:"assets/js/index-CcyrkBu8.js",revision:null},{url:"assets/js/index-CF-8HhtG.js",revision:null},{url:"assets/js/index-Cg3kspGE.js",revision:null},{url:"assets/js/index-CgyJacqR.js",revision:null},{url:"assets/js/index-ClSxeOHQ.js",revision:null},{url:"assets/js/index-CphW22RD.js",revision:null},{url:"assets/js/index-CRZoN8jH.js",revision:null},{url:"assets/js/index-CUYfY-B_.js",revision:null},{url:"assets/js/index-Cw6k2-qk.js",revision:null},{url:"assets/js/index-CXJrgVRp.js",revision:null},{url:"assets/js/index-CxXEZ1jl.js",revision:null},{url:"assets/js/index-CxxHeeW0.js",revision:null},{url:"assets/js/index-CYy5Qvrh.js",revision:null},{url:"assets/js/index-CzK89fkC.js",revision:null},{url:"assets/js/index-D3xDmiTi.js",revision:null},{url:"assets/js/index-D5AR0Ix8.js",revision:null},{url:"assets/js/index-D71etu2d.js",revision:null},{url:"assets/js/index-D7CICtWZ.js",revision:null},{url:"assets/js/index-D7dt3x4G.js",revision:null},{url:"assets/js/index-DcpN717S.js",revision:null},{url:"assets/js/index-DCPzIAru.js",revision:null},{url:"assets/js/index-DDihebat.js",revision:null},{url:"assets/js/index-DdxmfrNJ.js",revision:null},{url:"assets/js/index-DeF7eF7J.js",revision:null},{url:"assets/js/index-DEpZu-w3.js",revision:null},{url:"assets/js/index-DGaQTdCZ.js",revision:null},{url:"assets/js/index-DmYydHjv.js",revision:null},{url:"assets/js/index-DoOM5-Bt.js",revision:null},{url:"assets/js/index-DPmbgZn_.js",revision:null},{url:"assets/js/index-Dqti3RW3.js",revision:null},{url:"assets/js/index-DQWXNNFi.js",revision:null},{url:"assets/js/index-DR_p3u4c.js",revision:null},{url:"assets/js/index-Druk5zcS.js",revision:null},{url:"assets/js/index-DvWQdCq7.js",revision:null},{url:"assets/js/index-DxMwNDA6.js",revision:null},{url:"assets/js/index-DXwLDXJT.js",revision:null},{url:"assets/js/index-DZnX8h9s.js",revision:null},{url:"assets/js/index-HoFC20Cv.js",revision:null},{url:"assets/js/index-jy_3Ph3V.js",revision:null},{url:"assets/js/index-lEALyBLO.js",revision:null},{url:"assets/js/index-nupHVcmX.js",revision:null},{url:"assets/js/index-oX_ZW06n.js",revision:null},{url:"assets/js/index-P_m8kgSb.js",revision:null},{url:"assets/js/index-P86ULa0H.js",revision:null},{url:"assets/js/index-QQ6q35ST.js",revision:null},{url:"assets/js/index-XK43b3jz.js",revision:null},{url:"assets/js/index-Xs9aOMzH.js",revision:null},{url:"assets/js/index-YsahRbfa.js",revision:null},{url:"assets/js/index-yvdwBs1I.js",revision:null},{url:"assets/js/index.vuevuetypescriptsetuptruenameEChartslang-BiGrAuW1.js",revision:null},{url:"assets/js/index.vuevuetypescriptsetuptruenameProTablelang-B_o1dQ48.js",revision:null},{url:"assets/js/index.vuevuetypescriptsetuptruenameSwitchDarklang-Bxec2zXB.js",revision:null},{url:"assets/js/index0-C3S0LvF6.js",revision:null},{url:"assets/js/InfoContent-CSjMjKpZ.js",revision:null},{url:"assets/js/jiaXingPictureBox1-DEZtmLBE.js",revision:null},{url:"assets/js/jiaXingPictureBox2-CAVBROhr.js",revision:null},{url:"assets/js/LeftPage-DF8C4ZkP.js",revision:null},{url:"assets/js/LoginForm-Be-UK5_u.js",revision:null},{url:"assets/js/MaleFemaleRatioChart---tV7BVy.js",revision:null},{url:"assets/js/MapLend-DagTDb_E.js",revision:null},{url:"assets/js/maplibre-gl-CelAJCfa.js",revision:null},{url:"assets/js/mittBus-rOgeEvW-.js",revision:null},{url:"assets/js/myChart1-DhdjbQ8A.js",revision:null},{url:"assets/js/myChart2-B4tHwE54.js",revision:null},{url:"assets/js/myChart3-B4_Hq0ab.js",revision:null},{url:"assets/js/myChart4-CkNohcE6.js",revision:null},{url:"assets/js/myChart5-B2DarHHL.js",revision:null},{url:"assets/js/myChart6-DglEPUGq.js",revision:null},{url:"assets/js/OverNext30Chart-D9pqpxci.js",revision:null},{url:"assets/js/PictureBoxContent-DNjYxYNi.js",revision:null},{url:"assets/js/PictureBoxTemplate-AY71zI24.js",revision:null},{url:"assets/js/pie-DdDW2DAx.js",revision:null},{url:"assets/js/PlatformSourceChart-CRLbC8eP.js",revision:null},{url:"assets/js/plugin-vueexport-helper-DlAUqK2U.js",revision:null},{url:"assets/js/RealTimeAccessChart-CN1Op4dm.js",revision:null},{url:"assets/js/RightPage-oaABSL9k.js",revision:null},{url:"assets/js/ServiceMain-Bt13_y7I.js",revision:null},{url:"assets/js/servicePort-D3LIsGOm.js",revision:null},{url:"assets/js/sortable.esm-DkKE9Vxu.js",revision:null},{url:"assets/js/Tab-9GeOmNcz.js",revision:null},{url:"assets/js/tabs-BxN_QQCx.js",revision:null},{url:"assets/js/ToolTip-DA3_VNIT.js",revision:null},{url:"assets/js/upload-B3J7jE1u.js",revision:null},{url:"assets/js/useAuthButtons-DLVhg-XJ.js",revision:null},{url:"assets/js/useHandleData-DMDa7lft.js",revision:null},{url:"assets/js/user-O4kkOyA1.js",revision:null},{url:"assets/js/UserDrawer-BTjLF-Ql.js",revision:null},{url:"assets/js/UserDrawer.vuevuetypescriptsetuptruenameUserDrawerlang-BU1lTQH3.js",revision:null},{url:"index.html",revision:"261c4b47c544fc391bfbc109208220ff"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"manifest.webmanifest",revision:"6edb9e25f90c02bfef7e91cf536db6d1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
