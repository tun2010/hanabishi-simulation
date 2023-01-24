<template>
    <layout-main-body>
        <layout-header>
            <template #small>品質も価格もオススメの</template>
            <template #title><option-items v-model="selectedItemId" :list="selectedItems" /></template>
        </layout-header>
        <layout-scroll-view scroll="y">
            <inline-loading v-if="busy" />
            <option-categories v-else
                page="cart"
                @select="handleOpenOption" 
            />
        </layout-scroll-view>
        <layout-footer>
            <div class="total_cost">お支払い金額: XXXX.XX</div>
            <button type="button" class="myshop-btn myshop-btn--outline" @click="closeDetail">戻る</button>
            <button type="button" class="myshop-btn myshop-btn--primary" @click="saveAndCloseDetail">保存</button>
        </layout-footer>
    </layout-main-body>
    <transition name="right">
        <fabrics-select 
            v-if="isFabricView" 
            :current="currentFabric"
            @save="handleFabricSave"
            @close="handleFabricClose"
            page="cart"
        />
    </transition>
    <transition name="right">
        <option-select 
            v-if="isOptionView" 
            :current="currentOptions"
            @save="handleOptionSave"
            @close="handleOptionClose"
            @info="handleOptionInfo"
            page="cart"
        />
    </transition>
    <transition name="right">
        <option-info 
            v-if="optionInfo"
            :item="optionInfo"
            @close="handleInfoClose"
            @select="handleInfoSave"
        />
    </transition>
</template>

<script>
import { useCartSimulator } from '@/store/cart'

import OptionCategories from '@/components/simulator/OptionCategories.vue'
import OptionItems from '@/components/util/OptionSelect.vue'
import FabricsSelect from '@/components/simulator/FabricsSelect.vue'
import OptionSelect from '@/components/simulator/OptionSelect.vue'
import OptionInfo from '@/components/simulator/OptionInfo.vue'
import InlineLoading from '@/components/util/InlineLoading.vue'
import LayoutMainBody from '@/layouts/LayoutMainBody.vue'
import LayoutHeader from '@/layouts/LayoutHeader.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import LayoutFooter from '@/layouts/LayoutFooter.vue'

export default {
    name: 'CartItemDetail',
    components: { 
        OptionCategories, 
        OptionItems,
        FabricsSelect,
        OptionSelect,
        OptionInfo,
        InlineLoading,
        LayoutMainBody,
        LayoutHeader,
        LayoutScrollView,
        LayoutFooter,
    },
    emits: ["close"],
    setup(props, context) {
        return useCartSimulator(context)
    },
}
</script>

<style scoped>
.total_cost {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: var(--space-4);
    width: 100%;
    font-size: .8rem;
    color: rgba(255,255,255,.9);
    pointer-events: none;
}
</style>