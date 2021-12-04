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
import { useHistory, useLocation } from "react-router-dom";
const { Search } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
function AdminScreen() {
  const [index, setIndex] = useState('all-game');
  const history = useHistory();
  let location = useLocation();

  const indexActive = (activeKey: string) =>{
    setIndex(activeKey)
    history.push('/admin/console/'+ activeKey);
  }

  useEffect(() => {
    let path = location.pathname.split('/');
    setIndex(path[path.length-1])
  }, []);

  return (
    <div className="admin-container">
      <Tabs 
        activeKey = {index}
        onChange={(activeKey)=>{indexActive(activeKey)}}
        tabPosition = "left"
        >
        <TabPane tab="All Games" key="all-game">
          <ConsoleGameListScreen/>
        </TabPane>
        <TabPane tab="Users Manager" key="user-manager">
          <ConsoleUsersListScreen/>
        </TabPane>
        <TabPane tab="Discount Event" key="discount-event">
          <DiscountEvent/>
        </TabPane>
        <TabPane tab="Genres Manager" key="genres-manager">
          <GenresManager></GenresManager>
        </TabPane>
        <TabPane tab="Term Of Service" key="term-of-service">
          <TermOfService/>
        </TabPane>
        <TabPane tab="Store Refund Policy" key="store-refund-policy">
          <StoreRefunPolicyEditor/>
        </TabPane>
        <TabPane tab="Privacy Policy" key="privacy-policy">
          <PrivacyPolicyEditor/>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminScreen;
