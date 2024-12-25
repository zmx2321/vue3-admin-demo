import { customRef } from 'vue'

// 自定义ref防抖
export const myRef = (value) => {
    return customRef((track, trigger) => {
        return {
            get() {
                // 依赖收集
                track()
                return value
            },
            set(val) {
                // 派发更新
                trigger()
                value = val
            }
        }
    })
}

// 自定义ref防抖
export const debounceRef = (value, delay = 500) => {
    return customRef((track, trigger) => {
        let timeout;
        return {
            get() {
                track();
                return value;
            },
            set(newValue) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    value = newValue;
                    trigger();
                }, delay);
            }
        };
    });
};