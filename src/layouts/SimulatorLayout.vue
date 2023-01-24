<template>
    <main id="main">
        <app-header />
        <section class="layout--body">
            <article class="layout--start">
                <slot name="start" />
            </article>
            <article class="layout--end">
                <slot name="end" />
            </article>
        </section>
    </main>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
    name: 'SimulatorLayout',
    components: {
        AppHeader,
    }
}
</script>

<style scoped>
#main {
    background-color: var(--primary);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60px minmax(0, 1fr);
}
.layout--body {
    display: grid;
    grid-template-columns: minmax(600px, 1fr) minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    align-items: stretch;
}
.layout--start {
    display: grid;
    grid-template-columns:  minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    position: static;
    z-index: 2;
    border-right: 1px solid var(--border-color);
}
.layout--end {
    display: grid;
    grid-template-columns:  minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    position: relative;
    z-index: 0;
}
@media (orientation: portrait) and (max-width: 1280px) {
    .layout--body {
        grid-template-columns: minmax(620px, 2fr) minmax(0, 1fr);
    }
}
</style>
