import React from "react";
import {
  Layout, Menu, Col,
  Row,
  Card,
  PageHeader,
  Button,
  Table,
  Typography
} from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';
import MediaQuery, { useMediaQuery } from "react-responsive";
import { useStore } from "../../utils/useStores";
import { createUseStyles } from "react-jss";
import './style.css';


const columns = [
  {
    title: 'Nama Pemilik',
    dataIndex: 'name',
  },
  {
    title: 'Alamat',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.address - b.address,
      multiple: 3,
    },
  },
  {
    title: 'City',
    dataIndex: 'city',
    sorter: {
      compare: (a, b) => a.city - b.city,
      multiple: 4,
    },
  },
  {
    title: 'Nama Branch',
    dataIndex: 'branch',
    sorter: {
      compare: (a, b) => a.branch - b.branch,
      multiple: 2,
    },
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    sorter: {
      compare: (a, b) => a.phone - b.phone,
      multiple: 1,
    },
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    address: 'Jl Lolongok Sukasari Bogor',
    city: 'Bogor',
    branch: 'galuh store',
    phone: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    address: 'Jl Lolongok Sukasari Bogor',
    city: 'Bogor',
    branch: 'galuh store',
    phone: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    address: 'Jl Lolongok Sukasari Bogor',
    city: 'Bogor',
    branch: 'galuh store',
    phone: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    address: 'Jl Lolongok Sukasari Bogor',
    city: 'Bogor',
    branch: 'galuh store',
    phone: 89,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

export const Branch = () => {
  const store = useStore();

  return <div>
   <div style={{
			display: "flex",
			flexDirection: 'row',
			justifyContent: 'space-between'
		}}>
			<Typography.Title level={5} style={{marginTop: 8}}>Branch</Typography.Title>
			<Button type="primary"><PlusOutlined  />Tambah Data</Button>
		</div>
		<Row>
			<Col span={24}>
				<Table scroll={{ x: 'calc(50vh - 4em)' }}
					   dataSource={data}
					   columns={columns}
					   size="middle"
					   style={{width: '100%',marginTop: 18}}
				/>
			</Col>
		</Row>

  </div>
};
