<template>
    <section class="order">
        <section class="loading" v-if="busy">
            <inline-loading />
        </section>
        <layout-scroll-view scroll="y" v-else>
            <layout-header>
                <template #small>男性</template>
                <template #title>スーツ / ジャケット / パンツ</template>
            </layout-header>
            <progress-bar />
            <order-info @size="onOpenSize" />
            <product-options v-for="product of getProducts" :key="product.id" :item="getItem(product.id)" :product="product" />
        </layout-scroll-view>
        <footer>
            <router-link to="/orders?scroll=1" class="myshop-btn myshop-btn--outline arrow-start portrait">履歴ページに戻る</router-link>
            <div class="footer-price">65,000¥</div>
            <button class="myshop-btn myshop-btn--secondary">工場送信済</button>
        </footer>
        <transition name="right">
            <sizes-edit v-if="sizeToggle" />
        </transition>
    </section>
</template>

<script>
import { useHistoryDetail } from '@/store/history/detail'

import ProductOptions from './ProductOptions.vue'
import ProgressBar from './ProgressBar.vue'
import OrderInfo from './OrderInfo.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import InlineLoading from '../util/InlineLoading.vue'
import SizesEdit from './SizesEdit.vue'
import LayoutHeader from '@/layouts/LayoutHeader.vue'

export default {
    name: 'HistoryDetail',
    components: { 
        ProgressBar,
        ProductOptions,
        OrderInfo,
        LayoutScrollView,
        InlineLoading,
        SizesEdit,
        LayoutHeader
    },
    setup() {
        return useHistoryDetail()
    }
}
</script>

<style scoped>
.order {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) 80px;
    position: relative;
    overflow: hidden;
    /* border-left: 1px solid var(--border-color); */
}
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
}
.info {
    padding: var(--space-3);
    padding-top: var(--space-5);
    color: var(--gray-50);
    text-align: center;
    background-color: var(--bg-gray);
    border-bottom: 1px solid var(--border-color);
}
.info h1 {
    font-size: 1.8rem;
    margin: 0;
}
.info h2 {
    font-size: 1.4rem;
    margin: var(--space-1) 0 0;
}
footer {
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--space-4);
    padding: 0 var(--space-4);
}
.footer-price {
    flex: 1;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--gray-100);
    text-align: center;
}
@media (orientation: landscape) {
    .portrait {
        display: none;
    }
    .footer-price {
        text-align: left;
    }
}
</style>