import React, { Component } from "react";
import { Card, Button, Badge, Statistic, Tag, Icon } from 'antd';
import moment from 'moment';

const Countdown = Statistic.Countdown;
// const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
const deadline = new Date("2019/02/28 15:00");

class RoomsCard extends Component {
    renderRoomsData = () => {
        const { rooms, handleSelectRoom } = this.props;
        if (rooms.length === 0) {
            return (
                <Card>
                    NO ROOMS OPEN
                </Card>
            )
        }
        return rooms.map((room) => (            
            <Card key={room.roomId} bodyStyle={{ width: "100%" }}>
                <Button type="primary" size="large" onClick={() => { handleSelectRoom(room) }}>{room.roomName} <Icon type="export" /></Button> 
                <Tag style={{ marginLeft: "10px" }} color="magenta">{room.restaurantName}</Tag>
                <Tag style={{ marginLeft: "10px" }} color="blue">{room.user}</Tag>
                {moment(room.cutOffTime).isAfter(moment(new Date())) ? <Countdown title="Time left" style={{ float: "right" }} value={room.cutOffTime} /> : <span style={{ float: "right" }}>Orders Finished!</span>}
            </Card>
        ));
    }
    render() {
        // const test2 = new Date("2019/02/28 15:00");
        // console.log(test2);
        const rooms = this.renderRoomsData();
        return (
            <Card>
                {rooms}
            </Card>
        )
    }
}

export default RoomsCard;