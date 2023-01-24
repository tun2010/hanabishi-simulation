<template>
    <center-vertical-layout withForm @customSumit="createUser">
        <template #title>新規会員登録</template>
        <template #small>既存会員の方 • <span class="small--active">新規登録</span> • ゲスト購入</template>
        <template #content>
            <layout-scroll-view scroll="y">
                <register-form />
            </layout-scroll-view>
            <absolute-loading v-if="loading" />
        </template>
        <template #footer>
            <router-link to="/" class="myshop-btn myshop-btn--outline">戻る</router-link>
            <button type="sumit" class="myshop-btn myshop-btn--secondary">入力内容確認</button>
        </template>
    </center-vertical-layout>
</template>

<script>
import { useCustomerRegister } from '@/store/customer-register'

import CenterVerticalLayout from '@/layouts/CenterVerticalLayout.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import RegisterForm from '@/components/customer-create/RegisterForm.vue'
import AbsoluteLoading from '../util/AbsoluteLoading.vue'

export default {
    name: 'CustomerCreateComponent',
    components: {
        CenterVerticalLayout,
        LayoutScrollView,
        RegisterForm,
        AbsoluteLoading,
    },
    setup() {
        return useCustomerRegister()
    }
}
</script>
