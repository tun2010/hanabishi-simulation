import { defineStore } from 'pinia'
import API from '@/api/simulator'

import { useAppStore } from '..'
import { useSilhouetteStore } from './silhouette'
import { useButtonsStore } from './buttons'
import { useFabricStore } from './fabrics'
import { useOptionsStore } from './options'

const defaultSimuImg = 'https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/simulator/italian.png'

const isEmpty = obj => Object.keys(obj).length === 0

export const useSimulatorStore = defineStore({
    id: 'simulator',
    state: () => ({
        busy: true,
        optionSet: {},
        optionsBusy: false,
        toggle: false, // Toggle view for landscape
        gender: null,
        category: null,
        items: null,
        selectedItemId: null,
        activeOptionId: null,
        silhouette: null,
        buttons: {},
        fabric: null,
        options: {},
        optionInfo: null,
    }),
    getters: {
        selectedItems: state => state.items ? state.items.map(item => ({id: item.id, name: item.name})) : [],
        selectedParentOptions: state => {
            if (!state.parentOption) return []
            return state.parentOption[state.selectedItemId].map(item => ({
                ...item,
                selectedItem: state.selectedItemId,
            }))
        },
        currentSilhouette: state => {
            const silhouette = useSilhouetteStore()
            if (silhouette.selected) return silhouette.selected
            if (state.silhouette) return state.silhouette
            return {
                id: 0,
                name: '',
                img: defaultSimuImg
            }
        },
        selectedSilhouette: state => {
            return state.silhouette?.name || ''
        },
        currentButton: state => {
            const buttons = useButtonsStore()
            if (buttons.simulatorButtons) return buttons.simulatorButtons
            if (state.buttons[state.selectedItemId]) return state.buttons[state.selectedItemId]
            return {
                id: 0,
                name: '',
                img: ''
            }
        },
        selectedButton: state => {
            return state.buttons[state.selectedItemId]?.name || ''
        },
        currentFabric: state => {
            const fabrics = useFabricStore()
            if (!fabrics.isFabricView) return null
            if (fabrics.selected) return fabrics.selected
            return state.fabric
        },
        selectedFabric: state => {
            return state.fabric?.name || ''
        },
        currentOptions: state => {
            const options = useOptionsStore()
            let optionList = state.options[state.selectedItemId] || []
            if (options.selected) {
                const exist = optionList.find(item => item.parent_id == options.selected.parent_id)
                if (exist) return optionList.map(item => item.parent_id == exist.parent_id ? options.selected : item)
                else return [...optionList, options.selected]
            }
            return optionList
        },
        selectedOption: state => parent_id => {
            if (!state.options[state.selectedItemId]) return '' 
            const option = state.options[state.selectedItemId].find(item => item.parent_id == parent_id)
            return option?.name || ''
        },
        simuData: state => ({
            gender: state.gender?.name || '',
            category: state.category?.name || '',
        }),
        isButtonSelected: state => {
            return !(isEmpty(state.buttons) && isEmpty(state.options))
        },
    },
    actions: {
        async getSimulator() {
            this.busy = true
            const result = await API.getSimulator()
            this.busy = false
            if (!result.success) {
                const app = useAppStore()
                return app.showAlert(result.message, () => app.closeAlert())
            }

            const silhouette = useSilhouetteStore()
            const buttons = useButtonsStore()
            const fabric = useFabricStore()
            const options = useOptionsStore()

            this.gender = result.data.gender
            this.category = result.data.category
            this.items = result.data.items
            this.selectedItemId = this.items[0].id

            console.log(result.data);

            silhouette.setParentSilhouette(result.data.parent_silhouette)
            buttons.setParentButton(result.data.parent_button)
            fabric.setParentFabric(result.data.parent_fabric)
            options.setparentOptions(result.data.parent_options)
        },
        setActiveOption(id) {
            this.activeOptionId = id
        },
        toggleSimulation() {
            this.toggle = !this.toggle
        },
        setShoulette(silhouette) {
            this.silhouette = silhouette
        },
        setButton(button) {
            this.buttons[this.selectedItemId] = button
        },
        setFabric(fabric) {
            console.log('SETFABRIC', fabric)
            this.fabric = fabric
        },
        setOption(option) {
            let tempArr = this.options[this.selectedItemId] || []
            const exist = tempArr.find(item => item.parent_id == option.parent_id)
            if (exist) tempArr = tempArr.map(item => item.parent_id == exist.parent_id ? option : item)
            else tempArr = [...tempArr, option]

            console.log('OPTIONS____', tempArr)
            this.options[this.selectedItemId] = tempArr 
        },
        async getDefautlOptions() {
            if (this.optionSet[this.selectedItemId] || !(this.silhouette && this.buttons[this.selectedItemId])) return
            // const options = {
            //     gender: this.gender.id,
            //     category: this.category.id,
            //     item: this.selectedItemId,
            //     silhouette: this.silhouette.id,
            //     button: this.buttons[this.selectedItemId].id 
            // }
            const options = {
                model: this.buttons[this.selectedItemId].model[this.silhouette.id],
                item: this.selectedItemId
            }
            this.optionsBusy = true
            const result = await API.getDefaultOptions(options)
            this.optionsBusy = false
            if (!result.success) return
            this.options[this.selectedItemId] = this.setSelectedOptions(result.data)
            this.optionSet[this.selectedItemId] = true
        },
        resetSimulator() {
            this.optionSet = {}
            this.buttons = {}
            this.fabric = null
            this.options = {}
        },
        setOptionInfo(info) {
            this.optionInfo = info
        },
        setSelectedOptions(list) {
            const selectedOptions = this.options[this.selectedItemId] || []
            return list.map(item => {
                const is = selectedOptions.find(option => option.parent_id == item.parent_id)
                if (is) return is 
                return item
            })
        }
    }
})
