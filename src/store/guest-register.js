import { defineStore } from 'pinia'
import { storeToRefs } from 'pinia'
import { onMounted, onBeforeUnmount } from 'vue'
import router from '@/router'
import API from '@/api/customer'
import { getErrorMessages, getErrorMesssage } from '@/helpers/form'
import { getAge, generateMessage } from '@/helpers/util'
import { messages } from "@/helpers/messages"

import { useAppStore } from '.'

const useGuestRegisterStore = defineStore({
    id: 'guest-register',
    state: () => ({
        busy: false,
        loading: false,
        summited: false,
        formData: {},
        form: {
            name01: '',
            name02: '',
            kana01: '',
            kana02: '',
            sex: '',
            birth: '',
            phone_number: '',
            email: '',
            customer_rank: null,
            visit_reason: null,
            visit_event: null,
            job: null,
            office_name: ''
        },
        error: {
            name01: {
                require: true,
                message: '',
                checkError: (value) => {
                    const [ key ] = [ '氏名(漢字)' ]
                    if (!value) return generateMessage(messages.required, [ key ])
                    if (!/^[^\s ]+$/u.test(value)) return generateMessage(messages.no_space)
                    return ''
                },
            },
            name02: {
                require: true,
                message: '',
                checkError: (value) => {
                    const [ key ] = [ '氏名(漢字)' ]
                    if (!value) return generateMessage(messages.required, [ key ])
                    if (!/^[^\s ]+$/u.test(value)) return generateMessage(messages.no_space)
                    return ''
                },
            },
            kana01: {
                require: true,
                message: '',
                checkError: (value) => {
                    const [ key ] = [ '氏名(カナ)' ]
                    if (!value) return generateMessage(messages.required, [ key ])
                    if (!/^[^\s ]+$/u.test(value)) return generateMessage(messages.no_space)
                    if (!/^[ァ-ヶｦ-ﾟー]+$/u.test(value)) return generateMessage(messages.only_kana)
                    return ''
                },
            },
            kana02: {
                require: true,
                message: '',
                checkError: (value) => {
                    const [ key ] = [ '氏名(カナ)' ]
                    if (!value) return generateMessage(messages.required, [ key ])
                    if (!/^[^\s ]+$/u.test(value)) return generateMessage(messages.no_space)
                    if (!/^[ァ-ヶｦ-ﾟー]+$/u.test(value)) return generateMessage(messages.only_kana)
                    return ''
                },
            },
            sex: {
                required: true,
                message: '',
                checkError: (value) => {
                    const [ key ] = [ '性別' ]
                    if (!value) return generateMessage(messages.required, [ key ])
                    return ''
                }
            },
            birth: {
                required: true,
                message: '',
                checkError: (value) => {
                    const [ key ] = [ '生年月日' ]
                    if (!value) return generateMessage(messages.required, [ key ])
                    const userAge = getAge(value)
                    if (userAge < 15) return generateMessage(messages.min_age)
                    return ''
                }
            },
            phone_number: {
                required: true,
                message: '',
                checkError: (value) => {
                    const [ key ] = [ '電話番号' ]
                    if (!value) return generateMessage(messages.required, [ key ])
                    if (!/^[0-9]{9,11}$/.test(value)) return generateMessage(messages.invalid, [ key ])
                    return ''
                },
            },
            email: {
                required: false,
                message: '',
                checkError: (value) => {
                    const [ key ] = [ 'E-mail' ]
                    if (!value) return ''
                    if (!/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/.test(value)) return generateMessage(messages.invalid, [ key ])
                    return ''
                },
            },
            customer_rank: {
                required: false,
                message: '',
                checkError: () => {
                    return ''
                },
            },
            visit_reason: {
                required: false,
                message: '',
                checkError: () => {
                    return ''
                },
            },
            visit_event: {
                required: false,
                message: '',
                checkError: () => {
                    return ''
                },
            },
            job: {
                required: false,
                message: '',
                checkError: () => {
                    return ''
                },
            },
            office_name: {
                required: false,
                message: '',
                checkError: () => {
                    return ''
                },
            }
        }
    }),
    getters: {
    },
    actions: {
        async getFormData() {
            this.busy = true
            const result = await API.getFormData()
            this.busy = false
            const app = useAppStore()
            if (!result.success) return app.showToast(result.message)
            this.formData = result.data
        },
        async createUser() {
            this.summited = true
            const errorMessages = getErrorMessages(this.form, this.error)
            console.log(errorMessages)
            if (errorMessages.length) return
            const app = useAppStore()
            this.loading = true
            const result = await API.createGuest(this.form)
            if (!result.success) {
                this.loading = false
                return app.showToast(result.message)
            }
            app.setCustomer(result.data)
            this.loading = false
            app.showAlert(
                generateMessage(messages.customer_success),
                () => {
                    app.closeAlert()
                    router.push('/order')
                }
            )
        },
        handleInput(key) {
            setTimeout(() => {
                this.error[key].message = getErrorMesssage(this.form[key], this.error[key])
            }, 0)
        },
        resetForm() {
            this.form = {
                name01: '',
                name02: '',
                kana01: '',
                kana02: '',
                sex: '',
                birth: '',
                email: '',
                phone_number: '',
                customer_rank: null,
                visit_reason: null,
                visit_event: null,
                job: null,
                office_name: ''
            }
        }
    }
})

export function useGuestRegister() {
    const guestRegister = useGuestRegisterStore()

    const { busy, loading } = storeToRefs(guestRegister)
    const { getFormData, createUser, resetForm } = guestRegister

    onMounted(() => {
        getFormData()
        setTimeout(() => {
            document.getElementById("focusStart").focus()
        }, 100)
    })

    onBeforeUnmount(() => {
        resetForm()
    })

    return {
        busy,
        loading,

        createUser,
    }
}

export function useGuestRegisterForm() {
    const guestRegister = useGuestRegisterStore()

    const { form, error, formData } = storeToRefs(guestRegister)
    const { handleInput } = guestRegister
    
    return {
        form,
        error,
        formData,

        handleInput,
    }
}