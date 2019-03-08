import React, { Component } from 'react';
import { Table, Button, Icon, Input } from 'antd';

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

    render() {
        const { menu, handleUpdateQuantity, disabled } = this.props

        const columns = [
            {
                title: "Food",
                dataIndex: "name",
                key: "name",
                ...this.getColumnSearchProps('name'),
            },
            {
                title: "Price",
                dataIndex: "price",
                key: "price"
            },
            {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
                render: (val, row) => {
                    return (
                        <ButtonGroup>
                            <Button disabled={disabled} onClick={() => {
                                handleUpdateQuantity(row.name, -1);
                            }}>
                                <Icon type="minus" />
                            </Button>
                            <Button disabled={disabled}>
                                {val}
                            </Button>
                            <Button disabled={disabled} onClick={() => {
                                handleUpdateQuantity(row.name, 1);
                            }}>
                                <Icon type="plus" />
                            </Button>
                        </ButtonGroup>
                    )
                }
            }
        ];

        return <Table size="small" bordered rowKey="name" columns={columns} dataSource={menu} />
    }
}

export default FoodMenu;