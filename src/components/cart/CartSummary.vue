<template>
    <div class="summary">
        <transition name="fade">
            <section class="summary-media" v-if="routeName == 'cart-sizes'"></section>
            <section class="summary-body" v-else>
                <div class="summary-description">
                    <div class="description">
                        <div class="description-label">顧客名</div>
                        <div class="description-value">{{ customer?.name || '' }}</div>
                    </div>
                    <div class="description">
                        <div class="description-label">発行日</div>
                        <div class="description-value">{{ formatDate(new Date()) }}</div>
                    </div>
                    <div class="description">
                        <div class="description-label">小計</div>
                        <div class="description-value bold">¥10,000</div>
                    </div>
                    <div class="description">
                        <div class="description-label">値引き</div>
                        <div class="description-value bold">￥2,000</div>
                    </div>
                    <div class="description">
                        <div class="description-label">商品券</div>
                        <div class="description-value bold">￥5,000</div>
                    </div>
                    <div class="total-price">
                        <div class="price-label">合計</div>
                        <div class="price-value">￥16,500</div>
                    </div>
                </div>
                <div class="summary-action" v-if="(routeName != 'cart-success')">
                    <button class="myshop-btn myshop-btn--secondary myshop-btn--full" @click="handleCheckout">オーダー完了</button>
                </div>
            </section>
        </transition>
    </div>
</template>

<script>
import { formatDate } from '@/helpers/util'

import LayoutHeader from '@/layouts/LayoutHeader.vue'

export default {
    name: 'CartSummary',
    components: {
        LayoutHeader,
    },
    props: {
        routeName: String,
        busy: Boolean,
        customer: Object,
    },
    emits: ['checkout'],
    setup(props, context) {
        function handleCheckout() {
            context.emit('checkout')
        }

        return {
            formatDate,
            handleCheckout,
        }
    }
}
</script>

<style scoped>
.summary {
    height: 100%;
    color: rgba(255,255,255,.7);
    background-color: var(--primary);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr);
}
.summary-media {
    background-image: url(https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/starter.jpeg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: -40px center;
    position: relative;
}
.summary-body {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto 1fr;
    align-items: flex-start;
    padding: var(--space-4);
    gap: var(--space-0);
}
.summary-description {
    padding: var(--space-6) var(--space-4) var(--space-5);
    border: 1px solid rgba(255,255,255,.2);
    background-color: var(--primary-card);
}
.total-price,
.description {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-2) var(--space-1);
    border-bottom: 1px solid rgba(255,255,255,.2);
    color: rgba(255,255,255,.7);
}
.total-price {
    margin-top: var(--space-3);
    border: none;
}
.price-label {
    font-size: 1.2rem;
}
.description-value,
.price-value {
    color: rgba(255,255,255,.9);
}
.description-value.bold {
    font-weight: 600;
}
.price-value {
    font-size: 2rem;
    font-weight: 800;
}
.summary-action {
    padding: var(--space-4);
    border: 1px solid rgba(255,255,255,.2);
    background-color: var(--primary-card);
}


.end {
    display: none;
    padding: var(--space-4) var(--space-2);
    background-color: var(--primary);
    writing-mode: vertical-lr;
    color: rgba(255,255,255,.7);
}
.end h1 {
    color: rgba(255,255,255,.7);
    font-size: 2.5rem;
    font-weight: 900;
    margin: 0;
    font-family: var(--custom-font);
}
.end small {
    padding-top: 3px;
}
.end small span {
    padding: 4px;
    background-color: rgba(40,40,40,1);
}
@media (orientation: portrait) {
    .summary {
        grid-template-rows: auto;
    }
    .summary-media,
    .summary-body {
        display: none;
    }
}
</style>