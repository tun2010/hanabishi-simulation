<template>
    <header class="layout--header" :class="{'reverse': reverse, 'center': center}">
        <small class="layout--small">
            <slot name="small"></slot>
        </small>
        <h1 class="layout--title" :class="{large: largeTitle}">
            <slot name="title"></slot>
        </h1>
    </header>
</template>

<script>
export default {
    name: 'LayoutHeader',
    props: {
        largeTitle: Boolean,
        reverse: Boolean,
        center: Boolean,
    }
}
</script>

<style scoped>
.layout--header {
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding: var(--space-3) var(--space-4);
    background-color: var(--bg-gray);
    border-bottom: 1px solid var(--border-color);
}
.layout--header.reverse {
    flex-direction: column-reverse;
    justify-content: flex-start;
}
.layout--title {
    color: var(--gray-300);
    font-size: 2rem;
    font-weight: 900;
    margin: 0;
    margin-top: var(--space-0);
    font-family: var(--custom-font);
}
.layout--header.reverse .layout--title {
    font-size: 1.8rem;
}
.layout--title.large {
    font-size: 2.2rem;
    text-transform: uppercase;
}
.layout--small {
    color: var(--gray-200);
    font-size: .8rem;
}
.center {
    text-align: center;
    align-items: center;
    border: none;
}
.center * {
    text-align: center;
}
</style>