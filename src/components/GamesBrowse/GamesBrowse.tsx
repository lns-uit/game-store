import React, { useState, useEffect } from "react";
import GameItem from '../../components/GameItemCopy/GameItem';
import { ActionType } from '../../interfaces/rootInterface';    
import {Link} from "react-router-dom";
import { Row, Col } from 'antd';
import "./styles.css"
import axios from "axios";

interface Pages{
    page: number;
}

function GamesBrowse({
    page
}:Pages){
    const [Games, setGame] = useState<any[]>([]);

    useEffect(() => {
        // const accessToken = localStorage.getItem("accessToken")
        axios.get("https://localhost:5001/api/game")
            .then(res=>{
                console.log(res.data)
                setGame(res.data.slice((page-1)*12,(page-1)*12 + 12))
            })
            .catch(err => {console.log(err)})
    }, [])
    return(
        <div className="mr-top-10">
                <Row>
                    {
                        Games.map((game,index)=>{
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
                                    <Link to={'/game/' + game.idGame + '/' + game.nameGame}>
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

export default GamesBrowse;