<template>
    <popup-template :show="show" :model="true">
        <section>
            <h2>商品コードを入力してください</h2>
            <form @submit.prevent="onSumit">
                <div class="myshop-form-group">
                    <label>商品コードを</label>
                    <input ref="inputEl" type="text" maxlength="16" v-model="code">
                    <button v-if="code" type="button" @click="onClear" class="clear-btn"></button>
                    <button type="sumit" style="height: 50px" class="myshop-btn myshop-btn--secondary">決定する</button>
                </div>
            </form>
        </section>
        <footer>
            <button type="button" @click="onCancel" class="myshop-btn myshop-btn--outline">戻る</button>
        </footer>
    </popup-template>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

import PopupTemplate from '@/components/util/PopupTemplate.vue'

export default {
    name: 'ProductCodeModel',
    components: { PopupTemplate },
    props: {
        show: Boolean,
    },
    emits: ["enter", "cancel"],
    setup(props, context) {
        const code = ref('')
        const inputEl = ref(null)

        function onSumit() {
            context.emit('enter', code.value)
        }
        function onClear() {
            code.value = ''
            inputEl.value.focus()
        }
        function onCancel() {
            context.emit('cancel')
        }

        watch(
            () => props.show, 
            show => { 
                if (show) {
                    setTimeout(() => {
                        inputEl.value?.focus()
                    }, 0)
                } else code.value = '' 
            }
        )

        return {
            code,
            inputEl,

            onSumit,
            onClear,
            onCancel,
        }
    }
}
</script>

<style scoped>
section {
    min-height: 80px;
    padding: var(--space-5) var(--space-4) var(--space-4);
}
h2 {
    font-size: 1rem;
    margin: 0;
    padding: 0;
    margin-bottom: var(--space-2);
    color: var(--gray-50);
}
footer {
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-4);
    background-color: var(--primary-light);
}
.myshop-form-group {
    flex-direction: row;
    gap: 2px;
    position: relative;
}
.clear-btn {
    width: 50px;
    height: 50px;
    position: absolute;
    bottom: 0;
    right: 142px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.clear-btn::before,
.clear-btn::after {
    content: '';
    display: block;
    width: 20px;
    height: 0;
    position: absolute;
    border-top: 1px solid var(--danger);
}
.clear-btn::before {
    transform: rotate(45deg);
}
.clear-btn::after {
    transform: rotate(-45deg);
}
.myshop-form-group input {
    /* padding-left: 42px; */
    padding-right: 50px;
}
.myshop-btn--secondary {
    min-width: 140px;
}

</style>