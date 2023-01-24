import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store'
import { useCartStore } from '@/store/cart/cart'
import { useCartSimulatorStore } from '@/store/cart/simulator'
import { useSilhouetteStore } from '@/store/simulator/silhouette'
import { useButtonsStore } from '@/store/simulator/buttons'
import { useFabricStore } from '@/store/simulator/fabrics'
import { useOptionsStore } from '@/store/simulator/options'
import { formatCurrency, formatDate } from '@/helpers/util'

export function useCart() {
    const route = useRoute()
    const routeName = ref(route.name)
    const appStore = useAppStore()
    const cartStore = useCartStore()

    const { appCustomer } = storeToRefs(appStore)
    const { itemsBusy, sizeDataFinished } = storeToRefs(cartStore)
    const { getCartItems, onCheckout } = cartStore

    watch(
        () => route.name,
        newName => {
            routeName.value = newName
        }
    )

    onMounted(async () => {
        await getCartItems()
    })

    return {
        itemsBusy,
        sizeDataFinished,
        routeName,
        customer: appCustomer,

        onCheckout,
    }
}

export function useCartItems() {
    const appStore = useAppStore()
    const cartStore = useCartStore()

    const { orderGender, appCustomer } = storeToRefs(appStore)

    const { busy, loading, itemList } = storeToRefs(cartStore)
    const { onCheckout } = cartStore

    return {
        root_url: process.env.VUE_APP_ROOT_URL,
        orderGender,
        busy,
        loading,
        items: itemList,
        customer: appCustomer,
        
        formatDate,
        onCheckout,
    }
}

export function useCustomCartItem(item) {
    const toggleDetail = ref(false)
    const cartSimulatorStore = useCartSimulatorStore()
    const cartStore = useCartStore()

    const { setSimulatorItem } = cartSimulatorStore
    const { onItemDelete } = cartStore

    function openDeatil() {
        setSimulatorItem(item)
        toggleDetail.value = true
    }
    function closeDetail() {
        toggleDetail.value = false
    }

    return {
        toggleDetail,

        openDeatil,
        closeDetail,
        onItemDelete,
    }
}

export function useProductCartItem() {
    const cartStore = useCartStore()

    const { increaseQty, decreaseQty, onItemDelete } = cartStore

    return {
        formatCurrency,
        
        increaseQty,
        decreaseQty,
        onItemDelete,
    }
}

export function useSize() {
    const cartStore = useCartStore()

    const { busy, loading, summited, form, isFormError, sizes } = storeToRefs(cartStore)
    const { getSizeForm, onCheckBoxChange, onSizeChange, onSumit, toastTest } = cartStore

    onMounted(() => {
        getSizeForm()
    })

    return {
        busy,
        loading,
        summited,
        form,
        isFormError,
        sizes,

        onCheckBoxChange,
        onSizeChange,
        onSumit,
        toastTest,
    }
}

export function useCartSimulator(context) {
    const cartSimulatorStore = useCartSimulatorStore()
    const fabricStore = useFabricStore()
    const optionsStore = useOptionsStore()

    const {
        busy,
        selectedItemId,
        selectedItems,
        currentFabric,
        currentOptions,
        optionInfo,
    } = storeToRefs(cartSimulatorStore)
    const { setActiveOption, setOptionInfo, setFabric, setOption } = cartSimulatorStore

    const { isFabricView } = storeToRefs(fabricStore)
    const { viewFabrics } = fabricStore

    const { isOptionView } = storeToRefs(optionsStore)
    const { viewOptions, onOptionClose } = optionsStore

    function handleOpenOption(option) {
        setActiveOption(option.id)
        switch (option.type) {
            case 3:
                viewFabrics(); break
            default:
                viewOptions(option.id); break
        }
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
        handleOptionSave(item.info)
        handleOptionClose()
        setOptionInfo(null)
    }

    function closeDetail() {
        context.emit('close')
    }
    function saveAndCloseDetail() {
        console.log('UPDATE_ITEM_DATA_HERE')
        context.emit('close')
    }

    return {
        busy,
        selectedItemId,
        selectedItems,
        currentFabric,
        currentOptions,
        optionInfo,

        isFabricView,
        isOptionView,

        handleFabricSave,
        handleFabricClose,

        handleOptionSave,
        handleOptionClose,
        handleOptionInfo,

        handleOpenOption,
        
        handleInfoClose,
        handleInfoSave,

        closeDetail,
        saveAndCloseDetail,
    }
}

export function useCartOptionCategories(context) {
    const cartSimulatorStore = useCartSimulatorStore()
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

    } = storeToRefs(cartSimulatorStore)
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

export function useCartFabric(context) {
    const fabricStore = useFabricStore()
    const cartSimulatorStore = useCartSimulatorStore()

    const { fabric } = storeToRefs(cartSimulatorStore)

    const { busy, search_key, fabricList } = storeToRefs(fabricStore)
    const { onFabricSelect, onFabricSave, onFabricClose } = fabricStore

    const containerEl = ref(null)

    watch(busy, newVal => {
        if (!newVal) {
            setTimeout(() => scrollIntoView(true), 10)
        }
    })
 
    onMounted(() => {
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

export function useCartOptions(context) {
    const cartSimulatorStore = useCartSimulatorStore()
    const optionsStore = useOptionsStore()
    
    const { busy, childOptions, parentOptionName } = storeToRefs(optionsStore)
    const { onOptionSelect, onOptionSave, isSelected } = optionsStore
    
    const { selectedItemId, activeOptionId } = storeToRefs(cartSimulatorStore)

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
        const fabric = onOptionSave(null, true)
        if (!fabric) context.emit('close')
        else context.emit('save', fabric)
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
