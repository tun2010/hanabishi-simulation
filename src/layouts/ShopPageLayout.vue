<template>
    <main id="main">
        <app-header />
        <section class="layout--body">
            <aside class="layout--start"></aside>
            <section class="layout--content">
                <layout-scroll-view scroll="y">
                    <slot />
                </layout-scroll-view>
            </section>
            <aside class="layout--end">
                <slot name="end" />
            </aside>
        </section>
    </main>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import LayoutScrollView from './LayoutScrollView.vue'

export default {
    name: 'CartPageLayout',
    components: {
        AppHeader,
        LayoutScrollView,
    }
}
</script>

<style scoped>
#main {
    background-color: var(--primary);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 60px minmax(0, 1fr);
}
.layout--body {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    align-items: stretch;
}
.layout--content {
    /* border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color); */
    position: relative;
    background-image: linear-gradient(to bottom, var(--bg-gray) 50%, var(--primary) 50%);
}
.layout--start,
.layout--end {
    display: none;
}
/* @media (orientation: landscape) {
    .layout--body {
        grid-template-columns: minmax(0, .4fr) minmax(720px, 2fr) minmax(0, .4fr);
    }
    .layout--start,
    .layout--end {
        display: block;
    }
} */
</style>
