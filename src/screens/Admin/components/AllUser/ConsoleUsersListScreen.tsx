import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Menu, Space, Table, Tag } from "antd";
import { GameType, UserType } from "../../../../interfaces/rootInterface";
import './style.css'
import axios from "axios";
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
        href="https://www.luohanacademy.com"
      >
        UnLock Acocount
      </a>
    </Menu.Item>
  </Menu>
);
function ConsoleUsersListScreen() {
  const onSearch = (value) => console.log(value);
  const [userData, setUserData] = useState<UserType[]>([]);

  const getUserData = () => {
    return axios.get("https://localhost:5001/api/user").then((response) => {
      setUserData(response.data);
    });
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="console-container">
      <div className="console-content">
        <div className="search-container">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </div>
        <div className="console-list-name">
          <Table columns={columns} dataSource={userData} />
        </div>
      </div>
    </div>
  );
}

export default ConsoleUsersListScreen;
