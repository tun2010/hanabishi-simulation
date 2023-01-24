import { defineStore } from 'pinia'

import { useAppStore } from '..'
import { childOptions } from './options.db'
import { simuLoading, generateMessage } from '@/helpers/util'
import { messages } from "@/helpers/messages"

export const useOptionsStore = defineStore({
    id: 'options',
    state: () => ({
        busy: false,
        isOptionView: false,
        parentOptions: {},
        childOptions: {},
        currentOptions: [],
        selected: null,
    }),
    getters: {
        parentOptionList: state => itemID => {
            return state.parentOptions[itemID]
        },
        simulatorOption: state => {
            if (state.selected) return state.currentOptions.map(item => item.id == state.selected.id ? state.selected : item)
            return state.setparentOptions
        },
        parentOptionName: state => (itemID, optionId) => {
            const parent = state.parentOptions[itemID].find(item => item.id == optionId)
            if (parent) return parent.name
        }
    },
    actions: {
        async setparentOptions(options) {
            this.parentOptions = options
        },
        async getChildOptions(optionId) {
            this.busy = true
            await simuLoading()
            this.busy = false
            if (!this.childOptions[optionId]) this.childOptions[optionId] = childOptions[optionId]
        },
        async viewOptions(optionId) {
            this.isOptionView = true
            if (!this.childOptions[optionId]) await this.getChildOptions(optionId)
        },
        onOptionSelect(option) {
            this.selected = option
        },
        onOptionSave(option, byPass) {
            const selected = option || this.selected
            if (!(selected || byPass)) {
                const app = useAppStore()
                app.showToast(generateMessage(messages.select, [ 'オプション' ]))
                return null
            }
            this.onOptionClose()
            return selected
        },
        onOptionClose() {
            this.selected = null
            this.isOptionView = false
        },
        isSelected(list, id) {
            return !!list.find(item => item.id == id)
        },
    }
})