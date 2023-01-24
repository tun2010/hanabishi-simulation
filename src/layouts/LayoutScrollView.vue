<template>
    <section :id="id" class="layout--scroll" :class="[scroll, theme]">
        <slot />
    </section>
</template>

<script>
export default {
    name: 'LayoutScroll',
    props: {
        id: {
          type: String,
          default: '',
        },
        scroll: String,
        theme: String,
    }
}
</script>

<style scoped>
.layout--scroll {
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
}
.layout--scroll::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.layout--scroll::-webkit-scrollbar-track {
  background-color: var(--primary);
}
.layout--scroll::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
}
.layout--scroll.y {
  overflow-y: auto;
}
.layout--scroll.x {
  overflow-x: auto;
}
.layout--scroll.light {
  background-color: var(--primary-light);
}
.layout--scroll.relative {
  position: relative;
}
</style>