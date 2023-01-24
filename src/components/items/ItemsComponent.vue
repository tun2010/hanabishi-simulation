<template>
    <three-quarter-layout>
        <template #aside>
            <div class="view">
                <img :class="{show: gender?.id == 2}" src="https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/items_ladies.png" alt="Ladies Items">
                <img :class="{show: gender?.id == 1}" src="https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/items_mens.png" alt="Men Items">
            </div>
        </template>
        <template #content>
            <layout-main-body relative>
                <layout-header>
                    <template #small>オーダー • <span class="small--active">カテゴリ選択</span> • アイテム選択</template>
                    <template #title>{{ gender?.name || '' }}</template>
                </layout-header>
                <layout-scroll-view scroll="y" theme="relative">
                    <category-select />
                    <!-- <child-categories v-if="parentCategory" /> -->
                </layout-scroll-view>
                <layout-footer>
                    <router-link to="/order" class="myshop-btn myshop-btn--outline">戻る</router-link>
                    <button @click="showHistory" class="myshop-btn myshop-btn--primary">オーダー履歴から選択</button>
                </layout-footer>
                <transition name="right">
                    <items-select v-if="category" />
                </transition>
                <transition name="right">
                    <order-history v-if="isHistory" />
                </transition>
                <absolute-loading v-if="busy" />
            </layout-main-body>
        </template>
    </three-quarter-layout>
</template>

<script>
import { onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useItemsStore } from '@/store/items'
import { useRoute } from 'vue-router'

import ThreeQuarterLayout from '@/layouts/ThreeQuarterLayout.vue'
import LayoutHeader from '@/layouts/LayoutHeader.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import LayoutMainBody from '@/layouts/LayoutMainBody.vue'
import LayoutFooter from '@/layouts/LayoutFooter.vue'
import CategorySelect from './CategorySelect.vue'
import ItemsSelect from './ItemsSelect.vue'
import OrderHistory from './OrderHistory.vue'
import AbsoluteLoading from '@/components/util/AbsoluteLoading.vue'

export default {
    name: 'ItemsComponent',
    components: {
        ThreeQuarterLayout,
        LayoutHeader,
        LayoutScrollView,
        LayoutMainBody,
        LayoutFooter,
        CategorySelect,
        ItemsSelect,
        OrderHistory,
        AbsoluteLoading,
    },
    setup() {
        const route = useRoute()

        const itemsStore = useItemsStore()
        const { busy, gender, segemntGenders, category, isHistory } = storeToRefs(itemsStore)
        const { getCategories, showHistory, resetStore } = itemsStore

        onMounted(() => {
            if (route.query.reset) resetStore()
            getCategories()
        })

        watch(
            () => route.name,
            () => {
                if (route.query.reset) resetStore()
            }
        )

        return {
            busy,
            gender,
            segemntGenders,
            category,
            isHistory,
            showHistory,
        }
    }
}
</script>

<style scoped>
.view {
    height: 100%;
    position: relative;
}
.view img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 1;
    top: 0; bottom: 0;
    left: 0; right: 0;
    opacity: 0;
    transition: opacity 1.2s ease;
}
.view img.show {
    z-index: 0;
    opacity: 1;
}
</style>