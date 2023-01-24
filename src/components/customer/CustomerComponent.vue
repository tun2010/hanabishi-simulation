<template>
    <three-quarter-layout>
        <template #aside>
            <div class="view"></div>
        </template>
        <template #content>
            <layout-main-body relative>
                <layout-header>
                    <template #small><span class="small--active">既存会員の方</span> • 新規登録 • ゲスト購入</template>
                    <template #title>お客様情報を検索</template>
                </layout-header>
                <layout-scroll-view scroll="y">
                    <search-customer />
                    <customer-list v-if="isSearched" />
                    <p class="form__alert" v-if="!isSearched">
                        学テヘ象減ヘホチ取部さ殺要ヱオ氏思以ルミキ岩乞伍佛侯ばや。
                    </p>
                </layout-scroll-view>
                <layout-footer>
                    <router-link to="/customer/guest" class="myshop-btn myshop-btn--outline">ゲストとして進む</router-link>
                    <router-link to="/customer/create" class="myshop-btn myshop-btn--primary">新規登録</router-link>
                </layout-footer>
                <transition name="right">
                    <ask-email v-if="activeUserId" />
                </transition>
                <absolute-loading v-if="busy" />
            </layout-main-body>
        </template>
    </three-quarter-layout>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useCustomerStore } from '@/store/customer'
import { onBeforeUnmount } from '@vue/runtime-core'

import ThreeQuarterLayout from '@/layouts/ThreeQuarterLayout.vue'
import LayoutHeader from '@/layouts/LayoutHeader.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import LayoutMainBody from '@/layouts/LayoutMainBody.vue'
import LayoutFooter from '@/layouts/LayoutFooter.vue'
import SearchCustomer from '@/components/customer/SearchCustomer.vue'
import CustomerList from '@/components/customer/CustomerList.vue'
import AskEmail from '@/components/customer/AskEmail.vue'
import AbsoluteLoading from '@/components/util/AbsoluteLoading.vue'

export default {
    name: 'CustomerComponent',
    components: {
        ThreeQuarterLayout,
        LayoutHeader,
        LayoutScrollView,
        LayoutMainBody,
        LayoutFooter,
        SearchCustomer,
        CustomerList,
        AskEmail,
        AbsoluteLoading,
    },
    setup() {
        const customerStore = useCustomerStore()
        const { activeUserId, busy, confirm, isSearched } = storeToRefs(customerStore)
        const { resetCustomer } = customerStore

        onBeforeUnmount(() => {
            resetCustomer()
        })

        return {
            activeUserId,
            busy, 
            confirm,
            isSearched,
        }
    }
}
</script>

<style scoped>
.view {
    height: 100%;
    background-image: url(https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/premium.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center bottom;
    position: relative;
}
@media (orientation: portrait) {
    .view {
        background-position: -60px;
    }
}
.form__alert {
    padding: 0 var(--space-5);
    color: rgba(255,255,255,.8);
    font-size: .9rem;
    max-width: 400px;
}
</style>