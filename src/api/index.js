import { post } from '@/helpers/fetch'

export default {
    async getInitinal() {
        // return {
        //     "success": true,
        //     "data": {
        //       "shop": {
        //         "name": "コアモバイル　テスト店舗　ONE"
        //       },
        //       "staff": {
        //         "staff_name": "Tun Lin Phyo",
        //         "staff_code": "001"
        //       },
        //       "customer": {
        //         "id": 16,
        //         "name": "Tun Lin",
        //         "kana": "ツン ィン",
        //         "phone_number": "08022223333",
        //         "email": "tun@coremobile.co.jp",
        //         "last_buy_date": null
        //       },
        //       "items": {
        //         "gender": {
        //           "id": 1,
        //           "name": "男性",
        //           "sortNo": 0
        //         },
        //         "category": 1,
        //         "item": 9
        //       }
        //     },
        //     "message": ""
        //   };
        return await post('get/initinal').catch(() => null)
    },
    async setGender(gender) {
        return await post('set/gender', { gender }).catch(() => null)
    }
}