import { post } from '@/helpers/fetch'
import { simuLoading } from '@/helpers/util'

export default {
    async searchCustomer(body) {
        return await post('search/customers', body).catch(() => null)
        // await simuLoading()
        // return {
        //     "success": true,
        //     "data": [
        //         {
        //             "id": 1,
        //             "name": "Tun Lin",
        //             "kana": "ツン リン",
        //             "phone_number": "08099998888",
        //             "email": "",
        //             "last_buy_date": "2022-06-16T21:06:19+09:00"
        //         }
        //     ],
        //     "message": ""
        // }
    },
    async setConfirmCode(body) {
        return await post('set/email/code', body).catch(() => null)
    },
    async setCustomerEmail(body) {
        return await post('set/customer/email', body).catch(() => null)
    },
    async setCustomer(body) {
        return await post('set/customer', body).catch(() => null)
    },
    async getFormData() {
        return await post('get/customer/form', {}).catch(() => null)
        // await simuLoading();
        // return {
        //     "success": true,
        //     "data": {
        //         "customer_ranks": [
        //             {
        //                 "id": 1,
        //                 "name": "Silver"
        //             }
        //         ],
        //         "visit_reasons": [
        //             {
        //                 "id": 2,
        //                 "name": "Web（自社）"
        //             },
        //             {
        //                 "id": 1,
        //                 "name": "DM"
        //             }
        //         ],
        //         "visit_events": [
        //             {
        //                 "id": 1,
        //                 "name": "早得"
        //             },
        //             {
        //                 "id": 2,
        //                 "name": "下取り企画"
        //             },
        //             {
        //                 "id": 3,
        //                 "name": "ご優待会"
        //             }
        //         ],
        //         "jobs": [
        //             {
        //                 "id": 1,
        //                 "name": "公務員"
        //             },
        //             {
        //                 "id": 2,
        //                 "name": "コンサルタント"
        //             },
        //             {
        //                 "id": 3,
        //                 "name": "コンピューター関連技術職"
        //             },
        //             {
        //                 "id": 4,
        //                 "name": "コンピューター関連以外の技術職"
        //             },
        //             {
        //                 "id": 5,
        //                 "name": "金融関係"
        //             },
        //             {
        //                 "id": 6,
        //                 "name": "医師"
        //             },
        //             {
        //                 "id": 7,
        //                 "name": "弁護士"
        //             },
        //             {
        //                 "id": 8,
        //                 "name": "総務・人事・事務"
        //             },
        //             {
        //                 "id": 9,
        //                 "name": "営業・販売"
        //             },
        //             {
        //                 "id": 10,
        //                 "name": "研究・開発"
        //             },
        //             {
        //                 "id": 11,
        //                 "name": "広報・宣伝"
        //             },
        //             {
        //                 "id": 12,
        //                 "name": "企画・マーケティング"
        //             },
        //             {
        //                 "id": 13,
        //                 "name": "デザイン関係"
        //             },
        //             {
        //                 "id": 14,
        //                 "name": "会社経営・役員"
        //             },
        //             {
        //                 "id": 15,
        //                 "name": "出版・マスコミ関係"
        //             },
        //             {
        //                 "id": 16,
        //                 "name": "学生・フリーター"
        //             },
        //             {
        //                 "id": 17,
        //                 "name": "主婦"
        //             },
        //             {
        //                 "id": 18,
        //                 "name": "その他"
        //             }
        //         ]
        //     },
        //     "message": ""
        // }
    },
    async createCustomer(body) {
        return await post('create/customer', body).catch(() => null)
    },
    async createGuest(body) {
        return await post('create/guest', body).catch(() => null)
    }
}