import React, { Component } from 'react';
import { Table, Button, Icon, Card, message } from 'antd';

import FoodQuantityPriceDisplayTable from './FoodQuantityPriceDisplayTable';

const ButtonGroup = Button.Group;
class FoodMenu extends Component {
    state = {
        key: 'tab1',
        noTitleKey: 'app',
    };
    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    }

    copyToClipboard = (data) => {
        var textField = document.createElement('textarea');
        textField.innerText = data;
        document.body.appendChild(textField);
        // console.log(textField.innerHTML);
        textField.innerHTML = textField.innerHTML.replace(/<br>/g, "\n");
        // console.log(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        message.success(`Orders copied to clipboard!`);
    };
    
    render() {
        const { key, noTitleKey } = this.state;
        const { menu, allOrders, handleClearOrders, disabled } = this.props
        const columns = [
            {
                title: "Food",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity"
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price"
            }
        ];
        const columnsOrders = [
            {
                title: "Food",
                dataIndex: "name",
                key: "name"
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity"
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price",
                render: (val, row) => val * row.quantity
            },
            {
                title: "User",
                dataIndex: "user",
                key: "user"
            }
        ];
        let combinedOrdersObject = {};
        const combinedOrders = [];
        allOrders.forEach(order => {
            if (combinedOrdersObject[order.name]) {
                // combinedOrdersObject[order.name] += order.quantity;
                combinedOrdersObject[order.name][0] += order.quantity;
            } else {
                // combinedOrdersObject[order.name] = order.quantity;
                combinedOrdersObject[order.name] = [order.quantity, order.price];
            }
        });
        for (var food in combinedOrdersObject) {
            combinedOrders.push({
                name: food,
                quantity: combinedOrdersObject[food][0],
                // price: combinedOrdersObject[food] * menu[food]
                price: combinedOrdersObject[food][1]
            });
        }
        
        const tabList = [{
            key: 'tab1',
            tab: 'Summary',
        }, {
            key: 'tab2',
            tab: 'Detailed',
        }];
          
        const contentList = {
            // tab1: <Table size="small" rowKey="name" columns={columns} dataSource={combinedOrders}/>,
            tab1: <FoodQuantityPriceDisplayTable orders={combinedOrders} />,
            tab2: <Table bordered size="small" columns={columnsOrders} dataSource={allOrders} />,
        };
        const orderString = combinedOrders.map((order) => `${order.name} x${order.quantity}\n`).join("");
        // console.log(orderString);
        // return <Table size="small" rowKey="name" columns={columns} dataSource={combinedOrders} />
        return (
            <Card
                headStyle={{ textAlign: "left" }}
                title="All Orders"
                extra={
                    <div>
                        <Button type="primary" onClick={() => { this.copyToClipboard(orderString); }} style={{ marginRight: '10px'}}>Copy To Clipboard</Button>
                        <Button type="danger" onClick={handleClearOrders} disabled={disabled}>Remove my food</Button>
                        </div>
                    }
                tabList={tabList}
                activeTabKey={key}
                onTabChange={(key) => { this.onTabChange(key, 'key'); }}
            >
                {contentList[key]}
            </Card>
        )
    }
}

export default FoodMenu;