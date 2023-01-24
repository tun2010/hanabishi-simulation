import axios from "axios"

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'ECCUBE-CSRF-TOKEN': window._csrf_token,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Accept': '*/*',
    },
})

export async function post(endpoint, body = {}) {
    try {
        const result = await instance.post(endpoint, body)
        if (result) return result.data
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}