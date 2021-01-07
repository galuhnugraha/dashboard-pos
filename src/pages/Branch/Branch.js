import React from "react";
import {
  Layout, Menu, Col,
  Row,
  Card,
  PageHeader,
  Button,
  Table
} from 'antd';
import MediaQuery, { useMediaQuery } from "react-responsive";
import { useStore } from "../../utils/useStores";
import { createUseStyles } from "react-jss";
import './style.css';


const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
    status: 'active'
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
    status: 'active'
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

export const Branch = () => {
  const store = useStore();

  return <div>
    <span>Branch</span>
  </div>
};
