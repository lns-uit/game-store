import React, { useState, useEffect } from 'react';
import "../../screens/User/styles.css";
import { Form, Input} from 'antd';
import Collection from "../../components/Collection/Collection";
import gameApi from "../../api/gamesApi";

function CollectionLayout(){
    const [search,setSerach] = useState("");
    const [games, setGame] = useState<any[]>([]);
    const [gameSearch, setGameSeach] = useState<any[]>([]);
    useEffect(() =>{
        // const accessToken = localStorage.getItem("accessToken")
        // axios.get("https://localhost:5001/api/game")
        //     .then(res=>{
        //         console.log(res.data)
        //         setGame(res.data.slice((page-1)*12,(page-1)*12 + 12));
        //     })
        //     .catch(err => {console.log(err)})
        async function callApiGames(){
            const gamesBrowse = await gameApi.getGamesApi();
            
            if (gamesBrowse){
                setGame(gamesBrowse);
                setGameSeach(gamesBrowse);
            }else{
                console.log("err");
            }
        }
        callApiGames();
    }, [])
    const onSearch = (values: any) => {
        const search = values.target.value;

        if (search === ""){
            setGameSeach(games);
        }else{
            setGameSeach(games.filter(game=>{
                return game.nameGame.toLowerCase().indexOf(search.toLowerCase()) !== -1;
            }))
        }
    };
    return(
        <div className="m-top-24">
            <div className="collection-profile">
                <div className="flex-basic relative border-radius-8 d-flex flex-shringk-1 min-width-0 column flex-grow-1 max-width-full">
                    <div>
                        <div className="d-flex space-between">
                            <div className="fs-24 white">Collection</div>
                            <Form
                                name="search"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 100 }}
                                initialValues={{ remember: true }}
                                onChange={onSearch}
                                autoComplete="off"
                                >
                                <Form.Item
                                    name="search"
                                >
                                    <Input placeholder="search" value={search} className="border-radius-8"/>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <Collection games={gameSearch}/>
                </div>
            </div>
        </div>
    )
}

export default CollectionLayout;