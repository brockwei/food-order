import React, { Component } from 'react';
import { Table } from 'antd';

class FoodQuantityPriceDisplayTable extends Component {
    render() {
        const { orders } = this.props;
        const columns = [{
            title: "Food",
            dataIndex: "name",
            key: "name"
        }, {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity"
        }, {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (val, row) => <span>{val * row.quantity}</span>
        }];
        return <Table bordered size="small" rowKey="name" columns={columns} dataSource={orders} pagination={false}/>
    }
}

export default FoodQuantityPriceDisplayTable;