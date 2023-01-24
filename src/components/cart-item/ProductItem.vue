<template>
    <article>
        <div class="cell name">
            <h3>{{ item.name }}</h3>
        </div>
        <div class="cell price">{{ formatCurrency(item.price) }}</div>
        <div class="cell qty">
            <div class="qty-actions">
                <button type="button" class="qty-btn qty-btn--dec" @click="decreaseQty(item.id)"></button>
                <div class="quantity">{{ item.quantity }}</div>
                <button type="button" class="qty-btn qty-btn--inc" @click="increaseQty(item.id)"></button>
            </div>
        </div>
        <div class="cell total">{{ formatCurrency(item.price * item.quantity) }}</div>
        <div class="cell del">
            <button type="button" class="delete-btn" @click="onItemDelete(item)"></button>
        </div>
    </article>
</template>

<script>
import { useProductCartItem } from '@/store/cart'

export default {
    name: 'ProductItem',
    props: {
        item: Object,
    },
    setup() {
        return useProductCartItem()
    }
}
</script>

<style scoped>
article {
    min-height: 80px;
    font-size: .8rem;
    font-weight: 600;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 80px 150px 100px 50px;
    align-items: center;
    padding: 0 var(--space-4);
    gap: var(--space-3);
    color: rgb(250,250,250);
    background-color: var(--bg-gray-light);
    border: 1px solid rgba(255,255,255,.2);
}
.name h3 {
    font-size: .9rem;
}
.qty {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.qty-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border-color);
}
.quantity {
    min-width: 38px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
}
.qty-btn {
    width: 42px;
    height: 32px;
    background-color: var(--bg-gray);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}
.qty-btn::before,
.qty-btn::after {
    content: '';
    display: block;
    position: absolute;
    width: 14px;
    height: 0;
    border-top: 1px solid rgb(250,250,250);
}
.qty-btn--dec::after {
    display: none;
}
.qty-btn--inc::after {
    transform: rotate(90deg);
}
.price {
    text-align: right;
    font-size: 1rem;
    font-weight: 400;
}
.total {
    text-align: right;
    font-size: 1.2rem;
    color: rgba(255,255,255,.8);
}
.del {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.delete-btn {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transform: translateX(5px);
}
.delete-btn::before,
.delete-btn::after {
    content: '';
    display: block;
    width: 24px;
    height: 0;
    position: absolute;
    border-top: 1px solid rgba(255,255,255,.8);
}
.delete-btn::before {
    transform: rotate(45deg);
}
.delete-btn::after {
    transform: rotate(-45deg);
}
</style>