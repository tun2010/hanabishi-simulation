<template>
    <option-choose-template
        title="フロントボタン数選択"
        subTitle="ジャケットのカスタマイズ"
        @close="handleClose"
        @select="handleSave"
    >
        <ul class="loading" v-if="busy">
            <li>
                <inline-loading />
            </li>
        </ul>
        <ul class="list" v-else ref="containerEl">
            <li v-for="item in buttonsList(selectedItemId)" :key="item.id">
                <button class="button_btn" @click="handleSelect(item)" :class="{selected: current.id == item.id}">
                    <div class="option__img">
                    </div>
                    <div class="option__description">
                        <h4>{{item.name}}</h4>
                        <small>現代風にも対応できるデザインや</small>
                        <button type="button" class="info_btn" @click.stop="handleInfo(item)"></button>
                    </div>
                </button>
            </li>
        </ul>
    </option-choose-template>
</template>

<script>
import { useButtons } from '@/store/simulator'
import OptionChooseTemplate from './OptionChooseTemplate.vue'
import InlineLoading from '@/components/util/InlineLoading.vue'

export default {
    name: 'ButtonSelect',
    props: {
        current: Object,
    },
    components: {
        OptionChooseTemplate,
        InlineLoading,
    },
    setup(props, context) {
        return useButtons(context)
    }
}
</script>

<style scoped>
ul {
    width: 100%;
    margin: 0;
    padding: var(--space-2);
    list-style: none;
}
.loading {
    height: 100%;
}
.loading li {
    width: 100%;
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
.button_btn {
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
.button_btn.selected {
    background-color: var(--secondary);
    --color: var(--bg-gray);
}
.option__img {
    height: 100%;
    background-color: var(--primary-lighter);
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
.info_btn {
    display: none;
    width: 32px;
    height: 32px;
    position: absolute;
    top: var(--space-2);
    right: var(--space-3);
    background-image: url(https://hanabishi.coremobile.co.jp/html/user_data/assets/icons/info.png);
    background-size: 18px;
    background-repeat: no-repeat;
    background-position: center;
}
.option__description h4 {
    margin: 0;
    font-size: .9rem;
}
.option__description small {
    display: block;
}
</style>