import { onMounted, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store'
import { useSimulatorStore } from '@/store/simulator/simulator'
import { useSilhouetteStore } from '@/store/simulator/silhouette'
import { useButtonsStore } from '@/store/simulator/buttons'
import { useFabricStore } from '@/store/simulator/fabrics'
import { useOptionsStore } from './options'
import { generateMessage } from '@/helpers/util'
import { messages } from "@/helpers/messages"

export function useSimulator() {
    const appStore = useAppStore()
    const simulatorStore = useSimulatorStore()
    const silhouetteStore = useSilhouetteStore()
    const buttonStore = useButtonsStore()
    const fabricStore = useFabricStore()
    const optionsStore = useOptionsStore()

    const { showConfirm, closeConfirm } = appStore

    const { 
        busy, 
        optionsBusy,
        toggle, 
        simuData,
        silhouette,
        selectedItems, 
        selectedItemId,
        currentSilhouette,
        currentButton,
        currentFabric,
        currentOptions,
        isButtonSelected,
        optionInfo,
    } = storeToRefs(simulatorStore)
    const { 
        toggleSimulation, 
        getSimulator, 
        getDefautlOptions,
        setActiveOption,
        setShoulette,
        setButton,
        setFabric,
        setOption,
        resetSimulator,
        setOptionInfo,
    } = simulatorStore

    const { isSilhouetteView } = storeToRefs(silhouetteStore)
    const { 
        viewSilhouette,
        onSilhouetteSelect,
        onSilhouetteClose,
    } = silhouetteStore

    const { isButtonView } = storeToRefs(buttonStore)
    const {
        viewButtons,
        onButtonSelect,
        onButtonClose
    } = buttonStore

    const { isFabricView } = storeToRefs(fabricStore)
    const { viewFabrics } = fabricStore

    const { isOptionView } = storeToRefs(optionsStore)
    const { viewOptions, onOptionClose } = optionsStore

    function handleOpenOption(option) {
        setActiveOption(option.id)
        switch (option.type) {
            case 1:
                viewSilhouette(); break
            case 2:
                viewButtons(selectedItemId.value); break
            case 3:
                viewFabrics(); break
            default:
                viewOptions(option.id); break
        }
    }

    onMounted(async () => {
        await getSimulator()
    })

    function handleSilhouetteSave(item) {
        setActiveOption(null)
        if (
            silhouette.value && isButtonSelected.value
            && silhouette.value.id != item.id
        ) {
            showConfirm(
                generateMessage(messages.data_reset),
                () => {
                    setShoulette(item)
                    resetSimulator()
                    closeConfirm()
                },
                () => closeConfirm()
            )
        } else {
            setShoulette(item)
            getDefautlOptions()
        }
    }
    function handleSilhouetteClose() {
        setActiveOption(null)
        onSilhouetteClose()
    }

    function handleButtonSave(item) {
        setActiveOption(null)
        setButton(item)
        getDefautlOptions()
    }
    function handleButtonClose() {
        setActiveOption(null)
        onButtonClose()
    }
    function handleButtonInfo(item) {
        setOptionInfo(item)
    }

    function handleFabricSave(item) {
        setActiveOption(null)
        setFabric(item)
    }
    function handleFabricClose() {
        setActiveOption(null)
    }

    function handleOptionSave(item) {
        setActiveOption(null)
        setOption(item)
    }
    function handleOptionClose() {
        onOptionClose()
        setActiveOption(null)
    }
    function handleOptionInfo(item) {
        setOptionInfo(item)
    }

    function handleInfoClose() {
        setOptionInfo(null)
    }
    function handleInfoSave(item) {
        console.log(item)
        if (item.type == 2) {
            handleButtonSave(item.info)
            onButtonClose()
            setOptionInfo(null)
        }
        if (item.type == 4) {
            handleOptionSave(item.info)
            handleOptionClose()
            setOptionInfo(null)
        }
    }

    return {
        busy,
        optionsBusy,
        toggle,
        simuData,
        selectedItems,
        selectedItemId,
        optionInfo,

        currentSilhouette,
        currentButton,
        currentFabric,
        currentOptions,
        
        isSilhouetteView,
        isButtonView,
        isFabricView,
        isOptionView,

        toggleSimulation,
        handleOpenOption,

        onSilhouetteSelect,
        handleSilhouetteClose,
        handleSilhouetteSave,

        onButtonSelect,
        handleButtonSave,
        handleButtonClose,
        handleButtonInfo,

        handleFabricSave,
        handleFabricClose,

        handleOptionSave,
        handleOptionClose,
        handleOptionInfo,

        handleInfoClose,
        handleInfoSave,
    }
}

export function useOptionCategories(context) {
    const simulatorStore = useSimulatorStore()
    const silhouetteStore = useSilhouetteStore()
    const buttonStore = useButtonsStore()
    const fabricStore = useFabricStore()
    const optionStore = useOptionsStore()

    const { 
        selectedItemId, 
        activeOptionId, 
        selectedSilhouette,
        selectedButton,
        selectedFabric,
        selectedOption,
    } = storeToRefs(simulatorStore)
    const { parentSilhouette } = storeToRefs(silhouetteStore)
    const { parentButton } = storeToRefs(buttonStore)
    const { parentFebric } = storeToRefs(fabricStore)
    const { parentOptionList } = storeToRefs(optionStore)

    function selectOption(item, type) {
        context.emit('select', { ...item, type })
    }

    return {
        selectedItemId,
        activeOptionId,
        parentSilhouette,
        parentButton,
        parentFebric,
        parentOptionList,

        selectedSilhouette,
        selectedButton,
        selectedFabric,
        selectedOption,

        selectOption,
    }
}

export function useSilhouette(context) {
    const simulatorStore = useSimulatorStore()
    const { silhouette, selectedItemId } = storeToRefs(simulatorStore)

    const silhouetteStore = useSilhouetteStore()
    const { busy, silhouetteList } = storeToRefs(silhouetteStore)
    const { onSilhouetteSelect, onSilhouetteSave } = silhouetteStore

    onMounted(() => {
        onSilhouetteSelect(silhouette.value)
    })

    function handleClose() {
        context.emit('close')
    }
    function handleSelect(item) {
        context.emit('select', item)
    }
    function handleSave() {
        const item = onSilhouetteSave()
        if (!item) return
        context.emit('save', item)
    }

    return {
        busy,
        silhouetteList,

        handleClose,
        handleSelect,
        handleSave
    }
}

export function useButtons(context) {
    const simulatorStore = useSimulatorStore()
    const { buttons, selectedItemId } = storeToRefs(simulatorStore)

    const buttonStore = useButtonsStore()
    const { busy, buttonsList } = storeToRefs(buttonStore)
    const { onButtonSelect, onButtonSave } = buttonStore

    const containerEl = ref(null)
   
    watch(busy, newVal => {
        if (!newVal) {
            setTimeout(() => scrollIntoView(true), 10)
        }
    })
 
    onMounted(() => {
        onButtonSelect(buttons.value[selectedItemId.value])
        scrollIntoView()
    })

    function scrollIntoView(isSmooth) {
        const el = containerEl.value?.querySelector('.button_btn.selected')
        if (el) {
            const y = el.offsetTop - (window.innerHeight * 0.3)
            containerEl.value.parentElement.scrollTo({
                top: y,
                left: 0,
                behavior: isSmooth ? 'smooth' : 'instant'
            })
        }
    }

    function handleClose() {
        context.emit('close')
    }
    function handleSelect(item) {
        context.emit('select', item)
    }
    function handleSave() {
        const item = onButtonSave()
        context.emit('save', item)
    }
    function handleInfo(info) {
        context.emit('info', {type: 2, info})
    }

    return {
        containerEl,
        busy,
        buttonsList,
        selectedItemId,

        handleClose,
        handleSelect,
        handleSave,
        handleInfo,
    }
}

export function useFabric(context) {
    const simulatorStore = useSimulatorStore()
    const fabricStore = useFabricStore()

    const { fabric } = storeToRefs(simulatorStore)

    const { busy, search_key, fabricList } = storeToRefs(fabricStore)
    const { onFabricSelect, onFabricSave, onFabricClose } = fabricStore

    const containerEl = ref(null)

    watch(busy, newVal => {
        if (!newVal) {
            setTimeout(() => scrollIntoView(true), 10)
        }
    })
 
    onMounted(() => {
        console.log('FABRIC', fabric.value)
        onFabricSelect(fabric.value)
        scrollIntoView()
    })

    function scrollIntoView(isSmooth) {
        const el = containerEl.value?.querySelector('.fabric_btn.selected')
        if (el) {
            const y = el.offsetTop - (window.innerHeight * 0.3)
            containerEl.value.parentElement.scrollTo({
                top: y,
                left: 0,
                behavior: isSmooth ? 'smooth' : 'instant'
            })
        }
    }

    function handleSet() {
        const fabric = onFabricSave()
        context.emit('save', fabric)
    }
    function handleClose() {
        onFabricClose()
        context.emit('close')
    }
    function handleSearch() {

    }

    return {
        containerEl,
        busy,
        search_key,
        fabricList,

        onFabricSelect,
        handleClose,
        handleSet,
        handleSearch,
    }
}

export function useOptions(context) {
    const simulatorStore = useSimulatorStore()
    const optionsStore = useOptionsStore()
    
    const { busy, childOptions, parentOptionName } = storeToRefs(optionsStore)
    const { onOptionSelect, onOptionSave, isSelected } = optionsStore
    
    const { selectedItemId, activeOptionId } = storeToRefs(simulatorStore)

    const containerEl = ref(null)

    watch(busy, newVal => {
        if (!newVal) {
            setTimeout(() => scrollIntoView(true), 10)
        }
    })
 
    onMounted(() => {
        scrollIntoView()
    })

    function scrollIntoView(isSmooth) {
        const el = containerEl.value?.querySelector('.option_btn.selected')
        if (el) {
            const y = el.offsetTop - (window.innerHeight * 0.3)
            containerEl.value.parentElement.scrollTo({
                top: y,
                left: 0,
                behavior: isSmooth ? 'smooth' : 'instant'
            })
        }
    }

    function handleSave() {
        const option = onOptionSave()
        if (!option) return
        context.emit('save', option)
    }
    function handleClose() {
        context.emit('close')
    }
    function handleInfo(info) {
        context.emit('info', {type: 4, info})
    }

    return {
        containerEl,
        busy,
        childOptions,
        selectedItemId,
        activeOptionId,
        parentOptionName,

        isSelected,
        onOptionSelect,
        handleSave,
        handleClose,
        handleInfo,
    }
}
