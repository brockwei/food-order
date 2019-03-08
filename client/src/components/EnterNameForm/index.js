import React, { Component } from 'react';
import { Form, Input, Icon, Button } from 'antd';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EnterNameForm extends Component {
    handleSubmit = (e) => {
        const { handleChangeUserName } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log('Received values of form: ', values);
              localStorage.setItem("user", values.userName);
              handleChangeUserName(values.userName);
            }
        });
    }
    render() {
        const {
            getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
        } = this.props.form;
        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item
                    validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}
                >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your name!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter your name" />
                    )}
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                >
                    Submit
                </Button>
            </Form>
        )
    }
}

// export default EnterNameForm;
export default Form.create({ name: 'enter_name' })(EnterNameForm);