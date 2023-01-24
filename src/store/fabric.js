import { defineStore, storeToRefs } from 'pinia'
import API from '@/api/order-history'
import { onMounted } from 'vue'

import { useAppStore } from '..'
import { formatCurrency, generateMessage, formatDate } from '@/helpers/util'
import { getErrorMessages, getErrorMesssage } from '@/helpers/form'
import { messages } from "@/helpers/messages"

const useFabricStore = defineStore({
    id: 'fabric-list',
    state: () => ({
        busy: false,
        showCriteria: false,
        formData: {},
        form: {
            fabric_name: '',
            fabric_brand: null,
            category: null,
            color_number: null,
            pattern: null,
            material: null,
            season: null,
        },
        error: {
            fabric_name: {
                required: false,
                message: '',
                checkError: (value) => {
                    // const [ key ] = [ 'お客様名' ]
                    if (!value) return ''
                    // if (!value) return generateMessage(messages.required, [ key ])
                    // if (!/^[ァ-ヶｦ-ﾟー]+$/u.test(value)) return generateMessage(messages.only_kana)
                    return ''
                },
            },
            fabric_brand: {
                required: false,
                message: '',
                checkError: (value) => {
                    return ''
                },
            },
            category: {
                required: false,
                message: '',
                checkError: (value) => {
                    return ''
                },
            },
            color_number: {
                required: false,
                message: '',
                checkError: (value) => {
                    return ''
                },
            },
            pattern: {
                required: false,
                message: '',
                checkError: (value) => {
                    return ''
                },
            },
            material: {
                required: false,
                message: '',
                checkError: (value) => {
                    return ''
                },
            },
            season: {
                required: false,
                message: '',
                checkError: (value) => {
                    return ''
                },
            },
        },
        keys: {
            fabric_name: '',
            fabric_brand: '生地ブランド',
            category: 'カテゴリ',
            color_number: 'カラーナンバー',
            pattern: 'パターン',
            material: '素材',
            season: 'シーズン',
        },
        histories: [],
        params: {},
    }),
    getters: {
        getKeyName: state => key => state.keys[key],
    },
    actions: {
        async fetchFabricSearchOptions() {
            if (this.formData.categories) return
            this.busy = true
            const result = await API.getOrderHistorySearchOptions()
            this.busy = false
            if (!result.success) return
            this.formData = result.data
        },
        async fetchHistories() {
            this.busy = true
            const result = await API.getOrderHistories(this.form)
            this.busy = false
            const app = useAppStore()
            if (!result.success) return app.showToast(result.message)
            this.histories = result.data
        },
        checkFormError() {
            const errorMessages = getErrorMessages(this.form, this.error)
            console.log(errorMessages)
            return !!errorMessages.length
        },
        openCriteria() {
            this.showCriteria = true
            this.form = {  
                ...this.form,
                ...this.params 
            }
        },
        closeCriteria() {
            this.showCriteria = false
        },
        handleInput(key) {
            if (key == 'category') {
                this.form.model = null
            }
            if (key == 'area') {
                this.form.store = null
            }
            setTimeout(() => {
                this.error[key].message = getErrorMesssage(this.form[key], this.error[key])
            }, 0)
        },
        sumitSearch() {
            console.log(this.form)
            const isError = this.checkFormError()
            if (isError) return 
            this.params = { ...this.form }
            this.fetchHistories()
            this.closeCriteria()
        },
        budgeRemove(key) {
            this.params[key] = ''
            if (key == 'category') {
                this.params.model = null
            }
            if (key == 'area') {
                this.params.store = null
            }
            this.fetchHistories()
        }
    }
})

export function useOrderHistory() {
    const orderHistoryStore = useOrderHistoryStore()

    const { busy, showCriteria, selected, getKayName } = storeToRefs(orderHistoryStore)
    const {
        openCriteria,
        budgeRemove,
    } = orderHistoryStore

    return {
        busy,
        showCriteria,
        selected,
        getKayName,

        budgeRemove,
        openCriteria,
    }
}

export function useSearchCriteria() {
    const orderHistoryStore = useOrderHistoryStore()

    const { busy, form, error, formData, models, stores } = storeToRefs(orderHistoryStore)
    const {
        closeCriteria,
        fetchOrderHistorySearchOptions,
        handleInput,
        sumitSearch,
    } = orderHistoryStore

    onMounted(() => {
        fetchOrderHistorySearchOptions()
    })

    return {
        busy,
        form,
        error,
        formData,
        models,
        stores,

        handleInput,
        closeCriteria,
        sumitSearch,
    }

}

export function useHistoryList() {
    const orderHistoryStore = useOrderHistoryStore()

    const { busy, histories } = storeToRefs(orderHistoryStore)

    return {
        busy,
        histories,
    }
}

