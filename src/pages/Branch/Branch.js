import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Table,
  Typography,
  message,
  Popconfirm,
  Modal,
  Form,
  Input,
  Upload,
  Image
} from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useStore } from "../../utils/useStores";
import { observer } from "mobx-react-lite";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}



export const Branch = observer((initialData) => {
  const store = useStore();
  let history = useHistory();
  const [loading, setloading] = useState(true)
  const [imageUrl, setImageUrl] = useState('')
  const [form] = Form.useForm();
  const [state, setState] = useState({
    success: false,
    form: {
      email: '',
      name: '',
      phone: '',
      bdate: '',
      no: '',
      password: '',
      photo: ''
    },
    loading: false,
    // fileList: [],
    imageUrl: ''
  });

  const [image, setImage] = useState('')

  const toggleSuccess = (() => {
    setState({
      success: !state.success,
    });
  })

  useEffect(() => {
    fetchData();
    store.member.setPage(1);
    store.member.setCurrentPage(10);
  }, []);

  const { Search } = Input;

  async function fetchData() {
    await store.member.getAll();
  }

  const changeImage = (info) => new Promise((result, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(info.file.originFileObj);
    reader.onload = () => result(reader.result);
    reader.onerror = error => reject(error);
  })

  // const viewImage = (file) => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.
  // }) 

  async function viewImage(info) {
    setImage(image = await changeImage(info))
  }


  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setloading({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        setImageUrl(imageUrl),
        setloading(loading = false),
      );
    }
  };

  async function editData(e) {
    // setImage = e.photo
    const data = {
      email: e.email,
      name: e.name,
      phone: e.phone,
      photo: await changeImage(e.photo)
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


  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const addBranch = () => {
    history.push('/app/branch/add')
  }

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


          < span >
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
          </span >
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
      }}>
        <Button type="primary" onClick={addBranch} style={{ marginTop: 25 }}><PlusOutlined />Tambah Data</Button>
        <Search
          placeholder="input search text"
          onSearch={(value) => {
            store.member.selectedFilterValue = value;
            store.member.setPage(1);
            store.member.search(value);
          }}
          onChange={event => {
            store.member.selectedFilterValue = event.target.value;
            store.member.setPageDebounced();
          }} enterButton style={{ width: 200, marginTop: 25 }}
          enterButton />

        {/* <Search placeholder="Masukan Search" onSearch={value => {
          store.member.selectedFilterValue = value;
          store.member.setPage(1);
          store.member.search(value);
        }}
          onChange={event => {
            store.member.selectedFilterValue = event.target.value;
            store.member.setPageDebounced(event.target.value);
          }} enterButton style={{ width: 200, marginTop: 25 }} loading={store.member.isLoading} /> */}
      </div>
      <Row>
        <Col span={24}>
          {renderModal()}
          <Table
            size={"small"}
            rowKey={record => record.id}
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
        </Col>
      </Row>
    </div>
  }

  function renderModal() {
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>)
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
            label="image"
            name="image"
            size={'large'}
          >
            <Image
              src={image}
            >
            </Image>
          </Form.Item>
          <Form.Item
            label="Photo Upload"
            name="photo"
            size={'large'}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  }
});
