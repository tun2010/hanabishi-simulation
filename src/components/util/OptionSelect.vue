<template>
    <div class="option-select">
        <button
            @click="openMenu"
            :class="{active: toggle}"
        >{{ currentValue ? currentValue.name : (modelValue || 'Select..') }}</button>
        <ul :class="{open: toggle}">
            <li v-for="item in list" :key="item.id"
                :class="{selected: item.id == modelValue}"
                @click="handleSelect(item.id)"
            >
                {{ item.name }}
            </li>
        </ul>
        <div class="layer" :class="{active: toggle}" @click="closeMenu"></div>
    </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'

export default {
    name: 'OptionSelect',
    props: {
        modelValue: Number,
        list: Array,
        placeholder: String,
    },
    setup(props, contex) {
        const currentValue = computed(() => {
            return props.list.find(item => item.id == props.modelValue)
        })
        const toggle = ref(false)

        function openMenu() {
            toggle.value = true
        }
        function closeMenu() {
            toggle.value = false
        }
        function handleSelect(value) {
            toggle.value = false
            contex.emit('update:modelValue', value) 
        }

        return {
            toggle,
            currentValue,

            openMenu,
            closeMenu,
            handleSelect,
        }
    }
}
</script>

<style scoped>
.option-select {
    position: relative;
}
.option-select button {
    min-width: 200px;
    height: 42px;
    padding: 0 var(--space-2);
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(255,255,255,.9);
    transition: all .3s ease;
    text-decoration: none !important;
    background-color: transparent;
    outline: none;
    border: 1px solid var(--border-color);
}
.option-select button.active {
    background-color: rgba(255,255,255,.1);
}
.option-select button::after {
  content: '';
  display: block;
  position: absolute;
  right: 16px;
  top: 50%;
  width: 10px;
  height: 10px;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  transform: translateY(-25%) rotate(45deg);
  transition: transform .1s ease;
}
.option-select button.active::after {
    transform: translateY(25%) rotate(-135deg);
}
.layer {
    position: fixed;
    z-index: 5;
    top: 0; bottom: 0;
    left: 0; right: 0;
    pointer-events: none;
    background-color: rgba(255,255,255,0);
}
.layer.active {
    pointer-events: auto;
}
ul {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    z-index: 9;
    background-color: var(--primary-light);
    /* background-color: rgba(37,56,97,.8);
    backdrop-filter: blur(10px); */
    top: 38px;
    right: -6px;
    min-width: 280px;
    box-shadow: 0 10px 38px rgba(0,0,0,0.40), 0 10px 12px rgba(0,0,0,0.32);
    border-radius: 8px;
    opacity: 0;
    pointer-events: none;
    transform-origin: 175px -26px;
    transform: scale(.1);
    opacity: 0;
    transition: all .3s ease;
}
ul.open {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1);
    opacity: 1;
}
ul li {
    padding: 0;
    height: 48px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,.1);
    font-size: .9rem;
}
ul li::before {
    content: "";
    width: 38px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
}
ul li.selected::before {
    content: "\2713";
}
ul li:last-child {
    border-bottom: none;
}
</style>