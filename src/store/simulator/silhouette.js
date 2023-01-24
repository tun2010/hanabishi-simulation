import { defineStore } from 'pinia'

import { useAppStore } from '..'
import { silhouetteOptions } from './options.db'
import { simuLoading, generateMessage } from '@/helpers/util'
import { messages } from "@/helpers/messages"

export const useSilhouetteStore = defineStore({
    id: 'silhouette',
    state: () => ({
        busy: false,
        isSilhouetteView: false,
        parentSilhouette: null,
        silhouetteList: [],
        selected: null,
    }),
    getters: {
        simulatorSilhouette: state => {
            if (state.selected) return state.selected
            return null
        },
    },
    actions: {
        setParentSilhouette(parent) {
            this.parentSilhouette = parent
        },
        async getSilhouette() {
            this.busy = true
            await simuLoading()
            this.busy = false
            this.silhouetteList = silhouetteOptions
        },
        async viewSilhouette() {
            this.isSilhouetteView = true
            if (!this.silhouetteList.length) await this.getSilhouette()
        },
        onSilhouetteSelect(silhouette) {
            this.selected = silhouette
        },
        onSilhouetteSave(silhouette) {
            const selected = silhouette || this.selected
            if (!selected) {
                const app = useAppStore()
                app.showToast(generateMessage(messages.select, [ 'シルエット' ]))
                return
            }
            this.onSilhouetteClose()
            return selected
        },
        onSilhouetteClose() {
            this.selected = null
            this.isSilhouetteView = false
        },

    }
})