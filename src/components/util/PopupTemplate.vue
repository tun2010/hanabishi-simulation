<template>
    <transition name="backdrop">
        <div class="backdrop" v-if="show" />
    </transition>
    <transition name="popup">
        <div class="popup-template" v-if="show">
            <div class="popup" :class="{model: model}">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'PopupTemplate',
    props: {
        show: Boolean,
        model: Boolean,
    },
}
</script>

<style scoped>
.popup-template {
    position: fixed;
    z-index: 999;
    top: 0; bottom: 0;
    left: 0; right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: var(--space-6);
}
.backdrop {
    position: fixed;
    z-index: 999;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background-color: rgba(0,0,0,.6);

}
.popup {
    width: calc(100% - var(--space-5));
    max-width: 420px;
    background-color: var(--primary);
    border: 1px solid var(--border-color);
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    color: var(--c-light);
    padding: 0;
    position: relative;
}
.popup.model {
    max-width: 520px;
}
button {
    position: absolute;
    top: 0; 
    right: 0;
    width: 42px;
    height: 42px;

    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
}
button::before,
button::after {
    content: '';
    display: block;
    width: 1.3rem;
    height: 0;
    border-top: 1px solid var(--border-color);
    position: absolute;
}
button::before {
    transform: rotate(45deg);
}
button::after {
    transform: rotate(-45deg);
}
</style>