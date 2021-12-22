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
    Col,
    message
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
import Helmet from 'react-helmet'
import reactImageSize from 'react-image-size';
import '../../screens/AdminUpdateGame/styles.css';
import gamesApi from '../../api/gamesApi'
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setUrlGameAvatar} from '../../redux/actions/gameAvatarAction'
import { Endpoint } from '../../api/endpoint';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Option } = Select;

function AdminUpdateGameLayout() {
    const slug = useParams();
    const history = useHistory();
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
    const [isUpdate, setIsUpdate] = useState(true);
    const [isInvalidVersion, setIsInvalidVersion] = useState(false);
    const [genres, setGenres] = useState<any[]>([]);
    const [isUpdatingGame, setIsUpdatingGame] = useState(false);

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
            setUrlDownload(null)
            setIsUpdate(true);
        } else if (e.file.status === "error" && e.file.type === "application/x-zip-compressed") {
            getLinkFileZip(e.file.originFileObj);
            setIsUpdate(false);
        } else if (e.file.status === "removed") {
            setUrlDownload(null)
            setIsUpdate(true);
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
        if (isInvalidVersion) {
            error.push("Invalid Version Game");
            count += 1;
        }
        if (values.urlVideo !== "" && values.urlVideo!==null)
            if (values.urlVideo.indexOf('http')===-1) {
                error.push('Please input valid url video')
                count += 1;
            }
        if (!isUpdate)
            if (values.privacyPolicy.indexOf('http')===-1) {
                error.push('Please input valid url Privacy Policy')
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
            message.error(stringErr);
            console.log('here')
        } else {
            values.fileGame = urlDownload;
            if (urlDownload === null && !isUpdate) {
                message.warn("Zip File is Uploading");
                return;
            }
            values.images = fileList.map(image=>{
                return image.url
            });
            values.detailDecription = markup;
            values.images.splice(0,0,url.url)
            if (isUpdate) postGameUpdate(values);
                else postGameCreateUpdate(values);
        }
    }
    const postGameCreateUpdate = (values: any) => {
        setIsUpdatingGame(true);
        axios
            .put(Endpoint.mainApi + "api/game/create-update/" + game.idGame, {
                game: {
                    namegame: values.nameGame,
                    developer: values.developer,
                    publisher: values.publisher,
                    urlVideo: values.urlVideo,
                    lastestVersion: values.version,
                  },
                  
                gameVersion: {
                    versiongame: values.version,
                    urldowload: values.fileGame,
                    ShortDescription: values.shortDecription,
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
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            })
            .then((response) => {
                form.resetFields();
                history.push("/admin/console/history/" + game.idGame);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const postGameUpdate = (values: any) => {
        setIsUpdatingGame(true);
        axios
            .put(Endpoint.mainApi + "api/game/update/" + game.idGame, {
                game: {
                    namegame: values.nameGame,
                    developer: values.developer,
                    publisher: values.publisher,
                    urlVideo: values.urlVideo,
                },
                listImageDetail: values.images,
                listGenreDetail: values.selectMultiple
            }, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem('accessToken')
                }
            })
            .then((response) => {
                form.resetFields();
                history.push("/admin/console/history/" + game.idGame);
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
                        let tmpImageUrl: any = {};
                        setLoaddingImagesGame(false);
                        tmpImageUrl = {
                            uid: fileList.length-1,
                            name: "image" + (fileList.length-1).toString(),
                            status: "error",
                            url: url
                        }
                        fileList[fileList.length - 1] = tmpImageUrl;
                        setFileList(fileList);
                    })
            }
        )
    }

    // async function checkWidthHeight(imageUrl) {
    //     try {
    //         const { width, height } = await reactImageSize(imageUrl);
    //         console.log(width, height);
    //         if (width < 1080 && height < 1080) {
    //             alert("Image Game Detail default 1080x1080")
    //             setFileList(fileList.slice(0, fileList.length - 1));
    //             setLoaddingImagesGame(false);
    //         } else {
    //             setLoaddingImagesGame(false);
    //             tmpImageUrl = {
    //                 uid: fileList.length-1,
    //                 name: "image" + (fileList.length-1).toString(),
    //                 status: "error",
    //                 url: imageUrl
    //             }
    //             fileList[fileList.length - 1] = tmpImageUrl;
    //             setFileList(fileList);
    //         }
    //     } catch (err) {
    //         setLoaddingImagesGame(false);
    //         alert("This is not Image");
    //         setFileList(fileList.slice(0, fileList.length - 1));
    //         console.log(err);
    //     }
    // }

    useEffect(()=>{
        normFileImages
    },[fileList]);

    useEffect(() => {
        const fetchGameData = async () => {
            const response = await gamesApi.getGameDetail(slug);

            if (response) {
                console.log(response);
                form.setFieldsValue({
                    nameGame: response.nameGame,
                    developer: response.developer,
                    publisher: response.publisher,
                    selectMultiple: response.genres.map((genre,index)=>{return genre.idGenreNavigation.idGenre}),
                    urlVideo: response.urlVideo,
                    shortDecription: response.newVersion.shortDescription,
                    detailDecription: response.newVersion.descriptions,
                    OS: response.newVersion.os,
                    storage: response.newVersion.storage,
                    graphics: response.newVersion.graphics,
                    privacyPolicy: response.newVersion.privacyPolicy,
                    processor: response.newVersion.processor,
                    memory: response.newVersion.memory,
                    fileLauncher: response.newVersion.filePlay,
                    platform: response.plaform,
                    version: response.lastestVersion + '-new'
                })
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
                         <Helmet>
                                <title> Stun Console | Games </title>
                        </Helmet>
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
                                <Upload.Dragger accept='.zip' name="fileGame" fileList={fileZip} className={fileZip.length >= 1 ? "d-none" : "d-block"}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text uppercase">Upload File Zip</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                        <DetailGame game={game} isUpdate={isUpdate} setInvalidVer = {setIsInvalidVersion} setGenres = {setGenres} />
                        <div className="decription-photo">
                            <div className="upload">
                                <Form.Item
                                    label="DESCRIPTION PHOTO (1920x1080 Recommend size)"
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
                        <ShortDescription isUpdate = {isUpdate} game={game}/>
                        <Form.Item
                            label="* DETAIL DESCRIPTION"
                            style = {{display: isUpdate ? 'none' : 'block'}}
                            rules={[{ required: !isUpdate, message: "Please Input Detail Description" }]}
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
                        <SystemRequirements game={game} isUpdate = {isUpdate}/>
                        <div style = {{display:'flex', alignItems:'flex-end', justifyContent:'space-between'}}> 
                        
                                <Form.Item
                                    name="cost"
                                    label="Game Cost"
                                >
                                    <InputNumber
                                        width = "90vw"
                                        disabled = {true}
                                        defaultValue={game.cost}
                                        min={0}
                                        formatter={(value) =>
                                            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        }
                                    />
                                </Form.Item>
                  
         
                                <Form.Item
    
                                >
                                    <Button 
                                        type="primary" 
                                        className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
                                        style={{ height: '45px' }}
                                        htmlType="submit" 
                                        loading={isUpdatingGame ? true : isUpdate ? false : urlDownload!==null ? false : true}
                                        
                                    >
                                        {isUpdate ? "Update Game" : urlDownload!==null ? "Create Update Game" : "Uploading Game Zip File"}
                                    </Button>
                                </Form.Item>
                
               
                        </div>
                     
                    </Form>
                </div>
            }
        </>
    );
}

export default AdminUpdateGameLayout;