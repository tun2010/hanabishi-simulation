<template>
    <article :class="{active: toggleDetail}">
        <div class="media">
            <div class="img"></div>
        </div>
        <div class="content">
            <h3>{{ item.gender.name }} - {{ item.category.name }}</h3>
            <div class="product">{{ item.product.name }}</div>
            <div class="style">{{ item.silhouette.selected_name }}</div>
            <div class="fabric">{{ item.fabric.selected_name }}</div>
            <div style="flex:1" />
            <div class="price">￥16,500</div>
        </div>
        <div class="action">
            <button class="delate-btn" @click="onItemDelete(item)"></button>
            <button class="myshop-btn myshop-btn--outline" @click="openDeatil">受注詳細</button>
        </div>
    </article>
    <!-- <div class="layer" :class="{show: toggleDetail}"></div> -->
    <div class="simulator-container" :class="{show: toggleDetail}">
        <div class="space"></div>
        <div class="simulator-content">
            <transition name="right">
                <div class="item-detail" v-if="toggleDetail">
                    <cart-item-detail @close="closeDetail"/>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import { useCustomCartItem } from '@/store/cart'

import CartItemDetail from './CartItemDetail.vue'

export default {
    name: 'CustomOrderItem.vue',
    components: {
        CartItemDetail,
    },
    props: {
        item: Object,
    },
    setup(props) {
        return useCustomCartItem(props.item)
    },
}
</script>

<style scoped>
article {
    --img-size: 160px;
    width: 100%;
    padding: var(--space-4);
    color: rgba(255,255,255,.8);
    display: grid;
    grid-template-columns: var(--img-size) 1fr .5fr;
    gap: var(--space-4);
    transform: translateX(0);
    transition: all .3s ease;
    background-color: var(--bg-gray-light);
    border: 1px solid rgba(255,255,255,.2);
}
article.active {
    transform: translateX(-100px);
    transition: all .3s ease .3s;
    background-color: var(--primary);
}
.img {
    width: var(--img-size);
    height: var(--img-size);
    background-color: rgba(255,255,255,.2);
}
.content {
    color: var(--gray-100);
    display: flex;
    flex-direction: column;
}
h3 {
    font-size: 1.6rem;
    font-family: var(--custom-font);
    margin: 0;
}
.product {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--gray-200);
}
.price {
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--gray-100);
}
.action {
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}
.myshop-btn--outline {
    min-width: 180px;
    /* background-color: var(--bg-gray); */
}
.delate-btn {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transform: translate(5px, -5px);
}
.delate-btn::before,
.delate-btn::after {
    content: '';
    display: block;
    width: 24px;
    height: 0;
    position: absolute;
    border-top: 1px solid rgba(255,255,255,.8);
}
.delate-btn::before {
    transform: rotate(45deg);
}
.delate-btn::after {
    transform: rotate(-45deg);
}

.simulator-container {
    position: fixed;
    z-index: 5;
    top: 60px; bottom: 0;
    left: 0; right: 0;
    background-image: radial-gradient(transparent 2px, var(--bg-gray) 2px);
    background-size: 4px 4px;
    backdrop-filter: blur(5px);
    opacity: 0;
    pointer-events: none;
    transition: opacity .3s ease .2s;

    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(660px, 1fr);
    grid-template-rows: minmax(0, 1fr);
    align-items: stretch;
}
.simulator-container.show {
    opacity: 1;
    pointer-events: auto;
    transition: opacity .3s ease;
}

.simulator-content {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
}

.item-detail {
    position: relative;
    background-color: var(--primary);
    border-left: 1px solid var(--border-color);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
}
@media (orientation: portrait) {
    .simulator-container {
        grid-template-columns: minmax(0, 1fr) minmax(640px, 2fr);
    }
}
</style>