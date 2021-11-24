import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Space, Table, DatePicker, InputNumber, Select } from "antd";
import { GameType, DiscountType } from "../../../../interfaces/rootInterface";
import axios from "axios";
import "./style.css";
import Moment from "react-moment";
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
function DiscountEvent() {
  const [dateDiscount, setDateDiscount] = useState<string[]>([])
  const [percent, setPercent] = useState(0);
  const [listDiscount, setListDiscount] = useState<DiscountType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gameData, setGameData] = useState<any[]>([]);
  const [searchDiscount,setSearchDiscount] = useState("");
  let allGame: any[] = [];

  const getDataGame = () => {
    return axios.get("https://localhost:5001/api/game").then((response) => {
      response.data.forEach((data) =>{
          if (data.lastestVersion!==-1){
            allGame.push(
                <Option key={data.idGame} value={data.nameGame}>
                    {data.nameGame}
                </Option>
            )
          }
      })
      setGameData(allGame);
    });
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
    const handleOk = () => {
        alert("DF");
        };
    const handleCancel = () => {
        setIsModalVisible(false);
        };
    const getDiscountData = () => {
        return axios.get("https://localhost:5001/api/discount").then((response) => {
        setListDiscount(response.data);
        });
    };
  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <h3>{text}</h3>
    },
    {
      title: "Percent",
      dataIndex: "percentDiscount",
      key: "percentDiscount",
      render: (text) => <h3>{text}</h3>,
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
      render: (text) => <Moment format="DD-MM-yyyy | HH:mm:ss">{text}</Moment>
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
      render: (text) => <Moment format="DD-MM-yyyy | HH:mm:ss">{text}</Moment>
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button> Update </Button>
          <Button> Detail </Button>
        </Space>
      ),
    },
  ];
  const postDiscount = (
    percentDiscount: any,
    title: any,
    startDate: any,
    endDate: any
  ) => {
    axios
      .post("https://localhost:5001/api/discount/create", {
        percentDiscount: percentDiscount,
        title: title,
        startDate: startDate,
        endDate: endDate,
      })
      .then((response) => {
        getDiscountData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateDiscount = (
    idDiscount: any,
    percentDiscount: any,
    title: any,
    startDate: any,
    endDate: any
  ) => {
    axios
      .put("https://localhost:5001/api/discount/update/" + idDiscount, {
        percentDiscount: percentDiscount,
        title: title,
        startDate: startDate,
        endDate: endDate,
      })
      .then((response) => {
        getDiscountData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getDiscountData()
    getDataGame()
  }, []);
  return (
    <div className="console-container">
        <Modal
            title="Create New Genre"
            visible={isModalVisible}
            onOk={()=>handleOk()}
            onCancel={()=>handleCancel()}
        >
            <Input placeholder="Title Group Discount"></Input>
            <br/>
            <br/>
            <RangePicker showTime   onChange = {(value, dateString) => {setDateDiscount(dateString)}}/>
            <br/>
            <br/>
            <div style = {{color:'white'}}>
            &nbsp; Percent Discount&emsp;
                <InputNumber
                    defaultValue={0}
                    min={0}
                    max={100}
                    formatter={value => `${value}%`}
                    onChange = {(value)=>setPercent(value)}
                />
            </div>
            <br/>
            <div style = {{color:'white'}}>&nbsp;&nbsp;List Game</div>
            <Select
                mode="multiple"
                size= "large"
                placeholder="Please select"
                defaultValue={[]}
                onChange={(value,key)=>{console.log(key)}}
                style={{ width: '100%' }}
            >
              {gameData}
            </Select>

        </Modal>
      <div className="console-content">
        <div className="console-content-toolbar">
          <div className="search-container">
            <Input
              placeholder="input search text"
              onChange = {event=> setSearchDiscount(event.target.value)}
            />
          </div>
          <div></div>
          <Button type="primary" danger
            onClick={()=>{showModal()}}
          >
            {" "}
            Create Discount{" "}
          </Button>
        </div>
        <div className="console-list-name">
          <Table columns={columns} dataSource={listDiscount.filter(item=>item.title.toLowerCase().indexOf(searchDiscount.toLowerCase())!==-1)} />
        </div>
      </div>
    </div>
  );
}

export default DiscountEvent;
