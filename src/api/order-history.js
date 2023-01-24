import { post } from '@/helpers/fetch'
import { simuLoading } from '@/helpers/util'

export default {
    async getOrderHistorySearchOptions() {
        await simuLoading()
        return {
            "success": true,
            "data": {
                categories: [
                    {
                        id: 1,
                        name: 'Suit',
                        models: [
                            {
                                "id": '01',
                                "name": "上下",
                            },
                            {
                                "id": '02',
                                "name": "上衣",
                            },
                            {
                                "id": '03',
                                "name": "パンツ",
                            },
                            {
                                "id": '04',
                                "name": "上下下",
                            },
                            {
                                "id": '05',
                                "name": "V上下",
                            },
                            {
                                "id": '06',
                                "name": "V上下＋下",
                            },
                            {
                                "id": '07',
                                "name": "V",
                            },
                        ]
                    },
                    {
                        id: 2,
                        name: 'Shirt',
                        models: [
                            {
                                "id": '08',
                                "name": "Short sleeve",
                            },
                            {
                                "id": '10',
                                "name": "Long Sleeve",
                            },
                        ]
                    }
                ],
                status: [
                    {
                        id: 1,
                        name: '新規受注'
                    },
                    {
                        id: 2,
                        name: '工場送信済'
                    },
                    {
                        id: 3,
                        name: '店舗到着/検品済'
                    },
                    {
                        id: 4,
                        name: 'キャンセル'
                    },
                    {
                        id: 5,
                        name: '商品到着メール送信済'
                    },
                ],
                areas: [
                    {
                        id: 1,
                        name: '海外',
                        stores: [
                            {
                                id: 1,
                                name: 'Store 1'
                            },
                            {
                                id: 2,
                                name: 'Store 2'
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: '中国・四国・九州',
                        stores: [
                            {
                                id: 3,
                                name: 'Store 3'
                            },
                            {
                                id: 4,
                                name: 'Store 4'
                            }
                        ]
                    },
                    {
                        id: 3,
                        name: '北陸・東海',
                        stores: []
                    },
                    {
                        id: 4,
                        name: '北海道・東北',
                        stores: []
                    },
                    {
                        id: 5,
                        name: '関西',
                        stores: []
                    },
                    {
                        id: 6,
                        name: '関東',
                        stores: []
                    },
                ]
            },
            "message": ""
        }
    },
    async getOrderHistories(params) {
        await simuLoading()
        return {
            "success": true,
            "data": [1,2,3,4,5,6,7,8,9],
            "meta": {
                "page": 1,
                "total": 20
            },
            "message": ""
        }
    },
    async getOrderHistory(id) {
        await simuLoading()
        return {
            "success": true,
            "data": {
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
            "message": ""
        }
    },
    async getSizes(id) {
        await simuLoading()
        return {
            "success": true,
            "data": [
                {
                    name: '反身',
                    key: 'body',
                    value: '32',
                },
                {
                    name: '怒肩',
                    key: 'shoulders',
                    value: '32',
                },
                {
                    name: 'N点 上下',
                    key: 'upAndDown',
                    value: '32',
                },
                {
                    name: 'N点 左右',
                    key: 'leftAndRight',
                    value: '32',
                },
                {
                    name: '屈身',
                    key: 'succumbing',
                    value: '32',
                },
                {
                    name: '猫背',
                    key: 'kyphosis',
                    value: '32',
                },
                {
                    name: '尻廻り',
                    key: 'buttocks',
                    value: '32',
                },
            ]
        }
    },
}