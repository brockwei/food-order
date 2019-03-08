import React, { Component } from "react";
import { Button, Modal, Form, Input, TimePicker, Select, message } from 'antd';
import moment from 'moment';

const Option = Select.Option;

class CreateRoomButton extends Component {
    state = {
        isModalOpen: false
    }
    handleCreateRoom = () => {
        this.setState({ isModalOpen: true });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { user, handleCreateRoom, roomsData } = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                // console.log(err[Object.keys(err)[0]].errors[0].message);
                message.error(err[Object.keys(err)[0]].errors[0].message);
                return;
            }
            if (roomsData.find(room => room.roomName === values.roomName)) {
                message.error("Room name already exists!");
                return;
            }
            if (moment(values.cutOffTime).isBefore(moment())) {
                message.error("Unacceptable time!");
                return;
            }
            console.log('Received values of form: ', values);
            const newRoom = {
                ...values,
                user
            };
            handleCreateRoom(newRoom);
            this.setState({ isModalOpen: false });
        });
    }
    handleCancel = () => {
        this.setState({ isModalOpen: false });
    }
    render() {
        const { isModalOpen } = this.state;
        const { restaurantOptions } = this.props;
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;

        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 6 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 18 },
            },
        };

        const restaurantError = isFieldTouched('restaurant') && getFieldError('restaurant');
        const roomNameError = isFieldTouched('roomName') && getFieldError('roomName');
        const cutOffTimeError = isFieldTouched('cutOffTime') && getFieldError('cutOffTime');
        return (
            <div style={{ display: "inline", marginRight: 10 }}>
                <Button onClick={this.handleCreateRoom} type="primary">Create Room</Button>
                <Modal
                    visible={isModalOpen}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form.Item
                        validateStatus={roomNameError ? 'error' : ''}
                        help={roomNameError || ''}
                        {...formItemLayout}
                        label="Room Name"
                    >
                        {getFieldDecorator('roomName', {
                            rules: [{ required: true, message: 'Please enter room name!' }],
                        })(
                            <Input placeholder="Enter room name" />
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={restaurantError ? 'error' : ''}
                        help={restaurantError || ''}
                        {...formItemLayout}
                        label="Restaurant"
                    >
                        {getFieldDecorator('restaurant', {
                            rules: [{ required: true, message: 'Please pick restaurant!' }],
                        })(
                            <Select style={{ width: 200 }}>
                                {
                                    restaurantOptions.map(option => {
                                        return <Option key={option.id} value={option.id}>{option.name}</Option>
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        validateStatus={cutOffTimeError ? 'error' : ''}
                        help={cutOffTimeError || ''}
                        {...formItemLayout}
                        label="Cut off Time"
                    >
                        {getFieldDecorator('cutOffTime', {
                            // initialValue: moment('12:20', "HH:mm"),
                            initialValue: moment('12:20', "HH:mm").isBefore(moment(new Date())) ? moment('17:20', "HH:mm") : moment('12:20', "HH:mm"),
                            rules: [{ required: true, message: 'Please enter cut off Time!' }],
                        })(
                            <TimePicker format="HH:mm" />
                        )}
                    </Form.Item>
                </Modal>
            </div>
        );
    }
}

// export default CreateRoomButton;
export default Form.create({ name: 'create_room' })(CreateRoomButton);