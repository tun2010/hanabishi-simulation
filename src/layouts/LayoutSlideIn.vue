<template>
    <section :class="`layout--slide-in ${theme}`">
        <layout-main-body>
            <slot/>
        </layout-main-body>
    </section>
</template>

<script>
import LayoutMainBody from './LayoutMainBody.vue'
export default {
    name: 'LayoutSlidIn',
    props: {
        theme: String,
    },
    components: { LayoutMainBody }
}
</script>


<style scoped>
.layout--slide-in {
    position: absolute;
    z-index: 5;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background-color: var(--primary);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
}
.layout--slide-in.gray {
    background-color: var(--bg-gray);
}
</style>