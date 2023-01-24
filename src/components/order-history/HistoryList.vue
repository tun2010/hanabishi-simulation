<template>
    <ul>
        <li class="header" v-if="histories.length">
            <div class="row title">アイテム</div>
            <div class="row">受注日</div>
            <div class="row">店舗到着日</div>
            <div class="row">ステータス</div>
            <div class="row">お客様名</div>
        </li>
        <li v-if="busy">
            <inline-loading />
        </li>
        <template v-else>
            <li v-for="item in histories" :key="item">
                <history-item />
            </li>
        </template>
    </ul>
</template>

<script>
import { useHistoryList } from '@/store/history'
import HistoryItem from './HistoryItem.vue'
import InlineLoading from '../util/InlineLoading.vue'
export default {
    components: { 
        HistoryItem,
        InlineLoading,
    },
    name: 'HistoryList',
    setup() {
        return useHistoryList()
    }
}
</script>

<style scoped>
ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-0) var(--space-4) var(--space-4);
}
li {
    display: block;
}
.header {
    display: grid;
    grid-template-columns: minmax(200px, 4fr) 1fr 1fr 1fr 1fr;
    border-bottom: 1px solid var(--border-color);
    gap: var(--space-2);
    padding: var(--space-1) var(--space-2);
}
.row {
    color: var(--gray-100);
    font-size: .8rem;
    font-weight: 600;
    text-align: center;
}
.title {
    text-align: left;
    padding-left: 152px;
}
</style>