<template>
    <div class="app-menu" :class="{open: toggle}">
        <div class="app-menu__deco"></div>
        <div class="app-menu__menu">
            <ul>
                <li>
                    <router-link to="/">TOP</router-link>
                </li>
                <li>
                    <router-link to="/order">新規注文</router-link>
                </li>
                <li>
                    <router-link to="/orders">受注一覧</router-link>
                </li>
                <li>
                    <router-link to="/fabrics">生地検索</router-link>
                </li>
                <li>
                    <router-link to="/shop">納期確認</router-link>
                </li>
                <li>
                    <a :href="`${root_url}/logout`" class="myshop-btn myshop-btn--outline logout-btn">LOGOUT</a>
                </li>
            </ul>
            <footer class="app-menu__footer">
                探じぞぶょ制術オヱノ縄2石効ぼ経生詳府そ読箱んでょわ席演あう労策がぼょ文開ミ高七俊けげリ。
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppMenu',
    props: {
        toggle: Boolean,
    },
    setup() {
        return {
            root_url: process.env.VUE_APP_ROOT_URL
        }
    }
}
</script>

<style scoped>
.app-menu {
    position: fixed;
    z-index: 9;
    top: 60px; bottom: 100%;
    left: 0; right: 0;
    transition: bottom .4s ease-out;

    display: grid;
    grid-template-columns: 1fr minmax(600px, 1fr);
    grid-template-rows: minmax(0, 1fr);
    align-items: stretch;
    overflow: hidden;

 	background-image: radial-gradient(transparent 2px, var(--primary) 2px);
  	background-size: 4px 4px;
  	backdrop-filter: brightness(100%) blur(3px);
}
.app-menu.open {
    bottom: 0;
}
.app-menu__menu {
    overflow-y: auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) auto;
    gap: var(--space-4);
    padding: var(--space-4);
    opacity: .8;
    transform: scale(.5);
    transition: all .4s ease;
    border-radius: 20px;

    background-color: var(--bg-gray);
}
.app-menu.open .app-menu__menu {
    transition: all .8s ease-in-out;
    opacity: 1;
    transform: scale(1);
    border-radius: 0;
}
.app-menu__menu ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-1);
    border: 1px solid var(--border-color);
}
.app-menu__menu a:not(.logout-btn) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 var(--space-6);
    height: 42px;
    color: rgba(255,255,255,.9);
    font-weight: 900;
    text-decoration: none;
    font-size: 1rem;
}
.app-menu__menu a:hover {
    background-color: rgba(255,255,255,.1);
}
.logout-btn {
    margin: var(--space-6) 0;
    border-color: rgba(255,255,255,.2);
}
.app-menu__footer {
    max-width: 80%;
    color: rgba(255,255,255,.8);
    font-size: .8rem;
}
</style>