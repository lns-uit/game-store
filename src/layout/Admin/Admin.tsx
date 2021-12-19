import React, { useState, useRef, useEffect } from 'react';
import UploadFile from '../../components/UploadFile/UpLoadFile';
import DetailGame from '../../components/UploadFile/DetailGame';
import DescriptionPhoto from '../../components/UploadFile/DescriptionPhoto';
import ShortDescription from '../../components/UploadFile/ShortDescription';
import SystemRequirements from '../../components/UploadFile/SystemRequirements';
import {
  message,
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Input,
  Modal
} from 'antd';
import { UploadOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import './styles.css';
import { GameVersionType, Imgs } from '../../interfaces/rootInterface';
import { storage } from "../../firebase";
import { RootState } from '../../redux/reducers/index';
import { useSelector } from 'react-redux';
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';
import { useForm } from 'react-hook-form';
import reactImageSize from 'react-image-size';
import { Endpoint } from '../../api/endpoint';
import { useHistory } from 'react-router';
const { Option } = Select;

function Admin() {
  const history = useHistory();
  let _contentState = ContentState.createFromText('');
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);
  const [fileList, setFileList] = useState<any>([]);
  const [urlDownload, setUrlDownload] = useState<any>(null);
  const [fileZip, setFileZip] = useState<any>([]);
  const [loaddingImagesGame, setLoaddingImagesGame] = useState(false);
  const [isUpdatingGame, setIsUpdatingGame] = useState(false);
  const url = useSelector(
    (state: RootState) => state.gameAvatar
  )
  const [form] = Form.useForm();

  console.log(fileList);
  const hashConfig = {
    trigger: '#',
    separator: ' ',
  }

  const markup = draftToHtml(
    contentState,
    hashConfig
  );

  const normFileZip = (e) => {
    setFileZip(e.fileList);
    if (e.file.status === "error" && e.file.type !== "application/x-zip-compressed") {
      message.error("Require file .zip");
    } else if (e.file.status === "error" && e.file.type === "application/x-zip-compressed") {
      getLinkFileZip(e.file.originFileObj);
    } else if (e.file.status === "removed") {
      setUrlDownload(null)
    }
  }


  const normFileImages = (e) => {
    setLoaddingImagesGame(true);
    setFileList(e.fileList);
    if (e.file.status === "error") {
      getLinkFileImage(e.file.originFileObj);
    }
    if (e.file.status === "removed") {
      setLoaddingImagesGame(false);
    }
  }

  const onFinish = (values: any) => {
    let error: string[] = [];
    let count = 0;
    let stringErr = "";

    if (urlDownload === null) {
      error.push("File zip null");
      count += 1;
    }

    if (url.url === null) {
      error.push("Icon game null");
      count += 1;
    }

    if (fileList.length === 0) {
      error.push("Images game null");
      count += 1;
    }

    if (count !== 0) {
      for (var i = 0; i < error.length; i++) {
        stringErr += error[i] + '\n';
      }
      window.alert(stringErr);
    } else {
      values.fileGame = urlDownload;
      if (urlDownload === null) {
        message.warn("Login To Buy This Game");
        return;
      }
      values.images = fileList.map(image => {
        return image.url
      });
      values.detailDecription = markup;
      postGame(values);
    }
  }
  const postGame = (values: any) => {
    values.images.splice(0,0,url.url)
    setIsUpdatingGame(true);
    axios
      .post(Endpoint.mainApi + "api/game/create", {
        game: {
          namegame: values.nameGame,
          developer: values.developer,
          publisher: values.publisher,
          plaform: values.platform,
          urlVideo: values.urlVideo,
          cost: values.cost,
          lastestversion: values.version,
        },
        
        gameVersion: {
          versiongame: values.version,
          urldowload: values.fileGame,
          ShortDescription: values.shortDecription.currentTarget.value,
          Descriptions: values.detailDecription,
          os: values.OS,
          Processor: values.processor,
          Storage: values.storage,
          Graphics: values.graphics,
          PrivacyPolicy: values.privacyPolicy,
          Memory: values.memory,
          filePlay: values.fileLauncher
        },
        listImageDetail: values.images,
        listGenreDetail: values.selectMultiple
      }, 
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('accessToken')
        }
      })
      .then((response) => {
        form.resetFields();
        history.push("/admin/console/game-list");
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function getLinkFileZip(file) {
    const uploadTask = storage.ref(`zip/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("zip")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            setUrlDownload(url);
            // urlZip.push({
            //     name: file.name,
            //     url: url
            // });
          })
      }
    )
  }
  function getLinkFileImage(file) {
    const uploadTask = storage.ref(`images/${file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      snapshot => { },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(file.name)
          .getDownloadURL()
          .then(url => {
            setLoaddingImagesGame(false);
            fileList[fileList.length - 1].url = url;
            fileList[fileList.length - 1].status = "error";
            setFileList(fileList);
          })
      }
    )
  }

  // async function checkWidthHeight(imageUrl) {
  //   try {
  //     const { width, height } = await reactImageSize(imageUrl);
  //     console.log(width, height);
  //     if (width < 1080 && height < 1080) {
  //       alert("Image Game Detail default 1080x1080")
  //       setFileList(fileList.slice(0, fileList.length - 1));
  //       setLoaddingImagesGame(false);
  //     } else {
  //       setLoaddingImagesGame(false);
  //       fileList[fileList.length - 1].url = imageUrl;
  //       fileList[fileList.length - 1].status = "error";
  //       setFileList(fileList);
  //     }
  //   } catch (err) {
  //     setLoaddingImagesGame(false);
  //     alert("This is not Image");
  //     setFileList(fileList.slice(0, fileList.length - 1));
  //     console.log(err);
  //   }
  // }
  useEffect(()=>{
      form.setFieldsValue({
        cost: 0
      })
  },[])
  return (
    <div className="white console-container">
      <div className="console-detail-header">
        <h1>CREATE NEW GAME</h1>
        <div className="console-toolbar"></div>
      </div>
      <div style={{ height: '150px' }}></div>
      <Form layout="vertical" className="create-game" form={form} name="validate_other" onFinish={onFinish}>
        <Form.Item
          style={{ backgroundColor: "#111" }}
        >
          <Form.Item
            name="fileGame"
            label="File Game.zip"
            valuePropName="fileGame"
            getValueFromEvent={normFileZip}
            noStyle
          >
            <Upload.Dragger accept='.zip' name="fileGame" fileList={fileZip} className={fileZip.length >= 1 ? "d-none" : "d-block"}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text uppercase">Upload File Zip</p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <DetailGame />
        <div className="decription-photo">
          <div className="upload">
            <Form.Item
              label="DESCRIPTION PHOTO (1920x1080 recommend size)"
              name="images"
              valuePropName="images"
              className="d-flex-form"
              getValueFromEvent={normFileImages}
            >
              <Upload fileList={fileList} listType="picture-card" className={loaddingImagesGame === false ? "" : "loading-upload-image"}>
                + Upload Image
              </Upload>
            </Form.Item>
          </div>
        </div>
        <ShortDescription />
        <Form.Item
          label="* DETAIL DESCRIPTION"
          rules={[{ required: true, message: "Please Input Detail Description" }]}

        >
          <div className="detail-description" onClick={focus}>

            <Editor
              // ref={editorRef}
              defaultContentState={contentState}
              onContentStateChange={setContentState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          </div>
        </Form.Item>

        <SystemRequirements />
        <div style = {{display:'flex', alignItems:'flex-end', justifyContent:'space-between'}}> 
            <Form.Item
              name="cost"
              label="Game Cost"
            >
              <InputNumber
                width="90vw"
                defaultValue={0}
                min={0}
                formatter={(value) =>
                  `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>

            <Form.Item
            >
              <Button 
                  type="primary" htmlType="submit"
                  className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
                  style={{ height: '45px' }}
                  loading={isUpdatingGame ? true : urlDownload!==null ? false : true}
              >
                  {urlDownload!==null ? "Create Game" : "Uploading Your Zip File"}
              </Button>
            </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default Admin;