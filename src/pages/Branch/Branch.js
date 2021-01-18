import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Typography,
  message,
  Popconfirm,
  Modal,
  Form,
  Input,
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import { observer } from "mobx-react-lite";
import './style.css';
import {appConfig} from '../../config/app';

export const Branch = observer((initialData) => {

  const store = useStore();
  let history = useHistory();

  const [form] = Form.useForm();
  const [imgData, setImgData] = useState(null);
  const [xImg , setXImg] = useState('')


  const [state, setState] = useState({
    success: false,
    form: {
      email: '',
      name: '',
      phone: '',
      bdate: '',
      no: '',
      password: ''
    },
  });

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
  })



  useEffect(() => {
    store.member.getAll()
    store.member.setPage(1);
    store.member.setCurrentPage(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { Search } = Input;

  async function fetchData() {
    await store.member.getAll();
  }

  const changeImage = (info) => new Promise((result, reject) => {
    const data = info.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onload = () => result(setImgData(reader.result), reader.result);
    reader.onerror = error => reject(error);
  })


  async function editData(e) {
    const data = {
      email: e.email,
      name: e.name,
      phone: e.phone,
      photo: imgData
    }

    if (e.isEdit) {
      store.member.updateMember(e.isEdit, data)
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
    setXImg(value.member_photo)
    console.log(xImg)
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
      photo: value.member_photo
    })
  }

  function cancel() {
    message.error('Pliss Jgn Hapus Data Saya ya , saya mohon');
  }

  function confirm(id) {
    store.member.deleteAll(id).then((res) => {
      message.success('Success delete member')
      history.push('/app/branch');
      fetchData();
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

  {

    const columns = [
      {
        title: 'Member Email',
        dataIndex: 'member_email',
        key: 'member_email',
        render: (text, record) => <span>{record.member_email}</span>,
      },
      {
        title: 'Member Name',
        dataIndex: 'member_name',
        key: 'member_name',
        render: (text, record) => <span>{record.member_name}</span>,
        sorter: {
          compare: (a, b) => a.address - b.address,
          multiple: 2,
        },
      },
      {
        title: 'Phone',
        dataIndex: 'member_phone',
        key: 'member_phone',
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
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <EditOutlined onClick={() => {
                  setEditMode(record);
                }} />
              </div>
              <Popconfirm title="Are you sure delete this task?" onConfirm={() => {
                deleteClick(record.id)
              }}
                onCancel={cancel} okText="Yes" cancelText="No">
                <div style={{ marginLeft: 8 }}>
                  <DeleteOutlined />
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
      </div>
      <div style={{
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between'
      }} key={row => row.id}>
        <Button type="primary" onClick={addBranch} style={{ marginTop: 25 }}><PlusOutlined />Tambah Data</Button>
        <Search
          placeholder="Search...."
          onSearch={(value) => {
            store.member.selectedFilterValue = value;
            store.member.setPage(1);
            // store.member.search(value);
          }}
          onChange={event => {
            store.member.selectedFilterValue = event.target.value;
            store.member.setPageDebounced();
          }} enterButton style={{ width: 200, marginTop: 25 }} />
      </div>
      {renderModal()}
      <Table
        size={"small"}
        rowKey={record => record.member_email}
        loading={store.member.isLoading}
        dataSource={store.member.data.slice()}
        columns={columns}
        hasEmpty={true}
        bordered={true}
        pagination={{
          total: store.member.maxLength,
          onShowSizeChange: (current, pageSize) => {
            store.member.setCurrentPage(pageSize);
          }
        }}
        onChange={(page) => {
          store.member.setPage(page.current);
        }}
        current={store.member.currentPage}
        style={{ marginTop: 15 }}
      />
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
            editData(values);
          })
          .catch(info => {
            // console.log('Validate Failed:', info);
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
          <Form.Item
            label="Photo"
          >
            {/* <div>
              <input type="file" id="files" onChange={changeImage} style={{background: 'gray',height: 80,width: 80}}/>
            </div> */}
            {imgData ? <img src={imgData} alt="avatar" style={{ width: 100, height: 100, marginBottom: 15, borderRadius: 8 }} /> :
              <img src={`${appConfig.apiUrl}/member_images/${xImg}`} alt="avatar" style={{ width: 100, height: 100, marginBottom: 15, borderRadius: 8 }} />}
            <input type="file" id="files" onChange={changeImage} className="custom-file-upload" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  }
});