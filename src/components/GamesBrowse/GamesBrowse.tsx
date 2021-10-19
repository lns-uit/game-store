import React, { useState } from "react";
import { useStore } from "react-redux";
import { gamesInfoMockData } from '../../api/mockData';
import GameItem from '../../components/GameItem/GameItem';
import { ActionType } from '../../interfaces/rootInterface';    
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
            <div className="d-gird gird-col-5">
                {
                    Games[0].map(game=>{
                        return (
                            <div className="pd-left-right-10 pd-bottom-30">
                                <GameItem game={game} action={ActionType.REMOVE} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default GamesBrowse;