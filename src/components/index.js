/* eslint-disable no-restricted-syntax */
/*
 **全局注册组件
 ** 放在components/global文件夹下
 */
import { defineAsyncComponent } from 'vue'

const components = import.meta.glob('./global/*.vue') // 异步方式

const install = (app) => {
    for (const [key, value] of Object.entries(components)) {
        const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
        app.component(name, defineAsyncComponent(value))
    }
}

export default install