<template>
    <div class="simulation-container">
        <transition name="up">
            <div class="fabric-ui" v-if="is">
                <div class="container">
                    <div class="fabric_img">
                        <div class="image-container">
                            <img :src="simulation.img" alt="Simulator">
                        </div>
                    </div>
                    <div class="fabric_footer">
                        <h2>{{ simulation.name || 'シルエット' }}</h2>
                        <div class="pabric__price">¥{{simulation.price}}（税込）〜</div>
                        <p v-for="(decsription, index) in simulation.descriptions" :key="index">
                            {{decsription}}
                        </p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'FabricSimulation',
    props: {
        is: Boolean,
        simulation: Object,
    }
}
</script>

<style scoped>
.simulation-container {
    position: absolute;
    z-index: 1;
    top: 0; bottom: 0;
    left: 0; right: 0;
    pointer-events: none;
}
.fabric-ui {
    background-color: var(--fg-color);
    padding: var(--space-4);
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
    pointer-events: auto;
}
.container {
    border: 1px solid rgba(100,100,100,1);
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) 1fr;
}
.fabric_img {
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr);
}
.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-4);
}
.image-container img {
    max-width: 100%;
    max-height: 100%;
}
.fabric_footer {
    padding: var(--space-4);
}
.fabric_footer h1 {
    font-size: 2.5rem;
    margin: 0;
    font-family: var(--custom-font);
    color: rgba(30,30,30,.85);
    text-transform: uppercase;
}
.fabric_footer h2 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 900;
    text-transform: uppercase;
    color: rgba(30,30,30,.7);
}
.fabric_footer p {
    margin: var(--space-1) 0;
    font-size: .8rem;
    color: rgba(30,30,30,.9);
}
/* @media (orientation: portrait) and (max-width: 1280px) {
    .fabric_img {
        padding: 0 var(--space-5) var(--space-5);
        height: calc(100vh - 344px);
    }
} */
</style>