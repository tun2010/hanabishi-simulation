<template>
    <footer class="layout--footer" :class="theme">
        <slot />
    </footer>
</template>

<script>
export default {
    name: 'LayoutFooter',
    props: {
        theme: String,
    }
}
</script>

<style scoped>
.layout--footer {
    border-top: 1px solid var(--border-color);
    padding: var(--space-4);
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    gap: var(--space-4);
}
.layout--footer.align-center {
    align-items: center;
}
</style>