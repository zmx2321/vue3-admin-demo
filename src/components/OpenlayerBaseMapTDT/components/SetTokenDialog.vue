<template>
    <dialog-info ref="refDialogInfo" class="dialog_info_wrap" :isShowFotter="true">
        <!-- 标题 -->
        <template #DialogTitle>
            <span>切换天地图token</span>
        </template>
        <!-- 内容 -->
        <template #DialogContainer>
            <div class="dialog_wrap">
                <p>当前token: {{ currentToken }}</p>
                <el-autocomplete v-model="selectedToken" style="width: 65%;" :fetch-suggestions="querySearch"
                    popper-class="my-autocomplete" placeholder="请选择或者输入" @select="handleSelect" clearable>
                    <template #suffix>
                    </template>
                    <template #default="{ item }">
                        <div class="input_wrap" :class="{ current_selected: item.value === currentToken }">
                            <h3>{{ item.name }} <span v-if="item.value === currentToken">- 当前token</span></h3>
                            <span>{{ item.value }}</span>
                        </div>
                    </template>
                </el-autocomplete>
                <el-button type="primary" style="margin-left: 25px;" @click="setTokenData"
                    :disabled="selectedToken === ''">
                    确定
                </el-button>
            </div>
        </template>
    </dialog-info>
</template>

<script setup>
import { ref, nextTick, onMounted } from "vue";
import { Edit } from '@element-plus/icons-vue';
import { disable } from "ol/rotationconstraint";
import mittBus from "@/utils/mittBus"; // mitt
import { ElMessage } from "element-plus";
import { gisDataStore } from '@/stores/modules/gis.ts'  // store

const { setMapToken } = gisDataStore()
const gisStoreData = gisDataStore()

let currentToken = ref(import.meta.env.VITE_APP_MapToken)

const refDialogInfo = ref(null)

const selectedToken = ref('')
const links = ref([])

const querySearch = (queryString, cb) => {
    const results = queryString
        ? links.value.filter(createFilter(queryString))
        : links.value
    // call callback function to return suggestion objects
    cb(results)
}
const createFilter = (queryString) => {
    return (restaurant) => {
        return (
            restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
    }
}
const loadAll = () => {
    return [
        { name: 'token1', value: '02dd5ea16a6b869b3b37e12f269b1463' },
        { name: 'token2', value: '53ce309465e600f242d351b15013397f' },
        { name: 'token3', value: '37c72a79fe4c6a1b3fa6b1435214b378' },
        { name: 'token4', value: '5a257cd2df1b3311723bd77b0de14baf' },
        { name: 'token5', value: '7786923a385369346d56b966bb6ad62f' },
    ]
}
const handleSelect = (item) => {
    setMapToken(item.value)
}

const setTokenData = () => {
    if (selectedToken.value.length !== 32) {
        ElMessage.warning("请输入正确的token")
        return
    }

    // 初始化地图
    mittBus.emit('initOlMapByToken')
    mittBus.emit('resetSwitchLayer')
    refDialogInfo.value.hide()

    currentToken.value = selectedToken.value
}

onMounted(() => {
    links.value = loadAll()
})

/**
 * 业务
 */
const show = (val) => {
    refDialogInfo.value.show();
    refDialogInfo.value.setDialogWidth('30%');

    selectedToken.value = ''
};

defineExpose({
    show,
});
</script>

<style lang="scss" scoped>
.dialog_info_wrap {
    .dialog_wrap {
        p {
            margin-bottom: 10px;
        }
    }
}
</style>
<style lang="scss">
.el-autocomplete-suggestion__wrap {
    ul {
        li {
            // background: #f00;
            line-height: initial;
            margin-bottom: 15px;

            h3 {
                margin-bottom: 5px;
            }

            .current_selected {

                // background: #f00;
                h3,
                span {
                    color: #68a3ff;
                }
            }
        }
    }
}

.input_wrap {}
</style>