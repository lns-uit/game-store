import { Input, DatePicker, Tabs } from "antd";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./style.css";
import ConsoleUsersListScreen from "./components/AllUser/ConsoleUsersListScreen"
import ConsoleGameListScreen from "./components/AllGame/ConsoleGameListScreen";
import GenresManager from "./components/GenresManager/GenresManager"
import PrivacyPolicyEditor from "./components/PrivacyPolicy/PrivacyPolicyEditor"
import TermOfService from "./components/TermOfService/TermOfServiceEditor";
import StoreRefunPolicyEditor from "./components/StoreRefundPolicy/StoreRefundPolicyEditor";
import DiscountEvent from "./components/DiscountEvent/DiscountEvent";
const { Search } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
function AdminScreen() {

  useEffect(() => {
  
  }, []);
  return (
    <div className="admin-container">
      <Tabs 
        defaultActiveKey="1" onChange={()=>{}}
        tabPosition = "left"
        >
        <TabPane tab="All Games" key="1">
          <ConsoleGameListScreen/>
        </TabPane>
        <TabPane tab="Users Manager" key="2">
          <ConsoleUsersListScreen/>
        </TabPane>
        <TabPane tab="Discount Event" key="3">
          <DiscountEvent/>
        </TabPane>
        <TabPane tab="Genres Manager" key="4">
          <GenresManager></GenresManager>
        </TabPane>
        <TabPane tab="Term Of Service" key="5">
          <TermOfService/>
        </TabPane>
        <TabPane tab="Store Refund Policy" key="6">
          <StoreRefunPolicyEditor/>
        </TabPane>
        <TabPane tab="Privacy Policy" key="7">
          <PrivacyPolicyEditor/>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminScreen;
