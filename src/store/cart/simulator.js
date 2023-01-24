import { defineStore } from 'pinia'
import API from '@/api/simulator'

import { useSilhouetteStore } from '@/store/simulator/silhouette'
import { useButtonsStore } from '@/store/simulator/buttons'
import { useFabricStore } from '@/store/simulator/fabrics'
import { useOptionsStore } from '@/store/simulator/options'

export const useCartSimulatorStore = defineStore({
    id: 'cart-simulator',
    state: () => ({
        busy: true,
        optionSet: {},
        optionsBusy: false,
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
        selectedSilhouette: state => {
            return state.silhouette?.name || ''
        },
        currentSilhouette: state => {
            return state.silhouette
        },
        selectedButton: state => {
            return state.buttons[state.selectedItemId]?.name || ''
        },
        currentFabric: state => {
            const fabrics = useFabricStore()
            if (fabrics.selected) return fabrics.selected
            return state.fabric
        },
        selectedFabric: state => {
            return state.fabric?.name || ''
        },
        selectedOption: state => parent_id => {
            if (!state.options[state.selectedItemId]) return '' 
            const option = state.options[state.selectedItemId].find(item => item.parent_id == parent_id)
            return option?.name || ''
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
    },
    actions: {
        async setSimulatorItem(item) {
            this.busy = true

            const silhouette = useSilhouetteStore()
            const buttons = useButtonsStore()
            const fabric = useFabricStore()
            const options = useOptionsStore()

            const [ parents, childs ] = getOptions(item.items)

            silhouette.setParentSilhouette(item.silhouette)
            buttons.setParentButton(item.button)
            fabric.setParentFabric(item.fabric)
            options.setparentOptions(parents)

            this.gender = item.gender
            this.category = item.category
            this.items = item.product.items
            this.selectedItemId = this.items[0].id
            this.silhouette = getSilhouette(item.silhouette)
            this.fabric = getFabric(item.fabric)
            this.buttons = getButton(item.items)
            this.options = childs

            this.busy = false
        },
        setActiveOption(id) {
            this.activeOptionId = id
        },
        setFabric(fabric) {
            this.fabric = fabric
        },
        setOption(option) {
            let tempArr = this.options[this.selectedItemId] || []
            const exist = tempArr.find(item => item.parent_id == option.parent_id)
            if (exist) tempArr = tempArr.map(item => item.parent_id == exist.parent_id ? option : item)
            else tempArr = [...tempArr, option]

            this.options[this.selectedItemId] = tempArr 
        },
        setOptionInfo(info) {
            this.optionInfo = info
        },
    }
})

function getSilhouette(data) {
    return {
        id: data.selected_id,
        name: data.selected_name
    }
}

function getButton(items) {
    const buttons = {}
    items.forEach(item => {
        buttons[item.item_id] = item.button
    })
    return buttons
}

function getFabric(fabric) {
    return {
        id: fabric.selected_id,
        name: fabric.selected_name,
        price: fabric.price
    }
}

function getOptions(items) {
    const [ parents, childs ] = [ {}, {} ]
    items.forEach(item => {
        parents[item.item_id] = item.options
        childs[item.item_id] = item.options.map(option => ({
            id: option.value_id,
            name: option.value_name,
            parent_id: option.id
        })) 
    })
    return [ parents, childs ]
}
