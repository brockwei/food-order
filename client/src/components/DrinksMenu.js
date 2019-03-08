import React, { Component } from 'react';
import { Table, Button, Icon, Radio, Input } from 'antd';

const ButtonGroup = Button.Group;
class FoodMenu extends Component {

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = (clearFilters) => {
        clearFilters();
        // this.setState({ searchText: '' });
    }

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase().trim()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: (text) => <span>{text}</span>
    })

    renderRadio = (options, field, drinkName, defaultValue) => {
        const { handleUpdateDrinksChoice } = this.props
        return (
            <div>
                {
                    options.length > 0 ?
                    <Radio.Group size="small" value={defaultValue} buttonStyle="solid" onChange={(e) => { handleUpdateDrinksChoice(e.target.value, field, drinkName) }}>
                        {
                            options.map((option) => <Radio.Button key={option} value={option}>{option}</Radio.Button>)
                        }
                    </Radio.Group> : null
                }
            </div>
        )
    }
    render() {
        const { menu, drinksOrderBeforeSubmit, handleAddDrinks, handleUpdateDrinksQuantity, disabled } = this.props

        const columns = [
            {
                title: "Drink",
                dataIndex: "name",
                key: "name",
                ...this.getColumnSearchProps('name'),
            },
            {
                title: "Type",
                dataIndex: "type",
                key: "type",
                render: (val, row) => this.renderRadio(row.typeOptions, "type", row.name, row.type)
            },
            {
                title: "Ice",
                dataIndex: "ice",
                key: "ice",
                render: (val, row) => this.renderRadio(row.iceOptions, "ice", row.name, row.ice)
            },
            {
                title: "Sugar",
                dataIndex: "sugar",
                key: "sugar",
                render: (val, row) => this.renderRadio(row.sugarOptions, "sugar", row.name, row.sugar)
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
                render: (val, row) => (
                    <Button disabled={disabled} onClick={() => {
                        handleAddDrinks(row.name);
                    }}>
                        {/* <Icon type="plus" /> */}
                        Add
                    </Button>
                )
            }
        ];
        const columnsDrinksOrder = [
            {
                title: "Food",
                dataIndex: "name",
                key: "name",
                render: (val, row) => `${row.type}${row.name}${row.ice === "正常 Regular" ? "" : ` (${row.ice} 冰/ice)`}${row.sugar === "正常 Regular" ? "" : ` (${row.sugar} 甜/sugar)`}`,
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
                render: (val, row) => (
                    <ButtonGroup>
                        <Button onClick={() => {
                            handleUpdateDrinksQuantity(row.id, -1);
                        }}>
                            <Icon type="minus" />
                        </Button>
                        <Button>
                            {val}
                        </Button>
                        <Button onClick={() => {
                            handleUpdateDrinksQuantity(row.id, 1);
                        }}>
                            <Icon type="plus" />
                        </Button>
                    </ButtonGroup>
                )
            }
        ];
        
        return (
            <div>
                <Table bordered rowKey="id" size="small" columns={columnsDrinksOrder} dataSource={drinksOrderBeforeSubmit} />
                <Table bordered width="50%" size="small" rowKey="name" columns={columns} dataSource={menu} />
            </div>
        )
    }
}

export default FoodMenu;