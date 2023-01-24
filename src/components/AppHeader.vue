<template>
    <header id="header">
        <div class="logo">
            <img src="https://hanabishi.coremobile.co.jp/html/user_data/assets/img/logo.png" alt="Logo" />
        </div>
        <div class="user-data">
            <span v-if="staffCode">社員番号: {{ staffCode }} さま</span>
        </div>
        <button @click="handleToggle" :class="{close: toggle}"></button>
    </header>
    <app-menu :toggle="toggle" />
</template>

<script>
import { ref } from '@vue/reactivity'
import AppMenu from './AppMenu.vue'

import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store'

export default {
  components: { AppMenu },
    name: 'AppHeader',
    setup() {
        const toggle = ref(false)
        const appStore = useAppStore()
        const { staffCode } = storeToRefs(appStore)

        function handleToggle() {
            toggle.value = !toggle.value
        }

        return {
            toggle,
            staffCode,

            handleToggle,
        }
    },
}
</script>

<style scoped>
#header {
    width: 100%;
    display: grid;
    grid-template-columns: 200px minmax(0, 1fr) 200px;
    justify-content: space-between;
    align-items: center;
    background-color: var(--primary);
    padding: 0 var(--space-4);
    border-bottom: 1px solid var(--border-color);
}
.logo {
    width: 200px;
    transform: translateY(3px);
}
button {
    justify-self: flex-end;
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
}
button::before,
button::after {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background-color: #fff;
    transition: transform .4s ease-out;
}
.user-data {
    text-align: center;
    color: rgba(255,255,255,.9);
    font-size: .8rem;
}
.close::before {
    transform: translateY(4px) rotate(-135deg);
}
.close::after {
    transform: translateY(-5px) rotate(135deg);
}
</style>