import React, { useState, useRef, useEffect } from 'react';
import UploadFile from '../../components/UpdateFile/UpLoadFile';
import DetailGame from '../../components/UpdateFile/DetailGame';
import DescriptionPhoto from '../../components/UpdateFile/DescriptionPhoto';
import ShortDescription from '../../components/UpdateFile/ShortDescription';
import SystemRequirements from '../../components/UpdateFile/SystemRequirements';
import {
    Form,
    Select,
    InputNumber,
    Button,
    Upload,
    Row,
    Col
} from 'antd';
import { UploadOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';
import { GameVersionType, Imgs } from '../../interfaces/rootInterface';
import { storage } from "../../firebase";
import { RootState } from '../../redux/reducers/index';
import { useSelector } from 'react-redux';
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';
import reactImageSize from 'react-image-size';
import '../../screens/AdminUpdateGame/styles.css';
import gamesApi from '../../api/gamesApi'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setUrlGameAvatar} from '../../redux/actions/gameAvatarAction'

function AdminUpdateGameLayout() {
    const slug = useParams();
    let _contentState = ContentState.createFromText('');
    const raw = convertToRaw(_contentState);
    const [contentState, setContentState] = useState(raw);
    const [urlDownload, setUrlDownload] = useState<any>(null);
    const [fileZip, setFileZip] = useState<any>([]);
    const [loaddingImagesGame, setLoaddingImagesGame] = useState(false);
    const url = useSelector(
        (state: RootState) => state.gameAvatar
    )
    const [form] = Form.useForm();
    const [game, setGame] = useState<any>(null);
    const [fileList, setFileList] = useState<any>([]);
    const dispatch = useDispatch();

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
            alert("This is not file .zip");
        } else if (e.file.status === "error" && e.file.type === "application/x-zip-compressed") {
            getLinkFileZip(e.file.originFileObj);
        } else if (e.file.status === "removed") {
            setUrlDownload(null)
        }
    }


    const normFileImages = (e) => {
        setLoaddingImagesGame(true);
        setFileList(e.fileList);
        console.log(e);
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
            values.images = JSON.stringify(fileList.map(image=>{
                return image.url
            }));
            values.detailDecription = markup;
            console.log(values);
            postGame(values);
        }
    }
    const postGame = (values: any) => {
        const updateGame: any ={
            Game: {
                namegame: values.nameGame || game.nameGame,
                developer: values.developer || game.developer,
                publisher: values.publisher || game.publisher,
                plaform: values.platform || game.plaform,
                privacyPolicy: values.privacyPolicy || game.privacyPolicy,
                urlVideo: values.urlVideo || game.urlVideo,
                cost: values.cost || game.cost,
                lastestversion: values.version || game.lastestVersion,
            },
            Genre: values.selectMultiple || game.genres.map(genre=>{return genre.idGenreNavigation.nameGenre}),
            GameVersion: {
                versiongame: values.version || game.newVersion.versionGame,
                urldownload: values.fileGame,
                shortdescription: values.shortDecription || game.newVersion.shortDescription,
                descriptions: values.detailDecription || game.newVersion.descriptions,
                os: values.OS || game.newVersion.os,
                processor: values.processor || game.newVersion.processor,
                storage: values.storage || game.newVersion.storage,
                graphics: values.graphics || game.newVersion.graphics,
                privacyPolicy: values.privacyPolic || game.newVersion.privacyPolicy,
            },
            iconGame: url.url.toString(),
            listImageDetail: values.images
        }
        console.log(updateGame);
        axios
            .post("https://localhost:5001/api/game/create", {
                updateGame
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            })
            .then((response) => {
                form.resetFields();
                console.log(response.data)
            })
            .catch((error) => {
                form.resetFields();
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
                        checkWidthHeight(url)
                        // urlImages.push({
                        //     // name: file.name,
                        //     Url: url
                        // });
                    })
            }
        )
    }

    async function checkWidthHeight(imageUrl) {
        let tmpImageUrl: any = {};
        try {
            const { width, height } = await reactImageSize(imageUrl);
            console.log(width, height);
            if (width < 1080 && height < 1080) {
                alert("Image Game Detail default 1080x1080")
                setFileList(fileList.slice(0, fileList.length - 1));
                setLoaddingImagesGame(false);
            } else {
                setLoaddingImagesGame(false);
                tmpImageUrl = {
                    uid: fileList.length-1,
                    name: "image" + (fileList.length-1).toString(),
                    status: "error",
                    url: imageUrl
                }
                fileList[fileList.length - 1] = tmpImageUrl;
                setFileList(fileList);
            }
        } catch (err) {
            setLoaddingImagesGame(false);
            alert("This is not Image");
            setFileList(fileList.slice(0, fileList.length - 1));
            console.log(err);
        }
    }

    useEffect(()=>{
        normFileImages
    },[fileList]);

    useEffect(() => {
        const fetchGameData = async () => {
            const response = await gamesApi.getGameDetail(slug);
            if (response) {
                console.log(response);
                setGame(response);
                dispatch(setUrlGameAvatar('getLink', "icon game" ,response.imageGameDetail[0].url));
                setFileList(response.imageGameDetail.slice(1).map((image,index)=>{
                    return {
                        uid: index,
                        name: 'image'+index.toString(),
                        status: 'done',
                        url: image.url
                    }
                }))
            }
        };
        fetchGameData();
    }, [])
    return (
        <>
            {game === null ?
                <div>loadding</div>
                :
                <div className="white console-container">
                    <div className="console-detail-header">
                        <h1>UPDATE GAME</h1>
                        <div className="console-toolbar"></div>
                    </div>
                    <div style={{ height: '150px' }}></div>
                    <Form 
                        layout="vertical" className="create-game" form={form} onFinish={onFinish}
                    >
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
                                <Upload.Dragger name="fileGame" fileList={fileZip} className={fileZip.length >= 1 ? "d-none" : "d-block"}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text uppercase">Upload File Zip</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                        <DetailGame game={game} />
                        <div className="decription-photo">
                            <div className="upload">
                                <Form.Item
                                    label="DESCRIPTION PHOTO (1920x1080 Required size)"
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
                        <ShortDescription game={game}/>
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
                        <SystemRequirements game={game}/>
                        <Row gutter={[48, 8]}>
                            <Col xxl={14} xl={14} lg={16} md={16} sm={24} xs={24}>
                                <Form.Item
                                    name="cost"
                                    label="Game Cost"
                                >
                                    <InputNumber
                                        defaultValue={game.cost}
                                        min={0}
                                        formatter={(value) =>
                                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col xxl={10} xl={100} lg={8} md={8} sm={24} xs={24}>
                                <Form.Item
                                    wrapperCol={{ span: 12, offset: 6 }}
                                    className="m-top-24"
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            }
        </>
    );
}

export default AdminUpdateGameLayout;