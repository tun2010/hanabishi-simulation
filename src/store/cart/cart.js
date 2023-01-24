import { defineStore } from 'pinia'
import router from '@/router'
import API from '@/api/cart'
import { checkError, getErrorMessages, focusErrorInput } from '@/helpers/form'
import { simuLoading, generateMessage } from '@/helpers/util'
import { messages } from "@/helpers/messages"

import { useAppStore } from '@/store'

export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        busy: false,
        loading: false,
        gender: null,
        category: null,
        items: null,
        summited: false,
        sizeData: null,
        form: {
            sameWithLogin: false,
            sizeUser: '',
            deliveryDate: ''
        },
        sizes: null,
        formError: {
            sameWithLogin: {
                required: false,
                checkError: () => {},
            },
            sizeUser: {
                required: true,
                checkError: (value) => {
                    const [ key ] = [ 'ユーザーID' ]
                    if (!value) return generateMessage(messages.required, [ key ])
                },
            },
            deliveryDate: {
                required: true,
                checkError: (value) => {
                    const [ key ] = [ '納期確認' ]
                    if (!value) return generateMessage(messages.required, [ key ])
                    const today = new Date()
                    const selected = new Date(value)
                    if (selected < today) return generateMessage(messages.delivery_date)
                },
            },
        },
    }),
    getters: {
        isFormError: state => key => {
            if (!(state.summited && state.formError[key].required)) return ''
            return state.formError[key].checkError(state.form[key])
        },
        itemsBusy: state => {
            return state.busy && !state.items
        },
        sizeDataFinished: state => {
            return !!state.sizeData
        },
        itemList: state => {
            if (!state.items) return
            return state.items.sort((a, b) => a.type - b.type)
        },
    },
    actions: {
        async getCartItems() {
            if (this.items) return
            this.busy = true
            const result = await API.getCartItems()
            this.busy = false
            if (!result.success) return
            this.items = result.data
        },
        async getSizeForm() {
            if (this.sizes) return
            this.busy = true
            const result = await API.getSizes()
            this.busy = false
            if (!result.success) return
            this.sizes = result.data
        },
        updateCartData() {

        },
        removeCartItem(data) {
            const app = useAppStore()
            app.showConfirm(
                generateMessage(messages.sure_to_delete),
                () => {
                    app.closeConfirm()
                    this.items = this.items.filter(item => item.id != data.id)
                },
                () => {
                    app.closeConfirm()
                }
            )
        },
        onCheckBoxChange() {
            if (this.form.sameWithLogin) {
                const app = useAppStore()
                this.form.sizeUser = app.staffCode
            }
        },
        async onSumit() {
            this.summited = true
            const isError = checkError(this.form, this.formError)
            const sizeErrors = this.sizes
                                    .filter(item => this.checkSizeError(item))
                                    .map(item => this.checkSizeError(item))
            console.log(isError, sizeErrors)

            const app = useAppStore()
            if (isError || sizeErrors.length) {
                let errorMessages = getErrorMessages(this.form, this.formError)
                if (sizeErrors.length) {
                    const errorMsg = generateMessage(messages.enter_all_sizes)
                    console.log(errorMsg)
                    errorMessages = [ ...errorMessages, errorMsg ]
                }
                for await (const msg of errorMessages) {
                    app.showToast(msg)
                    await simuLoading(200)
                }
                return focusErrorInput()
            }
            this.loading = true
            await simuLoading()
            this.loading = false
            this.sizeData = true
            app.showToast(generateMessage(messages.size_set))
            router.push('/cart')
        },
        toastTest() {
            const messages = [
                'Hello world!',
                'What the weather like today?',
                'Glad to hear!!',
                'Nice to meet you.',
                'A few random items from a recently-scrapped project.'
            ]
            const index = Math.floor(Math.random() * messages.length)
            const app = useAppStore()
            app.showToast(messages[index])
        },
        onSizeChange(el, size) {
            const value = String(size.value)
            if (value.length > 3) {
                this.sizes = [...this.sizes].map(size => ({ ...size, value: String(size.value).slice(0, 3) }))
                el.value = value.slice(0, 3)
            }
        },
        checkSizeError(item) {
            if (!this.summited) return ''
            if (!item.value) return generateMessage(messages.required, [ item.name ])
            if (!/^[0-9]{1,3}$/.test(item.value)) return generateMessage(messages.invalid, [ item.name ])
        },
        increaseQty(id) {
            const app = useAppStore()
            const item = this.items.find(item => item.id == id)
            if (!item) return app.showToast(generateMessage(messages.error_occur))
            
            this.items = this.items.map(item => {
                if (item.id == id) return { ...item, quantity: item.quantity + 1 }
                return item
            })
        },
        decreaseQty(id) {
            const app = useAppStore()
            const [ key, length ] = [ '量', 1 ]
            const item = this.items.find(item => item.id == id)
            if (!item) return app.showToast(generateMessage(messages.error_occur))
            if (item.quantity <= 1) return app.showToast(generateMessage(messages.min_lenght, [ key, length ]))

            this.items = this.items.map(item => {
                if (item.id == id) return { ...item, quantity: item.quantity - 1 }
                return item
            })
        },
        onItemDelete(data) {
            const app = useAppStore()
            return app.showConfirm(
                generateMessage(messages.delete_product),
                async () => {
                    app.closeConfirm()
                    this.loading = true
                    const result = await API.deleteCartItem(data.id)
                    this.loading = false
                    if (!result.success) {
                        return app.showToast(result.message)
                    }
                    app.showToast(generateMessage(messages.item_deleted))
                    this.items = this.items.filter(item => item.id != data.id)
                },
                () => {
                    app.closeConfirm()
                }
            )
        },
        onCheckout() {
            const app = useAppStore()
            if (!this.sizeDataFinished) {
                return app.showAlert(generateMessage(messages.enter_size), () => {
                    app.closeAlert()
                    router.push('/cart/sizes')
                })
            } else {
                return app.showConfirm(
                    generateMessage(messages.sure_to_checkout),
                    async () => {
                        app.closeConfirm()
                        this.loading = true
                        const result = await API.checkoutCart()
                        this.loading = false
                        if (!result.success) {
                            return app.showToast(result.message)
                        } else {
                            router.push('/cart/success')
                        }
                    },
                    () => {
                        app.closeConfirm()
                    }
                )
            }
        }
    }
})