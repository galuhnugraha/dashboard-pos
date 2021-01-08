import React, { useEffect, useState } from "react";
import {
  Layout, Menu, Col,
  Row,
  Card,
  PageHeader,
  Button,
  Table,
  Typography,
  message,
  Popconfirm,
  Modal,
  Form,
  Input,
  DatePicker,
  Spin,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  LockOutlined
} from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import './style.css';
import axios from 'axios';
import { observer } from "mobx-react-lite";



export const Branch = observer(() => {
  const store = useStore();
  let history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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
      return res;
    }).catch(err => {
      return err;
    })
  }

  const change = (key, value) => {
    setState({ form: { ...state.form, [key]: value } });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // addTable();
    // onSubmit();
    onSubmit();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteClick = (id) => {
    store.member.deleteAll(id).then((res) => {
      message.success('Success delete member')
      history.push('/app/branch');
    }).catch(err => {
      message.error(err.response.body.message)
    })
  }


  const columns = [
    {
      title: 'Member Email',
      dataIndex: 'member_email',
      key: 'member_email'
    },
    {
      title: 'Member Name',
      dataIndex: 'member_name',
      key: 'member_name',
      sorter: {
        compare: (a, b) => a.address - b.address,
        multiple: 2,
      },
    },
    {
      title: 'Phone',
      dataIndex: 'member_phone',
      key: 'member_phone',
      sorter: {
        compare: (a, b) => a.member_phone - b.member_phone,
        multiple: 1,
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
            {/* <DeleteOutlined /> */}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <EditOutlined />
              </div>
              <div style={{ marginLeft: 8 }}>
                <DeleteOutlined onClick={() => {
                  deleteClick(record.id)
                }} />
              </div>
            </div>
          </Popconfirm>
        </span>
      ),
    }
  ];

  const handleDateChange = (date) => {
    // console.log({date}, 'AppointmentFormContainerBasic -> handleDateChange')
    setState({
      form: {
        ...state.form,
        bdate: date
      }
    })
  };


  useEffect(() => {
    // setLoading(true);
    store.member.getAll();
    // store.member.getAll().then(res => {

    // })
    // deleteClick();
  }, []);


  return <div>
    <div style={{
      display: "flex",
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <Typography.Title level={5} style={{ marginTop: 8 }}>Branch</Typography.Title>
      <Button type="primary" onClick={showModal}><PlusOutlined />Tambah Data</Button>
    </div>
    <Row>
      <Col span={24}>
        <Table scroll={{ x: 'calc(50vh - 4em)' }}
          dataSource={store.member.data.slice(0, 4)}
          columns={columns}
          size="middle"
          style={{ width: '100%', marginTop: 18 }}
        />
      </Col>
    </Row>
    <Modal
      title="Basic Modal"
      visible={isModalVisible}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
            </Button>,
        <Button htmlType="submit" type="primary" loading={loading} onClick={handleOk}>
          Submit
            </Button>,
      ]}>
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
            placeholder="member_email" onChange={(e) => change('email', e.target.value)}/>
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
            placeholder="member_name" onChange={(e) => change('name', e.target.value)}/>
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
            placeholder="member_phone" onChange={(e) => change('phone', e.target.value)}/>
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
          {/* <Input
            // prefix={<UserOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="bdate" 
            onChange={date => handleDateChange(date)} 
            value={state.form.bdate}/> */}
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
      </Form>
    </Modal>
  </div>
});
