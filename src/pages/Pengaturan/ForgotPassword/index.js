import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const submit = () => {
    
}

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

export const ForgotPassword = () => {

    return <div>
        <span>Ubah Password Anda</span>
        <Form
            // {...layout}
            name="basic"
            initialValues={{ remember: true }}
            style={{ marginTop: 15 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Password Lama"
                name="password-lama"
                rules={[{ required: true, message: 'Password Lama Harus Di isi' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Password Baru"
                name="password-baru"
                rules={[{ required: true, message: 'Password Baru Harus Di isi' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
}
