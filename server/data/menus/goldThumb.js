const foodList = {
    "蕃茄牛肉炒蛋飯": 43,
    "南乳炆豬手飯": 43,
    "黑椒豬扒飯": 43,
    "魚香茄子飯": 43,
    "椒鹽豬扒飯": 43,
    "黑椒雞扒紅腸飯": 43,
    "口水雞": 45,
    "蘿蔔牛腩菜飯": 45,
    "鳳梨豬軟骨菜飯": 45,
    "燒汁雞中翼菜飯": 45,
    "家鄉鹽焗雞": 45,
    "薑蔥霸王雞": 45,
    "蔥油雞扒飯": 45,
    "菠蘿咕嚕肉": 45,
    "燒味四寶飯": 45,
    "臘腸雲耳蒸雞": 43,
    "豉汁蒸鯇魚": 46,
    "梅子蒸排骨": 43,
    "馬蹄土魷蒸肉飯": 43,
    "叉燒菜脯炒蛋": 43,
    "芺蓉煎蛋": 43,
    "家鄉梅菜扣肉": 46,
    "什扒飯 配黑椒汁": 48,
    "冬瓜鴨腿湯飯": 46,
    "馬來咖哩牛腩飯": 42,
    "馬來咖哩雞扒飯": 38,
    "粟米肉粒飯": 36,
    "火腿炒蛋飯": 36,
    "肉醬煎雙蛋飯": 43,
    "冬瓜粒湯飯": 43,
    "蕃茄肉片蛋花湯飯": 43,
    "蕃茄芝士焗豬扒飯": 43
};
const foodMenu = [];
for (var name in foodList) {
    foodMenu.push({
        name,
        price: foodList[name],
        quantity: 0
    });
};
const drinksMenu = [
    {
        name: "檸檬茶 Lemon tea",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    {
        name: "奶茶 Milk Tea",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    {
        name: "檸檬水 Lemon Water",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    {
        name: "咖啡 Coffee",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    {
        name: "鴛鴦 Yuan Yang",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    // {
    //     name: "好立克 Horlicks",
    //     type: "凍 Iced",
    //     ice: "正常 Regular",
    //     sugar: "正常 Regular",
    //     typeOptions: ["凍 Iced", "熱 Hot"],
    //     iceOptions: ["正常 Regular", "少 Half", "走 Free"],
    //     sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    // },
    {
        name: "阿華田 Ovaltine",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    // {
    //     name: "利賓納 Ribena",
    //     type: "凍 Iced",
    //     ice: "正常 Regular",
    //     sugar: "正常 Regular",
    //     typeOptions: ["凍 Iced", "熱 Hot"],
    //     iceOptions: ["正常 Regular", "少 Half", "走 Free"],
    //     sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    // },
    // {
    //     name: "杏仁霜 Almond Milk",
    //     type: "凍 Iced",
    //     ice: "正常 Regular",
    //     sugar: "正常 Regular",
    //     typeOptions: ["凍 Iced", "熱 Hot"],
    //     iceOptions: ["正常 Regular", "少 Half", "走 Free"],
    //     sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    // },
    // {
    //     name: "朱古力 chocolate",
    //     type: "凍 Iced",
    //     ice: "正常 Regular",
    //     sugar: "正常 Regular",
    //     typeOptions: ["凍 Iced", "熱 Hot"],
    //     iceOptions: ["正常 Regular", "少 Half", "走 Free"],
    //     sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    // },
    {
        name: "菜蜜 Cress Honey",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    // {
    //     name: "檸檬菜蜜 Cress Honey with lemon",
    //     type: "凍 Iced",
    //     ice: "正常 Regular",
    //     sugar: "正常 Regular",
    //     typeOptions: ["凍 Iced", "熱 Hot"],
    //     iceOptions: ["正常 Regular", "少 Half", "走 Free"],
    //     sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    // },
    {
        name: "汽水 Soft Drink",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced"],
        iceOptions: ["正常 Regular"],
        sugarOptions: ["正常 Regular"]
    }
];

module.exports = {
    foodList,
    foodMenu,
    drinksMenu
};