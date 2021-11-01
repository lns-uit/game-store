import React,{useState,useEffect} from 'react';
import Genre from './GenRe';
import Feature from './Features';
import { Menu } from 'antd';
import "./styles.css"

var genres = [
    {
        name: 'Shooter'
    },
    {
        name: 'OpenWorld'
    },
    {
        name: 'Casual'
    },
    {
        name: 'HyperCasual'
    },{
        name: 'Survival'
    }
    ,{
        name: 'Puzzle'
    }
]
var features = [
    {
        name: 'Co.op',
    },
    {
        name: 'Multiplayer',
    },
    {
        name: 'Single Player',
    }
]

function Fillter(){
    return(
        <div className="relative">
            <div className="background-white absolute">
                <div className="lay-out-fillter">
                    <div className="layout-1 border-bottom">
                        <div className="pd-top-bottom-10 pd-left-right-5">
                            <p className="fs-14 lh-16 mg-0">Fillter</p>
                        </div>
                    </div>
                    <Menu>
                        <Genre genres={genres}></Genre>
                        <Feature features={features}></Feature>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Fillter;
