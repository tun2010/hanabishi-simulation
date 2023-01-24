<template>
    <section class="options">
        <h4>{{ item.name }}</h4>
        <ul class="items">
            <li class="item" v-for="option in product.options" :key="option.id">
                <button class="item-categories__btn" :class="{active: option.id == current}" @click="openToggle(option.id)">
                    <span class="item--name">{{ option.name }}</span>
                    <span class="item--value">{{ option.value_name }}</span>
                    <span class="item--deco"></span>
                    <span class="item--arrow"></span>
                </button>
            </li>
        </ul>
    </section>
    <transition name="right">
        <div class="item-detail" v-if="toggle" @click="closeToggle">
            
        </div>
    </transition>
    <!-- <div class="options-container" :class="{show: toggle}">
        <div class="space" @click="closeToggle"></div>
        <div class="options-content">
        </div>
    </div> -->
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    name: 'ProductOptions',
    props: {
        item: Object,
        product: Object,
    },
    setup(props) {
        const toggle = ref(false)
        const current = ref(null)

        function openToggle(id) {
            toggle.value = true
            current.value = id
        }

        function closeToggle() {
            toggle.value = false
            current.value = null
        }

        return {
            toggle,
            current,

            openToggle,
            closeToggle,
        }
    }
}
</script>

<style scoped>
.options {
    padding: var(--space-4);
}
h4 {
    font-size: 1.2rem;
    margin: var(--space-1) 0;
    color: var(--gray-50);
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    gap: var(--space-2);
}
h4::before {
    content: '';
    display: block;
    width: .7em;
    height: .7em;
    border-radius: 2px;
    background-color: currentColor;
    opacity: .8;
}
.items {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    grid-gap: var(--space-0);
    --border: rgba(255,255,255,.2);
}
.item-categories__btn {
    width: 100%;
    min-height: 60px;
    display: grid;
    grid-template-columns: 160px 1fr 1px 42px;
    align-items: center;
    text-align: left;
    color: rgba(255,255,255,1);
    gap: var(--space-4);
    font-size: .9rem;
    transform: translateX(0);
    transition: all .4s ease;
    padding: 0;
    background-color: var(--primary-light);
    /* border-bottom: 1px solid var(--primary-light); */
}
.item-categories__btn.active {
    transform: translateX(-100px);
    transition: all .2s ease .2s;
}
.item-categories__btn.disabled {
    pointer-events: none;
}
.item--deco {
    width: 0;
    height: 60%;
    border-right: 1px solid var(--border);
}
.item--name {
    color: var(--gray-200);
    padding-left: var(--space-4);
}
.item--value {
    color: var(--secondary);
    font-weight: 600;
    text-transform: uppercase;
}

.item--arrow {
    width: 24px;
    height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.item--arrow::before,
.item--arrow::after {
    content: '';
    display: block;
    width: 0;
    height: 20px;
    border-left: 1px solid var(--gray-300);
    transition: all .3s ease;
}
.item--arrow::before {
    transform-origin: bottom right;
    transform: rotate(-45deg);
}
.item--arrow::after {
    transform-origin: top right;
    transform: rotate(45deg);
}

.item-categories__btn.disabled .item--deco,
.item-categories__btn.disabled .item--arrow {
    opacity: 0;
}

.item-detail {
    position: absolute;
    z-index: 5;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background-color: var(--primary);
    border-left: 1px solid var(--border-color);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
}
@media (orientation: portrait) {
    .item-categories__btn {
        grid-template-columns: 120px 1fr 1px 36px;
    }
    .item--name {
        padding-left: var(--space-3);
    }
}
</style>