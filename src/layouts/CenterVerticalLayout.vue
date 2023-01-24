<template>
    <main id="main">
        <app-header />
        <section class="layout--body">
            <aside class="layout--start">
                <slot name="aside" />
            </aside>
            <form class="layout--content" v-if="withForm" @submit.prevent="handleSumit">
                <slot name="content" />
                <footer class="layout--footer">
                    <slot name="footer" />
                </footer>
            </form>
            <section class="layout--content" v-else>
                <slot name="content" />
                <footer class="layout--footer">
                    <slot name="footer" />
                </footer>
            </section>
            <aside class="layout--end">
                <h1><slot name="title" /></h1>
                <small><slot name="small" /></small>
            </aside>
        </section>
        <slot name="other" />
    </main>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'

export default {
    name: 'CenterVerticalLayout',
    components: {
        AppHeader,
    },
    props: {
        withForm: Boolean,
    },
    setup(props, context) {
        function handleSumit(event) {
            context.emit('custom-sumit', event)
        }
        return {
            handleSumit
        }
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
    grid-template-columns: .5fr minmax(720px, 2fr) .5fr;
    grid-template-rows: minmax(0, 1fr);
    align-items: stretch;
}
.layout--content {
    border-left: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) 90px;
    position: relative;
}
.layout--end {
    padding: var(--space-4) var(--space-3);
    background-color: var(--bg-gray);
    writing-mode: vertical-lr;
}
.layout--end h1 {
    color: var(--gray-300);
    font-size: 2rem;
    letter-spacing: 4px;
    font-weight: 900;
    margin: 0;
    padding-top: 2px;
    padding-right: var(--space-1);
    font-family: var(--custom-font);
}
.layout--end small {
    color: var(--gray-200);
    padding-top: 3px;
}
.layout--footer {
    border-top: 1px solid var(--border-color);
    padding: 0 var(--space-4);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--space-4);
}
@media (orientation: portrait) {
    .layout--body {
        grid-template-columns: 1fr 150px;
    }
    .layout--start {
        display: none;
    }
    .layout--content {
        border-left: none;
        grid-template-rows: minmax(0, 1fr) 130px;
    }
    .layout--footer {
        align-items: flex-start;
        padding: var(--space-4);
    }
}
</style>