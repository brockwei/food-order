// CORE
const express = require('express');
const http = require("http");
const moment = require("moment");
const bodyParser = require('body-parser');
const socketIo = require("socket.io");
const cors = require('cors');
require('dotenv').config();


const router = require('./router')(express);
const app = express();
app.use('/', router);

const server = http.createServer(app);
const io = socketIo(server);
app.use(cors());
app.use(bodyParser.json());

const data = require('./data');

// sockets
io.on("connection", socket => {
    console.log("New client connected")
    // console.log(socket.id);

    socket.on("to-server_send-order", (order, user, restaurant) => {
        // data.updateOrders(order, user, socket);
        // console.log(order);
        io.emit("to-client_updated-orders", data.updateOrders(order, user));
        io.to(socket.id).emit("to-client_reset-orders", data.getFoodMenu(restaurant), data.getDrinksMenu(restaurant));
        // io.to(socket.id).emit("to-client_send-user-orders", data.getAllOrders());
    });
    socket.on("to-server_clear-orders", (user) => {
        io.emit("to-client_updated-orders", data.clearOrders(user));
        // io.emit("to-client_cleared-orders", data.clearOrders(user));
        // io.to(socket.id).emit("to-client_send-user-orders", data.getAllOrders());
    });
    // to-client_updated-orders
    socket.on("to-server_send-user", (user) => {
        // console.log(socket.id);
        // socket.emit("getMenu", data.getAllOrders(user));
        io.to(socket.id).emit("to-client_send-user-data", data.getUserData(user))
    });

    // Rooms socket
    socket.on("to-server_create-room", (newRoom) => {
        // console.log(moment(newRoom.cutOffTime).diff(moment()));
        io.emit("to-client_created-room", data.createRoom(newRoom));

        setTimeout(() => {
            io.emit("to-client_updated-room", data.stopOrders(newRoom));
        }, moment(newRoom.cutOffTime).diff(moment()));

        setTimeout(() => {
            io.emit("to-client_cleared-room", data.clearRoom(newRoom.roomName));
        }, moment(newRoom.cutOffTime).diff(moment()) + 12*60*60*1000);
        // }, moment(newRoom.cutOffTime).diff(moment()) + 1000);
        // io.to(socket.id).emit("to-client_send-user-data", data.getUserData(user))
    });
    socket.on("to-server_join-room", (roomData) => {
        // console.log(roomData);
        // socket.emit("to-client_joined-room", data.createRoom(roomData), );
        io.to(socket.id).emit("to-client_joined-room", roomData);
        io.to(socket.id).emit("to-client_updated-orders", data.getAllOrders());
        io.to(socket.id).emit("to-client_reset-orders", data.getFoodMenu(roomData.restaurant), data.getDrinksMenu(roomData.restaurant));
        // io.to(socket.id).emit("to-client_send-user-orders", data.getAllOrders());
        // io.to(socket.id).emit("to-client_send-user-data", data.getUserData(user))
    });
    socket.on("to-server_stop-orders", (roomData) => {
        io.emit("to-client_updated-room", data.stopOrders(roomData));
    });
    socket.on("disconnect", () => console.log("Client disconnected"));
});

// app.listen(process.env.PORT ||'8501');
const port = process.env.PORT ||'8501';
server.listen(port, () => console.log(`Listening on port ${port}`));
