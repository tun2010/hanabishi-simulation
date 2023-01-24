<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
  <popup-alert 
    :show="!!alert" 
    :title="alert?.title" 
    :message="alert?.message" 
    :onClose="alert?.onClose"
  />
  <popup-confirm 
    :show="!!confirm"
    :title="confirm?.title" 
    :message="confirm?.message"
    :onConfirm="confirm?.onConfirm"
    :onCancel="confirm?.onCancel"
  />
</template>

<script>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'

import PopupAlert from '@/components/util/PopupAlert.vue'
import PopupConfirm from '@/components/util/PopupConfirm.vue'
import { onMounted, ref, watch } from '@vue/runtime-core'

export default {
  components: {
    PopupAlert,
    PopupConfirm,
  },
  setup() {
    const appStore = useAppStore()
    const { alert, confirm, appCustomer } = storeToRefs(appStore)
    const { getInitinalData } = appStore
    const router = useRouter()
    const route = useRoute()
    const mounted = ref(false)

    const redirectToCustomerPage = (routeName, id) => {
      if (
        routeName != 'customer'
        && routeName != 'customer-create'
        && routeName != 'guest-create'
        && !appCustomer.value
      ) {
        console.log('REDIRECT_FROM_', id)
        // router.replace('/')
      }
    }

    onMounted(async () => {
      await getInitinalData()
      mounted.value = true
      redirectToCustomerPage(route.name, 1)
    })

    watch(
      () => route.name,
      async routeName => {
        if (mounted.value) redirectToCustomerPage(routeName, 2)
      }
    )

    return {
      alert,
      confirm,
    }
  }
}

</script>

<style>
@font-face {
  font-family: 'fontello';
  src: url('https://hanabishi.coremobile.co.jp/html/user_data/assets/fonts/fontello.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'design_plus';
  src: url('https://hanabishi.coremobile.co.jp/html/user_data/assets/fonts/design_plus.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}
:root {

  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;

  --c-light: #fff;
  --c-dark: #000;

  --space-0: 4px;
  --space-1: 8px;
  --space-2: 12px;
  --space-3: 16px;
  --space-4: 24px;
  --space-5: 32px;
  --space-6: 48px;

  --border-color: rgba(255,255,255,.4);

  --header-height: 70px;

  /* --primary: hsl(221, 45%, 26%); */
  --primary: hsl(221, 30%, 30%);
  --primary-card: hsl(221, 30%, 35%);
  --primary-light: hsl(221, 30%, 38%);
  --primary-lighter: hsl(221, 25%, 50%);
  --primary-dark: hsl(221, 40%, 25%);
  /* --secondary: hsl(37, 87%, 53%); */
  --secondary: hsl(37, 75%, 75%);
  --secondary-light: hsl(37, 75%, 80%);
  --secondary-lighter: hsl(35, 75%, 90%);
  --secondary-dark: hsl(37, 85%, 50%);
  --secondary-darker: hsl(37, 87%, 53%);
  --danger: hsl(6, 75%, 75%);

  --bg-gray: hsl(0, 0%, 25%);
  --bg-gray-light: hsl(0, 0%, 30%);
  --simu-gap: var(--space-0);
  --simu-bg: rgba(0,0,0,.4);


  --c: #282828;
  --pg: #a6bef2;

  --font-family: "Yu Gothic", "游ゴシック", YuGothic, "游ゴシック体", "ヒラギノ角ゴ Pro W3", "メイリオ", sans-serif;
  /* --custom-font: "GFS Didot", serif; */

  /* accent-color: var(--primary); */
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  font-family: var(--font-family);
  background-color: var(--primary);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

#app,
#main {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#main {
  will-change: opacity;
}

img {
  max-width: 100%;
}

button {
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  font-size: .8rem;
  margin: 0;
}
button:disabled {
  opacity: .5;
  pointer-events: none;
}

input,
textarea,
select {
  font-size: .9rem;
  -webkit-appearance: none;
  border-radius: 0;
  caret-color: var(--secondary);
}
input:read-only {
  opacity: .4;
  pointer-events: none;
}

.spacer {
  flex: 1;
}

.scroll-view {
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
}
.scroll-view::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.scroll-view::-webkit-scrollbar-track {
  background-color: var(--primary);
}
.scroll-view::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
}
.scroll-view--y {
  overflow-y: auto;
}

/* we will explain what these classes do next! */
#app {
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  position: absolute;
  top: 0; left: 0;
  opacity: 1;
  z-index: 1;
  transition: opacity 1.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  position: absolute;
  top: 0; left: 0;
  opacity: 0;
  z-index: 0;
  transition: opacity 1.2s ease;
}

.right-enter-active,
.right-leave-active {
  position: absolute;
  transform: translateX(0);
  opacity: 1;
  transition: all .4s ease-out;
}
.right-enter-from,
.right-leave-to {
  position: absolute;
  opacity: 1;
  transform: translateX(100%);
  transition: all .25s ease-in;
}

.left-enter-active,
.left-leave-active {
  position: absolute;
  transform: translateX(0);
  opacity: 1;
  transition: all .4s ease-out;
}
.left-enter-from,
.left-leave-to {
  position: absolute;
  opacity: 1;
  transform: translateX(-100%);
  transition: all .3s ease;
}

.down-enter-active,
.down-leave-active {
  position: absolute;
  top: 0; bottom: 0;
  left: 0; right: 0;
  z-index: 0;
  transform: translateY(0) scale(1);
  opacity: 1;
  transition: all .3s ease-out;
}
.down-enter-from,
.down-leave-to {
  position: absolute;
  top: 0; bottom: 0;
  left: 0; right: 0;
  z-index: 0;
  opacity: 1;
  transform: translateY(80px) scale(.9);
  transition: all .25s ease-in;
}

.up-enter-active,
.up-leave-active {
  position: absolute;
  top: 0; bottom: 0;
  left: 0; right: 0;
  z-index: 1;
  transform: translateY(0);
  opacity: 1;
  transition: all .4s ease-out;

}
.up-enter-from,
.up-leave-to {
  position: absolute;
  top: 0; bottom: 0;
  left: 0; right: 0;
  z-index: 1;
  opacity: 1;
  transform: translateY(100%);
  transition: all .3s ease;
}

.backdrop-enter-active,
.backdrop-leave-active {
    opacity: 1;
    transition: all .5s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
    opacity: 0;
    transition: all .3s ease;
}
.popup-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: all .4s ease;
}
.popup-enter-from {
    opacity: 0;
    transform: translateY(120px);
    transition: transform .4s ease, opacity .3s ease;
}
.popup-leave-active {
    opacity: 1;
    transform: scale(1);
    transition: all .6s cubic-bezier(.5,-.5,.1,1.5);
}
.popup-leave-to {
    opacity: 0;
    transform: scale(.7);
    transition: all .6s cubic-bezier(.5,-.5,.1,1.5);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}


.small--active {
  padding: 4px;
  background-color: var(--primary);
}


.myshop-btn {
  min-width: 200px;
  height: 42px;
  padding: 0 var(--space-2);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0 var(--space-2);
  color: rgba(255,255,255,.9);
  font-size: .8rem;
  font-weight: 600;
  transition: all .3s ease;
  text-decoration: none !important;
}
.myshop-btn.arrow-end::after {
  content: '\2192';
  font-size: 1.8rem;
}
.myshop-btn.arrow-start::before {
  content: '\2190';
  font-size: 1.8rem;
}
.myshop-btn.animate {
    animation-name: Itention;
    animation-duration: 1s;
    animation-iteration-count: 3;
    animation-timing-function: ease-in;
}
.myshop-btn--primary {
  background-color: rgba(30,30,30,1);
}
.myshop-btn--secondary {
  background-color: var(--secondary);
  color: rgba(30,30,30,1);
}
.myshop-btn--light {
  background-color: rgba(255,255,255,.7);
  color: rgba(30,30,30,1);
}
.myshop-btn--full {
  width: 100%;
}
.myshop-btn--outline {
  border: 1px solid rgba(255,255,255,.6);
}
.myshop-btn--primary:hover {
  background-color: rgba(30,30,30,.6);
}
.myshop-btn--outline:hover {
  background-color: rgba(255,255,255,.1);
}
.myshop-btn--secondary:hover {
  background-color: var(--secondary-light);
}
.myshop-btn--outline-gray {
  border: 1px solid rgb(100,100,100);
  color: var(--gray-800);
}

form {
  --background: rgba(255,255,255,.05);
  --border: rgba(255,255,255,.4);
  --color: rgba(255,255,255,1);
}
.myshop-form-group {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
}
.myshop-form-group--choose {
  position: relative;
  padding-left: var(--space-1);
}
.myshop-form-group--choose > .float-label,
.myshop-form-group > label {
  position: absolute;
  top: 7px;
  left: var(--space-2);
  pointer-events: none;
  color: var(--gray-200);
  font-size: .7rem;
}
.radio-group label {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  color: var(--gray-200);
  top: 0;
}
.required {
  color: var(--danger);
}
.error-msg {
  display: block;
  font-size: .8rem;
  color: var(--danger);
}
.myshop-form-group input,
.myshop-form-group select {
  border: 1px solid var(--border);
  color: var(--color);
  padding: var(--space-3) var(--space-2) 0;
  height: 50px;
  background-color: var(--background);
  width: 100%;
  outline: none;
  transition: all .3s ease;
}
.myshop-form-group--select::after {
  content: '';
  display: block;
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 10px;
  height: 10px;
  border-right: 1px solid rgba(0,0,0,1);
  border-bottom: 1px solid rgba(0,0,0,1);
  transform: rotate(45deg);
}
.myshop-form-group--choose .radio-group {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px var(--space-6);
  padding: 24px 0 6px;
}
.myshop-form-group--choose input[type=radio] {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,.9);
  border-radius: 100%;
}
.myshop-form-group--choose input[type=radio]:checked {
  background-color: #3498db;
  border-color: rgba(255,255,255,1);
  box-shadow: inset 0 0 0 2px rgba(255,255,255,1), 0 0 0 1px rgba(255,255,255,1);
}
.myshop-form-group input.error {
  border-color: var(--danger);
  background-color: rgba(226,122,110,.1);
}
.myshop-form-group input::placeholder {
  color: rgba(255,255,255,.6);
}
.myshop-form-group input:focus,
.myshop-form-group input:hover {
  border-color: rgba(255,255,255,.05);
  border-color: rgba(255,255,255,.9);
}
.myshop-form-group--choose input[type=radio] {
  width: 24px;
  height: 24px;
  margin: 0;
}
input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active {
    border-color: rgba(255, 255, 255, .05);
    border-color: rgba(255, 255, 255, .9);
    background-color: var(--background);
    -webkit-box-shadow: 0 0 0px 1000px var(--primary) inset;
    -webkit-text-fill-color: #fff;
}

@keyframes Itention {
  form, to {
    box-shadow: 0 0 0 0 var(--secondary);
  }
  50% {
    box-shadow: 0 0 2px 1px rgba(255,255,255,1), 
      0 0 2px 5px var(--primary),
      0 0 2px 6px rgba(255,255,255,1);
  }
}


.Page,
.PaginationControl,
.DotsHolder {
    width: 42px;
    height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--gray-200);
    background-color: var(--primary-light)!important;
}
.Page {
  font-weight: 600;
}
.Page.Page-active {
  color: rgb(30,30,30);
  background-color: var(--secondary)!important;
}
.PaginationControl {
  padding: 0 8px;
}
.DotsHolder {
  padding: 0 12px;
  background-color: transparent!important;
}
.Control path {
  fill: var(--gray-200);
}
.Dots path {
  fill: var(--gray-300);
}


.app-toast-group {
    position: fixed;
    z-index: 9999;
    left: 0; right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: var(--space-1);
    padding: var(--space-4);

    /* optimizations */
    pointer-events: none;
}

.app-toast {
    width: 100%;
    max-width: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--bg-gray);
    border: 1px solid rgba(255,255,255,.2);
    padding: var(--space-2) var(--space-5);
    color: rgba(255,255,255,1);
    color: var(--secondary);
    text-align: center;
    backdrop-filter: blur(5px);
    font-size: .9rem;

    will-change: transform;
    animation: 
        fade-in .4s ease,
        slide-in .4s ease,
        fade-out .4s ease 3s;
}

@keyframes fade-in {
  from { opacity: 0 }
}

@keyframes fade-out {
  to { opacity: 0 }
}

@keyframes slide-in {
  from { transform: translateY(5vh) }
}
</style>
