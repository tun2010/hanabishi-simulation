<template>
    <div class="reorder-menu" :class="{open: toggle}">
        <div class="layer" @click="closeToggle"></div>
        <ul>
            <li>
                <router-link :to="gender ? `/items?reset=true` : `/order`" class="myshop-btn myshop-btn--light">新規注文</router-link>
            </li>
            <li>
                <router-link :to="`/products?reset=true`" class="myshop-btn myshop-btn--light">洋服購入</router-link>
            </li>
        </ul>
        <button class="myshop-btn myshop-btn--outline toggle-btn" @click="openToggle">オーダー追加</button>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    name: 'ReorderMenu',
    props: {
        gender: Number
    },
    setup() {
        const toggle = ref(false)

        function openToggle() {
            toggle.value = true
        }
        function closeToggle() {
            toggle.value = false
        }

        return {
            toggle,

            openToggle,
            closeToggle,
        }
    }
}
</script>

<style scoped>
.reorder-menu {
    position: relative;
}
.toggle-btn::after {
    content: '';
    display: block;
    width: 0; 
    height: 0; 
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    
    border-bottom: 6px solid rgba(255,255,255,.7);
}
.layer {
    position: fixed;
    z-index: 4;
    top: 0; bottom: 0;
    left: 0; right: 0;
    pointer-events: none;
}
ul {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    z-index: 5;
    left: 0; right: 0;
    bottom: 43px;
    background-color: rgb(40,40,40);
    box-shadow: 0 10px 38px rgba(0,0,0,0.40), 0 10px 12px rgba(0,0,0,0.32);
    opacity: 0;
    pointer-events: none;
    transform-origin: bottom center;
    transform: rotateX(90deg);
    transition: all .1s ease-out;
}
.open .layer {
    pointer-events: auto;
}
.open ul {
    opacity: 1;
    transform: rotateX(0deg);
    pointer-events: auto;
    transition: all .12s ease-in;
}
</style>