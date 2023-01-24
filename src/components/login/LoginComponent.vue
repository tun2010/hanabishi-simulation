<template>
    <main id="main">
        <div class="login">
            <div class="logo">
                <img src="~@/assets/logo.png" alt="Logo" />
                <p>オーダーシステム名称</p>
            </div>
            <form>
                <div class="myshop-form-group">
                    <label>店舗ID <span class="required">*</span></label>
                    <input type="text" placeholder="John" v-model="form.id" :class="{error: isError('id')}" />
                    <span class="error-msg">{{isError('id')}}</span>
                </div>
                <div class="myshop-form-group">
                    <label>PW <span class="required">*</span></label>
                    <input type="password" placeholder="********" v-model="form.pass" :class="{error: isError('pass')}" />
                    <span class="error-msg">{{isError('pass')}}</span>
                </div>
                <div class="myshop-form-group">
                    <label>社員番号 <span class="required">*</span></label>
                    <input type="text" placeholder="1234" maxlength="4" v-model="form.user" :class="{error: isError('user')}" />
                    <span class="error-msg">{{isError('user')}}</span>
                </div>
            </form>
            <div class="actions">
                <button class="login-btn" @click="login">ログイン</button>
            </div>
        </div>
    </main>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store/auth'


export default {
    name: 'LoginComponent',
    setup() {
        const authStore = useAuthStore()
        const { form, isError } = storeToRefs(authStore)
        const { login } = authStore

        return {
            form,
            isError,
            login
        }
    }
}
</script>

<style scoped>
#main {
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/login-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    padding: var(--space-5);
}
.hero {
    flex: 1;
}
.login {
    width: 100%;
    max-width: 850px;
    padding: var(--space-6);
    background-color: rgba(37,56,97,.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-6);
    transition: background-color .3s ease;
}
.login:hover {
    background-color: rgba(37,56,97,.99);
}
.logo {
    width: 400px;
}
.logo p {
    text-align: center;
    color: var(--c-light);
    margin: var(--space-4) 0 0;
}
form {
    width: 100%;
    max-width: 750px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: var(--space-4);
    color: #fff;
}

.myshop-form-group input {
  border: 1px solid rgba(255,255,255,.9);
}
.myshop-form-group input.error {
  border-color: rgba(255,0,0,.7);
}

/* .myshop-form-group > label {
  color: rgba(30,30,30,.7);
}
.myshop-form-group input {
  border: 1px solid rgba(255,255,255,.9);
  color: rgba(30,30,30,1);
  background-color: rgba(255,255,255,.6);
}
.myshop-form-group input.error {
    border-color: rgba(255,0,0,.8);
    background-color: #eeb3b3;
}
.myshop-form-group input::placeholder {
  color: rgba(30,30,30,.8);
}
.myshop-form-group input:focus,
.myshop-form-group input:hover {
    border: 1px solid rgba(255,255,255,.9);
    background-color: rgba(255,255,255,.8);
} */

.login-btn {
    min-width: 200px;
    padding: 0 var(--space-4);
    height: 42px;
    color: rgba(255,255,255,1);
    border: 1px solid rgba(30,30,30,1);
    background-color: rgba(30,30,30,1);
    transition: all .3s ease;
}
.login-btn:hover,
.login-btn:focus {
    background-color: rgba(30,30,30,.5);
}
</style>