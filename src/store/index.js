import { defineStore } from 'pinia'
import APP from '@/api'
import router from '@/router'
import Toast from '@/helpers/toast'

export const useAppStore = defineStore({
    id: 'app',
    state: () => ({
        busy: false,
        alert: null,
        confirm: null,
        appShop: null,
        appUser: null,
        appCustomer: null,
        orderGender: null, // 1: Mens, 2: Ladies
    }),
    getters: {
        staffCode: state => state.appUser?.staff_code || '',
    },
    actions: {
        showAlert(message, onClose) {
            this.alert = { message, onClose }
        },
        closeAlert() {
            this.alert = null
        },
        async showConfirm(message, onConfirm, onCancel) {
            this.confirm = { message, onConfirm, onCancel }
        },
        closeConfirm() {
            this.confirm = null
        },
        async showToast(message) {
            await Toast(message)
            console.log('toast')
        },
        async getInitinalData() {
            const result = await APP.getInitinal()
            if (!result.success) return this.showToast(result.message)
            console.log(result)
            const { shop, staff, customer } = result.data
            this.appShop = shop
            this.appUser = staff
            this.appCustomer = customer
        },
        setCustomer(customer) {
            this.appCustomer = customer
        },
        async setOrderGender(gender, route) {
            this.orderGender = gender
            if (gender) {
                this.busy = true
                const result = await APP.setGender(gender)
                this.busy = false
                if (!result.success) return this.showToast(result.message)
            }
            router.push(route)
        }
    }
})
