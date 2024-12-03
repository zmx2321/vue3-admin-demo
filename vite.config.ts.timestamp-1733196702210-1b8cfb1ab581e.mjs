// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/zmx2321/Documents/code/github/vue3-admin-demo/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.0_sass@1.81.0/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";

// build/getEnv.ts
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") realName = Number(realName);
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
  }
  return ret;
}

// build/proxy.ts
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const httpsRE = /^https:\/\//;
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      // https is require secure=false
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// build/plugins.ts
import { resolve } from "path";
import { VitePWA } from "file:///Users/zmx2321/Documents/code/github/vue3-admin-demo/node_modules/.pnpm/vite-plugin-pwa@0.20.5_vite@5.4.11_workbox-build@7.3.0_workbox-window@7.3.0/node_modules/vite-plugin-pwa/dist/index.js";
import { createHtmlPlugin } from "file:///Users/zmx2321/Documents/code/github/vue3-admin-demo/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.4.11/node_modules/vite-plugin-html/dist/index.mjs";
import { visualizer } from "file:///Users/zmx2321/Documents/code/github/vue3-admin-demo/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@2.79.2/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { createSvgIconsPlugin } from "file:///Users/zmx2321/Documents/code/github/vue3-admin-demo/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.4.11/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import vue from "file:///Users/zmx2321/Documents/code/github/vue3-admin-demo/node_modules/.pnpm/@vitejs+plugin-vue@5.2.1_vite@5.4.11_vue@3.5.13/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/zmx2321/Documents/code/github/vue3-admin-demo/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.4.11_vue@3.5.13/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import eslintPlugin from "file:///Users/zmx2321/Documents/code/github/vue3-admin-demo/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@8.57.1_vite@5.4.11/node_modules/vite-plugin-eslint/dist/index.mjs";
import viteCompression from "file:///Users/zmx2321/Documents/code/github/vue3-admin-demo/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.4.11/node_modules/vite-plugin-compression/dist/index.mjs";
import vueSetupExtend from "file:///Users/zmx2321/Documents/code/github/vue3-admin-demo/node_modules/.pnpm/unplugin-vue-setup-extend-plus@1.0.1/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
import NextDevTools from "file:///Users/zmx2321/Documents/code/github/vue3-admin-demo/node_modules/.pnpm/vite-plugin-vue-devtools@7.6.4_rollup@2.79.2_vite@5.4.11_vue@3.5.13/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var createVitePlugins = (viteEnv) => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_DEVTOOLS, VITE_PWA } = viteEnv;
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    // devTools
    VITE_DEVTOOLS && NextDevTools({ launchEditor: "code" }),
    // esLint 报错信息显示在浏览器界面上
    eslintPlugin(),
    // name 可以写在 script 标签上
    vueSetupExtend({}),
    // 创建打包压缩配置
    createCompression(viteEnv),
    // 注入变量到 html 文件
    createHtmlPlugin({
      minify: true,
      inject: {
        data: { title: VITE_GLOB_APP_TITLE }
      }
    }),
    // 使用 svg 图标
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]"
    }),
    // vitePWA
    VITE_PWA && createVitePwa(viteEnv),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true, open: true })
    // AutoImport({
    //   resolvers: [ElementPlusResolver({
    //     exclude: /^ElAmap[A-Z]*/
    //   }),VueAmapResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver({
    //     exclude: /^ElAmap[A-Z]*/
    //   }),VueAmapResolver()],
    // }),
  ];
};
var createCompression = (viteEnv) => {
  const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugins = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      viteCompression({
        ext: ".gz",
        algorithm: "gzip",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      viteCompression({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  return plugins;
};
var createVitePwa = (viteEnv) => {
  const { VITE_GLOB_APP_TITLE } = viteEnv;
  return VitePWA({
    registerType: "autoUpdate",
    workbox: {
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
    },
    manifest: {
      name: VITE_GLOB_APP_TITLE,
      short_name: VITE_GLOB_APP_TITLE,
      theme_color: "#ffffff"
      /* icons: [
        {
          src: __dirname.split(/[\\/]/).pop() + "/logo1.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: __dirname.split(/[\\/]/).pop() + "/logo2.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: __dirname.split(/[\\/]/).pop() + "/logo3.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        }
      ] */
    }
  });
};

// package.json
var package_default = {
  name: "geeker-admin",
  private: true,
  version: "1.2.0",
  type: "module",
  description: "geeker-admin open source management system",
  author: {
    name: "Geeker",
    email: "848130454@qq.com",
    url: "https://github.com/HalseySpicy"
  },
  license: "MIT",
  homepage: "https://github.com/HalseySpicy/Geeker-Admin",
  repository: {
    type: "git",
    url: "git@github.com:HalseySpicy/Geeker-Admin.git"
  },
  bugs: {
    url: "https://github.com/HalseySpicy/Geeker-Admin/issues"
  },
  scripts: {
    dev: "vite",
    serve: "vite",
    "build:dev": "vite build --mode development",
    "build:test": "vite build --mode test",
    "build:pro": "vite build --mode production",
    "type:check": "vue-tsc --noEmit --skipLibCheck",
    preview: "pnpm build:dev && vite preview",
    "lint:eslint": "eslint --fix --ext .js,.ts,.vue ./src",
    "lint:prettier": 'prettier --write "src/**/*.{js,ts,json,tsx,css,less,scss,vue,html,md}"',
    "lint:stylelint": 'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location node_modules/.cache/stylelint/',
    "lint:lint-staged": "lint-staged",
    prepare: "husky install",
    release: "standard-version",
    commit: "git add -A && czg && git push",
    main: "bash main.sh",
    deploy: "bash deploy.sh"
  },
  dependencies: {
    "@element-plus/icons-vue": "^2.3.1",
    "@vuemap/vue-amap": "^2.1.8",
    "@vuemap/vue-amap-extra": "^2.1.5",
    "@vuemap/vue-amap-loca": "^2.1.2",
    "@vueup/vue-quill": "^1.2.0",
    "@vueuse/core": "^10.11.0",
    "@wangeditor/editor": "^5.1.23",
    "@wangeditor/editor-for-vue": "^5.1.12",
    axios: "^1.7.2",
    dayjs: "^1.11.11",
    "driver.js": "^1.3.1",
    echarts: "^5.5.1",
    "echarts-gl": "^2.0.9",
    "echarts-liquidfill": "^3.1.0",
    "element-plus": "^2.7.6",
    "maplibre-gl": "^4.7.1",
    md5: "^2.3.0",
    mitt: "^3.0.1",
    nprogress: "^0.2.0",
    ol: "^9.1.0",
    pinia: "^2.1.7",
    "pinia-plugin-persistedstate": "^3.2.1",
    qs: "^6.12.1",
    quill: "^2.0.2",
    screenfull: "^6.0.2",
    sortablejs: "^1.15.2",
    "unplugin-vue-components": "^0.27.5",
    vue: "^3.4.31",
    "vue-amap": "^0.5.10",
    "vue-i18n": "^9.13.1",
    "vue-router": "^4.4.0",
    vuedraggable: "^4.1.0"
  },
  devDependencies: {
    "@commitlint/cli": "^18.4.3",
    "@commitlint/config-conventional": "^18.4.3",
    "@types/md5": "^2.3.5",
    "@types/nprogress": "^0.2.3",
    "@types/qs": "^6.9.15",
    "@types/sortablejs": "^1.15.8",
    "@typescript-eslint/eslint-plugin": "^7.14.1",
    "@typescript-eslint/parser": "^7.14.1",
    "@vitejs/plugin-vue": "^5.0.4",
    "@vitejs/plugin-vue-jsx": "^3.1.0",
    autoprefixer: "^10.4.19",
    "cz-git": "1.9.2",
    czg: "^1.9.2",
    eslint: "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "eslint-plugin-vue": "^9.26.0",
    husky: "^9.0.11",
    "lint-staged": "^15.2.5",
    postcss: "^8.4.38",
    "postcss-html": "^1.7.0",
    prettier: "^3.3.2",
    "rollup-plugin-visualizer": "^5.12.0",
    sass: "^1.77.6",
    "standard-version": "^9.5.0",
    stylelint: "^16.6.1",
    "stylelint-config-html": "^1.1.0",
    "stylelint-config-recess-order": "^5.0.1",
    "stylelint-config-recommended-scss": "^14.0.0",
    "stylelint-config-recommended-vue": "^1.5.0",
    "stylelint-config-standard": "^36.0.0",
    "stylelint-config-standard-scss": "^13.1.0",
    typescript: "^5.5.2",
    "unplugin-vue-setup-extend-plus": "^1.0.1",
    vite: "^5.3.2",
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-eslint": "^1.8.1",
    "vite-plugin-html": "^3.2.2",
    "vite-plugin-pwa": "^0.20.0",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-plugin-vue-devtools": "^7.3.5",
    "vue-tsc": "^2.0.22"
  },
  engines: {
    node: ">=16.18.0"
  },
  browserslist: {
    production: [
      "> 1%",
      "not dead",
      "not op_mini all"
    ],
    development: [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  config: {
    commitizen: {
      path: "node_modules/cz-git"
    }
  }
};

// vite.config.ts
import dayjs from "file:///Users/zmx2321/Documents/code/github/vue3-admin-demo/node_modules/.pnpm/dayjs@1.11.13/node_modules/dayjs/dayjs.min.js";
var __vite_injected_original_dirname = "/Users/zmx2321/Documents/code/github/vue3-admin-demo";
var { dependencies, devDependencies, name, version } = package_default;
var __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss")
};
var vite_config_default = defineConfig(({ mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const INVALID_CHAR_REGEX = /[\u0000-\u001F"#$&*+,:;<=>?[\]^`{|}\u007F]/g;
  const DRIVE_LETTER_REGEX = /^[a-z]:/i;
  return {
    // base: viteEnv.VITE_PUBLIC_PATH,
    base: "./",
    root,
    resolve: {
      alias: {
        "@": resolve2(__vite_injected_original_dirname, "./src"),
        "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js"
      }
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/var.scss";`,
          silenceDeprecations: ["legacy-js-api"]
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // Load proxy configuration from .env.development
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    plugins: createVitePlugins(viteEnv),
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      // outDir: "dist",
      minify: "esbuild",
      outDir: __vite_injected_original_dirname.split(/[\\/]/).pop(),
      // esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      sourcemap: false,
      // 禁用 gzip 压缩大小报告，可略微减少打包时间
      reportCompressedSize: false,
      // 规定触发警告的 chunk 大小
      chunkSizeWarningLimit: 2e3,
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          sanitizeFileName(name2) {
            const match = DRIVE_LETTER_REGEX.exec(name2);
            const driveLetter = match ? match[0] : "";
            return driveLetter + name2.slice(driveLetter.length).replace(INVALID_CHAR_REGEX, "");
          }
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvZ2V0RW52LnRzIiwgImJ1aWxkL3Byb3h5LnRzIiwgImJ1aWxkL3BsdWdpbnMudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3pteDIzMjEvRG9jdW1lbnRzL2NvZGUvZ2l0aHViL3Z1ZTMtYWRtaW4tZGVtb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3pteDIzMjEvRG9jdW1lbnRzL2NvZGUvZ2l0aHViL3Z1ZTMtYWRtaW4tZGVtby92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvem14MjMyMS9Eb2N1bWVudHMvY29kZS9naXRodWIvdnVlMy1hZG1pbi1kZW1vL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCBDb25maWdFbnYsIFVzZXJDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyB3cmFwcGVyRW52IH0gZnJvbSBcIi4vYnVpbGQvZ2V0RW52XCI7XG5pbXBvcnQgeyBjcmVhdGVQcm94eSB9IGZyb20gXCIuL2J1aWxkL3Byb3h5XCI7XG5pbXBvcnQgeyBjcmVhdGVWaXRlUGx1Z2lucyB9IGZyb20gXCIuL2J1aWxkL3BsdWdpbnNcIjtcbmltcG9ydCBwa2cgZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XG5pbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XG5cbmNvbnN0IHsgZGVwZW5kZW5jaWVzLCBkZXZEZXBlbmRlbmNpZXMsIG5hbWUsIHZlcnNpb24gfSA9IHBrZztcbmNvbnN0IF9fQVBQX0lORk9fXyA9IHtcbiAgcGtnOiB7IGRlcGVuZGVuY2llcywgZGV2RGVwZW5kZW5jaWVzLCBuYW1lLCB2ZXJzaW9uIH0sXG4gIGxhc3RCdWlsZFRpbWU6IGRheWpzKCkuZm9ybWF0KFwiWVlZWS1NTS1ERCBISDptbTpzc1wiKVxufTtcblxuLy8gQHNlZTogaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKTtcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCByb290KTtcbiAgY29uc3Qgdml0ZUVudiA9IHdyYXBwZXJFbnYoZW52KTtcblxuICBjb25zdCBJTlZBTElEX0NIQVJfUkVHRVggPSAvW1xcdTAwMDAtXFx1MDAxRlwiIyQmKissOjs8PT4/W1xcXV5ge3x9XFx1MDA3Rl0vZztcbiAgY29uc3QgRFJJVkVfTEVUVEVSX1JFR0VYID0gL15bYS16XTovaTtcblxuICByZXR1cm4ge1xuICAgIC8vIGJhc2U6IHZpdGVFbnYuVklURV9QVUJMSUNfUEFUSCxcbiAgICBiYXNlOiBcIi4vXCIsXG4gICAgcm9vdCxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICBcIkBcIjogcmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICAgIFwidnVlLWkxOG5cIjogXCJ2dWUtaTE4bi9kaXN0L3Z1ZS1pMThuLmNqcy5qc1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgIF9fQVBQX0lORk9fXzogSlNPTi5zdHJpbmdpZnkoX19BUFBfSU5GT19fKVxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICAgIHNjc3M6IHtcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEB1c2UgXCJAL3N0eWxlcy92YXIuc2Nzc1wiO2AsXG4gICAgICAgICAgc2lsZW5jZURlcHJlY2F0aW9uczogWydsZWdhY3ktanMtYXBpJ11cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiBcIjAuMC4wLjBcIixcbiAgICAgIHBvcnQ6IHZpdGVFbnYuVklURV9QT1JULFxuICAgICAgb3Blbjogdml0ZUVudi5WSVRFX09QRU4sXG4gICAgICBjb3JzOiB0cnVlLFxuICAgICAgLy8gTG9hZCBwcm94eSBjb25maWd1cmF0aW9uIGZyb20gLmVudi5kZXZlbG9wbWVudFxuICAgICAgcHJveHk6IGNyZWF0ZVByb3h5KHZpdGVFbnYuVklURV9QUk9YWSlcbiAgICB9LFxuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKHZpdGVFbnYpLFxuICAgIGVzYnVpbGQ6IHtcbiAgICAgIHB1cmU6IHZpdGVFbnYuVklURV9EUk9QX0NPTlNPTEUgPyBbXCJjb25zb2xlLmxvZ1wiLCBcImRlYnVnZ2VyXCJdIDogW11cbiAgICB9LFxuICAgIGJ1aWxkOiB7XG4gICAgICAvLyBvdXREaXI6IFwiZGlzdFwiLFxuICAgICAgbWluaWZ5OiBcImVzYnVpbGRcIixcbiAgICAgIG91dERpcjogX19kaXJuYW1lLnNwbGl0KC9bXFxcXC9dLykucG9wKCksXG4gICAgICAvLyBlc2J1aWxkIFx1NjI1M1x1NTMwNVx1NjZGNFx1NUZFQlx1RkYwQ1x1NEY0Nlx1NjYyRlx1NEUwRFx1ODBGRFx1NTNCQlx1OTY2NCBjb25zb2xlLmxvZ1x1RkYwQ3RlcnNlclx1NjI1M1x1NTMwNVx1NjE2Mlx1RkYwQ1x1NEY0Nlx1ODBGRFx1NTNCQlx1OTY2NCBjb25zb2xlLmxvZ1xuICAgICAgLy8gbWluaWZ5OiBcInRlcnNlclwiLFxuICAgICAgLy8gdGVyc2VyT3B0aW9uczoge1xuICAgICAgLy8gXHRjb21wcmVzczoge1xuICAgICAgLy8gXHRcdGRyb3BfY29uc29sZTogdml0ZUVudi5WSVRFX0RST1BfQ09OU09MRSxcbiAgICAgIC8vIFx0XHRkcm9wX2RlYnVnZ2VyOiB0cnVlXG4gICAgICAvLyBcdH1cbiAgICAgIC8vIH0sXG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICAgICAgLy8gXHU3OTgxXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHU1OTI3XHU1QzBGXHU2MkE1XHU1NDRBXHVGRjBDXHU1M0VGXHU3NTY1XHU1RkFFXHU1MUNGXHU1QzExXHU2MjUzXHU1MzA1XHU2NUY2XHU5NUY0XG4gICAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gICAgICAvLyBcdTg5QzRcdTVCOUFcdTg5RTZcdTUzRDFcdThCNjZcdTU0NEFcdTc2ODQgY2h1bmsgXHU1OTI3XHU1QzBGXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIC8vIFN0YXRpYyByZXNvdXJjZSBjbGFzc2lmaWNhdGlvbiBhbmQgcGFja2FnaW5nXG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6IFwiYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanNcIixcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogXCJhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qc1wiLFxuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiBcImFzc2V0cy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdXCIsXG5cbiAgICAgICAgICBzYW5pdGl6ZUZpbGVOYW1lKG5hbWUpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gRFJJVkVfTEVUVEVSX1JFR0VYLmV4ZWMobmFtZSk7XG4gICAgICAgICAgICBjb25zdCBkcml2ZUxldHRlciA9IG1hdGNoID8gbWF0Y2hbMF0gOiBcIlwiO1xuICAgICAgICAgICAgLy8gQSBgOmAgaXMgb25seSBhbGxvd2VkIGFzIHBhcnQgb2YgYSB3aW5kb3dzIGRyaXZlIGxldHRlciAoZXg6IEM6XFxmb28pXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UsIGF2b2lkIHRoZW0gYmVjYXVzZSB0aGV5IGNhbiByZWZlciB0byBOVEZTIGFsdGVybmF0ZSBkYXRhIHN0cmVhbXMuXG4gICAgICAgICAgICByZXR1cm4gZHJpdmVMZXR0ZXIgKyBuYW1lLnNsaWNlKGRyaXZlTGV0dGVyLmxlbmd0aCkucmVwbGFjZShJTlZBTElEX0NIQVJfUkVHRVgsIFwiXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvem14MjMyMS9Eb2N1bWVudHMvY29kZS9naXRodWIvdnVlMy1hZG1pbi1kZW1vL2J1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvem14MjMyMS9Eb2N1bWVudHMvY29kZS9naXRodWIvdnVlMy1hZG1pbi1kZW1vL2J1aWxkL2dldEVudi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvem14MjMyMS9Eb2N1bWVudHMvY29kZS9naXRodWIvdnVlMy1hZG1pbi1kZW1vL2J1aWxkL2dldEVudi50c1wiO2ltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RldkZuKG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbW9kZSA9PT0gXCJkZXZlbG9wbWVudFwiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9kRm4obW9kZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBtb2RlID09PSBcInByb2R1Y3Rpb25cIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzVGVzdEZuKG1vZGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gbW9kZSA9PT0gXCJ0ZXN0XCI7XG59XG5cbi8qKlxuICogV2hldGhlciB0byBnZW5lcmF0ZSBwYWNrYWdlIHByZXZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzUmVwb3J0TW9kZSgpOiBib29sZWFuIHtcbiAgcmV0dXJuIHByb2Nlc3MuZW52LlZJVEVfUkVQT1JUID09PSBcInRydWVcIjtcbn1cblxuLy8gUmVhZCBhbGwgZW52aXJvbm1lbnQgdmFyaWFibGUgY29uZmlndXJhdGlvbiBmaWxlcyB0byBwcm9jZXNzLmVudlxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBwZXJFbnYoZW52Q29uZjogUmVjb3JkYWJsZSk6IFZpdGVFbnYge1xuICBjb25zdCByZXQ6IGFueSA9IHt9O1xuXG4gIGZvciAoY29uc3QgZW52TmFtZSBvZiBPYmplY3Qua2V5cyhlbnZDb25mKSkge1xuICAgIGxldCByZWFsTmFtZSA9IGVudkNvbmZbZW52TmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIik7XG4gICAgcmVhbE5hbWUgPSByZWFsTmFtZSA9PT0gXCJ0cnVlXCIgPyB0cnVlIDogcmVhbE5hbWUgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDogcmVhbE5hbWU7XG4gICAgaWYgKGVudk5hbWUgPT09IFwiVklURV9QT1JUXCIpIHJlYWxOYW1lID0gTnVtYmVyKHJlYWxOYW1lKTtcbiAgICBpZiAoZW52TmFtZSA9PT0gXCJWSVRFX1BST1hZXCIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlYWxOYW1lID0gSlNPTi5wYXJzZShyZWFsTmFtZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICB9XG4gICAgcmV0W2Vudk5hbWVdID0gcmVhbE5hbWU7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuLyoqXG4gKiBHZXQgdXNlciByb290IGRpcmVjdG9yeVxuICogQHBhcmFtIGRpciBmaWxlIHBhdGhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3RQYXRoKC4uLmRpcjogc3RyaW5nW10pIHtcbiAgcmV0dXJuIHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAuLi5kaXIpO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvem14MjMyMS9Eb2N1bWVudHMvY29kZS9naXRodWIvdnVlMy1hZG1pbi1kZW1vL2J1aWxkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvem14MjMyMS9Eb2N1bWVudHMvY29kZS9naXRodWIvdnVlMy1hZG1pbi1kZW1vL2J1aWxkL3Byb3h5LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96bXgyMzIxL0RvY3VtZW50cy9jb2RlL2dpdGh1Yi92dWUzLWFkbWluLWRlbW8vYnVpbGQvcHJveHkudHNcIjtpbXBvcnQgdHlwZSB7IFByb3h5T3B0aW9ucyB9IGZyb20gXCJ2aXRlXCI7XG5cbnR5cGUgUHJveHlJdGVtID0gW3N0cmluZywgc3RyaW5nXTtcblxudHlwZSBQcm94eUxpc3QgPSBQcm94eUl0ZW1bXTtcblxudHlwZSBQcm94eVRhcmdldExpc3QgPSBSZWNvcmQ8c3RyaW5nLCBQcm94eU9wdGlvbnM+O1xuXG4vKipcbiAqIFx1NTIxQlx1NUVGQVx1NEVFM1x1NzQwNlx1RkYwQ1x1NzUyOFx1NEU4RVx1ODlFM1x1Njc5MCAuZW52LmRldmVsb3BtZW50IFx1NEVFM1x1NzQwNlx1OTE0RFx1N0Y2RVxuICogQHBhcmFtIGxpc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5KGxpc3Q6IFByb3h5TGlzdCA9IFtdKSB7XG4gIGNvbnN0IHJldDogUHJveHlUYXJnZXRMaXN0ID0ge307XG4gIGZvciAoY29uc3QgW3ByZWZpeCwgdGFyZ2V0XSBvZiBsaXN0KSB7XG4gICAgY29uc3QgaHR0cHNSRSA9IC9eaHR0cHM6XFwvXFwvLztcbiAgICBjb25zdCBpc0h0dHBzID0gaHR0cHNSRS50ZXN0KHRhcmdldCk7XG5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vaHR0cC1wYXJ0eS9ub2RlLWh0dHAtcHJveHkjb3B0aW9uc1xuICAgIHJldFtwcmVmaXhdID0ge1xuICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB3czogdHJ1ZSxcbiAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKG5ldyBSZWdFeHAoYF4ke3ByZWZpeH1gKSwgXCJcIiksXG4gICAgICAvLyBodHRwcyBpcyByZXF1aXJlIHNlY3VyZT1mYWxzZVxuICAgICAgLi4uKGlzSHR0cHMgPyB7IHNlY3VyZTogZmFsc2UgfSA6IHt9KVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3pteDIzMjEvRG9jdW1lbnRzL2NvZGUvZ2l0aHViL3Z1ZTMtYWRtaW4tZGVtby9idWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3pteDIzMjEvRG9jdW1lbnRzL2NvZGUvZ2l0aHViL3Z1ZTMtYWRtaW4tZGVtby9idWlsZC9wbHVnaW5zLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy96bXgyMzIxL0RvY3VtZW50cy9jb2RlL2dpdGh1Yi92dWUzLWFkbWluLWRlbW8vYnVpbGQvcGx1Z2lucy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgUGx1Z2luT3B0aW9uIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tIFwidml0ZS1wbHVnaW4tcHdhXCI7XG5pbXBvcnQgeyBjcmVhdGVIdG1sUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLWh0bWxcIjtcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tIFwicm9sbHVwLXBsdWdpbi12aXN1YWxpemVyXCI7XG5pbXBvcnQgeyBjcmVhdGVTdmdJY29uc1BsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1zdmctaWNvbnNcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuaW1wb3J0IHZ1ZUpzeCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlLWpzeFwiO1xuaW1wb3J0IGVzbGludFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tZXNsaW50XCI7XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gXCJ2aXRlLXBsdWdpbi1jb21wcmVzc2lvblwiO1xuaW1wb3J0IHZ1ZVNldHVwRXh0ZW5kIGZyb20gXCJ1bnBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kLXBsdXMvdml0ZVwiO1xuaW1wb3J0IE5leHREZXZUb29scyBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzXCI7XG4vLyBhbWFwXG4vLyBpbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuLy8gaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcbi8vIGltcG9ydCB7VnVlQW1hcFJlc29sdmVyfSBmcm9tICdAdnVlbWFwL3VucGx1Z2luLXJlc29sdmVyJ1xuXG5cbi8qKlxuICogXHU1MjFCXHU1RUZBIHZpdGUgXHU2M0QyXHU0RUY2XG4gKiBAcGFyYW0gdml0ZUVudlxuICovXG5leHBvcnQgY29uc3QgY3JlYXRlVml0ZVBsdWdpbnMgPSAodml0ZUVudjogVml0ZUVudik6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9PiB7XG4gIGNvbnN0IHsgVklURV9HTE9CX0FQUF9USVRMRSwgVklURV9SRVBPUlQsIFZJVEVfREVWVE9PTFMsIFZJVEVfUFdBIH0gPSB2aXRlRW52O1xuICByZXR1cm4gW1xuICAgIHZ1ZSgpLFxuICAgIC8vIHZ1ZSBcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjgganN4L3RzeCBcdThCRURcdTZDRDVcbiAgICB2dWVKc3goKSxcbiAgICAvLyBkZXZUb29sc1xuICAgIFZJVEVfREVWVE9PTFMgJiYgTmV4dERldlRvb2xzKHsgbGF1bmNoRWRpdG9yOiBcImNvZGVcIiB9KSxcbiAgICAvLyBlc0xpbnQgXHU2MkE1XHU5NTE5XHU0RkUxXHU2MDZGXHU2NjNFXHU3OTNBXHU1NzI4XHU2RDRGXHU4OUM4XHU1NjY4XHU3NTRDXHU5NzYyXHU0RTBBXG4gICAgZXNsaW50UGx1Z2luKCksXG4gICAgLy8gbmFtZSBcdTUzRUZcdTRFRTVcdTUxOTlcdTU3Mjggc2NyaXB0IFx1NjgwN1x1N0I3RVx1NEUwQVxuICAgIHZ1ZVNldHVwRXh0ZW5kKHt9KSxcbiAgICAvLyBcdTUyMUJcdTVFRkFcdTYyNTNcdTUzMDVcdTUzOEJcdTdGMjlcdTkxNERcdTdGNkVcbiAgICBjcmVhdGVDb21wcmVzc2lvbih2aXRlRW52KSxcbiAgICAvLyBcdTZDRThcdTUxNjVcdTUzRDhcdTkxQ0ZcdTUyMzAgaHRtbCBcdTY1ODdcdTRFRjZcbiAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgIG1pbmlmeTogdHJ1ZSxcbiAgICAgIGluamVjdDoge1xuICAgICAgICBkYXRhOiB7IHRpdGxlOiBWSVRFX0dMT0JfQVBQX1RJVExFIH1cbiAgICAgIH1cbiAgICB9KSxcbiAgICAvLyBcdTRGN0ZcdTc1Mjggc3ZnIFx1NTZGRVx1NjgwN1xuICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcbiAgICAgIGljb25EaXJzOiBbcmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBcInNyYy9hc3NldHMvaWNvbnNcIildLFxuICAgICAgc3ltYm9sSWQ6IFwiaWNvbi1bZGlyXS1bbmFtZV1cIlxuICAgIH0pLFxuICAgIC8vIHZpdGVQV0FcbiAgICBWSVRFX1BXQSAmJiBjcmVhdGVWaXRlUHdhKHZpdGVFbnYpLFxuICAgIC8vIFx1NjYyRlx1NTQyNlx1NzUxRlx1NjIxMFx1NTMwNVx1OTg4NFx1ODlDOFx1RkYwQ1x1NTIwNlx1Njc5MFx1NEY5RFx1OEQ1Nlx1NTMwNVx1NTkyN1x1NUMwRlx1NTA1QVx1NEYxOFx1NTMxNlx1NTkwNFx1NzQwNlxuICAgIFZJVEVfUkVQT1JUICYmICh2aXN1YWxpemVyKHsgZmlsZW5hbWU6IFwic3RhdHMuaHRtbFwiLCBnemlwU2l6ZTogdHJ1ZSwgYnJvdGxpU2l6ZTogdHJ1ZSwgb3BlbjogdHJ1ZSB9KSBhcyBQbHVnaW5PcHRpb24pLFxuICAgIC8vIEF1dG9JbXBvcnQoe1xuICAgIC8vICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcih7XG4gICAgLy8gICAgIGV4Y2x1ZGU6IC9eRWxBbWFwW0EtWl0qL1xuICAgIC8vICAgfSksVnVlQW1hcFJlc29sdmVyKCldLFxuICAgIC8vIH0pLFxuICAgIC8vIENvbXBvbmVudHMoe1xuICAgIC8vICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcih7XG4gICAgLy8gICAgIGV4Y2x1ZGU6IC9eRWxBbWFwW0EtWl0qL1xuICAgIC8vICAgfSksVnVlQW1hcFJlc29sdmVyKCldLFxuICAgIC8vIH0pLFxuICBdO1xufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gXHU2ODM5XHU2MzZFIGNvbXByZXNzIFx1OTE0RFx1N0Y2RVx1RkYwQ1x1NzUxRlx1NjIxMFx1NEUwRFx1NTQwQ1x1NzY4NFx1NTM4Qlx1N0YyOVx1ODlDNFx1NTIxOVxuICogQHBhcmFtIHZpdGVFbnZcbiAqL1xuY29uc3QgY3JlYXRlQ29tcHJlc3Npb24gPSAodml0ZUVudjogVml0ZUVudik6IFBsdWdpbk9wdGlvbiB8IFBsdWdpbk9wdGlvbltdID0+IHtcbiAgY29uc3QgeyBWSVRFX0JVSUxEX0NPTVBSRVNTID0gXCJub25lXCIsIFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFIH0gPSB2aXRlRW52O1xuICBjb25zdCBjb21wcmVzc0xpc3QgPSBWSVRFX0JVSUxEX0NPTVBSRVNTLnNwbGl0KFwiLFwiKTtcbiAgY29uc3QgcGx1Z2luczogUGx1Z2luT3B0aW9uW10gPSBbXTtcbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcyhcImd6aXBcIikpIHtcbiAgICBwbHVnaW5zLnB1c2goXG4gICAgICB2aXRlQ29tcHJlc3Npb24oe1xuICAgICAgICBleHQ6IFwiLmd6XCIsXG4gICAgICAgIGFsZ29yaXRobTogXCJnemlwXCIsXG4gICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgaWYgKGNvbXByZXNzTGlzdC5pbmNsdWRlcyhcImJyb3RsaVwiKSkge1xuICAgIHBsdWdpbnMucHVzaChcbiAgICAgIHZpdGVDb21wcmVzc2lvbih7XG4gICAgICAgIGV4dDogXCIuYnJcIixcbiAgICAgICAgYWxnb3JpdGhtOiBcImJyb3RsaUNvbXByZXNzXCIsXG4gICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IFZJVEVfQlVJTERfQ09NUFJFU1NfREVMRVRFX09SSUdJTl9GSUxFXG4gICAgICB9KVxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHBsdWdpbnM7XG59O1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBWaXRlUHdhXG4gKiBAcGFyYW0gdml0ZUVudlxuICovXG5jb25zdCBjcmVhdGVWaXRlUHdhID0gKHZpdGVFbnY6IFZpdGVFbnYpOiBQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSA9PiB7XG4gIGNvbnN0IHsgVklURV9HTE9CX0FQUF9USVRMRSB9ID0gdml0ZUVudjtcbiAgcmV0dXJuIFZpdGVQV0Eoe1xuICAgIHJlZ2lzdGVyVHlwZTogXCJhdXRvVXBkYXRlXCIsXG4gICAgd29ya2JveDoge1xuICAgICAgbWF4aW11bUZpbGVTaXplVG9DYWNoZUluQnl0ZXM6IDQgKiAxMDI0ICogMTAyNFxuICAgIH0sXG4gICAgbWFuaWZlc3Q6IHtcbiAgICAgIG5hbWU6IFZJVEVfR0xPQl9BUFBfVElUTEUsXG4gICAgICBzaG9ydF9uYW1lOiBWSVRFX0dMT0JfQVBQX1RJVExFLFxuICAgICAgdGhlbWVfY29sb3I6IFwiI2ZmZmZmZlwiXG4gICAgICAvKiBpY29uczogW1xuICAgICAgICB7XG4gICAgICAgICAgc3JjOiBfX2Rpcm5hbWUuc3BsaXQoL1tcXFxcL10vKS5wb3AoKSArIFwiL2xvZ28xLnBuZ1wiLFxuICAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzcmM6IF9fZGlybmFtZS5zcGxpdCgvW1xcXFwvXS8pLnBvcCgpICsgXCIvbG9nbzIucG5nXCIsXG4gICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHNyYzogX19kaXJuYW1lLnNwbGl0KC9bXFxcXC9dLykucG9wKCkgKyBcIi9sb2dvMy5wbmdcIixcbiAgICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICBwdXJwb3NlOiBcImFueSBtYXNrYWJsZVwiXG4gICAgICAgIH1cbiAgICAgIF0gKi9cbiAgICB9XG4gIH0pO1xufTtcbiIsICJ7XG4gIFwibmFtZVwiOiBcImdlZWtlci1hZG1pblwiLFxuICBcInByaXZhdGVcIjogdHJ1ZSxcbiAgXCJ2ZXJzaW9uXCI6IFwiMS4yLjBcIixcbiAgXCJ0eXBlXCI6IFwibW9kdWxlXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJnZWVrZXItYWRtaW4gb3BlbiBzb3VyY2UgbWFuYWdlbWVudCBzeXN0ZW1cIixcbiAgXCJhdXRob3JcIjoge1xuICAgIFwibmFtZVwiOiBcIkdlZWtlclwiLFxuICAgIFwiZW1haWxcIjogXCI4NDgxMzA0NTRAcXEuY29tXCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vSGFsc2V5U3BpY3lcIlxuICB9LFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJob21lcGFnZVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9IYWxzZXlTcGljeS9HZWVrZXItQWRtaW5cIixcbiAgXCJyZXBvc2l0b3J5XCI6IHtcbiAgICBcInR5cGVcIjogXCJnaXRcIixcbiAgICBcInVybFwiOiBcImdpdEBnaXRodWIuY29tOkhhbHNleVNwaWN5L0dlZWtlci1BZG1pbi5naXRcIlxuICB9LFxuICBcImJ1Z3NcIjoge1xuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL0hhbHNleVNwaWN5L0dlZWtlci1BZG1pbi9pc3N1ZXNcIlxuICB9LFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZGV2XCI6IFwidml0ZVwiLFxuICAgIFwic2VydmVcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZDpkZXZcIjogXCJ2aXRlIGJ1aWxkIC0tbW9kZSBkZXZlbG9wbWVudFwiLFxuICAgIFwiYnVpbGQ6dGVzdFwiOiBcInZpdGUgYnVpbGQgLS1tb2RlIHRlc3RcIixcbiAgICBcImJ1aWxkOnByb1wiOiBcInZpdGUgYnVpbGQgLS1tb2RlIHByb2R1Y3Rpb25cIixcbiAgICBcInR5cGU6Y2hlY2tcIjogXCJ2dWUtdHNjIC0tbm9FbWl0IC0tc2tpcExpYkNoZWNrXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwicG5wbSBidWlsZDpkZXYgJiYgdml0ZSBwcmV2aWV3XCIsXG4gICAgXCJsaW50OmVzbGludFwiOiBcImVzbGludCAtLWZpeCAtLWV4dCAuanMsLnRzLC52dWUgLi9zcmNcIixcbiAgICBcImxpbnQ6cHJldHRpZXJcIjogXCJwcmV0dGllciAtLXdyaXRlIFxcXCJzcmMvKiovKi57anMsdHMsanNvbix0c3gsY3NzLGxlc3Msc2Nzcyx2dWUsaHRtbCxtZH1cXFwiXCIsXG4gICAgXCJsaW50OnN0eWxlbGludFwiOiBcInN0eWxlbGludCAtLWNhY2hlIC0tZml4IFxcXCIqKi8qLnt2dWUsbGVzcyxwb3N0Y3NzLGNzcyxzY3NzfVxcXCIgLS1jYWNoZSAtLWNhY2hlLWxvY2F0aW9uIG5vZGVfbW9kdWxlcy8uY2FjaGUvc3R5bGVsaW50L1wiLFxuICAgIFwibGludDpsaW50LXN0YWdlZFwiOiBcImxpbnQtc3RhZ2VkXCIsXG4gICAgXCJwcmVwYXJlXCI6IFwiaHVza3kgaW5zdGFsbFwiLFxuICAgIFwicmVsZWFzZVwiOiBcInN0YW5kYXJkLXZlcnNpb25cIixcbiAgICBcImNvbW1pdFwiOiBcImdpdCBhZGQgLUEgJiYgY3pnICYmIGdpdCBwdXNoXCIsXG4gICAgXCJtYWluXCI6IFwiYmFzaCBtYWluLnNoXCIsXG4gICAgXCJkZXBsb3lcIjogXCJiYXNoIGRlcGxveS5zaFwiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBlbGVtZW50LXBsdXMvaWNvbnMtdnVlXCI6IFwiXjIuMy4xXCIsXG4gICAgXCJAdnVlbWFwL3Z1ZS1hbWFwXCI6IFwiXjIuMS44XCIsXG4gICAgXCJAdnVlbWFwL3Z1ZS1hbWFwLWV4dHJhXCI6IFwiXjIuMS41XCIsXG4gICAgXCJAdnVlbWFwL3Z1ZS1hbWFwLWxvY2FcIjogXCJeMi4xLjJcIixcbiAgICBcIkB2dWV1cC92dWUtcXVpbGxcIjogXCJeMS4yLjBcIixcbiAgICBcIkB2dWV1c2UvY29yZVwiOiBcIl4xMC4xMS4wXCIsXG4gICAgXCJAd2FuZ2VkaXRvci9lZGl0b3JcIjogXCJeNS4xLjIzXCIsXG4gICAgXCJAd2FuZ2VkaXRvci9lZGl0b3ItZm9yLXZ1ZVwiOiBcIl41LjEuMTJcIixcbiAgICBcImF4aW9zXCI6IFwiXjEuNy4yXCIsXG4gICAgXCJkYXlqc1wiOiBcIl4xLjExLjExXCIsXG4gICAgXCJkcml2ZXIuanNcIjogXCJeMS4zLjFcIixcbiAgICBcImVjaGFydHNcIjogXCJeNS41LjFcIixcbiAgICBcImVjaGFydHMtZ2xcIjogXCJeMi4wLjlcIixcbiAgICBcImVjaGFydHMtbGlxdWlkZmlsbFwiOiBcIl4zLjEuMFwiLFxuICAgIFwiZWxlbWVudC1wbHVzXCI6IFwiXjIuNy42XCIsXG4gICAgXCJtYXBsaWJyZS1nbFwiOiBcIl40LjcuMVwiLFxuICAgIFwibWQ1XCI6IFwiXjIuMy4wXCIsXG4gICAgXCJtaXR0XCI6IFwiXjMuMC4xXCIsXG4gICAgXCJucHJvZ3Jlc3NcIjogXCJeMC4yLjBcIixcbiAgICBcIm9sXCI6IFwiXjkuMS4wXCIsXG4gICAgXCJwaW5pYVwiOiBcIl4yLjEuN1wiLFxuICAgIFwicGluaWEtcGx1Z2luLXBlcnNpc3RlZHN0YXRlXCI6IFwiXjMuMi4xXCIsXG4gICAgXCJxc1wiOiBcIl42LjEyLjFcIixcbiAgICBcInF1aWxsXCI6IFwiXjIuMC4yXCIsXG4gICAgXCJzY3JlZW5mdWxsXCI6IFwiXjYuMC4yXCIsXG4gICAgXCJzb3J0YWJsZWpzXCI6IFwiXjEuMTUuMlwiLFxuICAgIFwidW5wbHVnaW4tdnVlLWNvbXBvbmVudHNcIjogXCJeMC4yNy41XCIsXG4gICAgXCJ2dWVcIjogXCJeMy40LjMxXCIsXG4gICAgXCJ2dWUtYW1hcFwiOiBcIl4wLjUuMTBcIixcbiAgICBcInZ1ZS1pMThuXCI6IFwiXjkuMTMuMVwiLFxuICAgIFwidnVlLXJvdXRlclwiOiBcIl40LjQuMFwiLFxuICAgIFwidnVlZHJhZ2dhYmxlXCI6IFwiXjQuMS4wXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGNvbW1pdGxpbnQvY2xpXCI6IFwiXjE4LjQuM1wiLFxuICAgIFwiQGNvbW1pdGxpbnQvY29uZmlnLWNvbnZlbnRpb25hbFwiOiBcIl4xOC40LjNcIixcbiAgICBcIkB0eXBlcy9tZDVcIjogXCJeMi4zLjVcIixcbiAgICBcIkB0eXBlcy9ucHJvZ3Jlc3NcIjogXCJeMC4yLjNcIixcbiAgICBcIkB0eXBlcy9xc1wiOiBcIl42LjkuMTVcIixcbiAgICBcIkB0eXBlcy9zb3J0YWJsZWpzXCI6IFwiXjEuMTUuOFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2VzbGludC1wbHVnaW5cIjogXCJeNy4xNC4xXCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjcuMTQuMVwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI6IFwiXjUuMC40XCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI6IFwiXjMuMS4wXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xOVwiLFxuICAgIFwiY3otZ2l0XCI6IFwiMS45LjJcIixcbiAgICBcImN6Z1wiOiBcIl4xLjkuMlwiLFxuICAgIFwiZXNsaW50XCI6IFwiXjguNTcuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIl45LjEuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1wcmV0dGllclwiOiBcIl41LjEuM1wiLFxuICAgIFwiZXNsaW50LXBsdWdpbi12dWVcIjogXCJeOS4yNi4wXCIsXG4gICAgXCJodXNreVwiOiBcIl45LjAuMTFcIixcbiAgICBcImxpbnQtc3RhZ2VkXCI6IFwiXjE1LjIuNVwiLFxuICAgIFwicG9zdGNzc1wiOiBcIl44LjQuMzhcIixcbiAgICBcInBvc3Rjc3MtaHRtbFwiOiBcIl4xLjcuMFwiLFxuICAgIFwicHJldHRpZXJcIjogXCJeMy4zLjJcIixcbiAgICBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiOiBcIl41LjEyLjBcIixcbiAgICBcInNhc3NcIjogXCJeMS43Ny42XCIsXG4gICAgXCJzdGFuZGFyZC12ZXJzaW9uXCI6IFwiXjkuNS4wXCIsXG4gICAgXCJzdHlsZWxpbnRcIjogXCJeMTYuNi4xXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLWh0bWxcIjogXCJeMS4xLjBcIixcbiAgICBcInN0eWxlbGludC1jb25maWctcmVjZXNzLW9yZGVyXCI6IFwiXjUuMC4xXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXJlY29tbWVuZGVkLXNjc3NcIjogXCJeMTQuMC4wXCIsXG4gICAgXCJzdHlsZWxpbnQtY29uZmlnLXJlY29tbWVuZGVkLXZ1ZVwiOiBcIl4xLjUuMFwiLFxuICAgIFwic3R5bGVsaW50LWNvbmZpZy1zdGFuZGFyZFwiOiBcIl4zNi4wLjBcIixcbiAgICBcInN0eWxlbGludC1jb25maWctc3RhbmRhcmQtc2Nzc1wiOiBcIl4xMy4xLjBcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS41LjJcIixcbiAgICBcInVucGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQtcGx1c1wiOiBcIl4xLjAuMVwiLFxuICAgIFwidml0ZVwiOiBcIl41LjMuMlwiLFxuICAgIFwidml0ZS1wbHVnaW4tY29tcHJlc3Npb25cIjogXCJeMC41LjFcIixcbiAgICBcInZpdGUtcGx1Z2luLWVzbGludFwiOiBcIl4xLjguMVwiLFxuICAgIFwidml0ZS1wbHVnaW4taHRtbFwiOiBcIl4zLjIuMlwiLFxuICAgIFwidml0ZS1wbHVnaW4tcHdhXCI6IFwiXjAuMjAuMFwiLFxuICAgIFwidml0ZS1wbHVnaW4tc3ZnLWljb25zXCI6IFwiXjIuMC4xXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHNcIjogXCJeNy4zLjVcIixcbiAgICBcInZ1ZS10c2NcIjogXCJeMi4wLjIyXCJcbiAgfSxcbiAgXCJlbmdpbmVzXCI6IHtcbiAgICBcIm5vZGVcIjogXCI+PTE2LjE4LjBcIlxuICB9LFxuICBcImJyb3dzZXJzbGlzdFwiOiB7XG4gICAgXCJwcm9kdWN0aW9uXCI6IFtcbiAgICAgIFwiPiAxJVwiLFxuICAgICAgXCJub3QgZGVhZFwiLFxuICAgICAgXCJub3Qgb3BfbWluaSBhbGxcIlxuICAgIF0sXG4gICAgXCJkZXZlbG9wbWVudFwiOiBbXG4gICAgICBcImxhc3QgMSBjaHJvbWUgdmVyc2lvblwiLFxuICAgICAgXCJsYXN0IDEgZmlyZWZveCB2ZXJzaW9uXCIsXG4gICAgICBcImxhc3QgMSBzYWZhcmkgdmVyc2lvblwiXG4gICAgXVxuICB9LFxuICBcImNvbmZpZ1wiOiB7XG4gICAgXCJjb21taXRpemVuXCI6IHtcbiAgICAgIFwicGF0aFwiOiBcIm5vZGVfbW9kdWxlcy9jei1naXRcIlxuICAgIH1cbiAgfVxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFUsU0FBUyxjQUFjLGVBQXNDO0FBQzNZLFNBQVMsV0FBQUEsZ0JBQWU7OztBQ3FCakIsU0FBUyxXQUFXLFNBQThCO0FBQ3ZELFFBQU0sTUFB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R0EsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQTZCO0FBQy9ELFFBQU0sT0FBTyxRQUFRLElBQUk7QUFDekIsUUFBTSxNQUFNLFFBQVEsTUFBTSxJQUFJO0FBQzlCLFFBQU0sVUFBVSxXQUFXLEdBQUc7QUFFOUIsUUFBTSxxQkFBcUI7QUFDM0IsUUFBTSxxQkFBcUI7QUFFM0IsU0FBTztBQUFBO0FBQUEsSUFFTCxNQUFNO0FBQUEsSUFDTjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBS0MsU0FBUSxrQ0FBVyxPQUFPO0FBQUEsUUFDL0IsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixjQUFjLEtBQUssVUFBVSxZQUFZO0FBQUEsSUFDM0M7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLGdCQUFnQjtBQUFBLFVBQ2hCLHFCQUFxQixDQUFDLGVBQWU7QUFBQSxRQUN2QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNLFFBQVE7QUFBQSxNQUNkLE1BQU0sUUFBUTtBQUFBLE1BQ2QsTUFBTTtBQUFBO0FBQUEsTUFFTixPQUFPLFlBQVksUUFBUSxVQUFVO0FBQUEsSUFDdkM7QUFBQSxJQUNBLFNBQVMsa0JBQWtCLE9BQU87QUFBQSxJQUNsQyxTQUFTO0FBQUEsTUFDUCxNQUFNLFFBQVEsb0JBQW9CLENBQUMsZUFBZSxVQUFVLElBQUksQ0FBQztBQUFBLElBQ25FO0FBQUEsSUFDQSxPQUFPO0FBQUE7QUFBQSxNQUVMLFFBQVE7QUFBQSxNQUNSLFFBQVEsaUNBQVUsTUFBTSxPQUFPLEVBQUUsSUFBSTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQVNyQyxXQUFXO0FBQUE7QUFBQSxNQUVYLHNCQUFzQjtBQUFBO0FBQUEsTUFFdEIsdUJBQXVCO0FBQUEsTUFDdkIsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBO0FBQUEsVUFFTixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUVoQixpQkFBaUJDLE9BQU07QUFDckIsa0JBQU0sUUFBUSxtQkFBbUIsS0FBS0EsS0FBSTtBQUMxQyxrQkFBTSxjQUFjLFFBQVEsTUFBTSxDQUFDLElBQUk7QUFHdkMsbUJBQU8sY0FBY0EsTUFBSyxNQUFNLFlBQVksTUFBTSxFQUFFLFFBQVEsb0JBQW9CLEVBQUU7QUFBQSxVQUNwRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJyZXNvbHZlIiwgInJlc29sdmUiLCAibmFtZSJdCn0K
