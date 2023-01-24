<template>
    <section class="simulation">
        <div class="object">
            <div class="media-object"></div>
        </div>
        <footer>
            <router-link to="/items" class="myshop-btn myshop-btn--outline">戻る</router-link>
            <router-link to="/cart" class="myshop-btn myshop-btn--secondary">お会計</router-link>
        </footer>
    </section>
</template>

<script>
export default {
    name: 'MainSimulation',
}
</script>

<style scoped>
.simulation {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) 80px;
}
.object {
    padding: var(--space-4);
    display: flex;
    justify-content: center;
    align-items: center;
}
.media-object {
    width: 100%;
    height: 100%;
    max-width: 480px;
    background-color: #f001;
}
footer {
    width: 100%;
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-4);
    padding: 0 var(--space-4);
}
</style>