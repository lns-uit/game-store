import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Tag } from "antd";
import { GameType, ImageType } from "../../interfaces/rootInterface";
import axios from "axios";
const { Search } = Input;
const columns = [
  {
    title: "Game",
    dataIndex: "imageGameDetail",
    key: "imageGameDetail",
    render: (text) =>
      text.length !== 0 ? (
        <img className="cover" height="60px" width="60px" src={text[0].url} />
      ) : null,
  },
  {
    title: "Name",
    dataIndex: "nameGame",
    key: "nameGame",
    render: (text) => <h3>{text}</h3>,
  },
  {
    title: "Status",
    dataIndex: "lastestVersion",
    key: "lastestVersion",
    render: (status) =>
      status === -1 ? (
        <Tag color={"red"}>DELETED</Tag>
      ) : (
        <Tag color={"cyan"}>PUBLISHED</Tag>
      ),
  },
  {
    title: "Bought",
    dataIndex: "numberOfBuyer",
    key: "numberOfBuyer",
  },
  {
    title: "Installed",
    key: "numberOfDowloaders",
    dataIndex: "numberOfDowloaders",
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <Space size="middle">
        <Button> See Game </Button>
      </Space>
    ),
  },
];

function ConsoleGameListScreen() {
  const onSearch = (value) => console.log(value);
  const [gameData, setGameData] = useState<GameType[]>([]);

  const getDataGame = () => {
    return axios.get("https://localhost:5001/api/game").then((response) => {
      setGameData(response.data);
    });
  };
  useEffect(() => {
    getDataGame();
  }, []);
  return (
    <div className="console-container">
      <div className="console-header">
        <div className="console-avatar"></div>
      </div>
      <div className="console-content">
        <div className="console-content-toolbar">
          <div className="search-container">
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              enterButton
            />
          </div>
          <div></div>
          <Button type="primary" danger>
            {" "}
            Create New Game{" "}
          </Button>
        </div>
        <div className="console-list-name">
          <Table columns={columns} dataSource={gameData} />
        </div>
      </div>
    </div>
  );
}

export default ConsoleGameListScreen;
