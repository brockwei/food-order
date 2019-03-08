const moment = require("moment");

const restaurantOptions = require('./menus/restaurantOptions');
const goldThumb = require('./menus/goldThumb');
const castleTea = require('./menus/castleTea');
const thaiMa = require('./menus/thaiFood');
const starCurry = require('./menus/starCurry');

const restaurantMenus = {
    goldThumb,
    castleTea,
    thaiMa,
    starCurry
};

let roomsData = [];
// {
//     roomId: number,
//     roomName: string,
//     user: string,
//     restaurant: string,
//     restaurantName: string,
//     cutoffTime: string,
// }

const getRestaurantOptions = () => restaurantOptions.filter(option => !option.disabled);

// const getFoodList = (restaurantId) => goldThumb.foodList;
// const getFoodMenu = (restaurantId) => goldThumb.foodMenu;
// const getDrinksMenu = (restaurantId) => goldThumb.drinksMenu;

const getFoodList = (restaurantId) => {
    if (restaurantMenus[restaurantId]) {
        return restaurantMenus[restaurantId].foodList;
    } else {
        return {};
    }
};
const getFoodMenu = (restaurantId) => {
    if (restaurantMenus[restaurantId]) {
        return restaurantMenus[restaurantId].foodMenu;
    } else {
        return [];
    }
};
const getDrinksMenu = (restaurantId) => {
    if (restaurantMenus[restaurantId]) {
        return restaurantMenus[restaurantId].drinksMenu;
    } else {
        return [];
    }
};
// const getFoodList = (restaurantId) => {
//     switch (restaurantId) {
//         case "goldThumb":
//             return goldThumb.foodList;
//         case "castleTea":
//             return castleTea.foodList;
//         case "thaiMa":
//             return thaiMa.foodList;
//         case "starCurry":
//             return starCurry.foodList;
//         default:
//             return {};
//     };
// };
// const getFoodMenu = (restaurantId) => {
//     switch (restaurantId) {
//         case "goldThumb":
//             return goldThumb.foodMenu;
//         case "castleTea":
//             return castleTea.foodMenu;
//         case "thaiMa":
//             return thaiMa.foodMenu;
//         case "starCurry":
//             return starCurry.foodMenu;
//         default:
//             return [];
//     };
// };
// const getDrinksMenu = (restaurantId) => {
//     switch (restaurantId) {
//         case "goldThumb":
//             return goldThumb.drinksMenu;
//         case "castleTea":
//             return castleTea.drinksMenu;
//         case "thaiMa":
//             return thaiMa.drinksMenu;
//         case "starCurry":
//             return starCurry.drinksMenu;
//         default:
//             return [];
//     };
// };


const getRoomsData = () => roomsData;
const createRoom = (newRoomData) => {
    if (!roomsData.find(room => room.roomName === newRoomData.roomName) || moment(newRoomData.cutOffTime).isBefore(new Date())){
        const roomId = roomsData.length > 0 ? roomsData[roomsData.length - 1].roomId + 1 : 1;
        roomsData.push({ ...newRoomData, roomId, restaurantName: restaurantOptions.filter(restaurant => restaurant.id === newRoomData.restaurant )[0].name });
    }
    return roomsData;
}
const clearRoom = (roomName) => {
    console.log("clearRoom", roomName);
    clearedRoom = roomsData.filter(room => room.roomName === roomName);
    roomsData = roomsData.filter(room => room.roomName !== roomName);
    // Clears orders with roomid
    allOrders = allOrders.filter(order => order.roomId !== clearedRoom.roomId);
    return roomsData;
}
const stopOrders = (roomData) => {
    roomsData = roomsData.map(room => room.roomName === roomData.roomName ? { ...room, cutOffTime: moment(new Date())} : room);
    return roomsData; 
}

let allOrders = [];

// const getUserOrders = (user) => {
//     return allOrders;
// };
const getAllOrders = () => { 
    console.log("getAllOrders");
    console.log(allOrders);
    return allOrders;
};

const updateOrders = (newOrder, user) => {
    allOrders = allOrders.concat(newOrder);
    return allOrders;
};

const clearOrders = (user) => {
    allOrders = allOrders.filter(order => order.user !== user);
    return allOrders;
}

const getUserData = (user) => {
    let userOrders = [];
    if (user !== "none") {
        userOrders = allOrders.filter(order => order.user === user);
    }
    return {
        restaurantOptions: getRestaurantOptions(),
        roomsData: getRoomsData(),

        foodMenuObject: getFoodList(),
        foodMenu: getFoodMenu(),
        drinksMenu: getDrinksMenu(),
        allOrders: getAllOrders(),
        // userOrders
    }
}

module.exports =  {
    // For menu reset:
    getFoodMenu,
    getDrinksMenu,

    // getUserOrders,
    getAllOrders,
    updateOrders,
    clearOrders,

    getUserData,

    // 
    createRoom,
    clearRoom,
    stopOrders
};