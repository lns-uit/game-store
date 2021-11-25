import React, {useState} from 'react';
import { Drawer, Button } from 'antd';
import Genre from './GenRe';
import Feature from './Features';
import './styles.css'

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

function FillterMobile(){
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    return(
        <div className="white">
            <div className="d-flex align-center">
                <p className="pd-top-2 gray-1 pd-right-10 m-0">Fillter</p>
                <span className="pointer" onClick={showDrawer}>
                    <i className="line-1"></i>
                    <i className="line-2"></i>
                    <i className="line-3"></i>
                </span>
            </div>
            <Drawer 
                title="Fillter" placement="right" onClose={onClose} visible={visible} 
                headerStyle={{
                    backgroundColor: "rgb(42, 42, 42)",
                    border: 0,
                }}
                bodyStyle={{
                    backgroundColor: "rgb(42, 42, 42)",
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 0,
                    paddingTop: 0,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Genre genres={genres}></Genre>
            </Drawer>
        </div>
    )
}

export default FillterMobile;