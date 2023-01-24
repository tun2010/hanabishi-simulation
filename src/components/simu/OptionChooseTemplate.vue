<template>
    <layout-slide-in>
        <layout-header>
            <template #small>{{ subTitle }}</template>
            <template #title>{{ title }}</template>
        </layout-header>
        <layout-scroll-view scroll="y">
            <slot />
        </layout-scroll-view>
        <layout-footer>
            <button type="button" @click="onCancel" class="myshop-btn myshop-btn--outline">戻る</button>
            <button type="button" @click="onSelect" class="myshop-btn myshop-btn--primary">確認</button>
        </layout-footer>
    </layout-slide-in>
</template>

<script>
import LayoutHeader from '@/layouts/LayoutHeader.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import LayoutFooter from '@/layouts/LayoutFooter.vue'
import LayoutSlideIn from '@/layouts/LayoutSlideIn.vue'

export default {
    name: 'OptionChooseTemplate',
    components: { 
        LayoutHeader,
        LayoutScrollView,
        LayoutFooter,
        LayoutSlideIn,
    },
    props: {
        title: String,
        subTitle: String,
    },
    setup(props, context) {
        function onSelect(value) {
            context.emit('select', value)
        }
        function onCancel(value) {
            context.emit('close', value)
        }

        return {
            onSelect,
            onCancel
        }
    }
}
</script>
