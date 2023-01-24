<template>
    <div class="sizes">
        <div class="tabel">
            <div class="input-group" v-for="size in sizes" :key="size.key">
                <label>{{ size.name }}</label>
                <input type="number" 
                    v-model="size.value" 
                    @input="handleSizeChange($event, size)" 
                    :class="{error: isError(size.value)}"
                >
                <div class="unit">cm</div>
            </div>
        </div>
    </div>
</template>

<script>
import { generateMessage } from '@/helpers/util'
import { messages } from "@/helpers/messages"

export default {
    name: 'SizesInputs',
    props: {
        sizes: Array,
        summited: Boolean,
    },
    emits: ["change"],
    setup(props, context) {
        function handleSizeChange(event, size) {
            context.emit('change', event.target, size)
        }
        function isError(value) {
            const [ key ] = [ 'ユーザーID' ]
            if (!props.summited) return ''
            if (!value) return generateMessage(messages.required, [ key ])
            if (!/^[0-9]{1,3}$/.test(value)) return generateMessage(messages.invalid, [ key ])
        }
        return {
            handleSizeChange,
            isError,
        }
    } 
}
</script>

<style scoped>
.sizes {
    padding: var(--space-4);
}
.tabel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-right: none;
}
.input-group {
    height: 50px;
    border-bottom: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);

    display: grid;
    grid-template-columns: 100px 1fr 40px;
    justify-content: flex-start;
    align-items: stretch;
    gap: var(--space-2);
}
.input-group:first-child,
.input-group:nth-child(2) {
    border-top: 1px solid var(--border-color);
}
.input-group:nth-child(odd) {
    border-left: 1px solid var(--border-color);
}
label {
    border-right: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 var(--space-2);
    color: rgba(255,255,255,.9);
}
input {
    min-width: 0;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 0;
    color: rgba(255,255,255,1);
    margin: var(--space-1) 0;
}
input:focus {
    border-bottom: 1px solid rgba(255,255,255,.9);
    /* background-color: rgba(255,255,255,.05); */
}
input.error {
    border-bottom: 1px solid var(--danger);
}
.unit {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
    color: rgba(255,255,255,.9);
}
</style>