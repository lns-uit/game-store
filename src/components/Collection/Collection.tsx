import React,{useEffect,useState} from 'react';
import gameApi from "../../api/gamesApi";
import {Link} from "react-router-dom"
import GameItem from "../GameItemCopy/GameItem"
import {Row,Col} from "antd";
import { ActionType } from '../../interfaces/rootInterface';   
import {GameDetailss} from "../../interfaces/rootInterface" 

interface GameSearch{
    games: GameDetailss[]
}

function Collection({
    games
}:GameSearch){
    
    // console.log(gameSearch)
    // useEffect(() =>{
    //     // const accessToken = localStorage.getItem("accessToken")
    //     // axios.get("https://localhost:5001/api/game")
    //     //     .then(res=>{
    //     //         console.log(res.data)
    //     //         setGame(res.data.slice((page-1)*12,(page-1)*12 + 12));
    //     //     })
    //     //     .catch(err => {console.log(err)})
    //     async function callApiGames(){
    //         const gamesBrowse = await gameApi.getGamesApi();

    //         if (gamesBrowse){
    //             setGame(gamesBrowse);
    //         }else{
    //             console.log("err");
    //         }
    //     }
    //     callApiGames();
    // }, [])
    return(
        <div className="mr-top-10">
                <Row>
                    {
                        games.map((game,index)=>{
                            return (
                                <Col
                                    key={`game-info-${index}`}
                                    xxl={6}
                                    xl={8}
                                    lg={24}
                                    md={12}
                                    sm={12}
                                    xs={24}
                                >
                                    <Link to={'/game/' + game.idGame + '/' + game.lastestVersion}>
                                        <div className="pd-left-right-10 pd-bottom-30 m-bottom-12">
                                            <GameItem game={game} action={ActionType.REMOVE} />
                                        </div>
                                    </Link>
                                </Col>
                            )
                        })
                    }
                </Row>
        </div>
    )
}

export default Collection;