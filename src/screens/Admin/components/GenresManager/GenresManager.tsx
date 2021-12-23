import "./style.css";

import { GenreType } from "../../../../interfaces/rootInterface";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Input, Modal, Space, Table, Tag } from "antd";
import Search from "antd/lib/transfer/search";
import { Endpoint } from "../../../../api/endpoint"
import Helmet from 'react-helmet'

function GenresManager() {
  const [listGenre, setListGenre] = useState<GenreType[]>([]);
  const [genreSearch, setGenreSearch] = useState("");
  const [genreCreate, setGenreCreate] = useState("");
  const [idGenreUpdate, setIdGenreUpdate] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState("Create");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const Submit = (name: string) => {
    if (action === "Create") {
        postGenre(name);
    } else if (action === "Update") {
        updateGenre(name);
    }
  };
  const columns = [
    {
      title: "",
      dataIndex: "nameGenre",
      key: "nameGenre",
      width: "10px",
      render: (text,item,index) => <h4>{index+1}</h4>,
    },
    {
      title: "Genre Name",
      dataIndex: "nameGenre",
      key: "nameGenre",
      render: (text) => <h3>{text}</h3>,
    },
    {
      title: "Action",
      key: "idGenre",
      dataIndex: "idGenre",
      render: (id, obj) => (
        <Space size="middle">
          <Button
            className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
            style={{ height: '40px' }}
            type = "primary"
            onClick={() => {
              console.log(obj)
              setIdGenreUpdate(obj.idGenre)
              form.setFieldsValue({name:obj.nameGenre})
              showModal();
              setAction("Update");
              
            }}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const fetchDataGenre = () => {
    return axios.get(Endpoint.mainApi+"api/genre").then((response) => {
      setListGenre(response.data);
    });
  };
  const postGenre = (genre: any) => {
    axios
      .post(
        Endpoint.mainApi+"api/genre/create",
        {
          nameGenre: genre,
        },
        {
          headers: {
            Authorization: "Bearer "+ localStorage.getItem("accessToken"), // token here
          },
        }
      )
      .then((response) => {
        alert("Add Success");
        setIsModalVisible(false);
        fetchDataGenre();
      })
      .catch((error) => {
        setIsModalVisible(false);
        alert("It took too long to respond, please check the internet again");
      });
  };
  const updateGenre = (name: any) => {
    axios
      .put(
        Endpoint.mainApi + "api/genre/update/" + idGenreUpdate,
        {
          nameGenre: name,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken')
          },
        }
      )
      .then((response) => {
        alert("Update Success");
        setIsModalVisible(false);
        fetchDataGenre();
      })
      .catch((error) => {
        setIsModalVisible(false);
        alert("It took too long to respond, please check the internet again");
      });
  };
  const [form] = Form.useForm();
  useEffect(() => {
    fetchDataGenre();
  }, []);
  return (
    <div className="console-container">
      <Helmet>
            <title> Stun Console | Genres </title>
      </Helmet>
      <Modal
        footer={null}
        title={action + " Genre"}
        visible={isModalVisible}
        onCancel={handleCancel}
        className = "modal-genre"
        style={{ borderRadius: 10 }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(value) => { Submit(value.name) }}
          onFinishFailed={() => { }}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            label="Name Genre"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Type name genre"
            ></Input>
            
          </Form.Item>
          <br/>
          <Form.Item>
              <Button 
                htmlType="submit"
                className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
                style={{ height: '40px' }}
                type = "primary"
              >
                 {action} Genre
              </Button>
            </Form.Item>
        </Form>

      </Modal>
      <div className="console-detail-header">
        <h1>
          GENRES MANAGER
        </h1>
        <div className="console-toolbar">

          <div className="search-container">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#c0c0c0"><path d="M0 0h24v24H0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
            <div style={{ width: '5px' }}></div>
            <Input
              placeholder="input search text"
              onChange={(event) => setGenreSearch(event.target.value)}
            />
          </div>
          <div style={{ width: '40px' }}></div>
          <Button onClick={() => {
            form.resetFields();
            showModal();
            setAction("Create");
          }}
            className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
            style={{ height: '40px' }}
            type = "primary"
          >
            {" "}
            Create New Genre{" "}
          </Button>
        </div>
      </div>
      <div className="console-list">
        <Table
          columns={columns}
          size="middle"
          pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
          dataSource={listGenre.filter(
            (item) =>
              item.nameGenre?.toLowerCase().indexOf(genreSearch?.toLowerCase()) !==
              -1
          )}
        />
      </div>

    </div>
  );
}

export default GenresManager;
