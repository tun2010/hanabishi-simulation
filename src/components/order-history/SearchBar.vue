<template>
    <div class="search-bar">
        <input type="text" />
        <button class="myshop-btn myshop-btn--secondary"></button>
    </div>
</template>

<script>

export default {
    name: 'SearchBar',
}
</script>

<style scoped>
.search-bar {
    width: 100%;
    max-width: 600px;
    display: flex;
    gap: 2px;
}
input {
    flex: 1;
    height: 42px;
    background-color: transparent;
    border: 1px solid var(--border-color);
}
</style>