import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Space, Table, Tag } from "antd";
import { GameType, ImageType } from "../../../../interfaces/rootInterface";
import axios from "axios";
import './style.css';
import { useHistory } from "react-router-dom";
const { Search } = Input;
import {Endpoint} from "../../../../api/endpoint"
import { LoadingContext } from "react-router-loading";
import Helmet from 'react-helmet';

function ConsoleGameListScreen() {
  const loadingContext = useContext(LoadingContext);
  const [gameData, setGameData] = useState<GameType[]>([]);
  const [searchGame, setSearchGame] = useState('');
  const history = useHistory();
  let start = 0;
  let count = 5;
  const loading = async () => {
    await axios.post(Endpoint.mainApi + "api/game/lazy-load/browse",{
      listGenreDetail: [],
      count : count,
      start : start,
      sortBy: "abc"
    }).then((response) => {
      if (response.data.length !== 0) {
          response.data.forEach((element,index)=> {
              setGameData(arr => [...arr,element]);
          })
         
          start += count;
          loading();
      }
      loadingContext.done();
    });
   
  };


  const columns = [
    {
      title: "",
      dataIndex: "nameGame",
      key: "nameGame",
      width: "10px",
      render: (text,item,index) => <h4>{index+1}</h4>

    },
    {
      title: "Game",
      dataIndex: "imageGameDetail",
      key: "imageGameDetail",
      width: "40px",
      render: (text) =>
          <img className="cover" height="40px" width="40px" src={text[0].url} />
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
      <Helmet>
            <title> Stun Console | Games </title>
      </Helmet>
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
          <div style = {{width:'40px'}}></div>
          <Button 
              onClick={() => { history.push("/admin/create-game") }}
              className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
              style={{ height: '40px' }}
              type = "primary"
          >
            {" "}
            Create New Game{" "}
          </Button>
        </div>
      </div>
      <div className="console-list">
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: event => { history.push('game/overview/'+record.idGame) },
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
