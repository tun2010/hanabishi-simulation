<template>
    <div class="option-choose">
        <div class="option-choose__header">
            <h1>生地選択</h1>
            <form @sumit.prevent="handleSearch" class="search-form">
                <span class="search-icon"></span>
                <input type="text" v-model="search_key" @change="handleSearch" placeholder="Search.." />
                <!-- <button type="submit">検索</button> -->
            </form>
        </div>
        <div class="option-choose__body">
            <div class="scroll-view scroll-view--y">
                <ul class="loading" v-if="busy">
                    <li>
                        <inline-loading />
                    </li>
                </ul>
                <ul class="list" ref="containerEl" v-else>
                    <li v-for="item in fabricList" :key="item.id">
                        <button class="fabric_btn" @click="onFabricSelect(item)" :class="{selected: current?.id == item.id}">
                            <div class="fabric__name">{{item.name}}</div>
                            <div class="fabric__price">¥{{item.price}}（税込）〜</div>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <div class="option-choose__footer">
            <button type="button" @click="handleClose" class="myshop-btn myshop-btn--outline">戻る</button>
            <button type="button" @click="handleSet" class="myshop-btn myshop-btn--primary">確認</button>
        </div>
    </div>
</template>

<script>
import { useFabric } from '@/store/simulator'

import InlineLoading from '../util/InlineLoading.vue'
import { useCartFabric } from '@/store/cart'

export default {
  components: { InlineLoading },
    name: 'FabricsSelect',
    props: {
        current: Object,
        page: String,
    },
    setup(props, context) {
        if (props.page == 'cart') return useCartFabric(context)
        return useFabric(context)
    }
}
</script>

<style scoped>
.option-choose {
    position: absolute;
    z-index: 5;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background-color: var(--primary);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 120px minmax(0, 1fr) 130px;
}
.option-choose__header {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding: var(--space-3) var(--space-4);
    color: rgba(255,255,255,.7);
    background-color: var(--bg-gray);
    border-bottom: 1px solid var(--border-color);
}
.option-choose__header h1 {
    color: rgba(255,255,255,.7);
    font-size: 2rem;
    font-weight: 900;
    margin: 0;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    font-family: var(--custom-font);
}
.search-form {
    display: flex;
    /* background-color: #f00; */
    width: 100%;
    position: relative;
}
.search-form input {
    flex: 1;
    height: 40px;
    background-color: transparent;
    border: none;
    outline: none;
    background-color: rgba(255,255,255,.1);
    padding: 0 var(--space-2);
    padding-left: 46px;
    color: rgba(255,255,255,1);
    border: 1px solid var(--border-color);
}
.search-form input:focus {
    border-color: rgba(255,255,255,.9);
}
.search-icon {
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: 1;
    pointer-events: none;
    /* background-color: #f009; */
    top: 50%;
    left: 15px;
    padding: 2px;
    transform: translateY(-50%);
}
.search-icon::before {
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    border: 1px solid #fff;
    border-radius: 50%;
}
.search-icon::after {
    content: '';
    display: block;
    position: absolute;
    width: 7px;
    height: 0;
    border-top: 1px solid #fff;
    transform: translate(11px, 0px) rotate(45deg);
}
.search-form button {
    padding: 0 var(--space-4);
    background-color: rgba(255,255,255,.8);
}
.option-choose__body {
    overflow: hidden;
}
.option-choose__footer {
    border-top: 1px solid var(--border-color);
    padding: var(--space-4);
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    gap: var(--space-4);
}


ul {
    width: 100%;
    margin: 0;
    padding: var(--space-0);
    list-style: none;
}
.loading {
    height: 100%;
}
.loading li {
    height: 100%;
}
.list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: var(--space-4);
    gap: var(--simu-gap);
}
.fabric_btn {
    width: 100%;
    min-height: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: flex-start;
    align-items: center;
    gap: var(--space-5);
    padding: var(--space-1) var(--space-4);
    border: none;
    transition: background-color .1s ease;
    background-color: var(--primary-light);
    text-align: left;
    --color: var(--gray-50);
}
.fabric_btn.selected {
    background-color: var(--secondary);
    --color: var(--bg-gray);
}
.fabric__price {
    color: var(--color);
    font-size: .9rem;
}
.fabric__name {
    text-transform: uppercase;
    color: var(--color);
    font-size: .9rem;
    font-weight: 600;
}
</style>