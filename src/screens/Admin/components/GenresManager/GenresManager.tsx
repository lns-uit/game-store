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
    <div className="genres-manager-container">
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
      <div className="genre-action-btn">
        <div className="search-container">
          <Input
            onChange={(event) => setGenreSearch(event.target.value)}
            placeholder="input search text"
          />
          <Button
            type="primary"
            danger
            onClick={() => {
              showModal();
              setAction("create");
            }}
          >
            Create New Genre
          </Button>
        </div>
      </div>

      <br />
      <Table
        columns={columns}
        dataSource={listGenre.filter(
          (item) =>
            item.nameGenre?.toLowerCase().indexOf(genreSearch?.toLowerCase()) !==
            -1
        )}
      />
    </div>
  );
}

export default GenresManager;
