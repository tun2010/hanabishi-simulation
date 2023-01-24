import { post } from '@/helpers/fetch'
import { simuLoading } from '@/helpers/util'

export default {
    async getCartItems() {
        // return await post('search/customers', body).catch(() => null)
        await simuLoading()
        return {
            "success": true,
            "data" : [
                {
                    "id": 1,
                    "type": 1,
                    "gender": {
                        "id": 1,
                        "name": "Men's"
                    },
                    "category": {
                        "id": 1,
                        "gender_id": 1,
                        "gender_name": "Men's",
                        "name": "Suit",
                    },
                    "product": {
                        "id": "01",
                        "name": "V上下",
                        "items": [
                            {
                                "id": 1,
                                "name": 'ジャケット',
                                "parent_id": null,
                            },
                            {
                                "id": 2,
                                "name": 'ベスト',
                                "parent_id": null,
                            },
                            {
                                "id": 3,
                                "name": 'パンツ',
                                "parent_id": null,
                            },
                        ]
                    },
                    "silhouette": {   
                        "id": 1,
                        "name": "シルエット",
                        "selected_id": 1,
                        "selected_name": "British"
                    },
                    "fabric": {
                        id: 3,
                        name: "生地",
                        selected_id: 1,
                        selected_name: 'JOHN GREENISH',
                        price: 79200,
                    },
                    "button": {
                        "id": 1,
                        "name": "フロントボタン数"
                    },
                    "price": 4800,
                    "quantity": 1,
                    "items": [
                        {
                            "id": 1,
                            "item_id": 1,
                            "cart_id": 1,
                            "button": {
                                "id": 1,
                                "name": '1B',
                            },
                            "options": [
                                {
                                    "id": 4,
                                    "name": "ラペル",
                                    "value_id": 7,
                                    "value_name": "ノッチラペル",
                                },
                                {
                                    "id": 5,
                                    "name": "ベンツ",
                                    "value_id": 12,
                                    "value_name": "サイド",
                                },
                                {
                                    "id": 6,
                                    "name": "胸ポケット",
                                    "value_id": 15,
                                    "value_name": "箱型",
                                },
                                {
                                    "id": 7,
                                    "name": "脇ポケット",
                                    "value_id": 28,
                                    "value_name": "フラップ（Dカン止め）",
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "item_id": 2,
                            "cart_id": 1,
                            "button": {
                                "id": 2,
                                "name": '2B1掛け',
                            },
                            "options": [
                                {
                                    "id": 4,
                                    "name": "ラペル",
                                    "value_id": 7,
                                    "value_name": "ノッチラペル",
                                },
                                {
                                    "id": 5,
                                    "name": "ベンツ",
                                    "value_id": 12,
                                    "value_name": "サイド",
                                },
                                {
                                    "id": 6,
                                    "name": "胸ポケット",
                                    "value_id": 15,
                                    "value_name": "箱型",
                                },
                            ]
                        },
                        {
                            "id": 3,
                            "item_id": 3,
                            "cart_id": 1,
                            "button": {
                                "id": 2,
                                "name": '2B1掛け',
                            },
                            "options": [
                                {
                                    "id": 5,
                                    "name": "ベンツ",
                                    "value_id": 12,
                                    "value_name": "サイド",
                                },
                                {
                                    "id": 6,
                                    "name": "胸ポケット",
                                    "value_id": 15,
                                    "value_name": "箱型",
                                },
                                {
                                    "id": 7,
                                    "name": "脇ポケット",
                                    "value_id": 28,
                                    "value_name": "フラップ（Dカン止め）",
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 2,
                    "type": 1,
                    "gender": {
                        "id": 1,
                        "name": "Men's"
                    },
                    "category": {
                        "id": 1,
                        "gender_id": 1,
                        "gender_name": "Men's",
                        "name": "Suit",
                    },
                    "product": {
                        "id": "01",
                        "name": "V上下",
                        "items": [
                            {
                                "id": 1,
                                "name": 'ジャケット',
                                "parent_id": null,
                            },
                            {
                                "id": 2,
                                "name": 'ベスト',
                                "parent_id": null,
                            },
                            {
                                "id": 3,
                                "name": 'パンツ',
                                "parent_id": null,
                            },
                        ]
                    },
                    "silhouette": { 
                        "id": 1,
                        "name": "シルエット",
                        "selected_id": 1,
                        "selected_name": "International"
                    },
                    "fabric": {
                        id: 3,
                        name: "生地",
                        selected_id: 99,
                        selected_name: 'HANABISHI ORIGINAL',
                        price: 46200,
                    },
                    "button": {
                        "id": 1,
                        "name": "フロントボタン数"
                    },
                    "price": 3600,
                    "quantity": 1,
                    "items": [
                        {
                            "id": 1,
                            "item_id": 1,
                            "cart_id": 2,
                            "button": {
                                "id": 3,
                                "name": '3B1掛け（段返り）',
                            },
                            "options": [
                                {
                                    "id": 4,
                                    "name": "ラペル",
                                    "value_id": 7,
                                    "value_name": "ノッチラペル",
                                },
                                {
                                    "id": 5,
                                    "name": "ベンツ",
                                    "value_id": 12,
                                    "value_name": "サイド",
                                },
                                {
                                    "id": 6,
                                    "name": "胸ポケット",
                                    "value_id": 15,
                                    "value_name": "箱型",
                                },
                                {
                                    "id": 7,
                                    "name": "脇ポケット",
                                    "value_id": 28,
                                    "value_name": "フラップ（Dカン止め）",
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "item_id": 2,
                            "cart_id": 2,
                            "button": {
                                "id": 2,
                                "name": '2B1掛け',
                            },
                            "options": [
                                {
                                    "id": 4,
                                    "name": "ラペル",
                                    "value_id": 7,
                                    "value_name": "ノッチラペル",
                                },
                                {
                                    "id": 5,
                                    "name": "ベンツ",
                                    "value_id": 12,
                                    "value_name": "サイド",
                                },
                                {
                                    "id": 6,
                                    "name": "胸ポケット",
                                    "value_id": 15,
                                    "value_name": "箱型",
                                },
                            ]
                        },
                        {
                            "id": 3,
                            "item_id": 3,
                            "cart_id": 2,
                            "button": {
                                "id": 2,
                                "name": '2B1掛け',
                            },
                            "options": [
                                {
                                    "id": 5,
                                    "name": "ベンツ",
                                    "value_id": 12,
                                    "value_name": "サイド",
                                },
                                {
                                    "id": 6,
                                    "name": "胸ポケット",
                                    "value_id": 15,
                                    "value_name": "箱型",
                                },
                                {
                                    "id": 7,
                                    "name": "脇ポケット",
                                    "value_id": 28,
                                    "value_name": "フラップ（Dカン止め）",
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 3,
                    "item_id": 2,
                    "type": 2,
                    "name": "女兼用ベルト",
                    "gender": {
                        "id": 2,
                        "name": "Ladie`s"
                    },
                    "code": "2008BL0506800A00",
                    "barcode": "00000001111100000111001",
                    "price": 2500,
                    "quantity": 2
                },
                {
                    "id": 4,
                    "item_id": 1,
                    "type": 2,
                    "name": "男兼用ネクタイ",
                    "gender": {
                        "id": 1,
                        "name": "Men's"
                    },
                    "code": "2008NT0506800A00",
                    "barcode": "00000001111100000111000",
                    "price": 3000,
                    "quantity": 1
                }
            ]
        }
    },
    async getSizes() {
        await simuLoading()
        return {
            "success": true,
            "data": [
                {
                    name: '反身',
                    key: 'body',
                    value: '',
                },
                {
                    name: '怒肩',
                    key: 'shoulders',
                    value: '',
                },
                {
                    name: 'N点 上下',
                    key: 'upAndDown',
                    value: '',
                },
                {
                    name: 'N点 左右',
                    key: 'leftAndRight',
                    value: '',
                },
                {
                    name: '屈身',
                    key: 'succumbing',
                    value: '',
                },
                {
                    name: '猫背',
                    key: 'kyphosis',
                    value: '',
                },
                {
                    name: '尻廻り',
                    key: 'buttocks',
                    value: '',
                },
            ]
        }
    },
    async updateCart(body) {
        await simuLoading()
        return {
            "success": true,
            "data": body,
        }
    },
    async deleteCartItem(id) {
        await simuLoading()
        return {
            "success": true,
            "data": id,
        }
    },
    async checkoutCart(body) {
        return await post('create/order', body).catch(() => null)
        // await simuLoading()
        // return {
        //     "success": true,
        //     "data": true,
        // }
    }
}