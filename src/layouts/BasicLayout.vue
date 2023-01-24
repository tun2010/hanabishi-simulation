<template>
    <main id="main">
        <app-header />
        <section class="layout--body">
            <layout-scroll-view :id="id" scroll="y">
                <slot />
            </layout-scroll-view>
        </section>
        <slot name="other" />
    </main>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'

export default {
    name: 'BasicLayout',
    props: {
        id: {
            type: String,
            default: '',
        }
    },
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
</style>
