<template>
    <ul>
        <li v-for="item in [1,2,3,4,5,6]" :key="item">
            <history-item />
        </li>
    </ul>
</template>

<script>
import HistoryItem from './HistoryItem.vue'
export default {
    components: { 
        HistoryItem,
    },
    name: 'HistoryList',
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
    padding: var(--space-4);
}
li {
    display: block;
}
</style>