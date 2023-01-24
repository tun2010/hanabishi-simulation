<template>
    <aside>
        <header>
            <h2>受注内容詳細</h2>
        </header>
        <section class="media">
            <div class="object" v-if="data"></div>
        </section>
        <footer>
            <router-link to="/orders?scroll=1" class="myshop-btn myshop-btn--outline-gray arrow-start">履歴ページに戻る</router-link>
        </footer>
    </aside>
</template>

<script>
export default {
    name: 'OrderAside',
    props: {
        data: Object,
    }
}
</script>

<style scoped>
aside {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: 120px minmax(0, 1fr) 80px;
    background-color: var(--gray-200);
}
header {
    border-bottom: 1px solid rgb(150,150,150);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 var(--space-4);
}
header h2 {
    font-size: 1.8rem;
    font-weight: 600;
}

.media {
    padding: var(--space-4);
} 
.object {
    width: 100%;
    height: 100%;
    border: 1px solid rgb(200,200, 200);
    background-image: url(https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/simulator/mens_suit_international.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transition: opacity .3s ease;
}

footer {
    border-top: 1px solid rgb(150,150,150);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 var(--space-4);
}
@media (orientation: portrait) {
    aside {
        display: none;
    }
}
</style>