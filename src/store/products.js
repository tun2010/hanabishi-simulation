import { defineStore, storeToRefs } from 'pinia'
import API from '@/api/products'

import { useAppStore } from '.'
import { formatCurrency, generateMessage } from '@/helpers/util'
import { messages } from "@/helpers/messages"

const useProductsStore = defineStore({
    id: 'products',
    state: () => ({
        busy: false,
        model: false,
        products: [],
    }),
    getters: {
        totalPrice: state => {
            return state.products.reduce((value, current) => {
                return (current.price * current.quantity) + value
            }, 0)
        }, 
    },
    actions: {
        async getProduct(code) {
            const errorMsg = this._isCodeValid(code)
            const app = useAppStore()
            if (errorMsg) return app.showToast(errorMsg)

            const is = this.products.find(item => item.code == code)
            if (is) {
                this.increaseQty(code)
                return app.showToast(generateMessage(messages.product_exist))
            }

            this.busy = true
            const result = await API.getProdcutByCode({ code })
            this.busy = false
            if (!result.success) return app.showToast(result.message)

            console.log(result.data)
            const product = result.data
            console.log('PD', product)
            this.products = [ product, ...this.products ]
            this.closeModel()
        },
        openModel() {
            this.model = true
        },
        closeModel() {
            this.model = false
        },
        increaseQty(code) {
            const app = useAppStore()
            const product = this.products.find(item => item.code == code)
            if (!product) return app.showToast(generateMessage(messages.error_occur))
            
            this.products = this.products.map(item => {
                if (item.code == code) return { ...item, quantity: item.quantity + 1 }
                return item
            })
        },
        decreaseQty(code) {
            const app = useAppStore()
            const [ key, length ] = [ '量', 1 ]
            const product = this.products.find(item => item.code == code)
            if (!product) return app.showToast(generateMessage(messages.error_occur))
            if (product.quantity <= 1) return app.showToast(generateMessage(messages.min_lenght, [ key, length ]))

            this.products = this.products.map(item => {
                if (item.code == code) return { ...item, quantity: item.quantity - 1 }
                return item
            })
        },
        removeProduct(code) {
            const app = useAppStore()
            const product = this.products.find(item => item.code == code)
            if (!product) return app.showToast(generateMessage(messages.error_occur))

            app.showConfirm(
                generateMessage(messages.delete_product),
                () => {
                    this.products = this.products.filter(item => item.code != code)
                    app.closeConfirm()
                },
                () => {
                    app.closeConfirm()
                }
            )
        },
        _isCodeValid(code) {
            const [ key ] = [ 'コード' ]
            if (!code) return generateMessage(messages.required, [ key ])
            if (!/^[0-9a-zA-Z]{16,16}$/.test(code)) return generateMessage(messages.invalid, [ key ])
            return ''
        },
    }
})

export function useProducts() {
    const productStore = useProductsStore()
    const { busy, model, code, totalPrice } = storeToRefs(productStore)
    const { openModel, closeModel, getProduct } = productStore

    return {
        busy, 
        model,
        code,
        totalPrice,

        formatCurrency,
        openModel,
        closeModel,
        getProduct,
    }
}

export function useProductList() {
    const productStore = useProductsStore()
    const { products, totalPrice } = storeToRefs(productStore)
    const { increaseQty, decreaseQty, removeProduct } = productStore

    return {
        products,
        totalPrice,

        formatCurrency,
        increaseQty,
        decreaseQty,
        removeProduct,
    }
}