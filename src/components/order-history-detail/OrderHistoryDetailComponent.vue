<template>
    <basic-layout>
        <section class="order-detail">
            <order-aside :data="history" />
            <history-detail />
        </section>
    </basic-layout>
</template>

<script>
import { useHistoryDetailComp } from '@/store/history/detail'

import BasicLayout from '@/layouts/BasicLayout.vue'
import LayoutHeader from '@/layouts/LayoutHeader.vue'
import InlineLoading from '@/components/util/InlineLoading.vue'
import OrderAside from './OrderAside.vue'
import HistoryDetail from './HistoryDetail.vue'

export default {
    components: { 
        BasicLayout,
        LayoutHeader,
        InlineLoading,
        OrderAside,
        HistoryDetail,
    },
    name: 'OrderHistoryDetailComponent',
    setup() {
        return useHistoryDetailComp()
    }
}
</script>

<style scoped>
.order-detail {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr minmax(700px, 1fr);
    grid-template-rows: minmax(0, 1fr);
}
@media (orientation: portrait) {
    .order-detail {
        height: 100%;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        grid-template-rows: minmax(0, 1fr);
    }
}
</style>