<template>
    <section class="order-info">
        <h4>V上下＋下</h4>
        <!-- <div class="item">
            <div class="name">Gender</div>
            <div class="value">男性</div>
        </div>
        <div class="item">
            <div class="name">Style</div>
            <div class="value">スーツ / ジャケット / パンツ</div>
        </div>
        <div class="item">
            <div class="name">Product</div>
            <div class="value">V上下＋下</div>
        </div> -->
        <div class="card fabric">
            <div class="media"></div>
            <div class="detail">
                <h6>HANABISHI ORIGINAL</h6>
                <div class="color">Color Name</div>
                <div class="fabric-info">Other info</div>
                <div style="flex: 1" />
                <div class="price">65,000¥</div>
            </div>
        </div>
        <div class="item">
            <div class="name">シルエット</div>
            <div class="value">INTERNATIONAL</div>
        </div>
        <div class="item">
            <div class="name">サイズメジャー</div>
            <div class="value action">
                <button class="myshop-btn myshop-btn--outline" @click="openSize">サイズ詳細</button>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'OrderInfo',
    setup(props, context) {
        function openSize() {
            context.emit('size')
        }

        return {
            openSize,
        }
    }
}
</script>

<style scoped>
.order-info {
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-0);
    /* gap: 0; */
}
h4 {
    font-size: 1.2rem;
    margin: var(--space-1) 0;
    color: var(--gray-50);
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    gap: var(--space-2);
}
h4::before {
    content: '';
    display: block;
    width: .7em;
    height: .7em;
    border-radius: 2px;
    background-color: currentColor;
    opacity: .8;
}
.card {
    display: grid;
    grid-template-columns: 140px 1fr;
    grid-template-rows: minmax(120px, 1fr);
    gap: 4px var(--space-5);
    padding: var(--space-3);
    background-color: var(--primary-light);
    /* border-bottom: 1px solid var(--primary-light); */
}
h5 {
    font-size: 1.2rem;
    grid-column: 1 / 3;
    color: var(--gray-50);
    margin: 0;
    margin-bottom: -8px;
    padding: 0;
}
.media {
    width: 120px;
    background-color: var(--primary-lighter);
}
.detail {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: var(--space-0) 0;
    color: var(--gray-100);
    font-size: .9rem;
}
.shiruetto .detail {
    justify-content: center;
}
.detail h6 {
    margin: 0;
    font-size: 1rem;
}
.price {
    font-size: 1.2rem;
}

.item {
    display: grid;
    grid-template-columns: 140px 1fr;
    grid-template-rows: minmax(54px, 1fr);
    gap: 4px var(--space-5);
    padding: 0 var(--space-3);
    background-color: var(--primary-light);
    /* border-bottom: 1px solid var(--primary-light); */
    align-items: center;
    color: var(--gray-100);
    font-size: .9rem;
}
.value {
    font-weight: 600;
}
.value.action {
    padding: var(--space-3) 0;
}
</style>