if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>l(s,r),a={module:{uri:r},exports:u,require:t};e[r]=Promise.all(i.map((s=>a[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-3e8df8c8"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/css/403-BzyIkoOx.css",revision:null},{url:"assets/css/404-BGQTKSpA.css",revision:null},{url:"assets/css/500-CuffNYCh.css",revision:null},{url:"assets/css/AgeRatioChart-CQmVNcIt.css",revision:null},{url:"assets/css/AnnualUseChart-DQTxURRB.css",revision:null},{url:"assets/css/AreaDetail-DnUbDX7I.css",revision:null},{url:"assets/css/CenterPage-Dw6rQc97.css",revision:null},{url:"assets/css/ChinaMapChart-H7Ge5uyz.css",revision:null},{url:"assets/css/curve-3A_ZExg9.css",revision:null},{url:"assets/css/demo0-MxHVVpf4.css",revision:null},{url:"assets/css/DialogInfo-BUs3AiVk.css",revision:null},{url:"assets/css/gis-CaRfXGuS.css",revision:null},{url:"assets/css/HotPlateChart-CySMn06I.css",revision:null},{url:"assets/css/Imgs-B_45leEF.css",revision:null},{url:"assets/css/index-_R7NyLnY.css",revision:null},{url:"assets/css/index-B_riHQFN.css",revision:null},{url:"assets/css/index-BDGGk7wz.css",revision:null},{url:"assets/css/index-BDUbiZ20.css",revision:null},{url:"assets/css/index-BPbHWLik.css",revision:null},{url:"assets/css/index-BZNVwDKe.css",revision:null},{url:"assets/css/index-C8Kd4vqA.css",revision:null},{url:"assets/css/index-CBrcif5d.css",revision:null},{url:"assets/css/index-CC4Xap15.css",revision:null},{url:"assets/css/index-CCYfvrAR.css",revision:null},{url:"assets/css/index-CgSDQJpc.css",revision:null},{url:"assets/css/index-CLER0PLd.css",revision:null},{url:"assets/css/index-CmeeR6aY.css",revision:null},{url:"assets/css/index-CndoNt-j.css",revision:null},{url:"assets/css/index-CNUuBISI.css",revision:null},{url:"assets/css/index-CpFznlQC.css",revision:null},{url:"assets/css/index-CT9MZJwt.css",revision:null},{url:"assets/css/index-CwA4scbF.css",revision:null},{url:"assets/css/index-CZIAyRYV.css",revision:null},{url:"assets/css/index-D_ndS9v7.css",revision:null},{url:"assets/css/index-DdCQjGx9.css",revision:null},{url:"assets/css/index-DdGh2urO.css",revision:null},{url:"assets/css/index-DDnUMMV9.css",revision:null},{url:"assets/css/index-DdrdG2yo.css",revision:null},{url:"assets/css/index-DegdPuFi.css",revision:null},{url:"assets/css/index-DJvUWAhu.css",revision:null},{url:"assets/css/index-DQnTXGAM.css",revision:null},{url:"assets/css/index-DWgHrBot.css",revision:null},{url:"assets/css/index-h3w0RYvz.css",revision:null},{url:"assets/css/index-lYWjBWev.css",revision:null},{url:"assets/css/index-OFUOBeuo.css",revision:null},{url:"assets/css/index-oJ0fuGvk.css",revision:null},{url:"assets/css/index-sUOmWrid.css",revision:null},{url:"assets/css/index-tn0RQdqM.css",revision:null},{url:"assets/css/index-uUDW-E3i.css",revision:null},{url:"assets/css/InfoContent-CAgLkKTN.css",revision:null},{url:"assets/css/jiaXingPictureBox1-J9nhPv5t.css",revision:null},{url:"assets/css/jiaXingPictureBox2-DYamddNE.css",revision:null},{url:"assets/css/LeftPage--Zck4JNx.css",revision:null},{url:"assets/css/LoginForm-CtVqcsgy.css",revision:null},{url:"assets/css/MaleFemaleRatioChart-Byc59_zx.css",revision:null},{url:"assets/css/MapLend-DQiyDrkQ.css",revision:null},{url:"assets/css/myChart1-aMpAk_4r.css",revision:null},{url:"assets/css/myChart2-BkV66U8G.css",revision:null},{url:"assets/css/myChart3-JLSbOmP6.css",revision:null},{url:"assets/css/myChart4-D9khvUKs.css",revision:null},{url:"assets/css/myChart5-C6mhna62.css",revision:null},{url:"assets/css/myChart6-Cu_sOWM6.css",revision:null},{url:"assets/css/OverNext30Chart-B5uVNMZr.css",revision:null},{url:"assets/css/PictureBoxContent-CVXI501J.css",revision:null},{url:"assets/css/PictureBoxTemplate-DSGrgZiL.css",revision:null},{url:"assets/css/pie-p0RNEZZd.css",revision:null},{url:"assets/css/PlatformSourceChart-C_phFD1m.css",revision:null},{url:"assets/css/RealTimeAccessChart-CvSqJk22.css",revision:null},{url:"assets/css/RightPage-65VPrpqv.css",revision:null},{url:"assets/css/ServiceMain-DbDE8_fB.css",revision:null},{url:"assets/css/Tab-C5Dc3aCy.css",revision:null},{url:"assets/css/ToolTip-hBHCVGvt.css",revision:null},{url:"assets/js/403-BmrYoh8N.js",revision:null},{url:"assets/js/404-_PGKzgFU.js",revision:null},{url:"assets/js/500-BEkecSMz.js",revision:null},{url:"assets/js/AgeRatioChart-D57C0AH3.js",revision:null},{url:"assets/js/AnnualUseChart-qURlF2hq.js",revision:null},{url:"assets/js/AreaDetail-DkO5Jjq4.js",revision:null},{url:"assets/js/business-oGoslG97.js",revision:null},{url:"assets/js/CenterPage-DXs6QdAq.js",revision:null},{url:"assets/js/ChinaMapChart-DRZG4Nq1.js",revision:null},{url:"assets/js/curve-Ce-4fA8y.js",revision:null},{url:"assets/js/demo0-oi2xkaTz.js",revision:null},{url:"assets/js/demo1-B8at07lr.js",revision:null},{url:"assets/js/detail-BRQJplLC.js",revision:null},{url:"assets/js/detail-CPRaxWZw.js",revision:null},{url:"assets/js/detail-CusyIuxb.js",revision:null},{url:"assets/js/DialogInfo-Df3LmU6r.js",revision:null},{url:"assets/js/fm-ByyAcWO9.js",revision:null},{url:"assets/js/gis-DlfMHWNZ.js",revision:null},{url:"assets/js/HotPlateChart-BNmbM1T4.js",revision:null},{url:"assets/js/Imgs-cAk1tllm.js",revision:null},{url:"assets/js/index-04daAZGe.js",revision:null},{url:"assets/js/index-5q0kkXHD.js",revision:null},{url:"assets/js/index-B-A_bBN4.js",revision:null},{url:"assets/js/index-B5-y9sRp.js",revision:null},{url:"assets/js/index-BB1d088M.js",revision:null},{url:"assets/js/index-BbxJxYQC.js",revision:null},{url:"assets/js/index-BcvaEa5q.js",revision:null},{url:"assets/js/index-BDRUCpwF.js",revision:null},{url:"assets/js/index-BEKejsr3.js",revision:null},{url:"assets/js/index-BgJJMw1t.js",revision:null},{url:"assets/js/index-bid2ICO5.js",revision:null},{url:"assets/js/index-BJspVKnj.js",revision:null},{url:"assets/js/index-BKN-QRAz.js",revision:null},{url:"assets/js/index-BKu1z2gj.js",revision:null},{url:"assets/js/index-BlAduozM.js",revision:null},{url:"assets/js/index-Bmkt86IM.js",revision:null},{url:"assets/js/index-BNISvap2.js",revision:null},{url:"assets/js/index-Bs-UzLcJ.js",revision:null},{url:"assets/js/index-BT5wnu6H.js",revision:null},{url:"assets/js/index-BXT6U-X-.js",revision:null},{url:"assets/js/index-C-lK2jhu.js",revision:null},{url:"assets/js/index-C2ip42qw.js",revision:null},{url:"assets/js/index-C5bSY01p.js",revision:null},{url:"assets/js/index-caMDBf_O.js",revision:null},{url:"assets/js/index-CcBT0dJj.js",revision:null},{url:"assets/js/index-CF_fv0yU.js",revision:null},{url:"assets/js/index-Cf17NoLd.js",revision:null},{url:"assets/js/index-CHpRl-xD.js",revision:null},{url:"assets/js/index-ChPyr8Va.js",revision:null},{url:"assets/js/index-CIAB9cM6.js",revision:null},{url:"assets/js/index-CIGgvvVj.js",revision:null},{url:"assets/js/index-CIi5Xl3V.js",revision:null},{url:"assets/js/index-CjN2Hm8r.js",revision:null},{url:"assets/js/index-CkAA6I1R.js",revision:null},{url:"assets/js/index-ClVNjoB8.js",revision:null},{url:"assets/js/index-CoDgYYdl.js",revision:null},{url:"assets/js/index-COmEPxos.js",revision:null},{url:"assets/js/index-CPVPoKKq.js",revision:null},{url:"assets/js/index-CrrUAFQ5.js",revision:null},{url:"assets/js/index-CTi7SS55.js",revision:null},{url:"assets/js/index-CTK4s7_c.js",revision:null},{url:"assets/js/index-CtsByjSM.js",revision:null},{url:"assets/js/index-CvmrKTk4.js",revision:null},{url:"assets/js/index-CvpBryxs.js",revision:null},{url:"assets/js/index-CXL3VuD6.js",revision:null},{url:"assets/js/index-D5uIqfWe.js",revision:null},{url:"assets/js/index-D7It4Mvv.js",revision:null},{url:"assets/js/index-DBXQC3NJ.js",revision:null},{url:"assets/js/index-DcYC7g4_.js",revision:null},{url:"assets/js/index-DEHzGG9z.js",revision:null},{url:"assets/js/index-DF3ZrNSt.js",revision:null},{url:"assets/js/index-DF5TgGWb.js",revision:null},{url:"assets/js/index-DkVXEiVG.js",revision:null},{url:"assets/js/index-DMtTYWT0.js",revision:null},{url:"assets/js/index-dni1NxEe.js",revision:null},{url:"assets/js/index-DQm88nfN.js",revision:null},{url:"assets/js/index-DqQMLGdU.js",revision:null},{url:"assets/js/index-DQRo31VX.js",revision:null},{url:"assets/js/index-DrFIrBnK.js",revision:null},{url:"assets/js/index-Drgl38eV.js",revision:null},{url:"assets/js/index-DRrIgHiK.js",revision:null},{url:"assets/js/index-Dsh2lEpv.js",revision:null},{url:"assets/js/index-DvLDx1zD.js",revision:null},{url:"assets/js/index-DVm--PMh.js",revision:null},{url:"assets/js/index-Dx0y4iaW.js",revision:null},{url:"assets/js/index-DxI0u5Uj.js",revision:null},{url:"assets/js/index-fZ8I8Zmk.js",revision:null},{url:"assets/js/index-h3sq6MWI.js",revision:null},{url:"assets/js/index-IpvS9V0J.js",revision:null},{url:"assets/js/index-mRsL9est.js",revision:null},{url:"assets/js/index-myqtyZ2W.js",revision:null},{url:"assets/js/index-TM7QTFYH.js",revision:null},{url:"assets/js/index-UiV-jUkJ.js",revision:null},{url:"assets/js/index-wA4RalDe.js",revision:null},{url:"assets/js/index-Ws9pKa40.js",revision:null},{url:"assets/js/index-wsqNSHkH.js",revision:null},{url:"assets/js/index-XbMXvgWT.js",revision:null},{url:"assets/js/index-xIJzeAIC.js",revision:null},{url:"assets/js/index-xSCVyCT6.js",revision:null},{url:"assets/js/index-ZXaHrud-.js",revision:null},{url:"assets/js/index.vuevuetypescriptsetuptruenameEChartslang-BQg59YQL.js",revision:null},{url:"assets/js/index.vuevuetypescriptsetuptruenameProTablelang-yl46DIrU.js",revision:null},{url:"assets/js/index.vuevuetypescriptsetuptruenameSwitchDarklang-B4-g_Eff.js",revision:null},{url:"assets/js/index0-C1lpLJjl.js",revision:null},{url:"assets/js/InfoContent-Bonn717d.js",revision:null},{url:"assets/js/jiaXingPictureBox1-BPwc1xQX.js",revision:null},{url:"assets/js/jiaXingPictureBox2-BGQe2OE8.js",revision:null},{url:"assets/js/LeftPage-Bb1mJNHf.js",revision:null},{url:"assets/js/LoginForm-CvYZiEo5.js",revision:null},{url:"assets/js/MaleFemaleRatioChart-WTZrl1KK.js",revision:null},{url:"assets/js/MapLend-Cq2FepFG.js",revision:null},{url:"assets/js/maplibre-gl-uk_83qGj.js",revision:null},{url:"assets/js/mittBus-rOgeEvW-.js",revision:null},{url:"assets/js/myChart1-D1ztH0gt.js",revision:null},{url:"assets/js/myChart2-Bd6kneD4.js",revision:null},{url:"assets/js/myChart3-BmcEf7ze.js",revision:null},{url:"assets/js/myChart4-Dhygofi9.js",revision:null},{url:"assets/js/myChart5-DAsZufQa.js",revision:null},{url:"assets/js/myChart6-DxmdVOBJ.js",revision:null},{url:"assets/js/OverNext30Chart-CYFqB_pK.js",revision:null},{url:"assets/js/PictureBoxContent-Bt7VeOKC.js",revision:null},{url:"assets/js/PictureBoxTemplate-D2K3UUB1.js",revision:null},{url:"assets/js/pie-BeQgBQ62.js",revision:null},{url:"assets/js/PlatformSourceChart-CdzD7j6I.js",revision:null},{url:"assets/js/plugin-vueexport-helper-DlAUqK2U.js",revision:null},{url:"assets/js/RealTimeAccessChart-MWPVQzm3.js",revision:null},{url:"assets/js/RightPage-E41eUCJa.js",revision:null},{url:"assets/js/ServiceMain-Cwrp0Nvl.js",revision:null},{url:"assets/js/servicePort-D3LIsGOm.js",revision:null},{url:"assets/js/sortable.esm-DkKE9Vxu.js",revision:null},{url:"assets/js/Tab-Rr8M87CH.js",revision:null},{url:"assets/js/tabs-YCF5bnHp.js",revision:null},{url:"assets/js/ToolTip-BnDoimWL.js",revision:null},{url:"assets/js/upload-Bx5EhVDc.js",revision:null},{url:"assets/js/useAuthButtons-BAVe5unZ.js",revision:null},{url:"assets/js/useHandleData-BeD-xy6k.js",revision:null},{url:"assets/js/user-Cn9oOl1R.js",revision:null},{url:"assets/js/UserDrawer-BFxF9REI.js",revision:null},{url:"assets/js/UserDrawer.vuevuetypescriptsetuptruenameUserDrawerlang-CZkDcC5s.js",revision:null},{url:"index.html",revision:"ca6f19904e1f2ecc1fab2b12188c85ba"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"manifest.webmanifest",revision:"6edb9e25f90c02bfef7e91cf536db6d1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));