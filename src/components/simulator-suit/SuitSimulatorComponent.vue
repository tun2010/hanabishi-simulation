<template>
    <half-by-half-layout>
        <template #start>
            <div class="bg-layer" :class="{show: toggle}" @click="toggleSimulation" />
            <div class="simulation"></div>
        </template>
        <template #end>
            <layout-main-body relative>
                <layout-header>
                    <template #small>品質も価格もオススメの</template>
                    <template #title>
                        <option-select v-model="selectedProductId" :list="products" />
                    </template>
                </layout-header>
                <layout-scroll-view scroll="y">
                    <inline-loading v-if="busy" />
                    <option-categories v-else 
                        :list="optionCategories"
                        :current="selectedOptionCategoryId"
                        @select="handleOptionCategorySelect"
                    />
                </layout-scroll-view>
                <layout-footer>
                    <div class="total_cost">お支払い金額: XXXX.XX</div>
                    <router-link to="/items" class="myshop-btn myshop-btn--outline">戻る</router-link>
                    <button class="myshop-btn myshop-btn--secondary" @click="saveSimulation">お会計</button>
                </layout-footer>
                <absolute-loading v-if="optionsBusy" />
                <transition name="right">
                    <shiruetto-select 
                        v-if="selectedOptionCategoryId == SHIRUETTO"
                        :current="currentShiruetto"
                        :list="shiruetto"
                        @select="handleOptionItemSelect"
                        @close="handleOptionItemClose"
                        @save="handleOptionItemSave"
                    />
                </transition>
                <transition name="right">
                    <option-item-select
                        v-if="selectedOptionCategoryId && selectedOptionCategoryId != SHIRUETTO"
                        :category="currentOptionCategory"
                        :current="currentItem"
                        :busy="optionBusy"
                        :list="optionItems"
                        @select="handleOptionItemSelect"
                        @close="handleOptionItemClose"
                        @save="handleOptionItemSave"
                    />
                </transition>
            </layout-main-body>
        </template>
    </half-by-half-layout>
</template>

<script>
import { useSuitSimulator } from '@/store/simu/suit'

import AbsoluteLoading from '@/components/util/AbsoluteLoading.vue'
import InlineLoading from '@/components/util/InlineLoading.vue'
import HalfByHalfLayout from '@/layouts/HalfByHalfLayout.vue'
import LayoutMainBody from '@/layouts/LayoutMainBody.vue'
import LayoutHeader from '@/layouts/LayoutHeader.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import LayoutFooter from '@/layouts/LayoutFooter.vue'

import OptionSelect from '@/components/util/OptionSelect.vue'
import OptionCategories from '@/components/simu/OptionCategories.vue'
import ShiruettoSelect from '@/components/simu/ShiruettoSelect.vue'
import OptionItemSelect from '@/components/simu/OptionItemSelect.vue'

export default {
    name: 'SuitSimulatorComponent',
    components: {
        AbsoluteLoading,
        InlineLoading,
        HalfByHalfLayout,
        LayoutMainBody,
        LayoutHeader,
        LayoutScrollView,
        LayoutFooter,

        OptionSelect,
        OptionCategories,
        ShiruettoSelect,
        OptionItemSelect,
    },
    setup() {
        return useSuitSimulator()
    }
}
</script>

<style scoped>
.simulation {
    --space: 0;
    --bg-color: var(--gray-200);
    --fg-color: var(--gray-200);
    border-right: 1px solid var(--border-color);
    padding: var(--space);
    position: relative;
    background-color: var(--bg-color);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
}
.simulation_view {
    width: 100%;
    max-width: 540px;
    margin: 0 auto;
    background-color: var(--bg-color);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
}
.simulation_header {
    display: none;
    justify-content: flex-end;
    align-items: center;
    padding: 0 var(--space-3);
    /* border-bottom: 1px solid rgb(40,40,40); */
}
.simulation_body {
    position: relative;
}
.btn-simulation--toggle {
    width: 48px;
    height: 48px;
    /* background-color: #999; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 20px;
    transition: all .3s ease;
}
.btn-simulation--toggle::before,
.btn-simulation--toggle::after {
    content: '';
    display: block;
    width: 0;
    height: 20px;
    border-left: 1px solid #333;
    transition: all .3s ease;
}
.btn-simulation--toggle::before {
    transform-origin: bottom right;
    transform: rotate(-45deg);
}
.btn-simulation--toggle::after {
    transform-origin: top right;
    transform: rotate(45deg);
}
.btn-simulation--toggle.close {
    padding: 0;
    margin-top: var(--space-3);
}
.btn-simulation--toggle.close::before {
    position: absolute;
    height: 30px;
    transform-origin: center;
}
.btn-simulation--toggle.close::after {
    height: 30px;
    transform-origin: center;
}

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
.bg-layer {
    display: none;
}
@media (orientation: portrait) and (max-width: 1280px) {
    .simulation {
        --bg-color: rgb(235,235,235);
    }
    .simulation_view {
        --space: var(--space-2);
        grid-template-rows: 60px minmax(0, 1fr);
        position: absolute;
        z-index: 2;
        width: 640px;
        top: var(--space);
        right: var(--space);
        bottom: var(--space);
        transition: transform .3s ease;
    }
    .simulation_header {
        display: flex;
    }
    .simulation_view.show {
        transform: translateX(calc(100% - calc(100vw - 665px)));
    }
    .bg-layer {
        display: block;
        position: absolute;
        z-index: 1;
        top: 60px; bottom: 0;
        left: 0; right: 0;
        background-color: rgba(0,0,0,.3);
        opacity: 0;
        pointer-events: none;
        transition: opacity .3s ease;
    }
    .bg-layer.show {
        opacity: 1;
        pointer-events: auto;
    }
}
</style>