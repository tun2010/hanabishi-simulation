import { post } from '@/helpers/fetch'

export default {
    async getProdcutByCode(body) {
        return await post('get/product', body).catch(() => null)
    }
}