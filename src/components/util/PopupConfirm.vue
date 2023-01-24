<template>
    <popup-template :show="show">
        <header>
            <h2>{{ message || 'アラート' }}</h2>
        </header>
        <footer>
            <button type="button" @click="onCancel" class="myshop-btn myshop-btn--outline">戻る</button>
            <button type="button" @click="onConfirm" class="myshop-btn myshop-btn--primary">OK</button>
        </footer>
    </popup-template>
</template>

<script>
import PopupTemplate from './PopupTemplate.vue'

export default {
    name: 'PopupConfirm',
    components: { PopupTemplate },
    props: {
        show: Boolean,
        title: String,
        message: String,
        onCancel: Function,
        onConfirm: Function,
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
p {
    margin: 0;
    padding: 0 var(--space-4) var(--space-1);
    font-size: .9rem;
}
footer {
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-4);
    background-color: var(--primary-light);
}
footer button {
    flex: 1;
    min-width: 0;
}

</style>