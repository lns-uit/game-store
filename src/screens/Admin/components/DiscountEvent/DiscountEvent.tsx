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
  const [form] = Form.useForm();
  let allGame: any[] = [];

  const getDataGame = () => {
    return axios.get("https://localhost:5001/api/game/get-game-for-discount").then((response) => {
      response.data.forEach((data) => {
        if (data.lastestVersion !== -1) {
          allGame.push(
            <Option value={data.idGame} key={data.idGame} >
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
        console.log(response.data)
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
      render: (text) => <Moment trim>{text}</Moment>,
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
      render: (text) => <Moment format="DD-MM-yyyy | HH:mm:ss" trim>{text}</Moment>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button 
          onClick={()=> {
            console.log(form)
            form.setFieldsValue(
              {
                title:record.title,
                percent:record.percentDiscount,
                time: [new Moment(record.startDate),new Moment(record.endDate)]
              })
            showModal()
          }} 
            type="default"> Update 
          </Button>
          <Button onClick={()=>{deleteDiscount(record.idDiscount)}}> Delete </Button>
          <Button> Detail </Button>
        </Space>
      ),
    },
  ];
  const getGameByDiscount = (idDiscount) => {
    axios.get(Endpoint.mainApi + "api/discount/get-game-by-discount/{idDiscount}",
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"), // token here
        },
      }
    )
  }
  const postDiscount = (
    value : any
  ) => {
    axios
      .post(
        Endpoint.mainApi + "api/discount/create",
        {
          discount: {
            percentDiscount: value.percent,
            title: value.title,
            startDate: new Date(value.time[0]),
            endDate: new Date(value.time[1]),
          },
          listGameDiscount: value.games
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"), // token here
          },
        }
      )
      .then((response) => {
        refreshData();
        form.resetFields();
        handleCancel();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateDiscount = (
    idDiscount: string,
    value : any
  ) => {
    axios
      .put(
        Endpoint.mainApi + "api/discount/update/" + idDiscount,
        {
          discount: {
            percentDiscount: value.percent,
            title: value.title,
            startDate: new Date(value.time[0].toString()),
            endDate: new Date(value.time[1].toString()),
          },
          listGameDiscount: value.games
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        refreshData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteDiscount = (idDiscount: string) => {
    axios.delete(
      Endpoint.mainApi + "api/discount/delete/" + idDiscount,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
      }
    ).then ( res => {
      refreshData();
    }
    ).catch (err => {
      refreshData();
    })
  }
  const refreshData =() => {
    getDiscountData();
    getDataGame();
  }
  useEffect(() => {
    refreshData();
  }, []);
  return (
    <div className="console-container">

      <Modal
        footer={[
        ]}
        title="Create New Discount"
        visible={isModalVisible}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(value) => { postDiscount(value) }}
          onFinishFailed={() => { }}
          autoComplete="off"
        >
          <Form.Item
            name="title"
            label="Title Group Discount"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Title Group Discount"
            ></Input>
          </Form.Item>
          <Form.Item
            name="time"
            label="Time Apply"
            rules={[{ required: true }]}
          >
            <RangePicker
              showTime
            />
          </Form.Item>
          <Form.Item
            name="percent"
            label="* Percent Discount"
          >
            <InputNumber
              defaultValue={0}
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
            />
          </Form.Item>
          <Form.Item
            name = "games"
            label="List Game Apply"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              size="large"
              placeholder="Please select"
              style={{ width: "100%" }}
   
            >
              {gameData}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>

        </Form>
      </Modal>

      <div className="console-content">
        <div className="console-detail-header">
          <h1>
            DISCOUNT EVENT
          </h1>
          <div className="console-toolbar">

            <div className="search-container">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#c0c0c0"><path d="M0 0h24v24H0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
              <div style={{ width: '5px' }}></div>
              <Input
                placeholder="input search text"
                onChange={(event) => setSearchDiscount(event.target.value)}
              />
            </div>
            <div style={{ width: '20px' }}></div>
            <div className="btn" onClick={() => { form.resetFields(); showModal() }}>
              {" "}
              Create New Discount{" "}
            </div>
          </div>
        </div>

        <div className="console-list">
          <Table
            pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
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
