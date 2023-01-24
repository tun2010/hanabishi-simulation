<template>
    <layout-slide-in theme="gray">
        <layout-header>
            <template #small>受注内容詳細・サイズ</template>
            <template #title>修正值・正面寸法入力</template>
        </layout-header>
        <layout-scroll-view>
            <div class="loading-container" v-if="sizeBusy">
                <inline-loading />
            </div>
            <sizes-inputs 
                v-else
                :sizes="sizes" 
                :summited="summited" 
                @change="onSizeChange" 
            />
        </layout-scroll-view>
        <layout-footer>
            <button type="button" @click="onCloseSize" class="myshop-btn myshop-btn--outline">戻る</button>
            <button type="button" @click="onSizesSumit" class="myshop-btn myshop-btn--light">確認</button>
        </layout-footer>
        <absolute-loading v-if="loading" />
    </layout-slide-in>
</template>

<script>
import { useHistoryDetailSizes } from '@/store/history/detail'

import LayoutSlideIn from '@/layouts/LayoutSlideIn.vue'
import LayoutHeader from '@/layouts/LayoutHeader.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import LayoutFooter from '@/layouts/LayoutFooter.vue'
import InlineLoading from '@/components/util/InlineLoading.vue'
import SizesInputs from '@/components/sizes/SizesInputs.vue'
import AbsoluteLoading from '@/components/util/AbsoluteLoading.vue'

export default {
    components: { 
        LayoutSlideIn,
        LayoutHeader,
        LayoutScrollView,
        LayoutFooter,
        InlineLoading,
        SizesInputs,
        AbsoluteLoading,
    },
    name: 'SizeEdit',
    setup(props, context) {
        return useHistoryDetailSizes(context)
    }
}
</script>

<style scoped>
.loading-container {
    min-height: 50vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>