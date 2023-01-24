<template>
    <basic-layout>
        <div class="fabric-list" id="fabric-list">
            <layout-header center reverse>
                <template #small>生地リスト</template>
                <template #title>生地検索</template>
            </layout-header>
            <nav class="nav">
                <button class="myshop-btn myshop-btn--secondary" >検索条件を開く</button>
            </nav>
            <section class="content">
                <div class="max-content">
                    <!-- <ul class="selected-items">
                        <li v-for="item in selected" :key="item.key">
                            {{ getKayName(item.key) }}: {{ item.value }} 
                            <button class="btn-remove" @click="budgeRemove(item.key)"></button>
                        </li>
                    </ul>
                    <history-list /> -->
                </div>
            </section>
            <footer>

            </footer>
        </div>
        <template #other>
            <!-- <transition name="backdrop">
                <div class="backdrop backdrop--criteria" v-if="showCriteria" />
            </transition>
            <transition name="up">
                <search-criteria v-if="showCriteria" />
            </transition> -->
        </template>
    </basic-layout>
</template>

<script>

import BasicLayout from '@/layouts/BasicLayout.vue'
import LayoutHeader from '@/layouts/LayoutHeader.vue'
import HistoryList from '@/components/order-history/HistoryList.vue'
// import SearchCriteria from './SearchCriteria.vue'

export default {
    name: 'FabricsComponent',
    components: { 
        BasicLayout,
        LayoutHeader, 
        HistoryList,
    },
}
</script>

<style scoped>
.fabric-list {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 130px auto minmax(0, 1fr) 80px;
    align-items: stretch;
    background-color: var(--bg-gray);
    min-height: 100%;
    --max-width: 960px;
}
.nav {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    z-index: 5;
    top: 0;
    left: 0; 
    padding: var(--space-2) var(--space-4);
    gap: var(--space-3);
    /* background-color: var(--bg-gray); */
 	background-image: radial-gradient(transparent 2px, var(--bg-gray) 2px);
  	background-size: 4px 4px;
  	backdrop-filter: brightness(100%) blur(3px);
}
.content {
    background-color: var(--primary);
    /* background-color: var(--bg-gray); */
}
.max-content {
    width: 100%;
    max-width: var(--max-width);
    min-height: 100%;
    margin: 0 auto;
 	/* background-image: radial-gradient(transparent 2px, var(--bg-gray) 2px);
  	background-size: 4px 4px; */
}
@media (min-width: 900px) {
    .max-content {
        border-left: 1px solid var(--border-color);
        border-right: 1px solid var(--border-color);
    }
}
.selected-items {
    flex: 1;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: var(--space-4);
    gap: var(--space-2);
}
li {
    padding: 4px var(--space-2);
    border: 1px solid var(--border-color);
    font-size: .8rem;
    color: var(--gray-100);
    border-radius: 0;
    display: flex;
    align-items: center;
    gap: var(--space-1);
    background-color: rgba(255,255,255,.05);
}
.btn-remove {
    color: var(--danger);
    display: block;
    width: 1rem;
    min-width: 1rem;
    height: 1rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}
.btn-remove::before,
.btn-remove::after {
    content: '';
    display: block;
    width: 15px;
    height: 0;
    position: absolute;
    border-top: 2px solid var(--danger);
}
.btn-remove::before {
    transform: rotate(45deg);
}
.btn-remove::after {
    transform: rotate(-45deg);
}
.temp {
    height: 2000px;
}
.backdrop--criteria {
    z-index: 5;
    position: fixed;
    top: 60px; bottom: 0;
    left: 0; right: 0;
    background-color: rgba(0,0,0,.6);
    /* background-image: radial-gradient(transparent 2px, var(--bg-gray) 2px);
    background-size: 4px 4px; */
}
footer {
    border-top: 1px solid var(--border-color);
    background-color: var(--primary);
}
</style>