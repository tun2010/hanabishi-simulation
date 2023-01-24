<template>
    <div class="absolute-loading" :class="theme">
        <div class="loading-icon" />
    </div>
</template>

<script>
export default {
    name: 'AbsoluteLoading',
    props: {
        theme: String,
    }
}
</script>

<style scoped>
.absolute-loading {
    position: absolute;
    z-index: 999;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background-color: rgba(0,0,0,.2);

    display: flex;
    justify-content: center;
    align-items: center;
    --color: rgba(255,255,255,1);
}
.primary {
    --color: var(--primary);
}
.secondary {
    --color: var(--secondary);
}
.loading-icon {
    width: 50px;
    height: 50px;
    border: 4px solid var(--color);
    border-left-color: transparent;
    border-radius: 100%;
    animation: Loading .7s infinite linear;
}
@keyframes Loading {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>