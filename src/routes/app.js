import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Payment } from "../pages/Payment/Payment";
import { Branch } from "../pages/Branch/Branch";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Subscription } from "../pages/Subscription";
import { Machine } from "../pages/Machine";
import { Category } from "../pages/Category";
import { AkuFood } from "../pages/AkuFood";
import { AllTransaksi } from "../pages/LaporanTransaksi/AllTransaksi";
import { RangkumanTransaksi } from "../pages/LaporanTransaksi/RangkumanTransaksi";
import { Qris } from '../pages/LaporanTransaksi/QRIS';
import { TransaksiAkuFood } from '../pages/LaporanTransaksi/TransaksiAkuFood';
import { PenjualanItem } from '../pages/LaporanTransaksi/PenjualanItem';
import { TransaksiPerJam } from '../pages/LaporanTransaksi/TransaksiPerJam';
import { TransaksiKasir } from "../pages/LaporanTransaksi/TransaksiKasir";
import { LaporanHPP } from "../pages/LaporanTransaksi/LaporanHPP";
import { PNL } from "../pages/LaporanTransaksi/PNL";
import { TransaksiVoid } from "../pages/LaporanTransaksi/TransaksiVoid";
import { TambahItem } from "../pages/StokItem/TambahItem";
import { HistoryItem } from "../pages/StokItem/HistoryItem";
import { DaftarItem } from "../pages/ManajemenItem/DaftarItem";
import { TambahItemManajemen } from "../pages/ManajemenItem/TambahItem";
import { ImportItem } from "../pages/ManajemenItem/ImportItem";
import { HubungkanPrinter } from "../pages/ManajemenItem/HubungkanPrinter";
import { DaftarEvent } from "../pages/Discount/DaftarEvent";
import { DaftarInventory } from "../pages/ManajemenInventory/DaftarInventory";
import { TambahInventory } from "../pages/ManajemenInventory/TambahInventory";
import { UpdateStokInventory } from "../pages/ManajemenInventory/UpdateStokInventory";
import { ImportDataInventory } from "../pages/ManajemenInventory/ImportDataInventory";
import { HistoryUpdateInventory } from "../pages/ManajemenInventory/HistoryUpdateInventory";
import { DaftarResep } from "../pages/ManajemenResep/DaftarResep";
import { SettingPrinter } from "../pages/RemotePrinter/SettingPrinter";
import {PurchaseOrder} from '../pages/PurchaseOrder';
import { Presensi } from "../pages/Presensi";
import { ManajemenAccount } from "../pages/ManajemenAccount";
import { ForgotPassword } from "../pages/Pengaturan/ForgotPassword";
import { BranchPengaturan } from "../pages/Pengaturan/BranchPengaturan";

export const AppRoutes = () => {
  return <Switch>
    <Route path="/app" exact>
      <Redirect to={"/app/home"} />
    </Route>
    <Route path="/app/home" exact>
      <Dashboard />
    </Route>
    <Route path="/app/subscription" exact>
      <Subscription />
    </Route>
    <Route path="/app/branch" exact>
      <Branch />
    </Route>
    <Route path="/app/branch/qris" exact>
      <Payment />
    </Route>
    <Route path="/app/branch/machines" exact>
      <Machine />
    </Route>
    <Route path="/app/category" exact>
      <Category />
    </Route>
    <Route path="/app/branch/join-akufood" exact>
      <AkuFood />
    </Route>
    <Route path="/app/report/all" exact>
      <AllTransaksi />
    </Route>
    <Route path="/app/report/summary" exact>
      <RangkumanTransaksi />
    </Route>
    <Route path="/app/report/qris" exact>
      <Qris />
    </Route>
    <Route path="/app/report/akufood" exact>
      <TransaksiAkuFood />
    </Route>
    <Route path="/app/report/sales-item" exact>
      <PenjualanItem />
    </Route>
    <Route path="/app/report/hours" exact>
      <TransaksiPerJam />
    </Route>
    <Route path="/app/report/cashier" exact>
      <TransaksiKasir />
    </Route>
    <Route path="/app/report/cogs" exact>
      <LaporanHPP />
    </Route>
    <Route path="/app/report/pnl" exact>
      <PNL />
    </Route>
    <Route path="/app/report/void" exact>
      <TransaksiVoid />
    </Route>
    <Route path="/app/stock/update" exact>
      <TambahItem />
    </Route>
    <Route path="/app/stock/history" exact>
      <HistoryItem />
    </Route>
    <Route path="/app/my_items" exact>
      <DaftarItem />
    </Route>
    <Route path="/app/my_items/add" exact>
      <TambahItemManajemen />
    </Route>
    <Route path="/app/my_items/import" exact>
      <ImportItem />
    </Route>
    <Route path="/app/printers/item" exact>
      <HubungkanPrinter />
    </Route>
    <Route path="/app/events" exact>
      <DaftarEvent />
    </Route>
    <Route path="/app/my_inventory" exact>
      <DaftarInventory />
    </Route>
    <Route path="/app/my_inventory/manage/add" exact>
      <TambahInventory />
    </Route>
    <Route path="/app/my_inventory/manage/update" exact>
      <UpdateStokInventory />
    </Route>
    <Route path="/app/my_inventory/import" exact>
      <ImportDataInventory />
    </Route>
    <Route path="/app/my_inventory/history" exact>
      <HistoryUpdateInventory />
    </Route>
    <Route path="/app/my_inventory/recipes" exact>
      <DaftarResep />
    </Route>
    <Route path="/app/printers" exact>
      <SettingPrinter />
    </Route>  
    <Route path="/app/purchase" exact>
      <PurchaseOrder />
    </Route>
    <Route path="/app/settings/attendance" exact> 
      <Presensi />
    </Route>
    <Route path="/app/accounts" exact>
      <ManajemenAccount />
    </Route>
    <Route path="/app/settings/profile" exact>
      <ForgotPassword />
    </Route>
    <Route path="/app/branch/manage" exact>  
      <BranchPengaturan />
    </Route>
  </Switch>
};
