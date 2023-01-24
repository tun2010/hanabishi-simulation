<template>
    <section>
        <h2>あなたのカートは空です</h2>
    </section>
</template>

<script>
export default {
    name: 'EmptyCart',
}
</script>

<style scoped>
section {
    width: 100%;
    height: 300px;
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