<template>
    <layout-slide-in>
        <layout-header>
            <template #small>オーダー • カテゴリ選択 • <span class="small--active">アイテム選択</span></template>
            <template #title>{{ itemTitle }}</template>
        </layout-header>
        <layout-scroll-view scroll="y">
            <inline-loading v-if="itemBusy" />
            <template v-else-if="itemList.length">
                <ul class="shirt-categories" v-if="isShirt">
                    <li v-for="cate in shirtCategoryList" :key="cate.id">
                        <h2 class="shirt-category__title">{{ cate.name }}</h2>
                        <ul class="shirt-options">
                            <li v-for="item in itemList" :key="item.id">
                                <label style="text-decoration: none;">
                                    <input type="radio"
                                        :id="item.id" 
                                        :value="`${cate.id}_${item.id}`" 
                                        v-model="selectedItem">
                                    <div class="option-name">{{ item.name }}</div>
                                </label>
                            </li>
                        </ul>
                    </li>
                </ul>
                <ul class="options" v-else>
                    <li class="option" v-for="item in itemList" :key="item.id">
                        <input type="radio"
                            :id="item.id" 
                            :value="item.id" 
                            v-model="selectedItem">
                        <label :for="item.id" class="select-item">
                            <div class="select-item__name">
                                {{item.name}}
                            </div>
                            <ul class="select-item__products">
                                <li v-for="product in item.products" :key="product.id">
                                    {{ product.name }}
                                </li>
                            </ul>
                        </label>
                    </li>
                </ul>
            </template>
            <div class="no-data" v-else>
                <empty-alert />
            </div>
        </layout-scroll-view>
        <layout-footer>
            <button type="button" @click="closeCategoey" class="myshop-btn myshop-btn--outline">戻る</button>
            <button type="button" @click="saveSelectedItems" class="myshop-btn myshop-btn--secondary">新規オーダーする</button>
        </layout-footer>
    </layout-slide-in>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useItemsStore } from '@/store/items'
import { onMounted } from '@vue/runtime-core'

import LayoutHeader from '@/layouts/LayoutHeader.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import LayoutFooter from '@/layouts/LayoutFooter.vue'
import LayoutSlideIn from '@/layouts/LayoutSlideIn.vue'

import InlineLoading from '../util/InlineLoading.vue'
import EmptyAlert from '../util/EmptyAlert.vue'

export default {
    components: { 
        LayoutHeader,
        LayoutScrollView,
        LayoutFooter,
        LayoutSlideIn,
        InlineLoading, 
        EmptyAlert 
    },
    name: 'ItemsSelect',
    setup() {
        const itemsStore = useItemsStore()
        const { 
            itemBusy, 
            gender, 
            category, 
            isShirt, 
            itemTitle, 
            itemList, 
            shirtCategoryList, 
            selectedItem 
        } = storeToRefs(itemsStore)
        const { getItems, closeCategoey, saveSelectedItems } = itemsStore

        onMounted(() => {
            getItems()
        })

        return {
            itemBusy,
            gender,
            category,
            isShirt,
            itemTitle,
            itemList,
            shirtCategoryList,
            selectedItem,
            
            closeCategoey,
            saveSelectedItems,
        }
    }
}
</script>

<style scoped>
.options {
    width: 100%;
    margin: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    padding: var(--space-4);
    grid-gap: var(--simu-gap);
}
.options input {
    opacity: 0;
    position: absolute;
    z-index: -999;
    width: 0;
    height: 0;
    padding: 0;
    margin: 0;
}
.select-item {
    width: 100%;
    height: 100%;
    --theme: var(--primary);
    --color: var(--gray-50);
    --border: var(--gray-300);
    color: var(--color);
    font-size: .9rem;
    display: grid;
    grid-auto-columns: minmax(0, 1fr);
    grid-template-rows: 50px minmax(140px, 1fr);
    padding: var(--space-4);
    background-color: var(--primary-light);
    transition: all .3s ease;
}
.select-item__name {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
    font-size: 1rem;
    font-weight: 600;
    border-bottom: 1px solid var(--border);
}
.select-item__products {
    margin: 0;
    padding: var(--space-2) var(--space-1);
    list-style: none;
}
.select-item__products li {
    padding: 4px 0;
}

.option input:checked ~ .select-item {
    --theme: var(--secondary);
    --color: var(--bg-gray);
    --border: rgb(90,90,90);
    background-color: var(--theme);
}
.option input:checked ~ .select-item .select-item__name {
    font-weight: 900;
}
.option input:checked ~ .select-item .select-item__products {
    font-weight: 600;
}

.shirt-categories {
    margin: 0;
    padding: var(--space-4);
    list-style: none;
    color: var(--gray-50);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
}
.shirt-categories > li {
    display: flex;
    flex-direction: column;
    padding: 0;
    border: 1px solid var(--primary-dark);
}
.shirt-category__title {
    margin: 0;
    padding: var(--space-4);
    font-size: 1.5rem;
    background-color: var(--primary-dark);
}

.shirt-options input {
    --theme: rgb(255,255,255,.7);
    width: 1.3rem;
    height: 1.3rem;
    border: 2px solid var(--theme);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    opacity: 1;
}
.shirt-options input::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background-color: var(--theme);
    transform: scale(0);
    transition: transform .3s ease;
}
.shirt-options input:checked:after {
    transform: scale(1);
}
.shirt-options {
    margin: 0;
    padding: var(--space-4);
    list-style: none;
    display: flex;
    gap: var(--space-6);
    background-color: var(--primary-light);
}
.shirt-options label {
    display: flex;
    gap: var(--space-2);
}

.no-data {
    padding: var(--space-4);
}
</style>