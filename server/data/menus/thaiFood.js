const foodList = {
    "泰式海南雞飯": 52,
    "泰式豬手飯": 52,
    "泰式香葉辣椒炒肉碎配白飯+煎蛋": 52,
    "泰式白豆角豬頸豬飯": 52,
    "泰式青咖哩豬扒飯": 52,
    "泰式炒金邊粉(素)": 52,
    "泰式青咖哩飯(素)": 52,
    "泰式乾炒飯(素)": 52,
    "泰式香葉炒河(素)": 52,
    "泰式冬蔭湯河(素)": 52,
    "泰式雞肉炒金邊粉": 52,
    "泰式乾炒牛河": 52,
    "泰式喇沙豬扒湯河": 52,
    "泰式海南雞湯河": 52,
    "泰式冬蔭功湯河": 52,
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
    {
        name: "好立克 Horlicks",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    {
        name: "阿華田 Ovaltine",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    {
        name: "利賓納 Ribena",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    {
        name: "杏仁霜 Almond Milk",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    {
        name: "朱古力 chocolate",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    {
        name: "菜蜜 Cress Honey",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    {
        name: "檸檬菜蜜 Cress Honey with lemon",
        type: "凍 Iced",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍 Iced", "熱 Hot"],
        iceOptions: ["正常 Regular", "少 Half", "走 Free"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
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