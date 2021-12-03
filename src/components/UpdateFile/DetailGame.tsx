import React, {useState, useRef, useEffect} from 'react';
import {
    Form,
    Select,
    Button,
    Upload,
    Row,
    Col,
    Input
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

interface GameDetail{
    game: GameDetailss;
}

const { Option } = Select;

function DetailGame({
    game
}: GameDetail){
    const [iconGame, setIconGame] = useState<any>(game.imageGameDetail[0].url);
    const [loadingIconGame, setLoadingIconGame] = useState<any>(true);
    const dispatch = useDispatch();
    const [gameData, setGameData] = useState<any[]>([]);
    let allGame: any[] = [];

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
                    <Option key={data.idGenre} value={data.nameGenre}>
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
                        checkWidthHeight(url,file.name);
                    })
            }
        )
    }
    async function checkWidthHeight(imageUrl,name) {
        try {
            const { width, height } = await reactImageSize(imageUrl);
            if (width < 1080 && height < 1080){
                setLoadingIconGame(true); 
                alert("Icon Game default 1080x1080")
            }else{
                setIconGame(imageUrl);
                setLoadingIconGame(true);
                dispatch(setUrlGameAvatar('getLink', name ,imageUrl));
            }
        } catch(err){
            console.log(err);
            alert("This is not Image");
            setLoadingIconGame(true);
        }
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
                    >
                        <Input placeholder="Name Game" defaultValue={game.nameGame} />
                    </Form.Item>

                    <Form.Item
                        name="selectMultiple"
                        label = "Genres"
                    >
                        <Select mode="multiple" placeholder="Please select genres" 
                            defaultValue={
                                game.genres.map(genre=>{
                                    return genre.idGenreNavigation.nameGenre
                                })
                            }
                        >
                            {gameData}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="platform"
                        className="white"
                        label = "Platform"
                    >
                        <Select placeholder="Please select platform" defaultValue={game.plaform}>
                            <Option value="window">Window</Option>
                            <Option value="macOS">MacOS</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="developer"
                        label = "Developer"
                    >
                        <Input placeholder="Developer" defaultValue={game.developer} />
                    </Form.Item>

                    <Form.Item
                        name="publisher"
                        label = "Publisher"
                    >
                        <Input placeholder="Publisher" defaultValue={game.publisher}/>
                    </Form.Item>

                    <Form.Item
                        name="privacyPolicy"
                        label = "Privacy Policy"
                    >
                        <Input placeholder="https://url.com" defaultValue={game.privacyPolicy} />
                    </Form.Item>

                    <Form.Item
                        name="urlVideo"
                        label = "Url Video"
                    >
                        <Input placeholder="URL Video" defaultValue={game.urlVideo}/>
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
                        name="version"
                        label = "Version"
                    >
                        <Input placeholder="Version" defaultValue={game.lastestVersion}/>
                    </Form.Item>
                    <div className="background-profile border-radius-8">
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
                        label = "Main Image Game ( 1080px x 1080px )"
                        getValueFromEvent={normFileImages}
                    >
                        <Upload name="iconGame">
                            <Button icon={<UploadOutlined />}>Upload icon game</Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}

export default DetailGame;