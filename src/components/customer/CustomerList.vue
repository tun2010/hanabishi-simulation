<template>
    <div class="customers">
        <table v-if="userList.length">
            <colgroup>
                <col width="15%">
                <col width="15%">
                <col width="20%">
                <col width="15%">
                <col width="15%">
            </colgroup>
            <thead>
                <tr>
                    <th>お客様番号</th>
                    <th>お客様名</th>
                    <th>電話番号</th>
                    <th>最終購入日</th>
                    <th>選択/解除</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in userList" :key="user.id">
                    <td class="center">{{concatZero(user.id)}}</td>
                    <td class="center">{{user.name}}</td>
                    <td class="center">{{user.phone_number}}</td>
                    <td class="center">{{formatDate(user.last_buy_date, { dateStyle: 'short' })}}</td>
                    <td class="center">
                        <button type="button" v-if="user.email" @click="continueWith(user)" class="tabel--edit">選択 済</button>
                        <button type="button" v-else @click="askEmail(user.id)" class="tabel--edit">選択</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <empty-alert v-else 
            message="顧客が見つかりません"
            height="30vh"
        />
    </div>
</template>

<script>
import { storeToRefs } from 'pinia'
import { useCustomerStore } from '@/store/customer'
import { concatZero, formatDate } from '@/helpers/util'
import EmptyAlert from '../util/EmptyAlert.vue'

export default {
    components: { EmptyAlert },
    name: 'CustomerList',
    setup() {
        const customerStore = useCustomerStore()
        const { userList } = storeToRefs(customerStore)
        const { continueWith, askEmail } = customerStore

        return {
            userList,
            continueWith,
            askEmail,
            concatZero,
            formatDate
        }
    }
}
</script>

<style scoped>
.customers {
    width: 100%;
    padding: var(--space-4);
}
table {
    width: 100%;
    color: rgba(255,255,255,.9);
    border-spacing: 0;
}
table th,
table td {
    padding: var(--space-3) var(--space-1);
    font-size: .9rem;
    text-align: center;
    vertical-align: middle;
}
table th {
    padding: var(--space-1);
}
table tbody tr td {
    border-top: 1px solid rgba(255,255,255,.06);
}
table tbody tr:first-child td {
    border-top: 1px solid var(--border-color);
}
table tbody tr:last-child td {
    border-bottom: 1px solid var(--border-color);
}
table tbody tr:hover {
    background-color: rgba(255,255,255,.02);
}
.tabel--edit {
    width: 80px;
    height: 36px;
    padding: 0;
    font-size: .8rem;
    color: rgba(255,255,255,1);
    background-color: rgba(255,255,255,.1);
}
</style>