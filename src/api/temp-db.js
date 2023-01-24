export const genders = [
    {
        'id': 1,
        'name': 'Men\'s'
    },
    {
        'id': 2,
        'name': 'Ladie\'s'
    }
]

export const categories = [
    {
        'id': 1,
        'gender_id': 1,
        'gender_name': "Men's",
        'name': 'Suit',
        'img': 'https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_suit.png',
        'items': [1,2,3,4]
    },
    {
        'id': 2,
        'gender_id': 1,
        'gender_name': "Men's",
        'name': 'Shirt',
        'img': 'https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_shirt.png',
        'items': [7,8,9]
    },
    {
        'id': 3,
        'gender_id': 2,
        'gender_name': "Ladie's",
        'name': 'Suit',
        'img': 'https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/ladies_suit.png',
        'items': [1,2,3,4,5,6]
    },
    {
        'id': 4,
        'gender_id': 2,
        'gender_name': "Ladie's",
        'name': 'Shirt',
        'img': 'https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/ladies_shirt.png',
        'items': [7,8,9]
    }
]

export const items = [
    {
        "id": 1,
        "name": "ジャケット",
        "parent_id": null,
        "mens_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_jacket.png",
        "ladies_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/ladies_jacket.png"
    },
    {
        "id": 2,
        "name": "ベスト",
        "parent_id": null,
        "mens_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_vest.png",
        "ladies_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_vest.png"
    },
    {
        "id": 3,
        "name": "パンツ",
        "parent_id": null,
        "mens_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_pants.png",
        "ladies_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/ladies_pants.png"
    },
    {
        "id": 4,
        "name": "スペアパンツ",
        "parent_id": 3,
        "mens_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_pants.png",
        "ladies_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/ladies_pants.png"
    },
    {
        "id": 5,
        "name": "スカート",
        "parent_id": null,
        "mens_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_pants.png",
        "ladies_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/ladies_skirt.png"
    },
    {
        "id": 6,
        "name": "スペアス",
        "parent_id": 5,
        "mens_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_pants.png",
        "ladies_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/ladies_shirt.png"
    },
    {
        "id": 7,
        "name": "シャツ(長袖)",
        "parent_id": null,
        "mens_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_shirt.png",
        "ladies_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/ladies_shirt.png"
    },
    {
        "id": 8,
        "name": "シャツ(半袖)",
        "parent_id": null,
        "mens_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_shirt.png",
        "ladies_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/ladies_shirt.png"
    },
    {
        "id": 9,
        "name": "シャツ(七分袖)",
        "parent_id": null,
        "mens_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/mens_shirt.png",
        "ladies_img": "https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/ladies_shirt.png"
    }
]