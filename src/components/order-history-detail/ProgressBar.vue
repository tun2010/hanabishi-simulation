<template>
    <section class="progress-bar">
        <ul class="steps">
            <li :class="`step step-${step.id} ${step.id == currentStep ? 'active' : ''}`" v-for="step in steps" :key="step.id">
                {{ step.name }}
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'ProgressBar',
    setup() {
        const steps = [
            {
                id: 1,
                name: '新規受注'
            },
            {
                id: 2,
                name: '工場送信済'
            },
            {
                id: 3,
                name: '店舗到着/検品済'
            },
            {
                id: 4,
                name: '商品到着'
            },
        ]
        const currentStep = 1
        return {
            steps,
            currentStep,
        }
    }
}
</script>

<style scoped>
.progress-bar {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--space-4);
    pointer-events: none;
    /* border-bottom: 1px solid var(--border-color); */
    /* background-color: var(--bg-gray); */
    position: sticky;
    z-index: 2;
    top: -10px;
}
.steps {
    max-width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    background-color: var(--bg-gray);
    pointer-events: auto;
    /* box-shadow: 0 2px 6px 2px rgba(0,0,0,.2); */
}
.step {
    padding: 0 var(--space-5);
    min-height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    font-size: .8rem;
    font-weight: 600;
    background-color: hsl(221, 75%, 100%);
}
.step:not(:first-child) {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 20px 50%);
    margin-left: -20px;
}
.step-1 {
    background-color: hsl(221, 75%, 70%);
    color: rgb(90,90,90);
}
.step-2 {
    background-color: hsl(221, 75%, 80%);
    color: rgb(100,100,100);
}
.step-3 {
    background-color: hsl(221, 75%, 90%);
    color: rgb(120,120,120);
}
.step-4 {
    background-color: hsl(221, 75%, 100%);
    color: rgb(150,150,150);
}
.step.active {
    color: rgb(0,0,0);
}
.step.active::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background-color: rgb(0,0,0);
}
</style>