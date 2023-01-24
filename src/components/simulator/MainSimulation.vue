<template>
    <div class="simulation-container">
        <transition name="down">
            <div class="inner-container" v-if="is">
                <div class="simulation-ui" v-if="loading || !simuData">
                    <!-- <inline-loading theme="primary" /> -->
                </div>
                <div class="simulation-ui" v-else>
                    <div class="simulation_img">
                        <div class="border">
                            <img :src="simulation.img" alt="Simulator">
                        </div>
                    </div>
                    <div class="simulation_footer">
                        <h1>{{simuData.gender}} - {{simuData.category}}</h1>
                        <h2>{{ simulation.name || 'シルエット' }}</h2>
                        <p>要型ふょぎた唐防連ッぎばお止32抄15生わ爆3注対レとよク。</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import InlineLoading from '../util/InlineLoading.vue'
export default {
  components: { InlineLoading },
    name: 'MainSimulation',
    props: {
        is: Boolean,
        loading: Boolean,
        simulation: Object,
        simuData: Object,
    },
}
</script>

<style scoped>
.simulation-ui {
    background-color: var(--fg-color);
    position: absolute;
    z-index: 0;
    top: 0; bottom: 0;
    left: 0; right: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) auto;
}
.simulation_img {
    width: 100%;
    padding: var(--space-5);
    padding-bottom: 0;
    margin: 0 auto;
}
.border {
    width: 100%;
    height: 100%;
    background-color: rgb(230,230,230);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    border: 1px solid rgba(100,100,100,1);
}
.simulation_img img {
    max-width: 100%;
    max-height: 100%;
}
.simulation_footer {
    padding: var(--space-4) var(--space-5);
}
.simulation_footer h1 {
    font-size: 2.5rem;
    margin: 0;
    font-family: var(--custom-font);
    color: rgba(30,30,30,.85);
    text-transform: uppercase;
}
.simulation_footer h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    color: rgba(30,30,30,.7);
}
.simulation_footer p {
    margin: var(--space-1) 0;
    font-size: .8rem;
    max-width: 300px;
    color: rgba(30,30,30,.9);
}
@media (orientation: portrait) and (max-width: 1280px) {
    .simulation_img {
        padding: 0 var(--space-5);
        height: calc(100vh - 344px);
    }
}
</style>