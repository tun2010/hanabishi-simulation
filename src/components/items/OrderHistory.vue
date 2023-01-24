<template>
    <layout-slide-in>
        <layout-header>
            <template #small><span class="small--active">オーダー</span> • カテゴリ選択 • アイテム選択</template>
            <template #title>以前購入した商品</template>
        </layout-header>
        <layout-scroll-view scroll="y">
            <history-list />
        </layout-scroll-view>
        <layout-footer>
            <button type="button" @click="closeHistiry" class="myshop-btn myshop-btn--outline">戻る</button>
            <button type="button" class="myshop-btn myshop-btn--primary">継続する</button>
        </layout-footer>
    </layout-slide-in>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useItemsStore } from '@/store/items'

import LayoutHeader from '@/layouts/LayoutHeader.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import LayoutFooter from '@/layouts/LayoutFooter.vue'
import LayoutSlideIn from '@/layouts/LayoutSlideIn.vue'
import HistoryList from './HistoryList.vue'

export default {
    name: 'OrderHistory',
    components: {
        LayoutHeader,
        LayoutScrollView,
        LayoutFooter,
        LayoutSlideIn,
        HistoryList,
    },
    setup() {
        const itemsStore = useItemsStore()
        const { gender } = storeToRefs(itemsStore)
        const { closeHistiry } = itemsStore

        return {
            gender,
            closeHistiry,
        }
    }
}
</script>

<style scoped>

</style>
