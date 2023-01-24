import { post } from '@/helpers/fetch'
import { simuLoading } from "@/helpers/util"
import { models, childOptions } from "@/store/simulator/options.db"

const parent_options = {
    "1": [
        {
            "id": 4,
            "name": "ラペル",
        },
        {
            "id": 5,
            "name": "ベンツ",
        },
        {
            "id": 6,
            "name": "胸ポケット",
        },
        {
            "id": 7,
            "name": "脇ポケット",
        }
    ],
    "2": [
        {
            "id": 6,
            "name": "胸ポケット",
        },
        {
            "id": 7,
            "name": "脇ポケット",
        }
    ],
    "3": [
        {
            "id": 5,
            "name": "ベンツ",
        },
        {
            "id": 6,
            "name": "胸ポケット",
        },
        {
            "id": 7,
            "name": "脇ポケット",
        }
    ]
}

export default {
    async getSuitSimulator(body) {
        // return {
        //     "success": true,
        //     "data": {
        //       "gender": {
        //         "id": 1,
        //         "name": "男性",
        //         "sortNo": 0
        //       },
        //       "category": {
        //         "id": 1,
        //         "name": "スーツ / ジャケット / パンツ",
        //         "hierarchy": 1,
        //         "sort_no": 1,
        //         "create_date": "2022-07-07T10:03:37+09:00",
        //         "update_date": "2022-07-07T10:03:37+09:00",
        //         "discriminator_type": "category"
        //       },
        //       "combination": {
        //         "id": 9,
        //         "name": "V上下",
        //         "code": "05"
        //       },
        //       "products": [
        //         {
        //           "id": 1,
        //           "name": "ジャケット",
        //           "category_id": 1,
        //           "children": [
        //             {
        //               "id": 8,
        //               "name": "ダブル",
        //               "category_id": 1,
        //               "children": []
        //             },
        //             {
        //               "id": 7,
        //               "name": "シングル",
        //               "category_id": 1,
        //               "children": []
        //             }
        //           ]
        //         },
        //         {
        //           "id": 2,
        //           "name": "ベスト",
        //           "category_id": 1,
        //           "children": []
        //         },
        //         {
        //           "id": 3,
        //           "name": "パンツ",
        //           "category_id": 1,
        //           "children": []
        //         }
        //       ],
        //       "shiruetto": [
        //         {
        //           "id": 1,
        //           "name": "ブリティッシュ",
        //           "image": "0727125447_62e0b707219e5.png",
        //           "explanation": null,
        //           "sort_no": 6,
        //           "del_flg": 0,
        //           "create_date": "2022-07-25T21:31:13+09:00",
        //           "update_date": "2022-10-13T12:03:50+09:00",
        //           "discriminator_type": "shiruetto",
        //           "ShiruettoProductName": [
        //             {
        //               "shiruetto_id": 1,
        //               "product_name_id": 1,
        //               "option_category_id": 7,
        //               "discriminator_type": "shiruettoproductname",
        //               "SuitOptionCategory": {
        //                 "id": 7,
        //                 "parent_option_category": null,
        //                 "option_category_name": "フロントボタン数",
        //                 "image": null,
        //                 "sort_no": 7,
        //                 "del_flg": 0,
        //                 "create_date": "2022-07-27T13:13:15+09:00",
        //                 "update_date": "2022-07-27T13:13:15+09:00",
        //                 "discriminator_type": "suitoptioncategory"
        //               }
        //             },
        //             {
        //               "shiruetto_id": 1,
        //               "product_name_id": 2,
        //               "option_category_id": 18,
        //               "discriminator_type": "shiruettoproductname",
        //               "SuitOptionCategory": {
        //                 "id": 18,
        //                 "parent_option_category": null,
        //                 "option_category_name": "ボタン数",
        //                 "image": null,
        //                 "sort_no": 18,
        //                 "del_flg": 0,
        //                 "create_date": "2022-07-27T13:47:59+09:00",
        //                 "update_date": "2022-07-27T13:47:59+09:00",
        //                 "discriminator_type": "suitoptioncategory"
        //               }
        //             },
        //             {
        //               "shiruetto_id": 1,
        //               "product_name_id": 3,
        //               "option_category_id": 12,
        //               "discriminator_type": "shiruettoproductname",
        //               "SuitOptionCategory": {
        //                 "id": 12,
        //                 "parent_option_category": null,
        //                 "option_category_name": "タック",
        //                 "image": null,
        //                 "sort_no": 12,
        //                 "del_flg": 0,
        //                 "create_date": "2022-07-27T13:32:26+09:00",
        //                 "update_date": "2022-07-27T13:32:26+09:00",
        //                 "discriminator_type": "suitoptioncategory"
        //               }
        //             },
        //             {
        //               "shiruetto_id": 1,
        //               "product_name_id": 4,
        //               "option_category_id": 12,
        //               "discriminator_type": "shiruettoproductname",
        //               "SuitOptionCategory": {
        //                 "id": 12,
        //                 "parent_option_category": null,
        //                 "option_category_name": "タック",
        //                 "image": null,
        //                 "sort_no": 12,
        //                 "del_flg": 0,
        //                 "create_date": "2022-07-27T13:32:26+09:00",
        //                 "update_date": "2022-07-27T13:32:26+09:00",
        //                 "discriminator_type": "suitoptioncategory"
        //               }
        //             }
        //           ]
        //         },
        //         {
        //           "id": 3,
        //           "name": "インターナショナル",
        //           "image": "0727125427_62e0b6f35e48a.png",
        //           "explanation": null,
        //           "sort_no": 5,
        //           "del_flg": 0,
        //           "create_date": "2022-07-26T12:41:51+09:00",
        //           "update_date": "2022-10-13T12:03:50+09:00",
        //           "discriminator_type": "shiruetto",
        //           "ShiruettoProductName": [
        //             {
        //               "shiruetto_id": 3,
        //               "product_name_id": 1,
        //               "option_category_id": 7,
        //               "discriminator_type": "shiruettoproductname",
        //               "SuitOptionCategory": {
        //                 "id": 7,
        //                 "parent_option_category": null,
        //                 "option_category_name": "フロントボタン数",
        //                 "image": null,
        //                 "sort_no": 7,
        //                 "del_flg": 0,
        //                 "create_date": "2022-07-27T13:13:15+09:00",
        //                 "update_date": "2022-07-27T13:13:15+09:00",
        //                 "discriminator_type": "suitoptioncategory"
        //               }
        //             },
        //             {
        //               "shiruetto_id": 3,
        //               "product_name_id": 2,
        //               "option_category_id": 18,
        //               "discriminator_type": "shiruettoproductname",
        //               "SuitOptionCategory": {
        //                 "id": 18,
        //                 "parent_option_category": null,
        //                 "option_category_name": "ボタン数",
        //                 "image": null,
        //                 "sort_no": 18,
        //                 "del_flg": 0,
        //                 "create_date": "2022-07-27T13:47:59+09:00",
        //                 "update_date": "2022-07-27T13:47:59+09:00",
        //                 "discriminator_type": "suitoptioncategory"
        //               }
        //             },
        //             {
        //               "shiruetto_id": 3,
        //               "product_name_id": 3,
        //               "option_category_id": 12,
        //               "discriminator_type": "shiruettoproductname",
        //               "SuitOptionCategory": {
        //                 "id": 12,
        //                 "parent_option_category": null,
        //                 "option_category_name": "タック",
        //                 "image": null,
        //                 "sort_no": 12,
        //                 "del_flg": 0,
        //                 "create_date": "2022-07-27T13:32:26+09:00",
        //                 "update_date": "2022-07-27T13:32:26+09:00",
        //                 "discriminator_type": "suitoptioncategory"
        //               }
        //             },
        //             {
        //               "shiruetto_id": 3,
        //               "product_name_id": 4,
        //               "option_category_id": 12,
        //               "discriminator_type": "shiruettoproductname",
        //               "SuitOptionCategory": {
        //                 "id": 12,
        //                 "parent_option_category": null,
        //                 "option_category_name": "タック",
        //                 "image": null,
        //                 "sort_no": 12,
        //                 "del_flg": 0,
        //                 "create_date": "2022-07-27T13:32:26+09:00",
        //                 "update_date": "2022-07-27T13:32:26+09:00",
        //                 "discriminator_type": "suitoptioncategory"
        //               }
        //             }
        //           ]
        //         },
        //         {
        //           "id": 4,
        //           "name": "イタリアン",
        //           "image": "0727125530_62e0b73291eb5.png",
        //           "explanation": null,
        //           "sort_no": 4,
        //           "del_flg": 0,
        //           "create_date": "2022-07-26T13:58:15+09:00",
        //           "update_date": "2022-10-13T12:03:50+09:00",
        //           "discriminator_type": "shiruetto",
        //           "ShiruettoProductName": [
        //             {
        //               "shiruetto_id": 4,
        //               "product_name_id": 1,
        //               "option_category_id": 7,
        //               "discriminator_type": "shiruettoproductname",
        //               "SuitOptionCategory": {
        //                 "id": 7,
        //                 "parent_option_category": null,
        //                 "option_category_name": "フロントボタン数",
        //                 "image": null,
        //                 "sort_no": 7,
        //                 "del_flg": 0,
        //                 "create_date": "2022-07-27T13:13:15+09:00",
        //                 "update_date": "2022-07-27T13:13:15+09:00",
        //                 "discriminator_type": "suitoptioncategory"
        //               }
        //             },
        //             {
        //               "shiruetto_id": 4,
        //               "product_name_id": 2,
        //               "option_category_id": 18,
        //               "discriminator_type": "shiruettoproductname",
        //               "SuitOptionCategory": {
        //                 "id": 18,
        //                 "parent_option_category": null,
        //                 "option_category_name": "ボタン数",
        //                 "image": null,
        //                 "sort_no": 18,
        //                 "del_flg": 0,
        //                 "create_date": "2022-07-27T13:47:59+09:00",
        //                 "update_date": "2022-07-27T13:47:59+09:00",
        //                 "discriminator_type": "suitoptioncategory"
        //               }
        //             },
        //             {
        //               "shiruetto_id": 4,
        //               "product_name_id": 3,
        //               "option_category_id": 12,
        //               "discriminator_type": "shiruettoproductname",
        //               "SuitOptionCategory": {
        //                 "id": 12,
        //                 "parent_option_category": null,
        //                 "option_category_name": "タック",
        //                 "image": null,
        //                 "sort_no": 12,
        //                 "del_flg": 0,
        //                 "create_date": "2022-07-27T13:32:26+09:00",
        //                 "update_date": "2022-07-27T13:32:26+09:00",
        //                 "discriminator_type": "suitoptioncategory"
        //               }
        //             },
        //             {
        //               "shiruetto_id": 4,
        //               "product_name_id": 4,
        //               "option_category_id": 14,
        //               "discriminator_type": "shiruettoproductname",
        //               "SuitOptionCategory": {
        //                 "id": 14,
        //                 "parent_option_category": null,
        //                 "option_category_name": "ベルト",
        //                 "image": null,
        //                 "sort_no": 14,
        //                 "del_flg": 0,
        //                 "create_date": "2022-07-27T13:35:59+09:00",
        //                 "update_date": "2022-07-27T13:35:59+09:00",
        //                 "discriminator_type": "suitoptioncategory"
        //               }
        //             }
        //           ]
        //         }
        //       ]
        //     },
        //     "message": ""
        //   }
        return await post('get/suit-simulator', body).catch(() => null)
    },
    async getShirtSimulator(body) {
        return await post('get/shirt-simulator', body).catch(() => null)
    },
    async getSuitOptionCategories(body) {
        // return {
        //     "success": true,
        //     "data": [
        //       {
        //         "id": 8,
        //         "parent_option_category": 7,
        //         "option_category_name": "ラペル",
        //         "image": null,
        //         "sort_no": 8,
        //         "del_flg": 0,
        //         "create_date": "2022-07-27T13:17:25+09:00",
        //         "update_date": "2023-01-21T19:29:01+09:00",
        //         "discriminator_type": "suitoptioncategory"
        //       },
        //       {
        //         "id": 10,
        //         "parent_option_category": 7,
        //         "option_category_name": "胸ポケット",
        //         "image": null,
        //         "sort_no": 10,
        //         "del_flg": 0,
        //         "create_date": "2022-07-27T13:24:29+09:00",
        //         "update_date": "2023-01-21T19:29:19+09:00",
        //         "discriminator_type": "suitoptioncategory"
        //       },
        //       {
        //         "id": 24,
        //         "parent_option_category": 7,
        //         "option_category_name": "ステッチ1",
        //         "image": null,
        //         "sort_no": 24,
        //         "del_flg": 0,
        //         "create_date": "2022-12-08T14:41:57+09:00",
        //         "update_date": "2023-01-21T19:29:33+09:00",
        //         "discriminator_type": "suitoptioncategory"
        //       }
        //     ],
        //     "message": ""
        //   }
        return await post('get/suit-options/categories', body).catch(() => null)
    },
    async getSuitOptionItems(body) {
        // return {
        //     "success": true,
        //     "data": [
        //       {
        //         "id": 4,
        //         "image": null,
        //         "name": "1B",
        //         "price": null,
        //         "delivery_code": "AA",
        //         "code": null,
        //         "explanation": "test",
        //         "sort_no": 4,
        //         "parent_id": 7
        //       },
        //       {
        //         "id": 5,
        //         "image": null,
        //         "name": "2B1掛け",
        //         "price": null,
        //         "delivery_code": "AA",
        //         "code": null,
        //         "explanation": null,
        //         "sort_no": 5,
        //         "parent_id": 7
        //       },
        //       {
        //         "id": 6,
        //         "image": null,
        //         "name": "3B1掛け（段返り）",
        //         "price": null,
        //         "delivery_code": "AA",
        //         "code": null,
        //         "explanation": null,
        //         "sort_no": 6,
        //         "parent_id": 7
        //       },
        //       {
        //         "id": 7,
        //         "image": null,
        //         "name": "3B1掛け（中掛け）",
        //         "price": null,
        //         "delivery_code": "AA",
        //         "code": null,
        //         "explanation": "test",
        //         "sort_no": 7,
        //         "parent_id": 7
        //       },
        //       {
        //         "id": 8,
        //         "image": null,
        //         "name": "3B2掛け",
        //         "price": null,
        //         "delivery_code": "AA",
        //         "code": null,
        //         "explanation": "test",
        //         "sort_no": 8,
        //         "parent_id": 7
        //       },
        //       {
        //         "id": 9,
        //         "image": null,
        //         "name": "4B3掛け",
        //         "price": null,
        //         "delivery_code": "AA",
        //         "code": null,
        //         "explanation": "test",
        //         "sort_no": 9,
        //         "parent_id": 7
        //       }
        //     ],
        //     "message": ""
        //   }
        return await post('get/suit-options/items', body).catch(() => null)
    },
    async getShirtOptionItems(body) {
        return await post('get/shirt-options/items', body).catch(() => null)
    },
    async getSuitModel(body) {
        // return {
        //     "success": true,
        //     "data": {
        //       "id": 30,
        //       "model_number": 324234234,
        //       "search_text": null,
        //       "image": null,
        //       "explanation": null,
        //       "sort_no": 23,
        //       "del_flg": 0,
        //       "creator_id": null,
        //       "create_date": "2023-01-23T22:46:08+09:00",
        //       "update_date": "2023-01-23T22:46:08+09:00",
        //       "discriminator_type": "model",
        //       "ProductName": {
        //         "id": 1,
        //         "name": "ジャケット",
        //         "hierarchy": 1,
        //         "sort_no": 1,
        //         "create_date": "2022-07-09T03:18:00+09:00",
        //         "update_date": "2022-11-16T12:55:25+09:00",
        //         "discriminator_type": "productname"
        //       },
        //       "Shiruetto": {
        //         "id": 1,
        //         "name": "ブリティッシュ",
        //         "image": "0727125447_62e0b707219e5.png",
        //         "explanation": null,
        //         "sort_no": 6,
        //         "del_flg": 0,
        //         "create_date": "2022-07-25T21:31:13+09:00",
        //         "update_date": "2022-10-13T12:03:50+09:00",
        //         "discriminator_type": "shiruetto"
        //       },
        //       "OptionCategory": {
        //         "id": 7,
        //         "parent_option_category": null,
        //         "option_category_name": "フロントボタン数",
        //         "image": null,
        //         "sort_no": 7,
        //         "del_flg": 0,
        //         "create_date": "2022-07-27T13:13:15+09:00",
        //         "update_date": "2022-07-27T13:13:15+09:00",
        //         "discriminator_type": "suitoptioncategory"
        //       },
        //       "OptionItem": {
        //         "id": 4,
        //         "option_name": "1B",
        //         "code": null,
        //         "delivery_code": "AA",
        //         "image": null,
        //         "price": null,
        //         "explanation": "test",
        //         "sort_no": 4,
        //         "del_flg": 0,
        //         "create_date": "2022-07-27T13:14:46+09:00",
        //         "update_date": "2022-07-27T13:14:46+09:00",
        //         "discriminator_type": "suitoptionitem"
        //       },
        //       "ModelOptionCode": [
        //         {
        //           "model_id": 30,
        //           "option_item_id": 10,
        //           "discriminator_type": "modeloptioncode",
        //           "SuitOptionItem": {
        //             "id": 10,
        //             "option_name": "ノッチラペル",
        //             "code": null,
        //             "delivery_code": "BB",
        //             "image": null,
        //             "price": null,
        //             "explanation": "test",
        //             "sort_no": 10,
        //             "del_flg": 0,
        //             "create_date": "2022-07-27T13:17:46+09:00",
        //             "update_date": "2022-07-27T13:18:30+09:00",
        //             "discriminator_type": "suitoptionitem",
        //             "Category": {
        //               "id": 8,
        //               "parent_option_category": 7,
        //               "option_category_name": "ラペル",
        //               "image": null,
        //               "sort_no": 8,
        //               "del_flg": 0,
        //               "create_date": "2022-07-27T13:17:25+09:00",
        //               "update_date": "2023-01-21T19:29:01+09:00",
        //               "discriminator_type": "suitoptioncategory"
        //             }
        //           }
        //         },
        //         {
        //           "model_id": 30,
        //           "option_item_id": 18,
        //           "discriminator_type": "modeloptioncode",
        //           "SuitOptionItem": {
        //             "id": 18,
        //             "option_name": "箱型",
        //             "code": null,
        //             "delivery_code": "DD",
        //             "image": null,
        //             "price": null,
        //             "explanation": "test",
        //             "sort_no": 18,
        //             "del_flg": 0,
        //             "create_date": "2022-07-27T13:24:57+09:00",
        //             "update_date": "2022-07-27T13:24:57+09:00",
        //             "discriminator_type": "suitoptionitem",
        //             "Category": {
        //               "id": 10,
        //               "parent_option_category": 7,
        //               "option_category_name": "胸ポケット",
        //               "image": null,
        //               "sort_no": 10,
        //               "del_flg": 0,
        //               "create_date": "2022-07-27T13:24:29+09:00",
        //               "update_date": "2023-01-21T19:29:19+09:00",
        //               "discriminator_type": "suitoptioncategory"
        //             }
        //           }
        //         },
        //         {
        //           "model_id": 30,
        //           "option_item_id": 73,
        //           "discriminator_type": "modeloptioncode",
        //           "SuitOptionItem": {
        //             "id": 73,
        //             "option_name": "ナシ",
        //             "code": null,
        //             "delivery_code": "0",
        //             "image": null,
        //             "price": null,
        //             "explanation": null,
        //             "sort_no": 68,
        //             "del_flg": 0,
        //             "create_date": "2022-12-08T14:45:55+09:00",
        //             "update_date": "2022-12-08T15:25:46+09:00",
        //             "discriminator_type": "suitoptionitem",
        //             "Category": {
        //               "id": 24,
        //               "parent_option_category": 7,
        //               "option_category_name": "ステッチ1",
        //               "image": null,
        //               "sort_no": 24,
        //               "del_flg": 0,
        //               "create_date": "2022-12-08T14:41:57+09:00",
        //               "update_date": "2023-01-21T19:29:33+09:00",
        //               "discriminator_type": "suitoptioncategory"
        //             }
        //           }
        //         }
        //       ]
        //     },
        //     "message": ""
        //   }
        return await post('get/suit/model', body).catch(() => null)
    },
    async getDefaultOptions(options) {
        const model = models[options.model]
        await simuLoading()
        const optionsSelected = []
        if (parent_options[options.item] && model) {
            parent_options[options.item].forEach(item => {
                if (childOptions[item.id]) {
                    const option = childOptions[item.id].find(child => child.default_models.includes(model.id))
                    if (option) optionsSelected.push(option)
                }
            })
        }
        return {
            success: true,
            data: optionsSelected
        }
    }
}
