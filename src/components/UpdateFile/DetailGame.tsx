import React, {useState, useRef, useEffect} from 'react';
import {
    Form,
    Select,
    Button,
    Upload,
    Row,
    Col,
    Input,
    message
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {storage} from "../../firebase"
import { useDispatch } from 'react-redux';
import {setUrlGameAvatar} from '../../redux/actions/gameAvatarAction'
import axios from 'axios';
import { GenreType } from '../../interfaces/rootInterface';
import adminApi from '../../api/adminApi';
import reactImageSize from 'react-image-size';
import {GameDetailss} from "../../interfaces/rootInterface";
import { Endpoint } from '../../api/endpoint';

interface GameDetail{
    game: GameDetailss;
    isUpdate: boolean;
    setInvalidVer: any;
    setGenres: any;
}

const { Option } = Select;

function DetailGame({
    game,isUpdate, setInvalidVer, setGenres
}: GameDetail){
    const [isValidVersion, setIsValidVersion] = useState(true);
    const [isValidPrivacyPolicy, SetIsValidPrivacyPolicy] = useState(true);
    const [isValidVideoUrl, SetIsValidVideoUrl] = useState(true);
    const [iconGame, setIconGame] = useState<any>(game.imageGameDetail[0].url);
    const [loadingIconGame, setLoadingIconGame] = useState<any>(true);
    const dispatch = useDispatch();
    const [gameData, setGameData] = useState<any[]>([]);
    const [genress, setGenress] = useState<any[]>([]);
    let allGame: any[] = [];
    console.log(game)

    const normFileImages = (e) => {
        if(e.file.status === "error"){
            getLinkFileImage(e.file.originFileObj);
        }
        setLoadingIconGame(false);
        if(e.file.status === "removed"){
            setLoadingIconGame(true);
        }
    }
    const getDataGame = async () => {
        // return axios.get("https://localhost:5001/api/genre").then((response) => {
        //   response.data.forEach((data) =>{
        //       if (data.lastestVersion!==-1){
        //         allGame.push(
        //             <Option key={data.idGenre} value={data.nameGenre}>
        //                 {data.nameGenre}
        //             </Option>
        //         )
        //       }
        //   })
        //   setGameData(allGame);
        // });
        const res = await adminApi.getGenre();
        
        if (res){
            res.forEach((data)=>{
                allGame.push(
                    <Option key={data.idGenre} value={data.idGenre}>
                        {data.nameGenre}
                    </Option>
                )  
            })
            setGameData(allGame);
        }

    };
    function getLinkFileImage(file){
        const uploadTask = storage.ref(`gameAvatar/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            snapshot =>{},
            error => {
                console.log(error);
            },
            ()=>{
                storage
                    .ref("gameAvatar")
                    .child(file.name)
                    .getDownloadURL()
                    .then(url=>{
                        setIconGame(url);
                        setLoadingIconGame(true);
                        dispatch(setUrlGameAvatar('getLink', file.name ,url));
                    })
            }
        )
    }
    // async function checkWidthHeight(imageUrl,name) {
    //     try {
    //         const { width, height } = await reactImageSize(imageUrl);
    //         if (width < 1080 && height < 1080){
    //             setLoadingIconGame(true); 
    //             alert("Icon Game default 1080x1080")
    //         }else{
    //             setIconGame(imageUrl);
    //             setLoadingIconGame(true);
    //             dispatch(setUrlGameAvatar('getLink', name ,imageUrl));
    //         }
    //     } catch(err){
    //         console.log(err);
    //         alert("This is not Image");
    //         setLoadingIconGame(true);
    //     }
    // }

    const checkVersionExist = (value) => {
        axios.get(Endpoint.mainApi + "api/game/check-version-exist/" +  game.idGame + "/" + value,{
            headers: {
                Authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        }).then((res) =>{
            if (res.data.message === 'no') {
                setIsValidVersion(true);
                setInvalidVer(false);
            }
                else {
                    setIsValidVersion(false);
                    setInvalidVer(true);
                }
        }).catch((err) =>{
            setIsValidVersion(false);
            setInvalidVer(true);
        })
    }

    useEffect(() => {
        getDataGame();
      }, []);
    return(
        <div className="detail-game">
            <Row gutter={[48, 8]}>
                <Col
                    xxl={14}
                    xl={14}
                    lg={16}
                    md={16}
                    sm={24}
                    xs={24}
                >
                    <Form.Item
                        name="nameGame"
                        label = "Name of Game"
                        className="m-bottom-24"
                        rules={[{ required: true, message: "Please Input Name Game" }]}
                    >
                        <Input placeholder="Name Game"/>
                    </Form.Item>

                    <Form.Item
                        name="selectMultiple"
                        label = "Genres"
                        rules={[{ required: true, message: "Please Choice Genres" }]}
                    >
                        <Select mode="multiple" placeholder="Select genres" >
                            {gameData}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="platform"
                        className="white"
                        label = "Platform"
                    >
                        <Select disabled = {true} placeholder="Select platform" >
                            <Option value="window">Window</Option>
                            <Option value="android">Android</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="developer"
                        label = "Developer"
                        rules={[{ required: true, message: "Please Input Developer" }]}
                    >
                        <Input placeholder="Developer" />
                    </Form.Item>

                    <Form.Item
                        name="publisher"
                        label = "Publisher"
                        rules={[{ required: true, message: "Please Input Publisher" }]}
                    >
                        <Input placeholder="Publisher" />
                    </Form.Item>

                    <Form.Item
                        style = {{display: isUpdate ? 'none' : 'block'}}
                        name="privacyPolicy"
                        label = "Privacy Policy"
                        hasFeedback
                        help="Not Valid Privacy Policy (http://url...)"
                        validateStatus = {isValidPrivacyPolicy ? "success" : "error"}
                        rules={[{ required: !isUpdate, message: "Please Input Link Privacy Policy" }]}
                    >
                        <Input disabled = {isUpdate} placeholder="https://url.com" 
                            onChange={value=> {
                                let values = value.target.value;
                                SetIsValidPrivacyPolicy(values.indexOf('http') !== -1 || values === "")
                        }} />
                    </Form.Item>

                    <Form.Item
                        name="urlVideo"
                        label = "Url Video"
                        hasFeedback
                        help="Not Valid Url Video (http://url...)"
                        validateStatus = {isValidVideoUrl ? "success" : "error"}
                    >
                        <Input placeholder="http://url.com"  
                            onChange={value=> {
                                let values = value.target.value;
                                SetIsValidVideoUrl(values.indexOf('http') !== -1 || values === "")
                            }}
                        />
                    </Form.Item>
                </Col>
                <Col
                    xxl={10}
                    xl={100}
                    lg={8}
                    md={8}
                    sm={24}
                    xs={24}
                >
                    <Form.Item
                        style = {{display: isUpdate ? 'none' : 'block'}}
                        name="fileLauncher"
                        label = "Name file launcher game"
                        rules={[{ required: !isUpdate, message: 'Please input name file launcher game!' }]}
                    >
                        <Input disabled = {isUpdate} placeholder="Name Game.exe"/>
                    </Form.Item>
                    <Form.Item
                        name="version"
                        style = {{display: isUpdate ? 'none' : 'block'}}
                        label = "Version"
                        hasFeedback
                        help="Version is Exist in This Game or Not Valid"
                        validateStatus = {isValidVersion ? "success" : "error"}
                        rules={[{ required: !isUpdate, message: "Please Input Version" }]}
                    >
                        <Input disabled = {isUpdate} placeholder="Version"
                                onChange = {(value)=>{
                                    checkVersionExist(value.target.value)
                                }}
                        />
                    </Form.Item>
                    <div className="background-profile border-radius-8" style = {{marginTop: isUpdate ? '30px' : '20px'}}>
                        <div 
                            className="flex-basic relative border-radius-8 d-flex flex-shringk-1 min-width-0 column flex-grow-1 max-width-full">
                            <div className="width-full border-radius-8 height-300 icon-game">
                                {
                                    loadingIconGame === true ?
                                        iconGame !== null
                                        ?
                                        <img src={iconGame} alt="icon Game"/>
                                        : null
                                    :<div className="loadding-icon-game">
                                        Uploading...
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <Form.Item
                        name="iconGame"
                        valuePropName="fileList"
                        label = "Main Image Game (Recommend 1080px x 1080px )"
                        getValueFromEvent={normFileImages}
                    >
                        <Upload name="iconGame">
                            <Button 
                               type="primary" 
                               className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
                               style={{ height: '45px' }}
                                icon={<UploadOutlined />}
                            >Upload icon game</Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}

export default DetailGame;