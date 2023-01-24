<template>
    <main id="main">
        <app-header />
        <section class="layout--body">
            <div class="layout--header">
                <slot name="header" />
            </div>
            <div class="layout--content">
                <layout-scroll-view>
                    <slot name="content" />
                </layout-scroll-view>
            </div>
            <div class="layout--aside">
                <slot name="aside" />
            </div>
        </section>
    </main>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import LayoutScrollView from './LayoutScrollView.vue'

export default {
    name: 'CartPageLayout',
    props: {
        title: String,
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
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 120px minmax(0, 1fr);
    grid-template-areas: 
        "header"
        "content"
    ;
    background-color: var(--bg-gray);
}
.layout--header {
    grid-area: header;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
}
.layout--content {
    grid-area: content;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
}
.layout--aside {
    grid-area: aside;
    display: none;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
}
@media (orientation: landscape) {
    .layout--body {
        grid-template-columns: 2fr minmax(380px, 1fr);
        grid-template-rows: 120px minmax(0, 1fr);
        grid-template-areas: 
            "content header"
            "content aside"
        ;
    }
    .layout--content,
    .layout--footer {
        border-right: 1px solid var(--border-color);
    }
    .layout--aside {
        display: grid;
        background-color: var(--primary);
    }
}
</style>
