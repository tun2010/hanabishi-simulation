<template>
    <form @submit.prevent="searchCustomer">
        <div class="myshop-form-group">
            <label>お名前 <span class="required">*</span></label>
            <input type="text" placeholder="" v-model="searchForm.name" :class="{error: isSearchError('name')}" />
            <span class="error-msg">{{isSearchError('name')}}</span>
        </div>
        <div class="myshop-form-group">
            <label>電話番号 <span class="required">*</span></label>
            <input type="text" placeholder="" maxlength="11" v-model="searchForm.phone" :class="{error: isSearchError('phone')}" />
            <span class="error-msg">{{isSearchError('phone')}}</span>
        </div>
        <div class="form-actions">
            <button type="button" @click="resetSearchForm" class="myshop-btn myshop-btn--outline">クリア</button>
            <button type="submit" class="myshop-btn myshop-btn--primary">検索</button>
        </div>
    </form>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useCustomerStore } from '@/store/customer'

export default {
    name: 'SearchCustomer',
    setup() {
        const customerStore = useCustomerStore()
        const { searchForm, isSearchError } = storeToRefs(customerStore)
        const { resetSearchForm, searchCustomer } = customerStore

        return {
            searchForm,
            isSearchError,
            resetSearchForm,
            searchCustomer,
        }
    }
}
</script>

<style scoped>
form {
    padding: var(--space-4);
    padding-top: calc(var(--space-5) * 2);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
}
.form-actions {
    grid-column: 1 / span 2;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    gap: var(--space-4);
}
</style>