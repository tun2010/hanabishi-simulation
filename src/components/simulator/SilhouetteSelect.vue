<template>
    <option-choose-template
        title="シルエット選択"
        subTitle="ジャケットのカスタマイズ"
        @close="handleClose"
        @select="handleSave"
    >
        <ul class="loading" v-if="busy">
            <li>
                <inline-loading />
            </li>
        </ul>
        <ul class="list" v-else>
            <li v-for="item in silhouetteList" :key="item.id">
                <button @click="handleSelect(item)" :class="{selected: current.id == item.id}">
                    <div class="slihouette__img" :style="{'background-image': `url(${item.img})`}"></div>
                    <div class="slihouette__name">{{item.name}}</div>
                </button>
            </li>
        </ul>
    </option-choose-template>
</template>

<script>
import { useSilhouette } from '@/store/simulator'

import OptionChooseTemplate from './OptionChooseTemplate.vue'
import InlineLoading from '../util/InlineLoading.vue'

export default {
    name: 'SlihouetteSelect',
    props: {
        current: Object,
        page: String,
    },
    components: {
        OptionChooseTemplate,
        InlineLoading,
    },
    setup(props, context) {
        return useSilhouette(context)
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
.loading {
    height: 100%;
}
.loading li {
    height: 100%;
}
.list {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
    padding: var(--space-4);
    gap: var(--simu-gap);
}
button {
    width: 100%;
    display: grid;
    grid-template-columns: 110px minmax(0, 1fr);
    grid-auto-rows: minmax(130px, 1fr);
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-6);
    padding: var(--space-1);
    --color: var(--gray-50);
    border: none;
    transition: background-color .1s ease;
    
    background-color: var(--primary-light);
}
button.selected {
    background-color: var(--secondary);
    --color: var(--bg-gray);
    font-weight: 600;
}
.slihouette__img {
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: var(--primary-lighter);
}
.slihouette__name {
    color: var(--color);
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: left;
}
</style>