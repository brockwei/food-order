import React, { Component } from 'react';
import { Table, Button, Icon, Card } from 'antd';

import FoodMenu from '../FoodMenu';
import DrinksMenu from '../DrinksMenu';
import FoodQuantityPriceDisplayTable from '../FoodQuantityPriceDisplayTable';

const ButtonGroup = Button.Group;
class OrderCard extends Component {
    state = {
        key: 'tab1',
        noTitleKey: 'app',
    };

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    }

    renderOrderSummary = () => {
        const { 
            foodMenu, 
            drinksOrderBeforeSubmit, 
        } = this.props

        const selectedFood = foodMenu.filter((food) => food.quantity > 0);
        const selectedDrinks = drinksOrderBeforeSubmit.filter((drinks) => drinks.quantity > 0).map((drinks) => {
            return {
                id: drinks.id,
                name: `${drinks.type}${drinks.name}${drinks.ice === "正常 Regular" ? "" : ` (${drinks.ice} 冰/ice)`}${drinks.sugar === "正常 Regular" ? "" : ` (${drinks.sugar} 甜/sugar)`}`,
                quantity: drinks.quantity,
                price: drinks.price
            };
        });

        return (
            <div>
                <FoodQuantityPriceDisplayTable orders={selectedFood.concat(selectedDrinks)} />
            </div>
        )
    }
    
    render() {
        const { key, noTitleKey } = this.state;
        const { 
            disabled,
            loading,
            isSubmitButtonDisabled,
            handleSubmitOrder,
            // Food Menu
            foodMenu, 
            handleUpdateQuantity,
            // Drinks Menu
            drinksMenu, 
            drinksOrderBeforeSubmit, 
            handleUpdateDrinksChoice, 
            handleAddDrinks, 
            handleUpdateDrinksQuantity,
        } = this.props

        const tabList = [{
            key: 'tab1',
            tab: 'Food Orders',
        }, {
            key: 'tab2',
            tab: 'Drinks',
        }];
        
        const contentList = {
            tab1: <FoodMenu disabled={disabled} menu={foodMenu} handleUpdateQuantity={handleUpdateQuantity} />,
            tab2: <DrinksMenu 
                        disabled={disabled}
                        menu={drinksMenu} 
                        drinksOrderBeforeSubmit={drinksOrderBeforeSubmit} 
                        handleUpdateDrinksChoice={handleUpdateDrinksChoice} 
                        handleAddDrinks={handleAddDrinks} 
                        handleUpdateDrinksQuantity={handleUpdateDrinksQuantity}
                    />
        };
        const orderSummary = this.renderOrderSummary();
        return (
            <div style={{ display: "flex" }}>
                <Card
                    style={{ width: '30%' }}
                    // headStyle={{ textAlign: "left" }}
                    loading={loading}
                    title={"Your Orders"}
                    extra={<Button type="primary" disabled={isSubmitButtonDisabled} onClick={handleSubmitOrder}>Submit Order</Button>}
                >
                    {orderSummary}
                </Card>
                <Card
                    style={{ width: '70%' }}
                    headStyle={{ textAlign: "left" }}
                    loading={loading}
                    // title={"Your Orders"}
                    // extra={<Button type="primary" disabled={isSubmitButtonDisabled} onClick={handleSubmitOrder}>Submit Order</Button>}
                    tabList={tabList}
                    activeTabKey={key}
                    onTabChange={(key) => { this.onTabChange(key, 'key'); }}
                >
                    {contentList[key]}
                </Card>
            </div>
        )
    }
}

export default OrderCard;