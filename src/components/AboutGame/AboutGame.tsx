import React, { useEffect } from 'react';
import "../../layout/LayoutGameDetail2/styles.css";
import {GameDetailss} from "../../interfaces/rootInterface"
import draftToHtml from 'draftjs-to-html';

interface Detail{
    game: GameDetailss
}

function AboutGame({
    game
}:Detail){
    useEffect(() =>{
    },[])
    return(
        <div className="pd-bottom-20 relative">
            <div className="max-height-850 overflow-hidden">
                <div className="game_area_description">
                    <h2 className="white uppercase lh-26 pd-top-2 m-bottom-10 fs-14 weight-normal brg-img">About this game</h2>
                    <br/>
                    <span style = {{fontSize: '27px'}}>
                       {game.newVersion.shortDescription}
                    </span>
                    <h2 className="blue-3 fs-15 m-top-18 pd-top-2">
                        <strong></strong>
                    </h2>
                    <div className="pd-0 white">
                        <div dangerouslySetInnerHTML={{ __html: game.newVersion.descriptions }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AboutGame;