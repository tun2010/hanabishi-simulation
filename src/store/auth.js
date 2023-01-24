import { defineStore } from 'pinia'
import router from '@/router'
import { simuLoading } from '@/helpers/util'
import { checkError } from '@/helpers/form'

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        busy: false,
        summited: false,
        form: {
            id: '',
            pass: '',
            user: ''
        },
        error: {
            id: {
                required: true,
                checkError: (value) => {
                    if (!value) return 'ID is required!'
                },
            },
            pass: {
                required: true,
                checkError: (value) => {
                    if (!value) return 'Password is required!'
                    if (!/^.{6,}$/.test(value)) return 'Password minimum lenght is 6!'
                },
            },
            user: {
                required: true,
                checkError: (value) => {
                    if (!value) return 'User code is required!'
                    if (!/^[0-9]{4,4}$/.test(value)) return 'User code must be 4 digit!'
                },
            }
        }
    }),
    getters: {
        isError: state => {
            return key => state.summited ? state.error[key].checkError(state.form[key]) : ''
        },
    },
    actions: {
        async login() {
            this.summited = true
            const isError = checkError(this.form, this.error)
            if (isError) return
            await simuLoading(10)
            router.replace('/customer')
        }
    }
})