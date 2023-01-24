import { defineStore } from 'pinia'

import { useAppStore } from '..'
import { fabrics } from './fabrics.db'
import { simuLoading, generateMessage } from '@/helpers/util'
import { messages } from "@/helpers/messages"

export const useFabricStore = defineStore({
    id: 'fabrics',
    state: () => ({
        busy: false,
        isFabricView: false,
        parentFebric: null,
        fabrics: [],
        search_key: '',
        selected: null
    }),
    getters: {
        fabricList: state => {
            if (!state.search_key) return state.fabrics
            const lowercaseKey = state.search_key.toLowerCase()
            return state.fabrics.filter(item => item.name.toLowerCase().includes(lowercaseKey))
        },
    },
    actions: {
        setParentFabric(parent) {
            this.parentFebric = parent
        },
        async getFabrics() {
            this.busy = true
            await simuLoading()
            this.busy = false
            this.fabrics = fabrics
        },
        async viewFabrics() {
            this.isFabricView = true
            if (!this.fabrics.length) await this.getFabrics()
        },
        onFabricSelect(fabric) {
            this.selected = fabric
        },
        onFabricSave(fabric) {
            const selected = fabric || this.selected
            if (!selected) {
                const app = useAppStore()
                app.showToast(generateMessage(messages.select, [ '生地を' ]))
                return 
            }
            this.onFabricClose()
            return selected
        },
        onFabricClose() {
            this.selected = null
            this.isFabricView = false
        },
    }
})