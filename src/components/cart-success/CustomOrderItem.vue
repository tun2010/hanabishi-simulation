<template>
    <article>
        <div class="media">
            <div class="img"></div>
        </div>
        <div class="content">
            <h3>{{ item.gender.name }} - {{ item.category.name }}</h3>
            <div class="product">{{ item.product.name }}</div>
            <div class="style">{{ item.silhouette.selected_name }}</div>
            <div class="fabric">{{ item.fabric.selected_name }}</div>
            <div style="flex:1" />
            <div class="price">￥16,500</div>
        </div>
    </article>
</template>

<script>
export default {
    name: 'CustomOrderItem.vue',
    props: {
        item: Object,
    },
}
</script>

<style scoped>
article {
    --img-size: 160px;
    width: 100%;
    padding: var(--space-4);
    color: rgba(255,255,255,.8);
    display: grid;
    grid-template-columns: var(--img-size) 1fr;
    gap: var(--space-4);
    transform: translateX(0);
    transition: all .3s ease;
    background-color: var(--bg-gray-light);
    border: 1px solid rgba(255,255,255,.2);
}
article.active {
    transform: translateX(-100px);
    transition: all .3s ease .3s;
    background-color: var(--primary);
}
.img {
    width: var(--img-size);
    height: var(--img-size);
    background-color: rgba(255,255,255,.2);
}
.content {
    color: rgba(255,255,255,.6);
    display: flex;
    flex-direction: column;
}
h3 {
    font-size: 1.6rem;
    font-family: var(--custom-font);
    margin: 0;
}
.product {
    font-size: 1.2rem;
    font-weight: 600;
    color: rgba(255,255,255,.5);
}
.price {
    font-size: 1.6rem;
    font-weight: 800;
    color: rgba(255,255,255,.8);
}
</style>