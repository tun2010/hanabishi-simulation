<template>
    <section :class="{relative: relative}">
        <slot />
    </section>
</template>

<script>
export default {
    name: 'LayoutMainBody',
    props: {
        relative: Boolean,
    }
}
</script>

<style scoped>
section {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 120px minmax(0, 1fr) 130px;
}
section.relative {
    position: relative;
}
</style>