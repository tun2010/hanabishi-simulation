<template>
    <section v-if="products?.length">
        <header>
            <div class="cell name">商品名</div>
            <div class="cell price">価格</div>
            <div class="cell qty">数量</div>
            <div class="cell total">小計</div>
            <div class="cell del">消去</div>
        </header>
        <TransitionGroup name="list" tag="ul">
            <li v-for="item in products" :key="item.code">
                <product-item 
                    :item="item" 
                    @increase="increaseQty"
                    @decrease="decreaseQty"
                    @remove="removeProduct"
                />
            </li>
        </TransitionGroup>
    </section>
    <section v-else style="height: 36px;"></section>
</template>

<script>
import { useProductList } from '@/store/products'

import ProductItem from './ProductItem.vue'
export default {
  components: { ProductItem },
    name: 'ProductsList',
    setup() {
        return useProductList()
    }
}
</script>

<style scoped>
section {
    width: 100%;
    overflow-x: hidden;
    /* min-height: 50%;
 	background-image: radial-gradient(transparent 2px, var(--bg-gray) 2px);
  	background-size: 4px 4px; */
}
header {
    margin: 0 var(--space-4);
    height: 40px;
    font-size: .8rem;
    font-weight: 600;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 80px 150px 90px 60px;
    align-items: center;
    padding: 0 var(--space-4);
    gap: var(--space-3);
    border-bottom: 1px solid var(--border-color);
    color: rgb(250,250,250);
}
.cell {
    font-weight: 800;
}
.qty,
.total,
.price,
.del {
    text-align: right;
}

ul {
    margin: 0;
    padding: var(--space-2) var(--space-4) var(--space-4);
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
}

footer {
    display: grid;
    grid-template-columns: 4fr minmax(140px, 1fr);
    align-items: center;
    text-align: right;
    padding: var(--space-1) 0;
    font-size: 1rem;
    color: rgb(250,250,250);
    font-weight: 600;
}
</style>