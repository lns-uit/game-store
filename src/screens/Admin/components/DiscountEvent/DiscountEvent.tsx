import React, { useEffect, useState } from "react";
import { Endpoint } from "../../../../api/endpoint";
import {
  Button,
  Input,
  Modal,
  Space,
  Table,
  DatePicker,
  InputNumber,
  Select,
  Form,
} from "antd";
import { GameType, DiscountType } from "../../../../interfaces/rootInterface";
import axios from "axios";
import "./style.css";
import Moment from "react-moment";
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
function DiscountEvent() {
  const [dateDiscount, setDateDiscount] = useState<string[]>([]);
  const [percent, setPercent] = useState(0);
  const [listDiscount, setListDiscount] = useState<DiscountType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gameData, setGameData] = useState<any[]>([]);
  const [searchDiscount, setSearchDiscount] = useState("");
  const [titleDiscount, setTitleDiscount] = useState("");
  const [listGameDiscount, setListGameDiscount] = useState<string[]>([]);

  let allGame: any[] = [];

  const getDataGame = () => {
    return axios.get("https://localhost:5001/api/game").then((response) => {
      response.data.forEach((data) => {
        if (data.lastestVersion !== -1) {
          allGame.push(
            <Option key={data.idGame} value={data.nameGame}>
              {data.nameGame}
            </Option>
          );
        }
      });
      setGameData(allGame);
    });
  };
  const showModal = () => {
    setPercent(0);
    setTitleDiscount('');
    setDateDiscount([]);
    setListGameDiscount([])
    setIsModalVisible(true);
  };
  const handleOk = () => { 
    // postDiscount(
    //   percent,
    //   titleDiscount,
    //   dateDiscount[0],
    //   dateDiscount[1],
    //   listGameDiscount
    // );
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getDiscountData = () => {
    return axios
      .get(Endpoint.mainApi + "api/discount", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setListDiscount(response.data);
      });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text) => <h3>{text}</h3>,
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
      render: (text) => <Moment format="DD-MM-yyyy | HH:mm:ss">{text}</Moment>,
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
      render: (text) => <Moment format="DD-MM-yyyy | HH:mm:ss">{text}</Moment>,
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
    endDate: any,
    game: any
  ) => {
    axios
      .post(
        Endpoint.mainApi + "api/discount/create",
        {
          discount : {
            percentDiscount: percentDiscount,
            title: title,
            startDate: startDate,
            endDate: endDate,
          },
          listGameDiscount: game
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // token here
          },
        }
      )
      .then((response) => {
        getDiscountData();
        handleCancel();
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
    endDate: any,
    game: any
  ) => {
    axios
      .put(
        Endpoint.mainApi + "api/discount/update/" + idDiscount,
        {
          discount : {
            percentDiscount: percentDiscount,
            title: title,
            startDate: startDate,
            endDate: endDate,
          },
          listGameDiscount: game
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), 
          },
        }
      )
      .then((response) => {
        getDiscountData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getDiscountData();
    getDataGame();
  }, []);
  return (
    <div className="console-container">
      <Modal
        title="Create New Genre"
        visible={isModalVisible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
          <Input
            placeholder="Title Group Discount"
            value={titleDiscount}
            onChange={(event) => setTitleDiscount(event.target.value)}
          ></Input>
          <br />
          <br />
          <RangePicker
            showTime
            onChange={(value, dateString) => {
              setDateDiscount(dateString);
            }}
          />
          <br />
          <br />
          <div style={{ color: "white" }}>
            &nbsp; Percent Discount&emsp;
            <InputNumber
              defaultValue={0}
              min={0}
              max={100}
              value = {percent}
              formatter={(value) => `${value}%`}
              onChange={(value) => setPercent(value)}
            />
          </div>
          <br />
          <div style={{ color: "white" }}>&nbsp;&nbsp;List Game</div>
          <Select
              mode="multiple"
              size="large"
              placeholder="Please select"
              onChange={(value, key) => {
                setListGameDiscount(
                  key.map((x) => {
                    return x.key;
                  })
                );
              }}
              style={{ width: "100%" }}
            >
              {gameData}
          </Select>
      </Modal>
      <div className="console-content">
        <div className="console-content-toolbar">
          <div className="search-container">
            <Input
              placeholder="input search text"
              onChange={(event) => setSearchDiscount(event.target.value)}
            />
          </div>
          <div></div>
          <Button
            type="primary"
            danger
            onClick={() => {
              showModal();
            }}
          >
            {" "}
            Create Discount{" "}
          </Button>
        </div>
        <div className="console-list-name">
          <Table
            columns={columns}
            dataSource={listDiscount.filter(
              (item) => item.title?.toLowerCase().indexOf(searchDiscount?.toLowerCase()) !== -1)}
          />
        </div>
      </div>
    </div>
  );
}

export default DiscountEvent;
