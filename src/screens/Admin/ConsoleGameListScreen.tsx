import React, { useEffect, useState } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import {GameType, ImageType} from '../../interfaces/rootInterface';
import axios from 'axios';
const { Search } = Input;
const columns = [
    {
      title: 'Game',
      dataIndex: 'imageGameDetail',
      key: 'imageGameDetail',
      render: text => text.length!==0 ? <img className="cover" height="60px" width="60px" src={text[0].url}/> : null,
    },
    {
        title: 'Name',
        dataIndex: 'nameGame',
        key: 'nameGame',
        render: text => <h3>{text}</h3>,
    },
    {
      title: 'Status',
      dataIndex: 'lastestVersion',
      key: 'lastestVersion',
      render: status => status === -1 ?
        <Tag color={'red'}>
            DELETED
        </Tag> 
        : 
        <Tag color={'cyan'}>
            PUBLISHED
        </Tag>
    },
    {
      title: 'Bought',
      dataIndex: 'numberOfBuyer',
      key: 'numberOfBuyer',
    },
    {
      title: 'Installed',
      key: 'numberOfDowloaders',
      dataIndex: 'numberOfDowloaders',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button> See Game </Button>
        </Space>
      ),
    },
  ];
  
function ConsoleGameListScreen(){
    const onSearch = value => console.log(value);
    const [gameData, setGameData] = useState<GameType[]>([])

    const getDataGame = () =>{
      return axios.get("https://localhost:5001/api/game")
      .then(response => {setGameData(response.data)})
    }
    useEffect(() => {
      getDataGame()
    }, []);
    return(
        <div className = "console-container">
            <div className = "console-header">
                <div className = "console-avatar">

                </div>
            </div>
            <div className = "console-content">
                <div className = "console-content-toolbar">
                    <div className = "search-container">
                        <Search placeholder="input search text" onSearch={onSearch} enterButton />
                    </div>
                    <div></div>
                    <Button type="primary" danger> Create New Game </Button>
                </div>
                <div className = "console-list-name">
                    <Table columns={columns} dataSource={gameData} />
                </div>
            </div>
        </div>
    )
}
const data = [
    {
      key: '1',
      name: 'DragonBall GT ',
      url: 'https://lh3.googleusercontent.com/pw/AM-JKLV_NtvyjU3E5mlw-4DB5pveOWcou8DXyL-mALtJn4xIrGn62m0lfSv88FeYOWZhCFgpA8IMUxCMlxIs_JKN-WVo6a4Le2TQYw2NdMZebkfXFwkgdpmaudVyTtRMMW8CZ8Xok0jjxg40kPu7iuwZAAk=w1734-h975-no?authuser=2',
      status: 'Published',
      address: '123',
    },
    {
      key: '2',
      name: 'ỐI DỒI ÔI',
      url: 'https://lh3.googleusercontent.com/pw/AM-JKLWjAgCErbMFYh7x6W4ijkp7d1A5YhlKj6ESAEZih2CkyQ5O2XemxSgjROpLU-e_vJymwqOOb-fKIhUjjPJk2FQNXi7HVqvFpmOXE-Mpb06NgUUl4a_ijc1i17s2obs4pk5CdHMubGEtw_gPqR_Kr3s=w1734-h975-no?authuser=2',
      status: 'Published',
      address: '12',
    },
    {
      key: '3',
      name: 'Leaguage of legend',
      url: 'https://lh3.googleusercontent.com/pw/AM-JKLUhdJ3fnUSZRFsZckorFbn94R1qhrqs0v214wvbRxHH29xKH0AwdHr_laXXi1CZMbSF8BNDHMxQsRM5pz1Om6z5lj4xNBdg63n9WuqdL6wBNaLsAs5fhOFsrk8dzwruXOlF3qdRg1YrtKxmKFHMd8A=w1734-h975-no?authuser=2',
      status: 'Unpublished',
      address: '32',
    },
    {
        key: '1',
        name: 'DragonBall GT ',
        url: 'https://lh3.googleusercontent.com/pw/AM-JKLV_NtvyjU3E5mlw-4DB5pveOWcou8DXyL-mALtJn4xIrGn62m0lfSv88FeYOWZhCFgpA8IMUxCMlxIs_JKN-WVo6a4Le2TQYw2NdMZebkfXFwkgdpmaudVyTtRMMW8CZ8Xok0jjxg40kPu7iuwZAAk=w1734-h975-no?authuser=2',
        status: 'Published',
        address: '123',
      },
      {
        key: '2',
        name: 'ỐI DỒI ÔI',
        url: 'https://lh3.googleusercontent.com/pw/AM-JKLWjAgCErbMFYh7x6W4ijkp7d1A5YhlKj6ESAEZih2CkyQ5O2XemxSgjROpLU-e_vJymwqOOb-fKIhUjjPJk2FQNXi7HVqvFpmOXE-Mpb06NgUUl4a_ijc1i17s2obs4pk5CdHMubGEtw_gPqR_Kr3s=w1734-h975-no?authuser=2',
        status: 'Published',
        address: '12',
      },
      {
        key: '3',
        name: 'Leaguage of legend',
        url: 'https://lh3.googleusercontent.com/pw/AM-JKLUhdJ3fnUSZRFsZckorFbn94R1qhrqs0v214wvbRxHH29xKH0AwdHr_laXXi1CZMbSF8BNDHMxQsRM5pz1Om6z5lj4xNBdg63n9WuqdL6wBNaLsAs5fhOFsrk8dzwruXOlF3qdRg1YrtKxmKFHMd8A=w1734-h975-no?authuser=2',
        status: 'Unpublished',
        address: '32',
      },
      {
        key: '1',
        name: 'DragonBall GT ',
        url: 'https://lh3.googleusercontent.com/pw/AM-JKLV_NtvyjU3E5mlw-4DB5pveOWcou8DXyL-mALtJn4xIrGn62m0lfSv88FeYOWZhCFgpA8IMUxCMlxIs_JKN-WVo6a4Le2TQYw2NdMZebkfXFwkgdpmaudVyTtRMMW8CZ8Xok0jjxg40kPu7iuwZAAk=w1734-h975-no?authuser=2',
        status: 'Published',
        address: '123',
      },
      {
        key: '2',
        name: 'ỐI DỒI ÔI',
        url: 'https://lh3.googleusercontent.com/pw/AM-JKLWjAgCErbMFYh7x6W4ijkp7d1A5YhlKj6ESAEZih2CkyQ5O2XemxSgjROpLU-e_vJymwqOOb-fKIhUjjPJk2FQNXi7HVqvFpmOXE-Mpb06NgUUl4a_ijc1i17s2obs4pk5CdHMubGEtw_gPqR_Kr3s=w1734-h975-no?authuser=2',
        status: 'Published',
        address: '12',
      },
      {
        key: '3',
        name: 'Leaguage of legend',
        url: 'https://lh3.googleusercontent.com/pw/AM-JKLUhdJ3fnUSZRFsZckorFbn94R1qhrqs0v214wvbRxHH29xKH0AwdHr_laXXi1CZMbSF8BNDHMxQsRM5pz1Om6z5lj4xNBdg63n9WuqdL6wBNaLsAs5fhOFsrk8dzwruXOlF3qdRg1YrtKxmKFHMd8A=w1734-h975-no?authuser=2',
        status: 'Unpublished',
        address: '32',
      },
      {
        key: '2',
        name: 'ỐI DỒI ÔI',
        url: 'https://lh3.googleusercontent.com/pw/AM-JKLWjAgCErbMFYh7x6W4ijkp7d1A5YhlKj6ESAEZih2CkyQ5O2XemxSgjROpLU-e_vJymwqOOb-fKIhUjjPJk2FQNXi7HVqvFpmOXE-Mpb06NgUUl4a_ijc1i17s2obs4pk5CdHMubGEtw_gPqR_Kr3s=w1734-h975-no?authuser=2',
        status: 'Published',
        address: '12',
      },
      {
        key: '3',
        name: 'Leaguage of legend',
        url: 'https://lh3.googleusercontent.com/pw/AM-JKLUhdJ3fnUSZRFsZckorFbn94R1qhrqs0v214wvbRxHH29xKH0AwdHr_laXXi1CZMbSF8BNDHMxQsRM5pz1Om6z5lj4xNBdg63n9WuqdL6wBNaLsAs5fhOFsrk8dzwruXOlF3qdRg1YrtKxmKFHMd8A=w1734-h975-no?authuser=2',
        status: 'Unpublished',
        address: '32',
      },
  ];
export default ConsoleGameListScreen;