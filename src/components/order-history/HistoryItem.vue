<template>
    <router-link to="/orders/4">
        <article>
            <div class="row product">
                <div class="image"></div>
                <div class="detail">
                    <h2>男性 - スーツ / ジャケット / パンツ</h2>
                    <div class="item">V上下＋下 ( INTERNATIONAL )</div>
                    <div class="fabric">JOHN ENGLISH</div>
                    <div class="spacer" />
                    <div class="price">¥25,000</div>
                </div>
            </div>
            <div class="row">2022/2/27</div>
            <div class="row">2022/3/05</div>
            <div class="row">
                <small class="status">工場送信済</small>
            </div>
            <div class="row">ハマダ</div>
        </article>
    </router-link>
</template>

<script>
export default {
    name: 'HistoryItem',
}
</script>

<style scoped>
article {
    width: 100%;
    background-color: rgba(255,255,255,.05);
    display: grid;
    grid-template-columns: minmax(200px, 4fr) 1fr 1fr 1fr 1fr;
    align-content: center;
    gap: var(--space-2);
    padding: var(--space-2);
    background-color: var(--primary-card);
    border: 1px solid rgba(255,255,255,.1);
}
a {
    text-decoration: none;
}
.row {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--gray-100);
    font-size: .9rem;
    text-decoration: none;
}
.product {
    padding-left: var(--space-1);
    gap: var(--space-4);
    align-items: stretch;
}
.image {
    width: 120px;
    height: 120px;
    background-color: var(--primary-lighter);
}
.detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    line-height: 1.5em;
    padding: var(--space-1) 0;
}
h2 {
    font-size: .9rem;
    margin: 0;
}
.item {
    font-size: .8rem;
}
.price {
    font-weight: 600;
    font-size: 1rem;
}
.status {
    font-size: .7rem;
    font-weight: 600;
    background-color: #efe;
    color: #686;
    padding: 4px 12px;
    border-radius: 1px;
}
</style>