import { defineStore, storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import API from '@/api/simulator'
import { useAppStore } from '@/store/index'
import { generateMessage, isEmptyObject } from '@/helpers/util'
import { messages } from "@/helpers/messages"
import { CATEGORY_SHIRUETTO, SHIRUETTO, FABRIC, MAIN_OPTION } from './const'
import HELPER from './helper'

const useSuitSimulatorStore = defineStore({
    id: 'suit-simulator',
    state: () => ({
        busy: true,
        optionBusy: false,
        toggle: false, // Toggle view for landscape

        orderId: 0, // new order = 0
        gender: null,
        category: null,
        combination: null,
        products: [],
        shiruetto: null,
        option_categories: {},
        shiruetto_product_option: null,
        fabrics: null,
        models: {},
        option_items: {},

        selectedProductId: null,
        selectedOptionCategoryId: null,
        selectedShiruetto: null,
        modelFinderOptionCategory: {},
        selectedOptionItem: {},

        tempShiruetto: null,
        tempOptionItem: null,
    }),
    getters: {
        optionCategories: state => {
            if (!state.selectedShiruetto) return [ CATEGORY_SHIRUETTO ]
            const shiruetto = { ...CATEGORY_SHIRUETTO, value: state.currentShiruetto?.name }
            const result = state.currentShiruetto?.ShiruettoProductName.find(item => item.product_name_id == state.selectedProductId)
            if (!result) return [ shiruetto ]
            // const mainValue = state.selectedOptionItem[state.selectedProductId] ? state.selectedOptionItem[state.selectedProductId][result.SuitOptionCategory.id].name : ''
            const optionCategory = { 
                id: result.SuitOptionCategory.id,
                option_category_name: result.SuitOptionCategory.option_category_name,
                parent_option_category: null,
                value: state._getOptionItemName(state.selectedProductId, result.SuitOptionCategory.id),
                isMainOption: true
            }
            let childOptions = [];
            if (state.option_categories[state.selectedProductId]) {
                childOptions = state.option_categories[state.selectedProductId].map(item => ({
                    id: item.id,
                    option_category_name: item.option_category_name,
                    parent_option_category: item.parent_option_category,
                    value: state._getOptionItemName(state.selectedProductId, item.id),
                    isMainOption: false
                }))
            }
            return [
                shiruetto,
                optionCategory,
                ...childOptions,
            ]
        },
        optionItems: state => {
            if (
                state.selectedOptionCategoryId == SHIRUETTO
                || state.selectedOptionCategoryId == FABRIC
            ) return []
            return state.option_items[state.selectedOptionCategoryId]
        },
        currentShiruetto: state => {
            return state.tempShiruetto || state.selectedShiruetto || {}
        },
        currentOptionCategory: state => {
            if (!state.selectedOptionCategoryId) return {}
            let currentOptionCategory = {}
            if (state.selectedProductId == MAIN_OPTION) {
                currentOptionCategory = state.optionCategories.find(item => item.id == MAIN_OPTION)
            } else {
                // currentOptionCategory = state.option_categories[state.selectedProductId]?.find(item => item.id == state.selectedOptionCategoryId)
            }
            console.log(currentOptionCategory);
            return currentOptionCategory || {}
        },
        currentItem: state => {
            return state.tempOptionItem || state._getOptionItem(state.selectedProductId, state.selectedOptionCategoryId)
        },
    },
    actions: {
        async getSimulator(id) {
            this.busy = true
            const result = await API.getSuitSimulator({ order_id: id })
            this.busy = false
            if (!result.success) {
                const app = useAppStore()
                return app.showToast(result.message)
            }
            console.log(result.data);
            const d = result.data
            const orderId = d.id || id
            // check simulation is the same or reset
            const isTheSame = HELPER.isTheSameSuitOrder({
                orderId: this.orderId,
                genderId: this.gender?.id,
                combineId: this.combination?.id
            }, {
                orderId,
                genderId: d.gender.id,
                combineId: d.combination.id
            })
            if (!isTheSame) this.resetSimulator()
            
            this.orderId = orderId
            this.gender = d.gender
            this.category = d.category
            this.combination = d.combination
            this.products = d.products
            this.shiruetto = d.shiruetto
            // this.option_categories = d.option_categories
            // this.shiruetto_product_option = d.shiruetto_product_option

            this.selectedProductId = this.products[0]?.id
        },
        async _getOptionCategories(product_id, parent_id) {
            console.log('GETTING OPTION CATEGORY')
            if (this.option_categories[this.selectedProductId]) {
                return console.log('OPTION CATEGORY EXIST')
            }
            const body = {
                product_id,
                parent_id
            }
            this.busy = true
            const result = await API.getSuitOptionCategories(body)
            this.busy = false
            if (!result.success) {
                const app = useAppStore()
                return app.showToast(result.message)
            }
            console.log('OPTION_CARTEGORIES::', result.data)
            this.option_categories[this.selectedProductId] = result.data
        },
        async _getOptionItems(id) {
            const body = {
                option_category: id,
            }
            this.optionBusy = true
            const result = await API.getSuitOptionItems(body)
            this.optionBusy = false
            if (!result.success) {
                const app = useAppStore()
                return app.showToast(result.message)
            }
            console.log(result.data)
            if (!id) return
            this.option_items[id] = result.data
        },
        async _getSuitModel(product_id, shiruetto, option_category_id, option_item_id) {
            const body = {
                product_id,
                shiruetto,
                option_category_id,
                option_item_id,
            }
            this.busy = true
            const result = await API.getSuitModel(body)
            this.busy = false
            if (!result.success) {
                const app = useAppStore()
                return app.showToast(result.message)
            }
            console.log(result.data)
            if (!product_id) return
            this.models[product_id] = formatModel(result.data)
        },
        async getOptionItems(id) {
            if (id == SHIRUETTO) return
            if (id == FABRIC) {
                // GET FABRIC
                console.log('GET FABRIC')
            } else {
                // GET OPTION
                if (this.option_items[id]) return
                await this._getOptionItems(id)
            }
        },
        async saveSimulation() {
            console.log(this.orderId)
            console.log(this.gender)
            console.log(this.category)
            console.log(this.products)
            console.log(this.selectedShiruetto)
            console.log(this.modelFinderOptionCategory)
            console.log(this.selectedOptionItem)
        },
        toggleSimulation() {
            this.toggle = !this.toggle
        },
        setOptionCategory(id) {
            this.selectedOptionCategoryId = id
        },
        selectOptionItem(item) {
            if (this.selectedOptionCategoryId == SHIRUETTO) this.tempShiruetto = { ...item, parent_id: SHIRUETTO }
            else this.tempOptionItem = { ...item }
        },
        closeOptionItem() {
            if (this.selectedOptionCategoryId == SHIRUETTO) this.tempShiruetto = null
            this.tempOptionItem = null
            this.selectedOptionCategoryId = null
        },
        saveOptionItem(item) {
            const app = useAppStore()
            
            if (this.selectedOptionCategoryId == SHIRUETTO) {
                if (isEmptyObject(item)) return app.showToast(generateMessage(messages.select, [ 'シルエット' ]))
                
                if (
                    HELPER.isShiruettoChange(this.tempShiruetto, this.selectedShiruetto) 
                    && !isEmptyObject(this.selectedOptionItem)
                ) {
                    app.showConfirm(
                        generateMessage(messages.data_reset),
                        () => {
                            this.selectedShiruetto = { ...item, parent_id: SHIRUETTO }
                            this.resetOptions()

                            app.closeConfirm()
                            this.closeOptionItem()
                        },
                        () => {
                            this.tempShiruetto = null
                            app.closeConfirm()
                            // this.closeOptionItem()
                        }
                    )
                } else {
                    this.selectedShiruetto = { ...item, parent_id: SHIRUETTO }
                    this.closeOptionItem()
                }
            } else if(this._isMainOption(this.selectedOptionCategoryId)) {
                if (isEmptyObject(item)) return app.showToast(generateMessage(messages.select, [ this.currentOptionCategory.name ]))

                if (
                    !HELPER.isSameModelOption(this._getOptionItem(this.selectedProductId, this.selectedOptionCategoryId), item)
                    && HELPER.isOptionSelected(this.selectedOptionItem, this.selectedProductId, item.parent_id)
                ) {
                    app.showConfirm(
                        generateMessage(messages.option_reset),
                        () => {
                            this.resetProductOptions(this.selectedProductId)
                            this._setOptionItem(this.selectedProductId, { ...item })
                            this._manangeModelData(this.selectedProductId, this.selectedShiruetto.id, item.parent_id, item.id)
    
                            app.closeConfirm()
                            this.closeOptionItem()
                        },
                        () => {
                            this.tempOptionItem = null //this._getOptionItem(this.selectedProductId, this.selectedOptionItem)
                            app.closeConfirm()
                            // this.closeOptionItem()
                        }
                    )
                } else {
                    this._setOptionItem(this.selectedProductId, { ...item })
                    this._manangeModelData(this.selectedProductId, this.selectedShiruetto.id, item.parent_id, item.id)
                    this.closeOptionItem()
                }

            } else {
                if (isEmptyObject(item)) return app.showToast(generateMessage(messages.select, [ this.currentOptionCategory.name ]))

                this._setOptionItem(this.selectedProductId, { ...item })
                this.closeOptionItem()
            }
        },
        resetOptions() {
            this.selectedOptionItem = {}
        },
        resetProductOptions(product_id) {
            const temp = { ...this.selectedOptionItem }
            delete temp[product_id]
            this.selectedOptionItem = { ...temp }
        },
        resetSimulator() {
            this.orderId = 0
            this.selectedProductId = null
            this.selectedOptionCategoryId = null
            this.selectedShiruetto = null
            this.fabrics = null,
            this.selectedOptionItem = {}
            this.modelFinderOptionCategory = {}           
            this.tempShiruetto = null
            this.tempOptionItem = null
            this.option_items = {}
            this.option_categories = {}
        },
        async _manangeModelData(productId, shriuetto, parentId, itemId) {
            await this._getSuitModel(productId, shriuetto, parentId, itemId)
            await this._getOptionCategories(productId, parentId)
            const currentModel = this.models[productId]
            if (currentModel) {
                const defaultOptionItems = currentModel.defaultOptionItems
                defaultOptionItems.forEach(item => {
                    const defaultItem = this.option_categories[productId].find(option => option.id == item.parent_id)
                    if (defaultItem) this._setOptionItem(productId, item)
                });
                console.log("MODEL", currentModel)
            }
        },
        _getOptionItemName(product_id, parent_id) {
            const product = this.selectedOptionItem[product_id]
            if (!product) return
            return product[parent_id] ? product[parent_id].name : ''
            // if (this.tempOptionItem && this.tempOptionItem.parent_id == parent_id) return this.tempOptionItem.name
            // return this._getOptionItem(this.selectedProductId, parent_id)?.name || ''
        },
        _getOptionItem(product_id, parent_id) {
            const productOption = this.selectedOptionItem[product_id]
            if (!productOption) return {}
            return productOption[parent_id] || {}
        },
        _setOptionItem(product_id, value) {
            console.log(product_id, value)
            if (!this.selectedOptionItem[product_id]) this.selectedOptionItem[product_id] = {}
            this.selectedOptionItem[product_id][value.parent_id] = value
        },
        _isMainOption(optionCategoryId) {
            const mainOptionCategory = this.selectedShiruetto.ShiruettoProductName.find(item => 
                    item.product_name_id == this.selectedProductId 
                    && item.option_category_id == optionCategoryId)
            return !!mainOptionCategory
        },
    }
})

export function useSuitSimulator() {
    const route = useRoute()
    const suitSimulatorStore = useSuitSimulatorStore()

    const {
        busy,
        optionBusy,
        toggle,
        
        gender,
        category,
        products,
        shiruetto,
        optionItems,

        selectedProductId,
        selectedOptionCategoryId,

        currentOptionCategory,
        currentShiruetto,
        currentItem,

        optionCategories,
    } = storeToRefs(suitSimulatorStore)
    const {
        getSimulator,
        toggleSimulation,
        setOptionCategory,
        getOptionItems,

        selectOptionItem,
        closeOptionItem,
        saveOptionItem,
        saveSimulation,
    } = suitSimulatorStore

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
        SHIRUETTO,

        gender,
        category,
        products,
        shiruetto,
        optionItems,

        selectedProductId,
        selectedOptionCategoryId,

        currentOptionCategory,
        currentShiruetto,
        currentItem,

        optionCategories,

        toggleSimulation,
        handleOptionCategorySelect,
        handleOptionItemSelect,
        handleOptionItemClose,
        handleOptionItemSave,
        saveSimulation,
    }
}

function formatModel(model) {
    return {
        id: model.id,
        model_number: model.model_number,
        productId: model.ProductName.id,
        shiruetto: model.Shiruetto.id,
        optionCategory: model.OptionCategory.id,
        optionItem: model.OptionItem.id,
        defaultOptionItems: model.ModelOptionCode.map(item => ({
            id: item.SuitOptionItem.id,
            name: item.SuitOptionItem.option_name,
            image: item.SuitOptionItem.image,
            price: item.SuitOptionItem.price,
            delivery_code: item.SuitOptionItem.delivery_code,
            code: item.SuitOptionItem.code,
            explanation: item.SuitOptionItem.explanation,
            sort_no: item.SuitOptionItem.sort_no,
            parent_id: item.SuitOptionItem.Category.id,
        }))
    }
}
