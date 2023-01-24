import { defineStore, storeToRefs } from 'pinia'
import API from '@/api/order-history'
import { onMounted, onBeforeUnmount } from 'vue'

import { useAppStore } from '..'
import { formatCurrency, generateMessage, formatDate, simuLoading } from '@/helpers/util'
import { getErrorMessages, getErrorMesssage, focusErrorInput } from '@/helpers/form'
import { messages } from "@/helpers/messages"

const useOrderHistoryDetailStore = defineStore({
    id: 'order-history-detail',
    state: () => ({
        busy: false,
        sizeBusy: false,
        loading: false,
        history: null,
        summited: true,
        sizeToggle: false,
        sizes: null,
    }),
    getters: {
        getProduct: state => {
            if (!state.history) return {}
            return state.history.product
        },
        getItem: state => id => {
            if (!state.history) return ''
            return state.history.product.items.find(item => item.id == id)
        },
        getProducts: state => {
            if (!state.history) return []
            return state.history.items.map(item => ({
                ...item,
            }))
        },
    },
    actions: {
        async fetchHistory() {
            this.history = null
            this.busy = true
            const result = await API.getOrderHistory(this.form)
            this.busy = false
            const app = useAppStore()
            if (!result.success) return app.showToast(result.message)
            this.history = result.data
        },
        async getSizeForm() {
            if (this.sizes) return
            this.sizeBusy = true
            const result = await API.getSizes() // order_id
            this.sizeBusy = false
            if (!result.success) return
            this.sizes = result.data
        },
        async onSizesSumit() {
            const isError = await this.checkAllSizesError()

            if (isError) return
            this.loading = true
            await simuLoading()
            this.loading = false
            const app = useAppStore()
            app.showToast(generateMessage(messages.size_set))
            this.sizeToggle = false
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
        async checkAllSizesError() {
            const sizeErrors = this.sizes
                                .filter(item => this.checkSizeError(item))
                                .map(item => this.checkSizeError(item))
            
            const app = useAppStore()
            if (sizeErrors.length) {
                for await (const msg of sizeErrors) {
                    app.showToast(msg)
                    await simuLoading(200)
                }
                focusErrorInput()
                return true
            }
            return false
        },
        async onOpenSize() {
            this.sizeToggle = true 
            this.getSizeForm()
        },
        async onCloseSize() {
            const isError = await this.checkAllSizesError()
            if (isError) return
            this.sizeToggle = false
        },
        reset() {
            console.log("RESET")
            this.history = null
            this.sizeToggle = false
            this.sizes = null
        }
    }
})

export function useHistoryDetailComp() {
    const orderHistoryStore = useOrderHistoryDetailStore()

    const { busy, history, getProduct } = storeToRefs(orderHistoryStore)
    const { fetchHistory, reset } = orderHistoryStore

    onMounted(async () => {
        await fetchHistory()
    })

    onBeforeUnmount(() => {
        reset()
    })

    return {
        busy,
        history,
        getProduct,
    }
}

export function useHistoryDetail() {
    const orderHistoryStore = useOrderHistoryDetailStore()

    const { 
        busy,  
        getProduct,
        getItem,
        sizeToggle,
        getProducts,
    } = storeToRefs(orderHistoryStore)
    const { onOpenSize } = orderHistoryStore

    return {
        busy,
        getProduct,
        getItem,
        getProducts,
        sizeToggle,

        onOpenSize,
    }
}

export function useHistoryDetailSizes(context) {
    const orderHistoryStore = useOrderHistoryDetailStore()

    const { 
        sizeBusy,
        loading,
        sizes,
        summited,
    } = storeToRefs(orderHistoryStore)
    const { onSizeChange, onCloseSize, onSizesSumit } = orderHistoryStore

    return {
        sizeBusy,
        loading,
        sizes,
        summited,

        onCloseSize,
        onSizeChange,
        onSizesSumit,
    }
}
