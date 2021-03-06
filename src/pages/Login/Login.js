import React, { useState } from "react";
import { observer } from 'mobx-react-lite';
import { useHistory } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Logo from '../../assets/images/logo.png';
import { useStore } from "../../utils/useStores";
import { Form, Input, Button, Row, Col, Card, message } from 'antd';

const useStyles = createUseStyles({
    logo: {
        // height: 30,
        paddingLeft: 20,
        marginBottom: 16
    },
    logoFull: {
        maxHeight: 38,
        borderRadius: 4,
        marginTop: 8
    },

});



export const Login = observer(() => {
    let history = useHistory();
    const store = useStore();
    const [loading, setLoading] = useState(false);

    const classes = useStyles();

    function valueStyleWidth(desktop, mobile) {
        return store.ui.mediaQuery.isMobile ? mobile : desktop
    }

    const onFinish = values => {
        enterLoading(values);
    };


    const enterLoading = (e) => {
        setLoading(true);
        const data = {
            email: e.email,
            password: e.password,
        }
        store.auth.login(data).then(res => {
            message.success('Berhasil Masuk');
            setLoading(false);
            history.push("/app/home");
        }).catch(err => {
            message.error(err.message);
            setLoading(false);
        });
    }


    return <>
        <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
            <Row justify={'center'}>
                <Col>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '15vh',
                        flexDirection: 'column',
                        alignItems: 'center',
                        boxShadow: '0 0 10px  0  rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.20)'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', marginBottom: 20 }}>
                            <img className={classes.logoFull} src={Logo} alt={Logo} />
                        </div>
                        <Card
                            style={{ width: valueStyleWidth(300, 150), textAlign: 'center' }}
                            headStyle={{ fontSize: 13, fontWeight: 200 }}
                            className={"shadow"}
                            bordered={true}
                            title={'Sign in to your account'}
                        >
                            <Form
                                layout={'vertical'}
                                name="normal_login"
                                className="login-form"
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    size={'large'}
                                    rules={[{ required: true, message: 'Please input your Username!' }]}
                                >
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        type="text"
                                        placeholder="Email" />
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
                                    />
                                </Form.Item>

                                <Form.Item
                                    style={{
                                        marginBottom: 0,
                                        marginTop: 15
                                    }}>
                                    <Button style={{ backgroundColor: 'SlateBlue', color: 'white' }}
                                        block
                                        loading={loading}
                                        htmlType="submit"
                                        size={'large'}
                                        // onSubmit={enterLoading}
                                        // onClick={enterLoading}
                                        className="login-form-button">
                                        Sign In
                                    {/*<Link to={LINKS.DASHBOARD} innerRef={node => {*/}
                                        {/*    // `node` refers to the mounted DOM element*/}
                                        {/*    // or null when unmounted*/}
                                        {/*}}>Sign In</Link>*/}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>;
    </>;
});