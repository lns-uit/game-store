import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Space, Table, Tag } from "antd";
import { GameType, ImageType } from "../../../../interfaces/rootInterface";
import axios from "axios";
import './style.css';
import { useHistory } from "react-router-dom";
const { Search } = Input;
import {Endpoint} from "../../../../api/endpoint"
import { LoadingContext } from "react-router-loading";

function ConsoleGameListScreen() {
  const loadingContext = useContext(LoadingContext);
  
  const loading = async () => {
    await axios.get(Endpoint.mainApi + "api/game").then((response) => {
      setGameData(response.data);
      loadingContext.done();
    });
   
  };
  const [gameData, setGameData] = useState<GameType[]>([]);
  const [searchGame, setSearchGame] = useState('');
  const history = useHistory();

  const columns = [
    {
      title: "Game",
      dataIndex: "imageGameDetail",
      key: "imageGameDetail",
      width: "40px",
      render: (text) =>
        text.length !== 0 ? (
          <img className="cover" height="40px" width="40px" src={text[0].url} />
        ) : null,
    },
    {
      dataIndex: "nameGame",
      key: "nameGame",
      render: (text) => <h3>{text}</h3>,
    },
    {
      title: "Status",
      dataIndex: "lastestVersion",
      key: "lastestVersion",
      render: (ver) =>
        ver === -1 ? (
          <Tag color={"#b80f00"}>DELETED</Tag>
        ) : (
          <Tag color={"transparent"}>PUBLISHED</Tag>
        ),
    },
    {
      title: "Bought",
      dataIndex: "numberOfBuyer",
      key: "numberOfBuyer",
    },
    {
      title: "Installed",
      key: "numberOfDownloaders",
      dataIndex: "numberOfDownloaders",
    },
    {
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <div 
            className = "btn-view-game-browser"
            onClick={(event)=>{
              event.stopPropagation()
              window.open("/game/"+record.idGame)
            }}
          >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/></svg>
          </div>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    loading();
  }, []);
  return (
    <div className="console-container">
      <div className="console-detail-header">
        <h1>
            ALL GAME
        </h1>
        <div className="console-toolbar">
          
          <div className="search-container">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#c0c0c0"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <div style = {{width:'5px'}}></div>
            <Input
              placeholder="input search text"
              onChange={event => setSearchGame(event.target.value?.toLowerCase())}
            />
          </div>
          <div style = {{width:'20px'}}></div>
          <div className = "btn" onClick={() => { history.push("/admin/create-game") }}>
            {" "}
            Create New Game{" "}
          </div>
        </div>
      </div>
      <div className="console-list">
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: event => { history.push('history/'+record.idGame) },
            };
          }}
          pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
          columns={columns} dataSource={
            gameData.filter(item => item.nameGame?.toLowerCase().indexOf(searchGame) !== -1

          )} />
      </div>
    </div>
  );
}

export default ConsoleGameListScreen;
