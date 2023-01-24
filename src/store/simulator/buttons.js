import { defineStore } from 'pinia'

import { useAppStore } from '..'
import { buttonOptions } from './options.db'
import { simuLoading, generateMessage } from '@/helpers/util'
import { messages } from "@/helpers/messages"

export const useButtonsStore = defineStore({
    id: 'buttons',
    state: () => ({
        busy: false,
        isButtonView: false,
        parentButton: null,
        buttons: {},
        search_key: '',
        selected: null,
    }),
    getters: {
        buttonsList: state => itemId => {
            return state.buttons[itemId] || []
        },
        simulatorButtons: state => {
            if (state.selected) return state.selected
            return null 
        },
    },
    actions: {
        setParentButton(parent) {
            this.parentButton = parent
        },
        async getButtons(itemId) {
            this.busy = true
            await simuLoading()
            this.busy = false
            this.buttons[itemId] = buttonOptions
        },
        async viewButtons(itemId) {
            this.isButtonView = true
            if (!this.buttons[itemId]) await this.getButtons(itemId)
        },
        onButtonSelect(button) {
            this.selected = button
        },
        onButtonSave(button) {
            const selected = button || this.selected
            if (!selected) {
                const app = useAppStore()
                app.showToast(generateMessage(messages.select, [ 'ボタン' ]))
                return 
            }
            this.onButtonClose()
            return selected
        },
        onButtonClose() {
            this.selected = null
            this.isButtonView = false
        },
    }
})