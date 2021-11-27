import React, {useState} from 'react';
import {Row,Col} from "antd";
import SystemContent from '../SystemContent/SystemContent';
import "../../layout/LayoutGameDetail2/styles.css";
import {GameDetailss} from "../../interfaces/rootInterface"

interface Detail{
    game: GameDetailss;
}

function SystemRequirements({
    game
}:Detail){
    const [sys, setSys] = useState('window');
    return(
        <div className="relative">
            <div className="m-top-30">
                <h2 className="white uppercase lh-26 pd-top-2 m-bottom-10 fs-14 weight-normal brg-img">system requirements</h2>
                <div className="sys-tab">
                    <div className="d-flex">
                        <div 
                            className={sys === 'window' 
                                ? "pd-left-right-10 pointer m-right-10 blue-4 tab_active"
                                : "pd-left-right-10 pointer m-right-10 blue-4 hover transition-dot-3"}
                            onClick={()=>{setSys('window')}}
                        >
                            <p className="lh-20 m-0">Window</p>
                        </div>
                    </div>
                </div>
                <SystemContent game={game} sysOs={sys}></SystemContent>
            </div>
        </div>
    )
}

export default SystemRequirements;