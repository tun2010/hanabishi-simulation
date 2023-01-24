import { post } from '@/helpers/fetch'

export default {
    async getCategories() {
        // return {
        //     "success": true,
        //     "data": {
        //         "gender": {
        //             "id": 1,
        //             "name": "男性",
        //             "sortNo": 0
        //         },
        //         "categories": [
        //             {
        //                 "id": 1,
        //                 "name": "スーツ / ジャケット / パンツ",
        //                 "hierarchy": 1,
        //                 "sort_no": 1,
        //                 "create_date": "2022-07-07T10:03:37+09:00",
        //                 "update_date": "2022-07-07T10:03:37+09:00",
        //                 "discriminator_type": "category",
        //                 "Children": [],
        //                 "img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_suit.png"
        //             },
        //             {
        //                 "id": 2,
        //                 "name": "シャツ",
        //                 "hierarchy": 1,
        //                 "sort_no": 4,
        //                 "create_date": "2022-07-07T10:03:53+09:00",
        //                 "update_date": "2022-07-07T10:03:53+09:00",
        //                 "discriminator_type": "category",
        //                 "Children": [
        //                     {
        //                         "id": 3,
        //                         "name": "ロイヤルオーダー",
        //                         "hierarchy": 2,
        //                         "sort_no": 2,
        //                         "create_date": "2022-07-07T10:04:03+09:00",
        //                         "update_date": "2022-07-07T10:04:03+09:00",
        //                         "discriminator_type": "category",
        //                         "Children": []
        //                     },
        //                     {
        //                         "id": 4,
        //                         "name": "パターンオーダー",
        //                         "hierarchy": 2,
        //                         "sort_no": 3,
        //                         "create_date": "2022-07-07T10:04:09+09:00",
        //                         "update_date": "2022-07-07T10:04:09+09:00",
        //                         "discriminator_type": "category",
        //                         "Children": []
        //                     }
        //                 ],
        //                 "img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_shirt.png"
        //             }
        //         ]
        //     },
        //     "message": ""
        // }
        return await post('get/categories').catch(() => null)
    },
    async getItems(body) {
        return await post('get/items', body).catch(() => null)
    },
    async setItems(items) {
        return await post('set/items', items).catch(() => null)
    },
}