<template>
    <ul class="segmented-control">
        <li v-for="segment in list" :key="segment.value">
            <button type="button" 
                class="segment-btn" 
                :class="{'segment-btn--active': segment.value == modelValue}"
                @click="updateValue(segment.value)">
                {{segment.name}}
            </button>
        </li>
    </ul>
</template>

<script>
// import { toRefs } from 'vue'

export default {
    name: 'SegemntedControl',
    props: ['list', 'modelValue'],
    setup(props, context) {
        const updateValue = (value) => {
            context.emit('update:modelValue', value);
        }

        return { updateValue }
    },
}
</script>

<style scoped>
.segmented-control {
    --border-color: rgba(255,255,255,.8);
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    border: 1px solid var(--border-color);
    padding: 2px;
}
.segmented-control li {
    flex: 1;
    padding: 0;
}
.segment-btn {
    padding: 0 var(--space-2);
    min-width: 150px;
    height: 32px;
    color: rgba(255,255,255,.9);
    text-transform: uppercase;
    padding-top: 1px;
    letter-spacing: 1px;
    font-family: var(--custom-font);
}
.segment-btn--active {
    background-color: var(--border-color);
    color: var(--primary);
    font-weight: 600;
}
</style>