import { defineStore } from 'pinia'
import router from '@/router'
import API from '@/api/items'
import { generateMessage } from '@/helpers/util'
import { messages } from "@/helpers/messages"

import { useAppStore } from '.'

export const useItemsStore = defineStore({
    id: 'items',
    state: () => ({
        busy: false,
        itemBusy: false,
        category: null,
        isHistory: false,
        gender: null,
        categories: [],
        items: {},
        selectedItem: null,
    }),
    getters: {
        itemTitle: state => {
            if (!state.category) return ''
            const category = state.categories.find(item => item.id == state.category)
            return `${state.gender.name} - ${category?.name || ''}`
        },
        isShirt: state => {
            return state.category == 2
        },
        itemList: state => {
            if (!state.category) return []
            return state.items[state.category] ? state.items[state.category] : []
        },
        shirtCategoryList: state => {
            if (!state.category) return false
            const parent = state.categories.find(item => item.id == state.category)
            return parent.Children
        }
    },
    actions: {
        async getCategories() {
            const app = useAppStore()
            if (this.categories.length) return
            this.busy = true
            const result = await API.getCategories()
            this.busy = false
            if (!result.success) return app.showToast(result.message)
            this.gender = result.data.gender 
            this.categories = result.data.categories
        },
        async getItems() {
            if (this.items[this.category]) return
            const app = useAppStore()
            const hierarchy = this.isShirt ? 2 : 1
            this.itemBusy = true
            const result = await API.getItems({ category_id: this.category, hierarchy })
            this.itemBusy = false
            if (!result.success) return app.showToast(result.message)
            this.items[this.category] = result.data
        },
        selectCategory(id) {
            this.category = id
        },
        closeCategoey() {
            this.category = null
        },
        setSelected(value) {
            this.selectedItem = value
        },
        async saveSelectedItems() {
            const app = useAppStore()
            const [ category_id, item_id ] = this.getValidItemId(this.category, this.selectedItem)
            console.log(category_id, item_id)
            if (!item_id) {
                return app.showToast(generateMessage(messages.select, [ 'アイテム' ]))
            }
            this.busy = true
            const result = await API.setItems({
                gender: this.gender,
                category: category_id,
                item: item_id
            })
            this.busy = false
            if (!result.success) {
                const app = useAppStore()
                return app.showToast(result.message)
            }
            if (this.isShirt) router.push('/simulator/shirt?id=0')
            else router.push('/simulator/suit?id=0')
        },
        showHistory() {
            this.isHistory = true
        },
        closeHistiry() {
            this.isHistory = false
        },
        resetStore() {
            this.gender = null
            this.categories = []
            this.items = {}
            this.category = null
            this.selectedItem = null
            this.isHistory = false
        },
        getValidItemId(category_id, item_id) {
            if (!item_id) return [ null, null ]
            const [ categoryId, itemId ] = this.isShirt ? item_id.split('_') : [ category_id, item_id ]
            const is = this.items[category_id]?.find(item => item.id == itemId)
            if (!is) return [ null, null ]
            return [ categoryId, is.id ]
        }
    }
})
