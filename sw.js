if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>l(s,r),a={module:{uri:r},exports:u,require:t};e[r]=Promise.all(i.map((s=>a[s]||t(s)))).then((s=>(n(...s),u)))}}define(["./workbox-3e8df8c8"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/css/403-BzyIkoOx.css",revision:null},{url:"assets/css/404-BGQTKSpA.css",revision:null},{url:"assets/css/500-CuffNYCh.css",revision:null},{url:"assets/css/AgeRatioChart-CQmVNcIt.css",revision:null},{url:"assets/css/AnnualUseChart-BoM4WGLz.css",revision:null},{url:"assets/css/AreaDetail-DnUbDX7I.css",revision:null},{url:"assets/css/CenterPage-PkQlTIjo.css",revision:null},{url:"assets/css/ChinaMapChart-H7Ge5uyz.css",revision:null},{url:"assets/css/curve-3A_ZExg9.css",revision:null},{url:"assets/css/demo0-MxHVVpf4.css",revision:null},{url:"assets/css/DialogInfo-BUs3AiVk.css",revision:null},{url:"assets/css/gis-CaRfXGuS.css",revision:null},{url:"assets/css/HotPlateChart-CySMn06I.css",revision:null},{url:"assets/css/Imgs-CWLlMgVf.css",revision:null},{url:"assets/css/index-_R7NyLnY.css",revision:null},{url:"assets/css/index-B_riHQFN.css",revision:null},{url:"assets/css/index-BDGGk7wz.css",revision:null},{url:"assets/css/index-BDUbiZ20.css",revision:null},{url:"assets/css/index-BKiPoI_R.css",revision:null},{url:"assets/css/index-BPbHWLik.css",revision:null},{url:"assets/css/index-BZNVwDKe.css",revision:null},{url:"assets/css/index-C21Q_XlE.css",revision:null},{url:"assets/css/index-C8Kd4vqA.css",revision:null},{url:"assets/css/index-CBrcif5d.css",revision:null},{url:"assets/css/index-CC4Xap15.css",revision:null},{url:"assets/css/index-CCYfvrAR.css",revision:null},{url:"assets/css/index-CDgqWx7a.css",revision:null},{url:"assets/css/index-CLER0PLd.css",revision:null},{url:"assets/css/index-CndoNt-j.css",revision:null},{url:"assets/css/index-CNUuBISI.css",revision:null},{url:"assets/css/index-CpFznlQC.css",revision:null},{url:"assets/css/index-CT9MZJwt.css",revision:null},{url:"assets/css/index-CZIAyRYV.css",revision:null},{url:"assets/css/index-D_ndS9v7.css",revision:null},{url:"assets/css/index-DdCQjGx9.css",revision:null},{url:"assets/css/index-DdGh2urO.css",revision:null},{url:"assets/css/index-DDnUMMV9.css",revision:null},{url:"assets/css/index-DdrdG2yo.css",revision:null},{url:"assets/css/index-DegdPuFi.css",revision:null},{url:"assets/css/index-DJvUWAhu.css",revision:null},{url:"assets/css/index-DQnTXGAM.css",revision:null},{url:"assets/css/index-DWgHrBot.css",revision:null},{url:"assets/css/index-h3w0RYvz.css",revision:null},{url:"assets/css/index-lYWjBWev.css",revision:null},{url:"assets/css/index-OFUOBeuo.css",revision:null},{url:"assets/css/index-oJ0fuGvk.css",revision:null},{url:"assets/css/index-sUOmWrid.css",revision:null},{url:"assets/css/index-tn0RQdqM.css",revision:null},{url:"assets/css/index-v40xALby.css",revision:null},{url:"assets/css/InfoContent-CAgLkKTN.css",revision:null},{url:"assets/css/jiaXingPictureBox1-J9nhPv5t.css",revision:null},{url:"assets/css/jiaXingPictureBox2-DYamddNE.css",revision:null},{url:"assets/css/LeftPage--Zck4JNx.css",revision:null},{url:"assets/css/LoginForm-CtVqcsgy.css",revision:null},{url:"assets/css/MaleFemaleRatioChart-Byc59_zx.css",revision:null},{url:"assets/css/MapLend-DQiyDrkQ.css",revision:null},{url:"assets/css/myChart1-aMpAk_4r.css",revision:null},{url:"assets/css/myChart2-BkV66U8G.css",revision:null},{url:"assets/css/myChart3-JLSbOmP6.css",revision:null},{url:"assets/css/myChart4-D9khvUKs.css",revision:null},{url:"assets/css/myChart5-C6mhna62.css",revision:null},{url:"assets/css/myChart6-8NK0aYI8.css",revision:null},{url:"assets/css/OverNext30Chart-D7-GOx61.css",revision:null},{url:"assets/css/PictureBoxContent-CVXI501J.css",revision:null},{url:"assets/css/PictureBoxTemplate-DSGrgZiL.css",revision:null},{url:"assets/css/pie-p0RNEZZd.css",revision:null},{url:"assets/css/PlatformSourceChart-C_phFD1m.css",revision:null},{url:"assets/css/RealTimeAccessChart-CvSqJk22.css",revision:null},{url:"assets/css/RightPage-65VPrpqv.css",revision:null},{url:"assets/css/ServiceMain-DbDE8_fB.css",revision:null},{url:"assets/css/Tab-C5Dc3aCy.css",revision:null},{url:"assets/css/ToolTip-CCTfSfGS.css",revision:null},{url:"assets/js/403-JNGIViKa.js",revision:null},{url:"assets/js/404-DP8Aougr.js",revision:null},{url:"assets/js/500-DzkwlNg8.js",revision:null},{url:"assets/js/AgeRatioChart-DQbJPJhb.js",revision:null},{url:"assets/js/AnnualUseChart-D4-0QT15.js",revision:null},{url:"assets/js/AreaDetail-BeUVNSEa.js",revision:null},{url:"assets/js/business-DFsnfLcN.js",revision:null},{url:"assets/js/CenterPage-B3HGZPwE.js",revision:null},{url:"assets/js/ChinaMapChart-BumpAeDX.js",revision:null},{url:"assets/js/curve-BUf02JDy.js",revision:null},{url:"assets/js/demo0-ZyV_dEuk.js",revision:null},{url:"assets/js/demo1-Cd8-6Ahy.js",revision:null},{url:"assets/js/detail-C3Tvxwsn.js",revision:null},{url:"assets/js/detail-CFT_I2-j.js",revision:null},{url:"assets/js/detail-CGQ_lXco.js",revision:null},{url:"assets/js/DialogInfo-De5Rcd5h.js",revision:null},{url:"assets/js/fm-ByyAcWO9.js",revision:null},{url:"assets/js/gis-CHAcCdh6.js",revision:null},{url:"assets/js/HotPlateChart-DjLejIno.js",revision:null},{url:"assets/js/Imgs-BG_9jJnG.js",revision:null},{url:"assets/js/index-64PIvSaK.js",revision:null},{url:"assets/js/index-9gHEMTHY.js",revision:null},{url:"assets/js/index-ASrcuPVz.js",revision:null},{url:"assets/js/index-B_MuI6gR.js",revision:null},{url:"assets/js/index-B3PQCRP8.js",revision:null},{url:"assets/js/index-B40Qh7_s.js",revision:null},{url:"assets/js/index-B80mbj5M.js",revision:null},{url:"assets/js/index-BBKE7h6C.js",revision:null},{url:"assets/js/index-BbZKX_xg.js",revision:null},{url:"assets/js/index-BevQoauT.js",revision:null},{url:"assets/js/index-BgPHIJWH.js",revision:null},{url:"assets/js/index-Bhpvh3zK.js",revision:null},{url:"assets/js/index-BkG_tjDO.js",revision:null},{url:"assets/js/index-BNJyFIf-.js",revision:null},{url:"assets/js/index-BO0J9iMB.js",revision:null},{url:"assets/js/index-BOJQo6wr.js",revision:null},{url:"assets/js/index-BQeKDor4.js",revision:null},{url:"assets/js/index-BtXHHo7M.js",revision:null},{url:"assets/js/index-BVyRKC3o.js",revision:null},{url:"assets/js/index-BWFFSzBN.js",revision:null},{url:"assets/js/index-BxAmOkb_.js",revision:null},{url:"assets/js/index-BXRqFGTy.js",revision:null},{url:"assets/js/index-C1cOd_n_.js",revision:null},{url:"assets/js/index-C1u2S7m5.js",revision:null},{url:"assets/js/index-C2W-f4Eg.js",revision:null},{url:"assets/js/index-C3XpeAd0.js",revision:null},{url:"assets/js/index-C4sIlw1b.js",revision:null},{url:"assets/js/index-C6OELKMl.js",revision:null},{url:"assets/js/index-C7VVYsQA.js",revision:null},{url:"assets/js/index-CALDArbz.js",revision:null},{url:"assets/js/index-CbOyxfOr.js",revision:null},{url:"assets/js/index-CcDOrCeM.js",revision:null},{url:"assets/js/index-CDrafgef.js",revision:null},{url:"assets/js/index-CF0SnjW-.js",revision:null},{url:"assets/js/index-CGsqTn44.js",revision:null},{url:"assets/js/index-Cm4FPIAd.js",revision:null},{url:"assets/js/index-CNbBq1D0.js",revision:null},{url:"assets/js/index-Cnw_w6NK.js",revision:null},{url:"assets/js/index-CO2ombOp.js",revision:null},{url:"assets/js/index-CQkt7sFH.js",revision:null},{url:"assets/js/index-CuV-EGEE.js",revision:null},{url:"assets/js/index-CvgqS93R.js",revision:null},{url:"assets/js/index-CVNnO5Xm.js",revision:null},{url:"assets/js/index-CXkEx123.js",revision:null},{url:"assets/js/index-CySW27P0.js",revision:null},{url:"assets/js/index-D0Ob5qQq.js",revision:null},{url:"assets/js/index-D2rIINeg.js",revision:null},{url:"assets/js/index-D5kpdBWj.js",revision:null},{url:"assets/js/index-D6jU_xOz.js",revision:null},{url:"assets/js/index-D8tPaHHS.js",revision:null},{url:"assets/js/index-DBsESaTc.js",revision:null},{url:"assets/js/index-DbVAHHH6.js",revision:null},{url:"assets/js/index-DCqyyDp5.js",revision:null},{url:"assets/js/index-Dd3ryDOx.js",revision:null},{url:"assets/js/index-DEjso6mC.js",revision:null},{url:"assets/js/index-DFWoWmnz.js",revision:null},{url:"assets/js/index-DjhQQATD.js",revision:null},{url:"assets/js/index-Dl5mkx6q.js",revision:null},{url:"assets/js/index-DPJyc-EK.js",revision:null},{url:"assets/js/index-DpR4XnKW.js",revision:null},{url:"assets/js/index-Dpw-G4Yo.js",revision:null},{url:"assets/js/index-Dssd-DBv.js",revision:null},{url:"assets/js/index-DTYxCqmG.js",revision:null},{url:"assets/js/index-DvDz6ESY.js",revision:null},{url:"assets/js/index-DvQAF4VE.js",revision:null},{url:"assets/js/index-DZhCxwyQ.js",revision:null},{url:"assets/js/index-eCL0QWEw.js",revision:null},{url:"assets/js/index-fdRtuNsj.js",revision:null},{url:"assets/js/index-frI5evQY.js",revision:null},{url:"assets/js/index-GHEdVS_z.js",revision:null},{url:"assets/js/index-LbjQYHQ3.js",revision:null},{url:"assets/js/index-mwStEfVI.js",revision:null},{url:"assets/js/index-q9BJJjcZ.js",revision:null},{url:"assets/js/index-qlCyFZlC.js",revision:null},{url:"assets/js/index-s1eWZ3J7.js",revision:null},{url:"assets/js/index-S3sNOHjd.js",revision:null},{url:"assets/js/index-SfoiD0IU.js",revision:null},{url:"assets/js/index-vAWbz0Q9.js",revision:null},{url:"assets/js/index-W5ENdSYF.js",revision:null},{url:"assets/js/index-X9R0zI3q.js",revision:null},{url:"assets/js/index.vuevuetypescriptsetuptruenameEChartslang-giD7snJ4.js",revision:null},{url:"assets/js/index.vuevuetypescriptsetuptruenameProTablelang-C7B32tXT.js",revision:null},{url:"assets/js/index.vuevuetypescriptsetuptruenameSwitchDarklang-DZ5T74WA.js",revision:null},{url:"assets/js/index0-6BSdWxlb.js",revision:null},{url:"assets/js/InfoContent-BqDa8s8G.js",revision:null},{url:"assets/js/jiaXingPictureBox1-Cv22cqru.js",revision:null},{url:"assets/js/jiaXingPictureBox2-DWUnJkLV.js",revision:null},{url:"assets/js/LeftPage-DirxuoLz.js",revision:null},{url:"assets/js/LoginForm-Dgtxtk_E.js",revision:null},{url:"assets/js/MaleFemaleRatioChart-zDEjuZQK.js",revision:null},{url:"assets/js/MapLend-B6AKt8JL.js",revision:null},{url:"assets/js/maplibre-gl-DrfHL6NA.js",revision:null},{url:"assets/js/mittBus-rOgeEvW-.js",revision:null},{url:"assets/js/myChart1-BIN9C2fv.js",revision:null},{url:"assets/js/myChart2-DoXAMNBV.js",revision:null},{url:"assets/js/myChart3-BlAfFdjh.js",revision:null},{url:"assets/js/myChart4-xwtR3GqR.js",revision:null},{url:"assets/js/myChart5-CbPQuy7w.js",revision:null},{url:"assets/js/myChart6-BAkIQQE_.js",revision:null},{url:"assets/js/OverNext30Chart-DLFem5k-.js",revision:null},{url:"assets/js/PictureBoxContent-BmCTY9Gn.js",revision:null},{url:"assets/js/PictureBoxTemplate-Bwjn5kaI.js",revision:null},{url:"assets/js/pie-Sib6sJZS.js",revision:null},{url:"assets/js/PlatformSourceChart-DjwHOYZ2.js",revision:null},{url:"assets/js/plugin-vueexport-helper-DlAUqK2U.js",revision:null},{url:"assets/js/RealTimeAccessChart-0PnANQf8.js",revision:null},{url:"assets/js/RightPage-BaMxTnXU.js",revision:null},{url:"assets/js/ServiceMain-AP7j5hrO.js",revision:null},{url:"assets/js/servicePort-D3LIsGOm.js",revision:null},{url:"assets/js/sortable.esm-DkKE9Vxu.js",revision:null},{url:"assets/js/Tab-esuuw0e4.js",revision:null},{url:"assets/js/tabs-2QxVDJ-d.js",revision:null},{url:"assets/js/ToolTip-P-rpeBhq.js",revision:null},{url:"assets/js/upload-ZcHiheHG.js",revision:null},{url:"assets/js/useAuthButtons-9YZLADVC.js",revision:null},{url:"assets/js/useHandleData-CjoLO5Nu.js",revision:null},{url:"assets/js/user-DgXaJj-l.js",revision:null},{url:"assets/js/UserDrawer-hgrg6uyK.js",revision:null},{url:"assets/js/UserDrawer.vuevuetypescriptsetuptruenameUserDrawerlang-DBxuPkQl.js",revision:null},{url:"index.html",revision:"754a174cb557c7b8f30a8032ec9221b0"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"manifest.webmanifest",revision:"6edb9e25f90c02bfef7e91cf536db6d1"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
