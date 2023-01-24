import { defineStore, storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import API from '@/api/simulator'
import { useAppStore } from '@/store/index'
import { generateMessage, isEmptyObject } from '@/helpers/util'
import { messages } from "@/helpers/messages"
import HELPER from './helper'
import { FABRIC } from './const'

const useShirtSimulatorStore = defineStore({
    id: 'shirt-simulator',
    state: () => ({
        busy: true,
        optionBusy: false,
        toggle: false,

        orderId: 0, // new order = 0
        gender: null,
        category: null,
        product: null,
        option_categories: null,
        fabrics: null,
        option_items: {},

        selectedOptionCategoryId: null,
        selectedOptionItem: {},

        tempOptionItem: null,
    }),
    getters: {
        optionCategories: state => {
            if (!state.option_categories) return [ ]
            return [
                ...state.option_categories.map(item => ({ ...item, value: state._getOptionItemName(item.id) })),
            ]
        },
        optionItems: state => {
            return state.option_items[state.selectedOptionCategoryId]
        },
        currentOptionCategory: state => {
            if (!state.selectedOptionCategoryId && state.option_categories) return {}
            const currentOptionCategory = state.option_categories.find(item => item.id == state.selectedOptionCategoryId)
            return currentOptionCategory || {}
        },
        currentItem: state => {
            return state.tempOptionItem || state._getOptionItem(state.selectedOptionCategoryId)
        },
    },
    actions: {
        async getSimulator(id) {
            this.busy = true
            const result = await API.getShirtSimulator({ order_id: id })
            this.busy = false
            if (!result.success) {
                const app = useAppStore()
                return app.showToast(result.message)
            }
            console.log('RES_', result.data);
            const d = result.data
            const orderId = d.id || id

            // check simulation is the same or reset
            const isTheSame = HELPER.isTheSameShirtOrder({
                orderId: this.orderId,
                genderId: this.gender?.id,
                categoryId: this.category?.id,
                productId: this.product?.id
            }, {
                orderId,
                genderId: d.gender.id,
                categoryId: d.category.id,
                productId: d.product.id
            })
            if (!isTheSame) {
                this.resetSimulator()
            }
            
            this.orderId = orderId
            this.gender = d.gender
            this.category = d.category
            this.product = d.product
            this.option_categories = d.option_categories
            if (!isTheSame) {
                this.selectedOptionItem = d.default_option_items
            }

        },
        async getOptionItems(id) {
            if (this.option_items[id]) return
            const body = {
                option_category: id,
            }
            this.optionBusy = true
            const result = await API.getShirtOptionItems(body)
            this.optionBusy = false
            if (!result.success) {
                const app = useAppStore()
                return app.showToast(result.message)
            }
            console.log(result.data)
            if (!this.selectedOptionCategoryId) return
            this.option_items[id] = result.data
        },
        toggleSimulation() {
            this.toggle = !this.toggle
        },
        setOptionCategory(id) {
            this.selectedOptionCategoryId = id
        },
        selectOptionItem(item) {
            if (this.selectedOptionCategoryId == FABRIC) this.tempShiruetto = { ...item, parent_id: FABRIC }
            this.tempOptionItem = { ...item }
        },
        closeOptionItem() {
            this.tempOptionItem = null
            this.selectedOptionCategoryId = null
        },
        saveOptionItem(item) {
            const app = useAppStore()
            
            if (this.selectedOptionCategoryId == FABRIC) {
                
            } else {
                if (isEmptyObject(item)) return app.showToast(generateMessage(messages.select, [ this.currentOptionCategory.name ]))

                this._setOptionItem({ ...item })
                this.closeOptionItem()
            }
        },
        saveSimulation() {
            console.log(this.orderId)
            console.log(this.gender)
            console.log(this.category)
            console.log(this.product)
            console.log(this.selectedOptionItem)
        },


        resetSimulator() {
            this.orderId = 0
            this.gender = null
            this.category = null
            this.product = null
            this.option_categories = null
            this.fabric = null
            this.option_items = {}

            this.selectedOptionCategoryId = null
            this.selectedOptionItem = {}
        },
        _getOptionItemName(parent_id) {
            return this._getOptionItem(parent_id)?.name || ''
        },
        _getOptionItem(parent_id) {
            return this.selectedOptionItem[parent_id] || {}
        },
        _setOptionItem(value) {
            this.selectedOptionItem[value.parent_id] = value
        }
    }
})

export function useShirtSimulator() {
    const route = useRoute()
    const shirtSimulatorStore = useShirtSimulatorStore()

    const {
        busy,
        optionBusy,
        toggle,

        gender,
        category,
        product,

        selectedOptionCategoryId,
        
        optionCategories,
        optionItems,
        currentOptionCategory,
        currentItem,
    } = storeToRefs(shirtSimulatorStore)
    const {
        getSimulator,
        toggleSimulation,
        setOptionCategory,
        getOptionItems,

        selectOptionItem,
        closeOptionItem,
        saveOptionItem,
        saveSimulation,
    } = shirtSimulatorStore

    onMounted(() => {
        const id = route.query.id || 0
        getSimulator(id)
    })

    function handleOptionCategorySelect(item) {
        setOptionCategory(item.id)
        getOptionItems(item.id)
    }

    function handleOptionItemSelect(item) {
        selectOptionItem(item)
    }

    function handleOptionItemClose() {
        closeOptionItem()
    }

    function handleOptionItemSave(item) {
        saveOptionItem(item)
    }

    return {
        busy,
        optionBusy,
        toggle,

        selectedOptionCategoryId,

        optionCategories,
        optionItems,
        currentOptionCategory,
        currentItem,
        
        gender,
        category,
        product,

        toggleSimulation,
        handleOptionCategorySelect,
        handleOptionItemSelect,
        handleOptionItemClose,
        handleOptionItemSave,
        saveSimulation,
    }
}