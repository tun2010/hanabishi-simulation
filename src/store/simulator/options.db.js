
const menSuitBritish = 'https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/simulator/mens_suit_british.png'
const menSuitItalian = 'https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/simulator/mens_suit_italian.png'
const menSuitInternational = 'https://hanabishi.coremobile.co.jp/html/user_data/assets/img/common/simulator/mens_suit_international.png'

export const models = [
    {
        id: 1,
        name: 'A-21'
    },
    {
        id: 2,
        name: 'A-11-N'
    },
    {
        id: 3,
        name: 'A-21-A'
    },
    {
        id: 4,
        name: 'A-21-B'
    },
    {
        id: 5,
        name: 'A-31'
    },
    {
        id: 6,
        name: 'A-32'
    },
    {
        id: 7,
        name: 'A-43'
    },
    {
        id: 8,
        name: 'AD-21'
    },
    {
        id: 9,
        name: 'AD-41'
    },
    {
        id: 10,
        name: 'AD-42'
    },
    {
        id: 11,
        name: 'AD-42-A'
    },
    {
        id: 12,
        name: 'AD-61'
    },
    {
        id: 13,
        name: 'AD-62'
    },
    {
        id: 14,
        name: 'C-212'
    },
    {
        id: 15,
        name: 'C-312-X'
    },
    {
        id: 16,
        name: 'C-312-G'
    },
    {
        id: 17,
        name: 'C-322'
    },
    {
        id: 18,
        name: 'C-112'
    },
    {
        id: 19,
        name: 'CD-412'
    },
    {
        id: 20,
        name: 'CD-622'
    },
    {
        id: 21,
        name: 'W-212'
    },
    {
        id: 22,
        name: 'W-312-G'
    },
    {
        id: 23,
        name: 'W-322'
    },
    {
        id: 24,
        name: 'W-112'
    },
    {
        id: 25,
        name: 'WD-412'
    },
    {
        id: 26,
        name: 'WD-612'
    },
    {
        id: 27,
        name: 'ND-622'
    },
]

export const silhouetteOptions = [
    {
        id: 1,
        // name: 'ブリティッシュ',
        name: 'British',
        img: menSuitBritish,
    },
    {
        id: 2,
        // name: 'イタリアン',
        name: 'Italian',
        img: menSuitItalian,
    },
    {
        id: 3,
        // name: 'インターナショナル',
        name: 'International',
        img: menSuitInternational,
    },
]

export const optionParents = [
    {
        id: 1,
        name: 'シルエット',
        type: 1, // 1: Silhouettes, 2: Buttons, 3: Fabric, 4:Options
    },
    {
        id: 2,
        name: 'フロントボタン数',
        type: 2,
    },
    {
        id: 3,
        name: '生地',
        type: 3,
    },
    {
        id: 4,
        name: 'ラペル',
        type: 4,
    },
    {
        id: 5,
        name: 'ベンツ',
        type: 4,
    },
    {
        id: 6,
        name: '胸ポケット',
        type: 4,
    },
    {
        id: 7,
        name: '脇ポケット',
        type: 4,
    },
    // {
    //     id: 8,
    //     name: '袖ボタン数',
    //     type: 4,
    // },
    // {
    //     id: 9,
    //     name: 'ステッチ',
    //     type: 4,
    // },
    // {
    //     id: 10,
    //     name: 'バックスタイル',
    //     type: 4,
    // },
    // {
    //     id: 11,
    //     name: '前カット',
    //     type: 4,
    // },
]

export const buttonOptions = [
    {
        id: 1,
        name: '1B',
        model: {
            3: 2, 
            1: 18,
            2: 24,
        },
    },
    {
        id: 2,
        name: '2B1掛け',
        model: {
            3: 1, 
            1: 14,
            2: 21,
        },
    },
    {
        id: 3,
        name: '3B1掛け（段返り）',
        model: {
            3: 5, 
            1: 16,
            2: 22,
        },
    },
    {
        id: 4,
        name: '3B1掛け（中掛け）',
        model: {
            3: null,
            1: 15, 
            2: null,
        },
    },
    {
        id: 5,
        name: '3B2掛け',
        model: {
            3: 6, 
            1: 17, 
            2: 23,
        },
    },
    {
        id: 6,
        name: '4B3掛け',
        model: {
            3: 7, 
            1: null, 
            2: null,
        },
    },
]

export const childOptions = {
    4: [
        {
            id: 7,
            name: 'ノッチラペル',
            default_models: [1,2,3,4,5,6,7,14,15,16,17,18,21,22,23,24],
            parent_id: 4,
        },
        {
            id: 8,
            name: 'ピークラペル',
            model: 'A-11-N',
            default_models: [8,9,10,11,12,13,19,20,25,26,27],
            parent_id: 4,
        },
        {
            id: 9,
            name: 'セミピーク',
            model: 'A-11-N',
            default_models: [],
            parent_id: 4,
        },
        {
            id: 10,
            name: 'セミノッチ',
            model: 'A-11-N',
            default_models: [],
            parent_id: 4,
        },
    ],
    5: [
        {
            id: 11,
            name: 'センター',
            default_models: [1,2,3,4,5,6,7],
            parent_id: 5,
        },
        {
            id: 12,
            name: 'サイド',
            default_models: [14,15,16,17,18,19,20,21,22,23,24,25,26,27],
            parent_id: 5,
        },
        {
            id: 13,
            name: 'フック',
            default_models: [],
            parent_id: 5,
        },
        {
            id: 14,
            name: 'ノーベンツ',
            default_models: [8,9,10,11,12,13],
            parent_id: 5,
        },
    ],
    6: [
        {
            id: 15,
            name: '箱型',
            default_models: [1,2,3,5,6,7,8,9,10,11,12,13],
            parent_id: 6,
        },
        {
            id: 16,
            name: 'アウト',
            default_models: [4],
            parent_id: 6,
        },
        {
            id: 17,
            name: '船型',
            default_models: [14,15,16,17,18,19,20],
            parent_id: 6,
        },
        {
            id: 18,
            name: 'パルカ',
            default_models: [],
            parent_id: 6,
        },
    ],
    7: [
        {
            id: 19,
            name: 'フラップ',
            default_models: [1,2,5,6,7,8,9,10,12,13,],
            parent_id: 7,
        },
        {
            id: 20,
            name: 'アウト',
            default_models: [3,4,11],
            parent_id: 7,
        },
        {
            id: 21,
            name: 'ナナメ',
            default_models: [],
            parent_id: 7,
        },
        {
            id: 22,
            name: 'ナナメ強',
            default_models: [],
            parent_id: 7,
        },
        {
            id: 23,
            name: '両玉',
            default_models: [],
            parent_id: 7,
        },
        {
            id: 24,
            name: '両玉縁',
            default_models: [],
            parent_id: 7,
        },
        {
            id: 25,
            name: 'チェンジフラップ',
            default_models: [],
            parent_id: 7,
        },
        {
            id: 26,
            name: 'チェンジナナメ',
            default_models: [],
            parent_id: 7,
        },
        {
            id: 27,
            name: 'チェンジナナメ強',
            default_models: [],
            parent_id: 7,
        },
        {
            id: 28,
            name: 'フラップ（Dカン止め）',
            default_models: [14,15,16,17,18,19,20,21,22,23,24,25,26,27],
            parent_id: 7,
        },
    ]
}