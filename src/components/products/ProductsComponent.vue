<template>
    <center-vertical-layout>
        <template #title>注文タイプの選択</template>
        <template #small>製品コードで製品を検索</template>
        <template #content>
            <layout-scroll-view scroll="y">
                <header class="title-header">
                    <h2>オーダー種別選択画面</h2>
                </header>
                <div class="actions">
                    <button class="code-btn" @click="openModel()">
                        商品コード を入力
                    </button>
                </div>
                <products-list />
            </layout-scroll-view>
        </template>
        <template #footer>
            <div class="total-price" v-if="totalPrice">
                お支払い金額: <strong>{{ formatCurrency(totalPrice) }}</strong>
            </div>
            <router-link to="/order" class="myshop-btn myshop-btn--outline">戻る</router-link>
            <router-link to="/cart" class="myshop-btn myshop-btn--secondary">カートに行く</router-link>
        </template>
        <template #other>
            <product-code-model 
                :show="model" 
                @enter="getProduct"
                @cancel="closeModel"
            />
            <absolute-loading v-if="busy" />
        </template>
    </center-vertical-layout>
</template>

<script>
import { useProducts } from '@/store/products'


import CenterVerticalLayout from '@/layouts/CenterVerticalLayout.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'

import ProductsList from './ProductsList.vue'
import ProductCodeModel from './ProductCodeModel.vue'
import AbsoluteLoading from '../util/AbsoluteLoading.vue'
export default {
    components: { 
        CenterVerticalLayout,
        LayoutScrollView,
        ProductsList,
        ProductCodeModel,
        AbsoluteLoading,
    },
    name: 'ProductsComponent',
    setup() {
        return useProducts()
    }
}
</script>

<style scoped>
.title-header {
    height: calc(50% - 40px);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: var(--space-4);
}
h2 {
    margin: 0;
    color: var(--gray-100);
}
.actions {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;

    position: sticky;
    top: 0;
    left: 0; right: 0;
    z-index: 2;
 	background-image: radial-gradient(transparent 2px, var(--bg-gray) 2px);
  	background-size: 4px 4px;
    backdrop-filter: blur(3px);
}
.code-btn {
    display: flex;
    height: 46px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-0);
    padding: var(--space-2);
    min-width: 240px;
    font-size: .8rem;
    font-weight: 600;
    background-color: var(--gray-100);
    color: var(--primary);
    border: 1px solid var(--primary);
    box-shadow: 0 0 0 4px var(--gray-100);
}
.code-btn span {
    font-family: var(--custom-font);
    font-size: 1.2rem;
}

.total-price {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    gap: var(--space-2);
    padding-bottom: 18px;
    font-size: .8rem;
    color: hsla(0,0%,100%,.9);
}
</style>