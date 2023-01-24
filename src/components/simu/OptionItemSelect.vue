<template>
    <option-choose-template
        :title="`${ category?.option_category_name || '' }選択`"
        subTitle="ジャケットのカスタマイズ"
        @close="handleClose"
        @select="handleSave"
    >
        <ul class="loading" v-if="busy">
            <li>
                <inline-loading />
            </li>
        </ul>
        <ul class="list" ref="containerEl" v-else>
            <li v-for="item in list" :key="item.id">
                <button class="option_btn" @click="handleSelect(item)" :class="{selected: current?.id == item.id}">
                    <div class="option__img" :style="{'background-image': `url(${IMG_URL + item.image})`}"></div>
                    <div class="option__description">
                        <h4>{{ item.name }}</h4>
                        <small>現代風にも対応できるデザインや</small>
                    </div>
                </button>
            </li>
        </ul>
    </option-choose-template>
</template>

<script>
import OptionChooseTemplate from '@/components/simu/OptionChooseTemplate.vue'
import InlineLoading from '@/components/util/InlineLoading.vue'
import { ref, watch, onMounted } from '@vue/runtime-core'

export default {
    name: 'OptionItemSelect',
    props: {
        busy: Boolean,
        current: Object,
        list: Array,
        category: Object,
    },
    components: {
        OptionChooseTemplate,
        InlineLoading,
    },
    emits: ['close', 'save', 'select'],
    setup(props, context) {
        const containerEl = ref(null)
            
        onMounted(() => {
            scrollIntoView()
        })

        watch(props.busy, newVal => {
            console.log('BUSY', newVal)
            if (!newVal) {
                setTimeout(() => scrollIntoView(true), 10)
            }
        })

        function handleClose() {
            context.emit('close')
        }

        function handleSave() {
            context.emit('save', props.current)
        }

        function handleSelect(item) {
            context.emit('select', item)
        }

        function scrollIntoView(isSmooth) {
            const el = containerEl.value?.querySelector('.option_btn.selected')
            if (el) {
                const y = el.offsetTop - (window.innerHeight * 0.3)
                containerEl.value.parentElement.scrollTo({
                    top: y,
                    left: 0,
                    behavior: isSmooth ? 'smooth' : 'instant'
                })
            }
        }

        return {
            IMG_URL: process.env.VUE_APP_IMG_URL,
            containerEl,
            
            handleClose,
            handleSave,
            handleSelect,
        }
    }
}
</script>

<style scoped>
ul {
    width: 100%;
    margin: 0;
    padding: var(--space-0);
    list-style: none;
}
.loading,
.loading li {
    height: 100%;
}
.list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 1fr);
    justify-content: stretch;
    align-items: stretch;
    padding: var(--space-4);
    gap: var(--simu-gap);
}
.option_btn {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    display: grid;
    grid-template-columns: 120px minmax(0, 1fr);
    grid-auto-rows: minmax(120px, 1fr);
    align-items: center;
    transition: background-color .1s ease;
    background-color: var(--primary-light);
    position: relative;
    --color: var(--gray-50);
}
.option_btn.selected {
    background-color: var(--secondary);
    --color: var(--bg-gray);
}
.option__img {
    height: 100%;
    background-color: var(--primary-lighter);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
.option__description {
    color: var(--color);
    font-size: .9rem;
    padding: var(--space-4);
    text-align: left;

    display: flex;
    flex-direction: column;
    gap: var(--space-1);
}
.spacer {
    flex: 1;
}
.option__description h4 {
    margin: 0;
    font-size: .9rem;
}
.option__description small {
    display: block;
}
</style>