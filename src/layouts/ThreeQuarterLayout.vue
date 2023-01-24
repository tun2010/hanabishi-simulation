<template>
    <main id="main">
        <app-header />
        <section class="layout--body">
            <aside class="layout--aside">
                <slot name="aside" />
            </aside>
            <div class="layout--content">
                <slot name="content" />
            </div>
        </section>
    </main>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
    name: 'ThreeQuarterLayout',
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
.layout--aside {
    border-right: 1px solid var(--border-color);
}
.layout--body {
    display: grid;
    grid-template-columns: 1fr minmax(640px, 1fr);
    grid-template-rows: minmax(0, 1fr);
    align-items: stretch;
}
.layout--content {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
}
@media (orientation: portrait) {
    .layout--body {
        grid-template-columns: 1fr minmax(640px, 2fr);
    }
}
</style>