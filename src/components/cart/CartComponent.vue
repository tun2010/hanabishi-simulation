<template>
    <cart-page-layout>
        <template #header>
            <layout-header>
                <template #small>
                    <template v-if="(routeName == 'cart-sizes')">カート • <span class="small--active">サイズ</span> • 確認</template>
                    <template v-else-if="(routeName == 'cart-items')"><span class="small--active">カート</span> • サイズ • 確認</template>
                    <template v-else>カート • サイズ • <span class="small--active">確認</span></template>
                </template>
                <template #title>
                    {{ routeName == 'cart-items' 
                        ? '注文内容確認'
                        : routeName == 'cart-sizes'
                            ? 'サイズ測定' : '注文確定しました' 
                    }}
                </template>
            </layout-header>
        </template>
        <template #content>
            <router-view></router-view>
        </template>
        <template #aside>
            <cart-summary 
                :routeName="routeName" 
                :busy="itemsBusy" 
                :customer="customer"
                @checkout="onCheckout"
            />
        </template>
    </cart-page-layout>
    <!-- <main id="main">
        <app-header />
        <div class="body">
            <div class="content">
                <div class="page">
                    <router-view></router-view>
                </div>
            </div>
            <aside class="summary-container">
                <cart-summary 
                    :routeName="routeName" 
                    :busy="itemsBusy" 
                    :customer="customer"
                    @checkout="onCheckout"
                />
            </aside>
        </div>
    </main> -->
</template>

<script>
import { useCart } from '@/store/cart'

import CartPageLayout from '@/layouts/CartPageLayout.vue'
import LayoutHeader from '@/layouts/LayoutHeader.vue'
import CartSummary from './CartSummary.vue'

export default {
    name: "CartComponent",
    components: { 
        CartPageLayout,
        LayoutHeader,
        CartSummary,
    },
    setup() {
        return useCart()
    },
}
</script>

<style scoped>
#main {
    background-color: var(--primary);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 60px minmax(0, 1fr);
}
.body {
    display: grid;
    grid-template-columns: 2fr minmax(380px, 1fr);
    grid-template-rows: minmax(0, 1fr);
    grid-template-areas: "body aside";
    align-items: stretch;
    position: relative;
}
.content {
    grid-area: body;
    border-right: 1px solid var(--border-color);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    background-color: rgba(40,40,40,1);
}
.summary-container {
    grid-area: aside;
}

@media (orientation: portrait) {
    .body {
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: 120px minmax(0, 1fr);
        grid-template-areas: 
            "aside"
            "body"
        ;
    }
}
</style>