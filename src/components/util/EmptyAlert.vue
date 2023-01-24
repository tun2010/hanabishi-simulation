<template>
    <section :style="{ height: height ? height: '50vh'}" :class="theme">
        <h2>{{ message || 'データなし' }}</h2>
    </section>
</template>

<script>
export default {
    name: 'EmptyAlert',
    props: {
        message: String,
        height: Number,
        theme: String,
    }
}
</script>

<style scoped>
section {
    width: 100%;
    border: 1px solid rgba(255,255,255,.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-1);
}
h2 {
    color: rgba(255,255,255,.7);
    display: grid;
    grid-template-columns: 50px minmax(0, 1fr);
    align-items: center;
}
h2::before {
    content: '\26A0';
    font-size: 2rem;
    font-weight: 600;
}
</style>