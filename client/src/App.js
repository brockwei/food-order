import React, { Component } from "react";
import moment from 'moment';
import socketIOClient from "socket.io-client";
import { Card, Button, Drawer, Badge, Tag, Statistic } from 'antd';

import EnterNameForm from './components/EnterNameForm';
import CreateRoomsButton from './components/CreateRoomButton';
import RoomsCard from './components/RoomsCard';
import OrderCard from './components/OrderCard';
// import FoodMenu from './components/FoodMenu';
// import DrinksMenu from './components/DrinksMenu';
import FoodOrders from './components/FoodOrders';

const Countdown = Statistic.Countdown;
const config = require('./config.json');

class App extends Component {
  state = {
    user: "none",
    // endpoint: "http://192.168.10.56:8501",

    newOrders: 0,
    isDrawerOpen: false,

    foodMenuObject: false,
    foodMenu: [],
    drinksMenu: [],
    drinksOrderBeforeSubmit: [],
    allOrders: [],
    userOrders: [],

    // Rooms
    // roomsData: [{ roomId: 1, roomName: "test", user: "Brock", restaurant: "goldenThumb", cutOffTime: new Date("2019/02/28 16:00") }],
    roomsData: [],
    // Other Data
    restaurantOptions: [],
    currentRoom: null
    // currentRoom: {
    //   cutOffTime: string,
    //   restaurant: string, // restaurantId
    //   restaurantName: string, //restaurantName
    //   roomId: number,
    //   roomName: string,
    //   user: string,
    // }
  };
  componentDidMount() {
    this.setState({ socket: socketIOClient(config.server_url)}, () => {
      const { socket, user } = this.state;
      const registeredUser = localStorage.getItem("user") || user;
      this.setState({ user: registeredUser });
      socket.emit("to-server_send-user", registeredUser);

      socket.on("to-client_send-user-data", (data) => {
        const { foodMenu, drinksMenu, allOrders, userOrders, foodMenuObject, restaurantOptions, roomsData } = data;
        this.setState({ foodMenu, drinksMenu, allOrders, userOrders, foodMenuObject, restaurantOptions, roomsData });
      });
      socket.on("to-client_reset-orders", (foodMenu, drinksMenu) => {
        this.setState({ foodMenu, drinksMenu, drinksOrderBeforeSubmit: [] });
      });
      socket.on("to-client_updated-orders", (allOrders) => {
        console.log("updatedOrders", allOrders);
        const roomId = allOrders.length > 0 ? allOrders[allOrders.length - 1].roomId : 1;
        this.handleSetNewOrderCount(roomId);
        this.setState({ allOrders });
      })
      // Rooms
      socket.on("to-client_created-room", (roomsData) => {
        console.log("createdRoom", roomsData);
        // this.handleSetNewOrderCount();
        this.setState({ roomsData });
      });
      socket.on("to-client_updated-room", (roomsData) => {
        const { currentRoom } = this.state;
        if (currentRoom) {
          const updatedCurrentRoom = roomsData.find(room => room.roomName === currentRoom.roomName);
          this.setState({ currentRoom: updatedCurrentRoom });
        } 
        this.setState({ roomsData });
      });
      socket.on("to-client_cleared-room", (roomsData) => {
        // this.handleSetNewOrderCount();
        this.setState({ roomsData });
        this.handleExitRoom();
      });
      socket.on("to-client_joined-room", (roomsData) => {
        // this.handleSetNewOrderCount();
        this.setState({ currentRoom: roomsData });
      });
    })
  }

  handleSetNewOrderCount = (roomId) => {
    const { newOrders, isDrawerOpen, currentRoom } = this.state;
    if (currentRoom && !isDrawerOpen && roomId === currentRoom.roomId) {
      this.setState({ newOrders: newOrders + 1 });
    }
  }
  handleOpenDrawer = () => {
    this.setState({ isDrawerOpen: true, newOrders: 0 });
  }
  handleCloseDrawer = () => {
    this.setState({ isDrawerOpen: false });
  }

  handleCreateRoom = (data) => {
    // console.log("handleCreateRoom", data);
    const { socket } = this.state;
    socket.emit("to-server_create-room", data);
  }
  handleSelectRoom = (roomData) => {
    // console.log("selecting room:", roomData);
    const { socket } = this.state;
    socket.emit("to-server_join-room", roomData);
    // this.setState({ currentRoom: roomData });
  }
  handleExitRoom = () => {
    this.setState({ 
      currentRoom: null,
      allOrders: [],
      foodMenu: [],
      drinksMenu: [],
      drinksOrderBeforeSubmit: []
    });
  }
  handleStopOrders = () => {
    const { socket, currentRoom } = this.state;
    console.log("stopOrders", currentRoom);
    socket.emit("to-server_stop-orders", currentRoom);
  }

  handleChangeUserName = (name) => {
    this.setState({ user: name });
  }
  handleUpdateQuantity = (name, quantity) => {
    const { foodMenu } = this.state;
    const updatedFoodMenu = foodMenu.map((food) => {
      return food.name === name ? { ...food, quantity: food.quantity + quantity > 0 ? food.quantity + quantity : 0 } : food;
    });
    this.setState({ foodMenu: updatedFoodMenu });
  }
  handleUpdateDrinksChoice = (value, field, drinkName) => {
    const { drinksMenu } = this.state;
    const updatedDrinksMenu = drinksMenu.map((drink) => {
      return drink.name === drinkName ? { ...drink, [field]: value } : drink
    });
    this.setState({ drinksMenu: updatedDrinksMenu });
  }
  handleAddDrinks = (drinkName) => {
    const { drinksMenu, drinksOrderBeforeSubmit } = this.state;
    const findDrink = drinksMenu.find((drink) => drink.name === drinkName);
    const isDrinkOrderExist = drinksOrderBeforeSubmit.find((drink) => drink.name === findDrink.name && drink.type === findDrink.type && drink.ice === findDrink.ice && drink.sugar === findDrink.sugar);
    const drinkToBeAdded = {
      name: findDrink.name,
      type: findDrink.type,
      ice: findDrink.ice,
      sugar: findDrink.sugar,
      quantity: 1,
      price: findDrink.type === "凍 Iced" ? 3 : 0,
      id: drinksOrderBeforeSubmit.length > 0 ? drinksOrderBeforeSubmit[drinksOrderBeforeSubmit.length -1].id + 1 : 1
    };
    if (!isDrinkOrderExist) {
      this.setState({ drinksOrderBeforeSubmit: drinksOrderBeforeSubmit.concat(drinkToBeAdded) });
    }
  }
  handleUpdateDrinksQuantity = (id, quantity) => {
    const { drinksOrderBeforeSubmit } = this.state;
    const updatedDrinksOrder = drinksOrderBeforeSubmit.map((drink) => {
      return drink.id === id ? { ...drink, quantity: drink.quantity + quantity > 0 ? drink.quantity + quantity : 0 } : drink;
    });
    this.setState({ drinksOrderBeforeSubmit: updatedDrinksOrder });
  }
  handleSubmitOrder = () => {
    const { foodMenu, drinksOrderBeforeSubmit , socket, user, currentRoom } = this.state;
    const foodOrder = foodMenu.filter(food => food.quantity > 0).map(food => ({ ...food, user, roomId: currentRoom.roomId }));
    const drinksOrder = drinksOrderBeforeSubmit.filter(drinks => drinks.quantity > 0)
                        .map(drinks => ({ 
                          name: `${drinks.type}${drinks.name}${drinks.ice === "正常 Regular" ? "" : ` (${drinks.ice} 冰/ice)`}${drinks.sugar === "正常 Regular" ? "" : ` (${drinks.sugar} 甜/sugar)`}`,
                          quantity: drinks.quantity,
                          price: drinks.price,
                          user,
                          roomId: currentRoom.roomId
                        }));
    socket.emit("to-server_send-order", foodOrder.concat(drinksOrder), user, currentRoom.restaurant);
    // socket.emit("to-server_send-order", foodOrder, user);
  }
  checkMenuValid = () => {
    const { foodMenu, drinksOrderBeforeSubmit } = this.state;
    const isFoodOrderValid = foodMenu.filter(food => food.quantity > 0).length > 0;
    const isDrinksOrderValid = drinksOrderBeforeSubmit.filter(drinks => drinks.quantity > 0).length > 0;
    return isFoodOrderValid || isDrinksOrderValid;
  }
  handleClearOrders = () => {
    const { socket, user } = this.state;
    // console.log("clearing food", user);
    socket.emit("to-server_clear-orders", user);
  }

  render() {
    const { 
      foodMenu, 
      drinksMenu, 
      allOrders, 
      foodMenuObject, 
      // userOrders, 
      drinksOrderBeforeSubmit, 
      
      user, 
      newOrders, 
      isDrawerOpen, 
      
      roomsData,
      restaurantOptions,
      currentRoom
    } = this.state;
    if (user === "none") {
      return (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
          <EnterNameForm handleChangeUserName={this.handleChangeUserName} />
        </div> 
      );
    }
    // if (currentRoom) {
    //   console.log(roomsData);
    //   console.log(currentRoom);
    //   console.log(roomsData.map(room => room.restaurant === currentRoom.restaurant ? { ...room, cutOffTime: moment(new Date())} : room));
    // }
    return (
      <div>
        <Card>
          {/* Menu Card */}
          <Card>
            <h2>Current Room: {currentRoom ? <span>{currentRoom.roomName}<Tag style={{ marginLeft: "10px"}} color="blue">{currentRoom.restaurantName}</Tag><Tag style={{ marginLeft: "10px"}} color="green">{restaurantOptions.find(restaurant => restaurant.id === currentRoom.restaurant).tel}</Tag></span> : "N/A"} </h2>
            {
              currentRoom ? 
              <div>
                <Button onClick={this.handleExitRoom} style={{ marginRight: "10px" }}>Exit Room</Button> 
                {user === currentRoom.user ? <Button disabled={moment(currentRoom.cutOffTime).isBefore(moment(new Date()))} type="danger" onClick={this.handleStopOrders} style={{ marginRight: "10px" }}>Stop Orders Now</Button> : null}
                <Badge count={newOrders}>
                  <Button onClick={this.handleOpenDrawer} type="primary">See all orders</Button>
                </Badge>
                {moment(currentRoom.cutOffTime).isAfter(moment(new Date())) ? <Countdown title="Time left" style={{ float: "right" }} value={currentRoom.cutOffTime} /> : <span style={{ float: "right" }}>Orders Finished!</span>}
                <Drawer
                  width="600px"
                  placement="right"
                  closable={false}
                  onClose={this.handleCloseDrawer}
                  visible={isDrawerOpen}
                >
                  {
                    currentRoom ? <FoodOrders menu={foodMenuObject} allOrders={allOrders.filter(order => order.roomId === currentRoom.roomId )} handleClearOrders={this.handleClearOrders} disabled={moment(currentRoom.cutOffTime).isBefore(moment(new Date()))} /> : null
                  }
                </Drawer>
              </div>
              :
              <CreateRoomsButton 
                roomsData={roomsData}
                user={user}
                restaurantOptions={restaurantOptions}
                handleCreateRoom={this.handleCreateRoom} 
              />
            }
          </Card>
          {/* Body Card */}
          {
            currentRoom ? 
            <OrderCard 
              disabled={moment(currentRoom.cutOffTime).isBefore(moment(new Date()))}
              loading={!foodMenu && !drinksMenu}
              isSubmitButtonDisabled={!this.checkMenuValid()}
              handleSubmitOrder={this.handleSubmitOrder}
              // Food Menu
              foodMenu={foodMenu}
              handleUpdateQuantity={this.handleUpdateQuantity}
              // Drinks Menu
              drinksMenu={drinksMenu} 
              drinksOrderBeforeSubmit={drinksOrderBeforeSubmit} 
              handleUpdateDrinksChoice={this.handleUpdateDrinksChoice} 
              handleAddDrinks={this.handleAddDrinks} 
              handleUpdateDrinksQuantity={this.handleUpdateDrinksQuantity}
            />
            : <RoomsCard rooms={roomsData} handleSelectRoom={this.handleSelectRoom} />
          }
        </Card>
      </div>
    );
  }
}
export default App;