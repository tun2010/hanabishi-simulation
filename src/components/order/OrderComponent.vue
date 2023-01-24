<template>
    <basic-layout>
        <div class="content">
            <div class="bg bg--mens"></div>
            <div class="bg bg--ladies"></div>
            <div class="bg bg--clothings"></div>
            <div class="container">
                <div class="category">
                    <div class="border">
                        <h2>男性</h2>
                        <button class="myshop-btn myshop-btn--secondary" :disabled="busy" @click="handleButtonClick(1, '/items?reset=true', 1)">
                            男性の注文
                            <div v-if="loadingBtn == 1 && busy" class="btn-loading" />
                        </button>
                    </div>
                </div>
                <div class="category">
                    <div class="border">
                        <h2>女性</h2>
                        <button class="myshop-btn myshop-btn--secondary" :disabled="busy" @click="handleButtonClick(2, '/items?reset=true', 2)">
                            レディの注文
                            <div v-if="loadingBtn == 2 && busy" class="btn-loading" />
                        </button>
                    </div>
                </div>
                <div class="category">
                    <div class="border">
                        <h2>衣類</h2>
                        <button class="myshop-btn myshop-btn--secondary" :disabled="busy" @click="handleButtonClick(null, '/products?reset=true', 3)">
                            衣類の購入
                            <div v-if="loadingBtn == 3 && busy" class="btn-loading" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </basic-layout>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store'
import { ref } from '@vue/reactivity'

import BasicLayout from '@/layouts/BasicLayout.vue'

export default {
    name: 'OrderComponent',
    components: { BasicLayout },
    setup() {
        const appStore = useAppStore()
        const { busy } = storeToRefs(appStore)
        const { setOrderGender } = appStore

        const loadingBtn = ref(null)

        function handleButtonClick(gender, path, id) {
            loadingBtn.value = id
            setOrderGender(gender, path)
        }

        return {
            busy,
            loadingBtn,
            handleButtonClick
        }
    }
}
</script>

<style scoped>
.content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    position: relative;
    overflow: hidden;
}
.bg {
    position: absolute;
    z-index: 0;
    top: 0; bottom: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top center;
}
.bg--mens {
    left: 0;
    width: 50%;
    background-image: url(https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/items_mens.png);
}
.bg--ladies {
    z-index: 1;
    left: 25%;
    width: 50%;
    background-image: url(https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/items_ladies.png);
    clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
}
.bg--clothings {
    z-index: 2;
    left: 60%;
    width: 50%;
    background-image: url(https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/clothings.png);
    background-position: center left;
    clip-path: polygon(30% 0, 100% 0, 100% 100%, 0% 100%);
}

.container {
    position: absolute;
    z-index: 3;
    top: 0; bottom: 0;
    left: 0; right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-4) var(--space-3);
    padding: var(--space-5);
    padding-bottom: 60px;
    
 	/* background-image: radial-gradient(transparent 2px, var(--primary) 1px);
  	background-size: 4px 4px; */
}

.category {
    width: 100%;
    max-width: 460px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-3);
    background-color: hsla(221, 30%, 30%, .85);
    backdrop-filter: blur(5px);
}

.border {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-4);
    border: 1px solid var(--border-color);
}


@media (orientation: landscape) {
    .container {
        flex-direction: row;
    }
}

.category h2 {
    margin: 0;
    padding: 0;
    font-size: 2rem;
    font-weight: 900;
    color: var(--c-light);
    text-align: center;
    font-family: var(--custom-font);
    line-height: 1.5em;
}

.myshop-btn {
    min-width: 100%;
    position: relative;
    gap: var(--space-1);
    --color: #1e1e1e;
}
.myshop-btn:disabled {
    opacity: .7;
    pointer-events: none;
}
.myshop-btn--outline {
    --color: rgba(255,255,255,.9)
}
.myshop-btn--secondary {
    color: #1e1e1e;
}
.myshop-btn .btn-loading {
    width: 16px;
    height: 16px;
    border: 2px solid var(--color);
    border-left-color: transparent;
    border-radius: 100%;
    animation: Loading .7s infinite linear;
}
@keyframes Loading {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>