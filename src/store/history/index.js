import { defineStore, storeToRefs } from 'pinia'
import API from '@/api/order-history'
import { onMounted } from 'vue'

import { useAppStore } from '..'
import { formatCurrency, generateMessage, formatDate } from '@/helpers/util'
import { getErrorMessages, getErrorMesssage } from '@/helpers/form'
import { messages } from "@/helpers/messages"
import useScroll from '../scroll'

const useOrderHistoryStore = defineStore({
    id: 'order-history',
    state: () => ({
        busy: false,
        model: false,
        showCriteria: false,
        formData: {},
        scrollTop: 0,
        form: {
            customer_name: '',
            employee_number: '',
            category: null,
            model: null,
            order_date_start: null,
            order_date_end: null,
            arrival_date_start: null,
            arrival_date_end: null,
            status: false,
            area: false,
            store: false,
        },
        error: {
            customer_name: {
                required: false,
                message: '',
                checkError: (value) => {
                    // const [ key ] = [ 'お客様名' ]
                    if (!value) return ''
                    // if (!value) return generateMessage(messages.required, [ key ])
                    if (!/^[ァ-ヶｦ-ﾟー]+$/u.test(value)) return generateMessage(messages.only_kana)
                    return ''
                },
            },
            employee_number: {
                required: false,
                message: '',
                checkError: (value) => {
                    const [ key ] = [ 'ハウスカード番号' ]
                    if (!value) return ''
                    if (!/^[0-9]{4,11}$/.test(value)) return generateMessage(messages.invalid, [ key ])
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
            model: {
                required: false,
                message: '',
                checkError: (value) => {
                    return ''
                },
            },
            order_date_start: {
                required: false,
                message: '',
                args: ['order_date_end'],
                checkError: (value, ...args) => {
                    const [ key, otherKey ] = ['start', 'end']
                    if (!(value && args[0])) return ''
                    if (value >= args[0]) return generateMessage(messages.greater_than, [key, otherKey])
                    return ''
                },
            },
            order_date_end: {
                required: false,
                message: '',
                args: ['order_date_start'],
                checkError: (value, ...args) => {
                    const [ key, otherKey ] = ['end', 'start']
                    if (!(value && args[0])) return ''
                    if (value <= args[0]) return generateMessage(messages.less_than, [key, otherKey])
                    return ''
                },
            },
            arrival_date_start: {
                required: false,
                message: '',
                args: ['arrival_date_end'],
                checkError: (value, ...args) => {
                    const [ key, otherKey ] = ['start', 'end']
                    if (!(value && args[0])) return ''
                    if (value <= args[0]) return generateMessage(messages.less_than, [key, otherKey])
                    return ''
                },
            },
            arrival_date_end: {
                required: false,
                message: '',
                args: ['arrival_date_start'],
                checkError: (value, ...args) => {
                    const [ key, otherKey ] = ['end', 'start']
                    if (!(value && args[0])) return ''
                    if (value <= args[0]) return generateMessage(messages.less_than, [key, otherKey])
                    return ''
                },
            },
            status: {
                required: false,
                message: '',
                checkError: (value) => {
                    return ''
                },
            },
            area: {
                required: false,
                message: '',
                checkError: (value) => {
                    return ''
                },
            },
            store: {
                required: false,
                message: '',
                checkError: (value) => {
                    return ''
                },
            },
        },
        keys: {
            customer_name: 'お客様名',
            employee_number: '担当者社員番号',
            category: 'カテゴリ',
            model: 'スタイル',
            order_date_start: '受注日(始める)',
            order_date_end: '受注日(終わり)',
            arrival_date_start: '店舗到着日(始める)',
            arrival_date_end: '店舗到着日(終わり)',
            status: 'ステータス',
            area: 'エリアを選択',
            store: '店舗を選択',
        },
        histories: [],
        historyMeta: null,
        params: {},
    }),
    getters: {
        models: state => {
            if (!state.form.category) return null 
            const selectedCategory = state.formData.categories.find(item => item.id == state.form.category)
            if (selectedCategory) return selectedCategory.models
            return null
        },
        stores: state => {
            if (!state.form.area) return null 
            const selectedCategory = state.formData.areas.find(item => item.id == state.form.area)
            if (selectedCategory) return selectedCategory.stores
            return null
        },
        selected(state) {
            let newForm = { ...state.params }
            const getValue = (key, value) => {
                if (key == 'category') {
                    const data = state.formData.categories.find(item => item.id == value)
                    return data.name
                }
                if (key == 'model') {
                    const data = this.models.find(item => item.id == value)
                    return data.name
                }
                if (key.includes('date')) {
                    return formatDate(value)
                }
                if (key == 'status') {
                    const data = state.formData.status.find(item => item.id == value)
                    return data.name
                }
                if (key == 'area') {
                    const data = state.formData.areas.find(item => item.id == value)
                    return data.name
                }
                if (key == 'store') {
                    const data = this.stores.find(item => item.id == value)
                    return data.name
                }
                return value
            }

            return Object.entries(newForm)
                .filter(([key, value]) => {
                    if (Array.isArray(value)) return value.length
                    return value
                })
                .map(([key, value]) => {
                    if (value) {
                        return { key, value: getValue(key, value) }
                    }
                    return
                })
        },
        getKayName: state => key => state.keys[key],
        
    },
    actions: {
        async fetchOrderHistorySearchOptions() {
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
            this.historyMeta = result.meta
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
        },
        setScrollTop(pos) {
            this.scrollTop = pos
        }
    }
})

export function useOrderHistory() {
    const orderHistoryStore = useOrderHistoryStore()

    const { busy, scrollTop, showCriteria, selected, historyMeta, getKayName } = storeToRefs(orderHistoryStore)
    const { 
        openCriteria,
        budgeRemove,
        setScrollTop,
    } = orderHistoryStore

    useScroll('order-history', scrollTop, setScrollTop)

    return {
        busy,
        showCriteria,
        selected,
        historyMeta,
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

