import { defineStore } from 'pinia'
import router from '@/router'
import { simuLoading, triggerEvent, generateMessage } from '@/helpers/util'
import { getErrorMessages } from '@/helpers/form'
import API from '@/api/customer'
import { messages } from "@/helpers/messages"

import { useAppStore } from '.'

export const useCustomerStore = defineStore({
    id: 'customer',
    state: () => ({
        busy: false,
        summited: false,
        emailSummited: false,
        codeSummited: false,
        isAskingCode: false,
        isSearched: false,
        userList: [],
        activeUserId: null,
        searchForm: {
            name: '',
            phone: '',
        },
        userEmail: {
            email: '',
            confirm_code: '',
        },
        searchError: {
            name: {
                required: true,
                message: '',
                checkError: (value) => {
                    const [ key ] = [ 'ID' ]
                    if (!value) return generateMessage(messages.required, [ key ])
                    return ''
                },
            },
            phone: {
                required: true,
                message: '',
                checkError: (value) => {
                    const [ key ] = [ '電話番号' ]
                    if (!value) return generateMessage(messages.required, [ key ])
                    if (!/^[0-9]{9,11}$/.test(value)) return generateMessage(messages.invalid, [ key ])
                    return ''
                },
            },
        },
        emailError: {
            email: {
                required: true,
                message: '',
                checkError: (value) => {
                    const [ key ] = [ 'E-mail' ]
                    if (!value) return generateMessage(messages.required, [ key ])
                    if (!/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(value)) return generateMessage(messages.invalid, [ key ])
                    return ''
                },
            },
            confirm_code: {
                required: true,
                message: '',
                checkError: (value) => {
                    const [ key, lenght ] = [ 'コードを確認する', 6 ]
                    if (!value) return generateMessage(messages.required, [ key ])
                    if (!/^[0-9]{6,6}$/.test(String(value))) return generateMessage(messages.must_length, [ key, lenght ])
                    return ''
                },
            },
        },
    }),
    getters: {
        isSearchError: state => {
            return key => state.summited ? state.searchError[key].checkError(state.searchForm[key]) : ''
        },
        isEmailValid: state => state.emailError.email.checkError(state.userEmail.email),
        isEmailError(state) {
            return state.emailSummited ? this.isEmailValid : ''
        },
        isCodeError: state => {
            return state.codeSummited ? state.emailError.confirm_code.checkError(state.userEmail.confirm_code) : ''
        },
        isEmailButtonValid: state => key => {
            return !state.emailError[key].checkError(state.userEmail[key])
        }
    },
    actions: {
        async searchCustomer() {
            this.summited = true
            const errorMessages = getErrorMessages(this.searchForm, this.searchError)
            if (errorMessages.length) return
            this.busy = true
            const result = await API.searchCustomer(this.searchForm)
            this.busy = false
            this.isSearched = true
            if (!result.success) {
                const app = useAppStore()
                return app.showToast(result.message)
            }
            this.userList = result.data
        },
        resetSearchForm() {
            this.searchForm = {user: '', phone: ''}
        },
        continueWith(customer) {
            const app = useAppStore()
            app.showConfirm(
                generateMessage(messages.select_customer),
                () => {
                    app.closeConfirm()
                    this.setCustomer(customer)
                },
                () => {
                    app.closeConfirm()
                }
            )
        },
        askEmail(id) {
            this.activeUserId = id
        },
        resetUserEmail() {
            this.activeUserId = null
            this.emailSummited = false
            this.codeSummited = false
            this.isAskingCode = false
            this.userEmail = {email: '', confirm_code: ''}
        },
        async updateEmail() {
            this.emailSummited = true
            if (this.isEmailError) return
            const body = {
                customer_id: this.activeUserId,
                email: this.userEmail.email
            }
            this.busy = true
            const result = await API.setConfirmCode(body);
            this.busy = false
            const app = useAppStore()
            if (!result.success) return app.showToast(result.message)
            this.isAskingCode = true
            triggerEvent("code-input", 'touchstart')
        },
        async confirmCode() {
            this.codeSummited = true
            if (this.isCodeError) return
            const body = {
                ...this.userEmail,
                customer_id: this.activeUserId,
            }
            this.busy = true
            const result = await API.setCustomerEmail(body)
            this.busy = false
            const app = useAppStore()
            if (!result.success) return app.showToast(result.message)
            this.userList = this.userList.map(item => {
                if (item.id == this.activeUserId) return {...item, email: this.userEmail.email}
                else return item
            })
            const customer = this.userList.find(item => item.id == this.activeUserId)
            app.showAlert(
                generateMessage(messages.continue_order),
                () => {
                    app.alert = null
                    this.setCustomer({ ...customer, email: this.userEmail.email, saveEmil: true })
                }
            )
        },
        async continueWithoutMail() {
            const customer = this.userList.find(item => item.id == this.activeUserId)
            this.continueWith(customer)
        },
        async setCustomer(customer) {
            this.busy = true
            const result = await API.setCustomer(customer)
            this.busy = false
            const app = useAppStore()
            if (!result.success) return app.showToast(result.message)
            
            app.setCustomer(customer)
            router.push('/order')
        },
        resetCustomer() {
            this.searchForm = {
                name: '',
                phone: '',
            }
            this.summited = false
            this.userList = []
            this.isSearched = false
            this.resetUserEmail()
        }
    }
})