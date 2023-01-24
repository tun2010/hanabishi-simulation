<template>
    <ul class="items-select">
        <li 
            v-for="item in categories" :key="item.id" :style="{'background-image': `url(${item.img})`}">
            <button class="items-select__option" @click="selectCategory(item.id)">
                {{item.name}}
                <span class="option-btn-arrow" :class="{active: item.id == category}" />
            </button>
        </li>
    </ul>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useItemsStore } from '@/store/items'

export default {
    name: 'CategorySelect',
    setup() {
        const itemsStore = useItemsStore()
        const { categories, category } = storeToRefs(itemsStore)
        const { selectCategory } = itemsStore
        
        return {
            categories,
            category,
            selectCategory
        }
    }
}
</script>

<style scoped>
.items-select {
    margin: 0;
    padding: var(--space-4);
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    grid-gap: var(--space-4);
    min-height: 100%;
}
.items-select li {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    background-image: url(https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_jacket.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding: var(--space-1);
}
.items-select__option {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-4);
    z-index: 1;
    margin: 0;
    background-color: rgba(37,56,97,.7);
    padding: var(--space-0) var(--space-4);
    font-size: 1.5rem;
    font-weight: 900;
    color: rgba(255,255,255,.9);
    text-transform: uppercase;
}
.option-btn-arrow {
    width: 50px;
    height: 0;
    border-bottom: 2px solid rgba(255,255,255,.9);
    position: relative;
    transition: transform .5s ease;
}
.option-btn-arrow::before,
.option-btn-arrow::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 0;
    height: 16px;
    border-right: 2px solid rgba(255,255,255,.9);
    transform-origin: bottom right;
    transform: rotate(-60deg);
}
.option-btn-arrow::after {
    bottom: 0px;
    right: 1px;
    transform: rotate(-120deg);
}
.option-btn-arrow.active {
    transform: translateX(60px);
    transition: transform .3s ease;
}
</style>