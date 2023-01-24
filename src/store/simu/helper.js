export default {
    isTheSameSuitOrder(olds, news) {
        console.log('COMPARE', olds, news)
        if (olds.orderId != news.orderId) return false
        return (olds.genderId == news.genderId && olds.combineId == news.combineId)
    },
    isTheSameShirtOrder(olds, news) {
        console.log('COMPARE', olds, news)
        if (olds.orderId != news.orderId) return false
        return (olds.genderId == news.genderId && olds.categoryId == news.categoryId && olds.productId == news.productId)
    },
    isShiruettoChange(temp, current) {
        if (!(temp && current)) return false
        return temp.id != current.id
    },
    findInArray(list, id, key) {
        const item = list?.find(item => item[key] == id)
        if (!item) return {}
        return item
    },
    isModelOption(models, product_id, parent_id) {
        return models[product_id] == parent_id
    },
    isSameModelOption(olds, news) {
        if (!olds) return false
        return olds.id == news.id
    },
    isOptionHasValue(option, product_id, parent_id) {
        const current = { ...option[product_id] }
        delete current[parent_id]
        return Object.keys(current).length > 0
    },
    isOptionSelected(option, product_id, parent_id) {
        return option[product_id] && option[product_id][parent_id]
    }
}