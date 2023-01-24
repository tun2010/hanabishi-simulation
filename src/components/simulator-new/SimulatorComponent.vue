<template>
    <simulator-layout>
        <template #start>
            <layout-scroll-view scroll="y">
                <div class="scroll"></div>
            </layout-scroll-view>
        </template>
        <template #end>
            <main-simulation />
        </template>
    </simulator-layout>
</template>

<script>
import SimulatorLayout from '@/layouts/SimulatorLayout.vue'
import LayoutScrollView from '@/layouts/LayoutScrollView.vue'
import MainSimulation from './MainSimulation.vue'

export default {
    name: 'SimulatorComponent',
    components: {
        SimulatorLayout,
        LayoutScrollView,
        MainSimulation,
    },
}
</script>

<style scoped>
.selection {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: var(--space-4) 0;
}
.scroll {
    min-height: 2000px;
}
</style>