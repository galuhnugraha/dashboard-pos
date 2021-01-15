import React, { useState, useEffect } from "react";
import { AppRoutes } from "../../routes/app";
import {
  HomeOutlined,
  MenuFoldOutlined,
  HistoryOutlined,
  StarOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  LaptopOutlined,
  RiseOutlined,
  AppstoreOutlined,
  CreditCardOutlined,
  ProfileOutlined,
  ReadOutlined,
  PrinterOutlined,
  TabletOutlined,
  SettingOutlined,
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Select, Divider, Dropdown } from 'antd';
import {
  Layout, Menu, Col,
  Row,
} from 'antd';
import { createUseStyles } from "react-jss";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "../../utils/useStores";
import Logo from '../../assets/images/logo.png';

const { Header, Content, Sider } = Layout;
const { Option } = Select;
const { SubMenu } = Menu;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const useStyles = createUseStyles({
  logo: `
    height: 32px;
    // backgroundImage: url('../../assset/images/logo.png');
    // background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  `,
  hideSidebarButton: `
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    `,
  hideSidebarButtonHovered: {
    '&:hover': `
    color: #1890ff; `
  },
  sideFixed: {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    left: 0,
    zIndex: 99,
  },
  containFixed: {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    top: 48,
    width: "100vw",
  },
});


export const App = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const store = useStore();
  let history = useHistory();

  const logout = () => {
    store.auth.logout().then((res) => {
      history.push("/login");
    });
  };


  const menu = (
    <Menu>
      <Menu.Item key="0">
        <button onClick={logout}
          style={{
            backgroundColor: "white",
            border: "none",
            textAlign: "center",
            textDecoration: "none"
          }}
        >Logout</button>
      </Menu.Item>
    </Menu >
  );


  // const menu = (
  //   <Menu>
  //     <Menu.Item key="0" onClick={() => {
  //       logout()
  //     }}>
  //       <Row>
  //         <Col span={8}>
  //           <LockOutlined style={{ fontSize: 16 }} />
  //         </Col>
  //         <Col span={8}>
  //           <p>Logout</p>
  //         </Col>
  //       </Row>
  //     </Menu.Item>
  //   </Menu>
  // );

  const classes = useStyles();

  useEffect(() => {
    // store.ui.setMediaQuery(mediaQuery);
  });


  return (
    <Layout>
      <Header style={{ background: 'white', padding: 0, boxShadow: '1px 1px 1px 1px lightgrey', zIndex: 100, position: 'fixed', width: '100vw' }}>
        {/* <img src={Logo} style={{ height: 35, }} /> */}
        <Row type="flex" justify="space-between">
          <Col>
            <Row type="flex" justify="space-between">
              <Col>
                {!collapsed && <MenuFoldOutlined className={classes.hideSidebarButton} onClick={() => {
                  setCollapsed(true);
                }} />}
                {collapsed && <MenuUnfoldOutlined className={classes.hideSidebarButton} onClick={() => {
                  setCollapsed(false);
                }} />}
              </Col>
              <Col>
                <div className="background" style={{ marginTop: -3 }}>
                  <img src={Logo} alt=""
                    style={{ height: 35 }} />
                </div>
              </Col>
            </Row>
          </Col>
          <Col>
            <Dropdown overlay={menu} trigger={['click']}>
              <div className="ant-dropdown-link" href="#" style={{ color: 'grey', display: 'flex', flexDirection: 'row', height: 50 }}>
                <div style={{ padding: '5px 15px', paddingBottom: 0 }}>
                </div>
                <Avatar icon={<UserOutlined />} style={{ margin: '15px 5px 0px 0px' }} />
                <div style={{ padding: '0px 15px' }}>
                </div>
              </div>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <Layout style={{ margin: '55px 0px 0px' }}>
        <Sider trigger={null} collapsible collapsed={collapsed} width={store.ui.mediaQuery.isMobile ? 175 : 175} style={{ background: '#fff' }}>
          {/* <div className={classes.logo} /> */}
          <div style={{ margin: '55px 0px 25px 20px' }}>
            <Select defaultValue="Pilih Branch" style={{ width: store.ui.mediaQuery.isMobile ? 120 : 125 }} onChange={handleChange} placeholder="Pilih Branch">
              <Option value="branch_yogyakarta">Branch Yogyakarta</Option>
              <Option value="branch_jakarta">Branch Jakarta</Option>
            </Select>
          </div>
          <Divider />
          <Menu theme="#18EBFA" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/app/home">
                <HomeOutlined style={{ fontSize: 18 }} />
                <span>Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/app/branch">
                <ShopOutlined style={{ fontSize: 18 }} />
                <span>Branch</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/app/branch/qris">
                <CreditCardOutlined style={{ fontSize: 18 }} />
                <span>Metode Pembayaran</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/app/branch/join-akufood">
                <StarOutlined style={{ fontSize: 18 }} />
                <span>Gabung AKUFood</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/app/subscription">
                <HistoryOutlined style={{ fontSize: 18 }} />
                <span>Subscription</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/app/branch/machines">
                <LaptopOutlined style={{ fontSize: 18 }} />
                <span>Machine</span>
              </Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<RiseOutlined style={{ fontSize: 18 }} />} title="Laporan Transaksi">
              <Menu.Item key="7">
                <Link to="/app/report/all">
                  <p>Semua Transaksi</p>
                </Link>
              </Menu.Item>
              {/* /report/summary */}
              <Menu.Item key="8">
                <Link to="/app/report/summary">
                  <p>Rangkuman Transaksi</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="9">
                <Link to="/app/report/qris">
                  Transaksi QRIS
              </Link>
              </Menu.Item>
              <Menu.Item key="10">
                <Link to="/app/report/akufood">
                  <p>Transaksi AKUFood</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="11">
                <Link to="/app/report/sales-item">
                  <p>Penjualan per Item</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="12">
                <Link to="/app/report/hours">
                  <p>Transaksi per Jam</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="13">
                <Link to="/app/report/cashier">
                  <p>Transaksi per Kasir</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="14">
                <Link to="/app/report/cogs">
                  <p>Laporan HPP</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="15">
                <Link to="/app/report/pnl">
                  <p>Laporan Laba/Rugi</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="16">
                <Link to="/app/report/void">
                  <p>Transaksi Void</p>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="17">
              <Link to="/app/category">
                <AppstoreOutlined style={{ fontSize: 18 }} />
                <span>Kategori</span>
              </Link>
            </Menu.Item>
            <SubMenu key="sub2" title="Stok Item/Menu">
              <Menu.Item key="18">
                <Link to="/app/stock/update">
                  <p>Tambah Stok Item / Menu</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="19">
                <Link to="/app/stock/history">
                  <p>History Update Stok</p>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title="Manajemen Item/Menu">
              <Menu.Item key="20">
                <Link to="/app/my_items">
                  <p>Daftar Item</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="21">
                <Link to="/app/my_items/add">
                  <p>Tambah Item</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="22">
                <Link to="/app/my_items/import">
                  <p>Import Item</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="23">
                <Link to="/app/printers/item">
                  <p>Hubungkan Printer</p>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title="Event Discount">
              <Menu.Item key="24">
                <Link to="/app/events">
                  <p>Daftar Event</p>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" title="Manajemen Inventory" icon={<ProfileOutlined style={{ fontSize: 18 }} />}>
              <Menu.Item key="25">
                <Link to="/app/my_inventory">
                  <p>Daftar Inventory</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="26">
                <Link to="/app/my_inventory/manage/add">
                  <p>Tambah Inventory</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="27">
                <Link to="/app/my_inventory/manage/update">
                  <p>Update Stok Inventory</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="28">
                <Link to="/app/my_inventory/import">
                  <p>Impor Data Inventory</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="29">
                <Link to="/app/my_inventory/history">
                  <p>History Update Inventory</p>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" title="Manajemen Resep" icon={<ReadOutlined style={{ fontSize: 18 }} />}>
              <Menu.Item key="30">
                <Link to="/app/my_inventory/recipes">
                  <p>Daftar Resep</p>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub7" title="Remote Printer/KDS" icon={<PrinterOutlined style={{ fontSize: 18 }} />}>
              <Menu.Item key="31">
                <Link to="/app/printers">
                  <p>Setting Printer</p>
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub8" title="Manajemen Vendor" icon={<TabletOutlined style={{ fontSize: 18 }} />}>
              <Menu.Item key="32">
                <p>Daftar Vendor</p>
              </Menu.Item>
              <Menu.Item key="33">
                <p>Tambah Vendor</p>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="34">
              <Link to="/app/purchase">
                {/* <AppstoreOutlined  style={{fontSize: 18}}/> */}
                <span>Purchase Order</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="35">
              <Link to="/app/settings/attendance">
                <HistoryOutlined style={{ fontSize: 18 }} />
                <span>Presensi</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="36">
              <Link to="/app/accounts">
                <HistoryOutlined style={{ fontSize: 18 }} />
                <span>Manajemen Akun</span>
              </Link>
            </Menu.Item>
            {/* LockOutlined  */}
            <SubMenu key="sub9" title="Pengaturan" icon={<SettingOutlined style={{ fontSize: 18 }} />}>
              <Menu.Item key="37">
                <Link to="/app/settings/profile">
                  <p>Ganti Kata Sandi</p>
                </Link>
              </Menu.Item>
              <Menu.Item key="38">
                <Link to="/app/branch/manage">
                  <p>Branch</p>
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="39" onClick={() => {
              history.push('/login');
            }}>
              <LockOutlined style={{ fontSize: 18 }} />
              <span>Keluar</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content
          style={{
            margin: '45px 16px',
            padding: 24,
            background: '#fff',
            height: 'calc(100vh - 64px)',
          }}
        >
          <AppRoutes />
        </Content>
      </Layout>
    </Layout>
  );
};
