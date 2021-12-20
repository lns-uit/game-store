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
    title: "User",
    dataIndex: "avatar",
    key: "avatar",
    width: "30px",
    render: (text) =>
        <img className="cover" height="30px" width="30px" 
            src={text===null ? "https://firebasestorage.googleapis.com/v0/b/docprintx.appspot.com/o/logoSecondary.png?alt=media&token=d451278d-c524-46b5-a400-816b7970baa8": text} 
        />
  },
  {
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
  // {
  //   title: "Phone Number",
  //   key: "numberPhone",
  //   dataIndex: "numberPhone",
  // },
  // {
  //   title: "Action",
  //   key: "idUser",
  //   dataIndex: "idUser",
  //   render: (id) => (
  //     <Space size="middle">
  //       <Dropdown overlay={ <MyMenu id={id}/>} placement="bottomLeft">
  //         <Button>Action</Button>
  //       </Dropdown>
  //     </Space>
  //   ),
  // },
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
  let start = 0;
  let count = 5;
  const getUserData = () => {
    return axios.get( Endpoint.mainApi + 'api/user/'+start+'/'+count ,{
      headers: {
          Authorization: "Bearer "+ localStorage.getItem('accessToken') // token here
      }
    }).then((response) => {
      if (response.data.length !== 0) {
        response.data.forEach((element,index)=> {
          setUserData(arr => [...arr,element]);
        })
        start += count;
        getUserData();
      }
    })
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="console-container">
      <div className="console-detail-header">
        <h1>
          ALL USER
        </h1>
        <div className="console-toolbar">

          <div className="search-container">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#c0c0c0"><path d="M0 0h24v24H0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
            <div style={{ width: '5px' }}></div>
            <Input
              placeholder="input search text"
              onChange={event => setSearchUser(event.target.value?.toLowerCase())}
            />
          </div>
        </div>
      </div>

      <div className="console-list">
        <Table

          pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
          columns={columns} dataSource={
            userData.filter(item =>
              item.email?.toLowerCase().indexOf(searchUser) !== -1 || item.userName?.toLowerCase().indexOf(searchUser) !== -1
              || item.realName?.toLowerCase().indexOf(searchUser) !== -1
            )}
        />
      </div>
    </div>
  );
}

export default ConsoleUsersListScreen;
