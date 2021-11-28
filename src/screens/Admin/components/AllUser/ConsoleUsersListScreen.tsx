import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Menu, Space, Table, Tag } from "antd";
import { GameType, UserType } from "../../../../interfaces/rootInterface";
import {Endpoint} from "../../../../api/endpoint"
import './style.css'
import axios from "axios";
import Item from "antd/lib/list/Item";
const { Search } = Input;
const columns = [
  {
    title: "",
    dataIndex: "avatar",
    key: "avatar",
    render: (text) =>
      text !== null ? (
        <img className="cover" height="40px" width="40px" src={text} />
      ) : null,
  },
  {
    title: "User Name",
    dataIndex: "userName",
    key: "userName",
    render: (text) => <h3>{text}</h3>,
  },
  {
    title: "Display Name",
    dataIndex: "realName",
    key: "realName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone Number",
    key: "numberPhone",
    dataIndex: "numberPhone",
  },
  {
    title: "Action",
    key: "idUser",
    dataIndex: "idUser",
    render: (id) => (
      <Space size="middle">
        <Dropdown overlay={ <MyMenu id={id}/>} placement="bottomLeft">
          <Button>Action</Button>
        </Dropdown>
      </Space>
    ),
  },
];
const MyMenu = ({id}) => (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Reset Password
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>console.log(id)}
      >
        Lock Acocount
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
      >
        UnLock Acocount
      </a>
    </Menu.Item>
  </Menu>
);
function ConsoleUsersListScreen() {
  const [userData, setUserData] = useState<UserType[]>([]);
  const [searchUser, setSearchUser] = useState('');

  const getUserData = () => {
    return axios.get( Endpoint.mainApi + "api/user",{
      headers: {
          Authorization: "Bearer "+ localStorage.getItem('accessToken') // token here
      }
    }).then((response) => {
      setUserData(response.data);
    }).catch(err => {
      console.log(err)
    })
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="console-container">
      <div className="console-content">
        <div className="search-container">
          <Input
            placeholder="input search text"
            onChange = {event=>setSearchUser(event.target.value?.toLowerCase())}
          />
        </div>
        <div className="console-list-name">
          <Table columns={columns} dataSource={
            userData.filter(item=>
              item.email?.toLowerCase().indexOf(searchUser) !==-1 || item.userName?.toLowerCase().indexOf(searchUser) !== -1
              || item.realName?.toLowerCase().indexOf(searchUser) !== -1
            )} 
          />
        </div>
      </div>
    </div>
  );
}

export default ConsoleUsersListScreen;
