import "./style.css";

import { GenreType } from "../../../../interfaces/rootInterface";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Input, Modal, Space, Table, Tag } from "antd";
import Search from "antd/lib/transfer/search";
import {Endpoint} from "../../../../api/endpoint"

function GenresManager() {
  const [listGenre, setListGenre] = useState<GenreType[]>([]);
  const [genreSearch, setGenreSearch] = useState("");
  const [genreCreate, setGenreCreate] = useState("");
  const [idGenreUpdate, setIdGenreUpdate] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState("create");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (a: any) => {
    if (a === "create") {
      if (genreCreate === "") alert("You have not entered anything");
      else {
        postGenre(genreCreate);
      }
    } else if (a === "update") {
      if (genreCreate === "") alert("You have not entered anything");
      else {
        updateGenre(idGenreUpdate);
      }
    }
  };
  const columns = [
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
            type = "primary"
            onClick={() => {
              setGenreCreate(obj.nameGenre);
              setIdGenreUpdate(obj);
              showModal();
              setAction("update");
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
    return axios.get("https://localhost:5001/api/genre").then((response) => {
      setListGenre(response.data);
    });
  };
  const postGenre = (genre: any) => {
    axios
      .post(
        "https://localhost:5001/api/genre/create",
        {
          nameGenre: genre,
        },
        {
          headers: {
            Authorization: "Bearer ", // token here
          },
        }
      )
      .then((response) => {
        alert("Add Success");
        setIsModalVisible(false);
        setGenreCreate("");
        fetchDataGenre();
      })
      .catch((error) => {
        setIsModalVisible(false);
        setGenreCreate("");
        alert("It took too long to respond, please check the internet again");
      });
  };
  const updateGenre = (genre: any) => {
    axios
      .put(
        Endpoint.mainApi + "api/genre/update/" + genre.idGenre,
        {
          nameGenre: genreCreate,
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
        setGenreCreate("");
        fetchDataGenre();
      })
      .catch((error) => {
        setIsModalVisible(false);
        setGenreCreate("");
        alert("It took too long to respond, please check the internet again");
      });
  };
  useEffect(() => {
    fetchDataGenre();
  }, []);
  return (
    <div className="console-container">
      <Modal
        title="Create New Genre"
        visible={isModalVisible}
        onOk={() => handleOk(action)}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Type name genre"
          value={genreCreate}
          onChange={(event) => setGenreCreate(event.target.value)}
        ></Input>
      </Modal>
      <div className="console-detail-header">
        <h1>
            GENRES MANAGER
        </h1>
        <div className="console-toolbar">
          
          <div className="search-container">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#c0c0c0"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
            <div style = {{width:'5px'}}></div>
            <Input
              placeholder="input search text"
              onChange={(event) => setGenreSearch(event.target.value)}
            />
          </div>
          <div style = {{width:'20px'}}></div>
          <div className = "btn" onClick={() => {
              showModal();
              setAction("create");
          }}>
            {" "}
            Create New Genre{" "}
          </div>
        </div>
      </div>
      <div className="console-list">
        <Table
          columns={columns}
          size = "middle"
          pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
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
