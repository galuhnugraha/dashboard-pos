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
import { observer } from "mobx-react-lite";



export const Branch = observer((initialData) => {
  const store = useStore();
  let history = useHistory();
  const [form] = Form.useForm();
  const [state, setState] = useState({
    success: false,
    form: {
      email: '',
      name: '',
      phone: '',
      bdate: '',
      no: '',
      password: ''
    }
  });

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
    console.log(state.success)
  })

  useEffect(()=>{
    fetchData()
 },[])


  async function fetchData(){
    await store.member.getAll();
}


  function editData(e) {
    const data = {
      email: e.email,
      name: e.name,
      phone: e.phone,
    }
    if (e.isEdit) {
      store.member.updateMember(e.isEdit,data)
        .then(res => {
          message.success('Data Member Di Update!');
          toggleSuccess();
          fetchData();
        })
        .catch(err => {
          message.error(`Error on Updating Member, ${err.message}`);
          message.error(err.message);
        });
    }
  }

  const setEditMode = (value) => {
    setState(prevState => ({
      ...prevState,
      success: true
    }))
    form.setFieldsValue({
      isEdit: value.id,
      success: true,
      email: value.member_email,
      name: value.member_name,
      phone: value.member_phone,
    })
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  function confirm(id) {
    store.member.deleteAll(id).then((res) => {
      message.success('Success delete member')
      history.push('/app/branch');
    }).catch(err => {
      message.error(err.response.body.message)
    })
  }

  const deleteClick = (id) => {
    confirm(id);
  }

  const addBranch = () => {
    history.push('/app/branch/add')
  }

  useEffect(() => {
    store.member.getAll();
  }, []);

  {

    const columns = [
      {
        title: 'Member Email',
        dataIndex: 'member_email',
        render: (text, record) => <span>{record.member_email}</span>,
      },
      {
        title: 'Member Name',
        dataIndex: 'member_name',
        render: (text, record) => <span>{record.member_name}</span>,
        sorter: {
          compare: (a, b) => a.address - b.address,
          multiple: 2,
        },
      },
      {
        title: 'Phone',
        dataIndex: 'member_phone',
        render: (text, record) => <span>{record.member_phone}</span>,
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
            {/* <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
          
          </Popconfirm> */}
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <EditOutlined onClick={() => {
                  setEditMode(record);
                }} />
              </div>
              <Popconfirm title="Are you sure delete this task?" onConfirm={confirm}
                onCancel={cancel} okText="Yes" cancelText="No">
                <div style={{ marginLeft: 8 }}>
                  <DeleteOutlined onClick={() => {
                    deleteClick(record.id)
                  }} />
                </div>
              </Popconfirm>
            </div>
          </span>
        ),
      }
    ];

    return <div>
      <div style={{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <Typography.Title level={5} style={{ marginTop: 8 }}>Branch</Typography.Title>
        <Button type="primary" onClick={addBranch}><PlusOutlined />Tambah Data</Button>
      </div>
      <Row>
        <Col span={24}>
          {renderModal()}
          <Table scroll={{ x: 'calc(50vh - 4em)' }}
            rowKey={record => record.id}
            dataSource={store.member.data.slice(0, 7)}
            columns={columns}
            pagination={{ pageSize: 5 }}
            size="middle"
            style={{ width: '100%', marginTop: 18 }}
          />
        </Col>
      </Row>
    </div>
  }

  function renderModal() {
    return <Modal visible={state.success} closable={false} confirmLoading={false} destroyOnClose={true}
      title="Update Member"
      okText="Save"
      cancelText="Cancel"
      bodyStyle={{ background: '#f7fafc' }}
      onCancel={() => {
        form.validateFields().then(values => {
          form.resetFields();
        });
        toggleSuccess();
      }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            editData(values);
            form.setFieldsValue({});
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <div className="animated fadeIn">
        <Form layout="vertical" form={form} className={'custom-form'} name="form_in_modal" initialValues={initialData}>
          <Form.Item name="isEdit" hidden={true}>
            <Input />
          </Form.Item>
          <Form.Item
            label="Member Email"
            name="email"
            size={'large'}
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Member Name"
            name="name"
            size={'large'}
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            size={'large'}
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  }
});
