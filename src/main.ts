import { createApp } from "vue";
import App from "./App.vue";
// style sheet
import "@/styles/index.scss";
// iconfont css
import "@/assets/iconfont/iconfont.scss";
// element css
import "element-plus/dist/index.css";
// element dark css
import "element-plus/theme-chalk/dark/css-vars.css";
// svg icons
import "virtual:svg-icons-register";
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
// custom directives
import directives from "@/directives/index";
// vue Router
import router from "@/routers";
// vue i18n
import I18n from "@/languages/index";
// pinia store
import pinia from "@/stores";
// errorHandler
import errorHandler from "@/utils/errorHandler";

import components from '@/components/index.js'

// vue amap
import VueAMap, {initAMapApiLoader} from '@vuemap/vue-amap';
// import { lazyAMapApiLoaderInstance } from '@vuemap/vue-amap';
import '@vuemap/vue-amap/dist/style.css'

initAMapApiLoader({
  key: '959a011452f86e59e5abf4ce10daad3f', // 替换为你的实际密钥
  securityJsCode: '4d69d08d1cac81d2db6fd56b3b0e6ba1', // 新版key需要配合安全密钥使用
  plugins: ['AMap.HawkEye', 'AMap.ToolBar', 'AMap.Scale', 'AMap.Geolocation']
  // plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation'],
});

const app = createApp(App);

app.config.errorHandler = errorHandler;
app.use(components)
app.use(VueAMap);

/* lazyAMapApiLoaderInstance.then(() => {
  this.map = new AMap.Map('amapContainer', {
    center: new AMap.LngLat(121.59996, 31.197646)
  });
}); */

// register the element Icons component
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.use(ElementPlus).use(directives).use(router).use(I18n).use(pinia).mount("#app");
