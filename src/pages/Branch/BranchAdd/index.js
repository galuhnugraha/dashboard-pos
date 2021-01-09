import React, { useState } from "react";
import {
    Form,
    Input,
    DatePicker,
    Button
} from 'antd';
import {
    LockOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import { useStore } from "../../../utils/useStores";
import axios from 'axios';
import { observer } from "mobx-react-lite";

export const BranchAdd = observer(() => {
    const store = useStore();
    let history = useHistory();

    const [state, setState] = useState({
        form: {
            email: '',
            name: '',
            phone: '',
            bdate: '',
            no: '',
            password: ''
        }
    })

    function onSubmit() {
        const { email, name, phone, bdate, no, password } = state.form;
        const data = {
            email: email,
            name: name,
            phone: phone,
            bdate: bdate,
            no: no,
            password: password
        }
        // store.member.addTable(data).then(res => {
        //   return res
        // }).catch(err => {
        //   return err
        // })
        axios.post('https://akudancow.herokuapp.com/reg', data).then(res => {
            history.push("/app/branch")
            return res;
        }).catch(err => {
            return err;
        })
    }


    const change = (key, value) => {
        setState({ form: { ...state.form, [key]: value } });
    };

    const handleDateChange = (date) => {
        // console.log({date}, 'AppointmentFormContainerBasic -> handleDateChange')
        setState({
            form: {
                ...state.form,
                bdate: date
            }
        })
    };

    const goBack = () => {
        history.push("/app/branch")
    }


    return <div>
        <Form
            layout={'vertical'}
            name="normal_login"
            className="login-form"
            initialValues={{
                email: state.form.email,
                name: state.form.name,
                phone: state.form.phone,
                no: state.form.no,
                bdate: state.form.bdate,
                password: state.form.password
            }}
        // onFinish={onSubmit}
        >
            <Form.Item
                label="Member Email"
                name="member_email"
                size={'large'}
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="member_email" onChange={(e) => change('email', e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Member Name"
                name="member_name"
                size={'large'}
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="member_name" onChange={(e) => change('name', e.target.value)} />
            </Form.Item>
            <Form.Item
                label="Phone"
                name="member_phone"
                size={'large'}
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="member_phone" onChange={(e) => change('phone', e.target.value)} />
            </Form.Item>
            <Form.Item
                label="No"
                name="no"
                size={'large'}
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    type="text"
                    placeholder="no"
                    onChange={(e) => change('no', e.target.value)}
                />
            </Form.Item>
            <Form.Item
                label="Bdate"
                name="bdate"
                size={'large'}
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <DatePicker onChange={date => handleDateChange(date)} />
            </Form.Item>
            <Form.Item
                style={{
                    marginBottom: 0,
                }}
                label="Password"
                name="password"
                size={'large'}
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => change('password', e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" style={{ marginTop: 25 }} onClick={onSubmit}>Submit</Button>
            </Form.Item>
        </Form>
    </div>
})