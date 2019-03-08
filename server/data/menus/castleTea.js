const foodList = {
    "芝士薯條蜜糖雞翼": 29,
    "美式薯條拼盤": 34,
    "脆香三式薯條拌沙律": 34,
    "特式釀雞翼拌沙律": 34,
    "是日迷你意粉推介": 36,
    "日式叉燒野菌豬骨湯烏瓜": 36,
    "火腿奶油脆豬配蕃茄濃湯螺絲粉": 33,
    "皇牌公司三文治": 36,
    "法式牛角酥 (煙三文魚，芝士，碎蛋沙律)": 33,
    "碎蛋沙律牛角包": 21,
    "吞拿魚沙律牛角包": 21,
    "香脆豬扒包": 29,
    "香脆魚柳包": 29,
    "美式熱狗": 25,
    "花生醬西多士": 25
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