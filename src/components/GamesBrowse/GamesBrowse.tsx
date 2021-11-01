import React, { useState } from "react";
import { useStore } from "react-redux";
import { gamesInfoMockData } from '../../api/mockData';
import GameItem from '../../components/GameItem/GameItem';
import { ActionType } from '../../interfaces/rootInterface';    
import {Link} from "react-router-dom";
import { Row, Col } from 'antd';
import "./styles.css"

interface Pages{
    page: number;
}

function GamesBrowse({
    page
}:Pages){
    const Games = useState(gamesInfoMockData.slice((page-1)*12,(page-1)*12 + 12));
    return(
        <div className="mr-top-10">
                <Row>
                    {
                        Games[0].map((game,index)=>{
                            return (
                                <Col
                                    key={`game-info-${index}`}
                                    xxl={4}
                                    xl={6}
                                    lg={6}
                                    md={8}
                                    sm={12}
                                    xs={24}
                                >
                                    <Link to={'/game/' + game.name}>
                                        <div className="pd-left-right-10 pd-bottom-30">
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