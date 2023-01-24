<template>
    <div class="cart-sizes">
        <div class="scroll-view scroll-view--y">
            <form @submit.prevent="onSumit">
                <h2 class="cart-title">測定担当</h2>
                <div class="sizes-user">
                    <label class="checkbox-label">
                        <input type="checkbox" 
                            v-model="form.sameWithLogin" 
                            @change="onCheckBoxChange" >
                        <span>営業担当者と同じ</span>
                    </label>
                    <div class="myshop-form-group size-user-input">
                        <label>測定担当</label>
                        <input type="text" 
                            v-model="form.sizeUser" 
                            :readonly="form.sameWithLogin" 
                            :class="{error: isFormError('sizeUser')}"
                        />
                        <button type="button" 
                            class="myshop-btn btn-customize" 
                            :disabled="form.sameWithLogin"
                            @click="toastTest"
                        >確認</button>
                    </div>
                    <span class="error-msg">{{ isFormError('sizeUser') }}</span>
                </div>
                <h2 class="cart-title">修正值・正面寸法入力</h2>
                <div class="loading-container" v-if="busy">
                    <inline-loading />
                </div>
                <sizes-inputs 
                    v-else
                    :sizes="sizes" 
                    :summited="summited" 
                    @change="onSizeChange" 
                />
                <h2 class="cart-title">納期 確認</h2>
                <div class="myshop-form-group date-picker">
                    <input type="date" 
                        v-model="form.deliveryDate" 
                        :class="{error: isFormError('deliveryDate')}"
                    />
                    <span class="error-msg">{{ isFormError('deliveryDate') }}</span>
                </div>
            </form>
        </div>
        <div class="content-footer">
            <router-link to="/cart" class="myshop-btn myshop-btn--outline arrow-start">注文アイテム</router-link>
            <button class="myshop-btn myshop-btn--light" @click="onSumit">入力内容確認</button>
        </div>
        <absolute-loading v-if="loading" />
    </div>
</template>

<script>
import { useSize } from '@/store/cart'

import AbsoluteLoading from '../util/AbsoluteLoading.vue'
import SizesInputs from './SizesInputs.vue'
import InlineLoading from '../util/InlineLoading.vue'
export default {
    components: { 
        AbsoluteLoading,
        SizesInputs,
        InlineLoading,
    },
    name: 'SizeComponent',
    setup() {
        return useSize()
    }
}
</script>

<style scoped>
.cart-sizes {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: minmax(0, 1fr) 90px;
    /* background-color: var(--primary); */
    position: relative;
}
.scroll-view::-webkit-scrollbar-track {
  background-color: var(--bg-gray);
}
.loading-container {
    /* height: 80vh; */
    height: 200px;
}
.cart-title {
    margin: 0;
    padding: 0 var(--space-4);
    color: rgba(255,255,255,.8);
    font-size: 1.6rem;
    height: 94px;
    display: flex;
    align-items: flex-end;
}
form {
    padding: 26px 0;
}
.sizes-user {
    padding: var(--space-4);
}
.checkbox-label {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: var(--space-2);
    color: rgba(255,255,255,1);
}
input[type=checkbox] {
    width: 24px;
    height: 24px;
    border: 2px solid var(--border);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .2s ease;
    opacity: 1;
    margin: 0;
    border-radius: 2px;
}
input[type=checkbox]::before {
    content: '\2713';
    color: var(--primary);
    font-size: 1.2rem;
    transform: scale(0);
    transition: transform .3s ease;
}
input[type=checkbox]:checked {
    background-color: rgba(255,255,255,.8);
}
input[type=checkbox]:checked::before {
    transform: scale(1);
}
.size-user-input {
    flex-direction: row;
    max-width: calc(50% + 100px);
    margin-top: var(--space-3);
}
.btn-customize {
    height: 50px;
    min-width: 100px;
    background-color: var(--border);
    color: rgba(0,0,0,1);
}
.content-footer {
    border-top: 1px solid var(--border-color);
    padding: 0 var(--space-4);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: var(--space-4);
}
.date-picker {
    padding: var(--space-4);
    padding-bottom: var(--space-6);
}
input[type=date] {
    max-width: 50%;
    border: 1px solid var(--border-color);
    color: var(--color);
    padding: 0 var(--space-2);
    height: 50px;
    background-color: transparent;
    width: 100%;
    outline: none;
    color: rgba(255,255,255,1);
    font-size: .9rem;
    background-color: rgba(255,255,255,.05);
}
</style>
