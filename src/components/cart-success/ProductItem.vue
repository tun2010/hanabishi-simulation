<template>
    <article>
        <div class="cell name">
            <h3>{{ item.name }}</h3>
        </div>
        <div class="cell qty">
           <span>{{ formatCurrency(item.price) }}</span> x <span>{{ item.quantity }}</span>
        </div>
        <div class="cell price">{{ formatCurrency(item.price * item.quantity) }}</div>
    </article>
</template>

<script>
import { formatCurrency } from '@/helpers/util'

export default {
    name: 'ProductItem',
    props: {
        item: Object,
    },
    setup() {
        return {
            formatCurrency,
        }
    }
}
</script>

<style scoped>
article {
    min-height: 80px;
    font-size: .8rem;
    font-weight: 600;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 140px 140px;
    align-items: center;
    padding: 0 var(--space-4);
    gap: var(--space-3);
    color: rgb(250,250,250);
    background-color: var(--bg-gray-light);
    border: 1px solid rgba(255,255,255,.2);
}
.name h3 {
    font-size: .9rem;
}
.qty {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-2);
    font-size: 1rem;
    font-weight: 400;
}
.price {
    text-align: right;
    font-size: 1.2rem;
    color: rgba(255,255,255,.8);
}
</style>