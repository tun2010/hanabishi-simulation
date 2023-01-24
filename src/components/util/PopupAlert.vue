<template>
    <popup-template :show="show">
        <header>
            <h2>{{ message || 'アラート' }}</h2>
        </header>
        <footer>
            <button type="button" @click="onClose" class="myshop-btn myshop-btn--primary">戻る</button>
        </footer>
    </popup-template>
</template>

<script>
import PopupTemplate from './PopupTemplate.vue'

export default {
    name: 'PopupAlert',
    components: { PopupTemplate },
    props: {
        show: Boolean,
        title: String,
        message: String,
        onClose: Function,
    },
}
</script>

<style scoped>
header {
    min-height: 80px;
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    align-items: center;
    padding: 0 var(--space-4);
}
header::before {
    content: '\26A0';
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--secondary);
}
h2 {
    font-size: 1rem;
    margin: 0;
    padding: 0;
    /* font-family: var(--custom-font); */
}
footer {
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: var(--space-2) var(--space-4);
    background-color: var(--primary-light);
}
</style>