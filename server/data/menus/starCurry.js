const foodList = {
    "印度烤雞漢堡": 50,
    "香烤免治羊肉漢堡": 65,
    "5oz牛肉芝士漢堡": 60,
    "印度咖哩雞(飯)": 48,
    "印度咖哩牛腩(飯)": 55,
    "印度咖哩羊肉(飯)": 60,
    "印度咖哩什菜(飯)": 48,
    "印度咖哩雞(烤餅)": 53,
    "印度咖哩牛腩(烤餅)": 60,
    "印度咖哩羊肉(烤餅)": 65,
    "印度咖哩什菜(烤餅)": 53,
    "印度咖哩雞(雙拼)": 55,
    "印度咖哩牛腩(雙拼)": 62,
    "印度咖哩羊肉(雙拼)": 67,
    "印度咖哩什菜(雙拼)": 55,
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
        name: "椰青水",
        type: "凍",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍"],
        iceOptions: ["正常 Regular"],
        sugarOptions: ["正常 Regular"]
    },
    {
        name: "檸檬水",
        type: "凍",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍", "熱"],
        iceOptions: ["正常 Regular"],
        sugarOptions: ["正常 Regular", "少 Half", "走 Free"]
    },
    {
        name: "咖啡",
        type: "熱",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍", "熱"],
        iceOptions: ["正常 Regular"],
        sugarOptions: ["正常 Regular"]
    },
    {
        name: "青檸梳打",
        type: "凍",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍"],
        iceOptions: ["正常 Regular"],
        sugarOptions: ["正常 Regular"]
    },
    {
        name: "汽水",
        type: "凍",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["凍"],
        iceOptions: ["正常 Regular"],
        sugarOptions: ["正常 Regular"]
    },
    {
        name: "南瓜湯",
        type: "熱",
        ice: "正常 Regular",
        sugar: "正常 Regular",
        typeOptions: ["熱"],
        iceOptions: ["正常 Regular"],
        sugarOptions: ["正常 Regular"]
    }
];

module.exports = {
    foodList,
    foodMenu,
    drinksMenu
};