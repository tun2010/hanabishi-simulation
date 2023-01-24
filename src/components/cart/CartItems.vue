<template>
    <div class="cart-items">
        <div class="scroll-view scroll-view--y">
            <h2 class="cart-title">注文アイテム</h2>
            <ul v-if="busy" class="loading">
                <li>
                    <inline-loading />
                </li>
            </ul>
            <TransitionGroup name="list" tag="ul" v-else>
                <li v-for="item in items" :key="item.id">
                    <custom-order-item v-if="item.type == 1" :item="item" />
                    <product-item v-else :item="item" />
                </li>
                <li v-if="items && !items.length">
                    <empty-cart />
                </li>
            </TransitionGroup>
            <div class="summary only-portrait" v-if="items && items.length">
                <div class="summary-start">
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
                </div>
                <div class="summary-end">
                    <div class="total-price">
                        <div class="price-label">合計</div>
                        <div class="price-value">￥16,500</div>
                    </div>
                    <button class="myshop-btn myshop-btn--secondary myshop-btn--full" @click="onCheckout">オーダー完了</button>
                </div>
            </div>
        </div>
        <div class="content-footer">
            <reorder-menu :gender="orderGender" />
            <router-link to="/cart/sizes" class="myshop-btn myshop-btn--light arrow-end">サイズメジャー</router-link>
        </div>
        <absolute-loading v-if="loading" />
    </div>
</template>

<script>
import { useCartItems } from '@/store/cart'

import CustomOrderItem from '../cart-item/CustomOrderItem.vue'
import InlineLoading from '../util/InlineLoading.vue'
import AbsoluteLoading from '../util/AbsoluteLoading.vue'
import CartSummary from './CartSummary.vue'
import ProductItem from '../cart-item/ProductItem.vue'
import EmptyCart from '../util/EmptyCart.vue'
import ReorderMenu from '@/components/cart/ReorderMenu.vue'
export default {
    name: 'CartItems',
    components: {
        CustomOrderItem,
        InlineLoading,
        AbsoluteLoading,
        CartSummary,
        ProductItem,
        EmptyCart,
        ReorderMenu,
    },
    setup() {
        return useCartItems()
    },
}
</script>

<style scoped>
.cart-items {
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) 90px;
    position: relative;
}
.scroll-view::-webkit-scrollbar-track {
  background-color: var(--bg-gray);
}
.cart-title {
    margin: 0;
    padding: 0 var(--space-4);
    color: rgba(255,255,255,.7);
    font-size: 1.6rem;
    height: 120px;
    display: flex;
    align-items: flex-end;
}
ul {
    margin: 0;
    padding: var(--space-4);
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    gap: var(--space-2);
    overflow: hidden;
}
.loading li {
    min-height: 50vh;
    display: flex;
    align-items: center;
}
.content-footer {
    border-top: 1px solid var(--border-color);
    padding: 0 var(--space-4);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--space-4);
}

.summary {
    padding: 0 var(--space-4) var(--space-4);
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-end;
    gap: var(--space-4);
}
.summary-description {
    width: 100%;
    max-width: 460px;
}
.description {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-2);
    border-bottom: 1px solid rgba(255,255,255,.2);
    color: rgba(255,255,255,.7);
}

.total-price {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: var(--space-2);
    border: none;
    color: rgba(255,255,255,.7);
}
.price-label {
    font-size: 1.2rem;
}
.description-value {
    font-weight: 600;
}
.price-value {
    font-size: 2rem;
    font-weight: 800;
}

@media (orientation: landscape) {
    .only-portrait {
        display: none;
    }
}
</style>