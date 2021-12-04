import React,{useState,useEffect} from "react";
import { Menu } from 'antd';
import "./styles.css"

const { SubMenu } = Menu;
interface FeaturesPropsType{
    features: {
        name?: string,
    }[]
}

const keys: string[] = [];

function Feature({
    features,
}: FeaturesPropsType){

    function setGenres(key){
        var test = 0;

        for (var i = 0; i < keys.length; i++){
            if (keys[i] === key.toString()){
                keys.splice(i,1);
                test = 1;
                break;
            }
        }

        if (test === 0){
            keys.push(key.toString());
        }
    }
    return (
        <div className="layout-2 border-bottom">
            <div className="d-flex f-column">
                <div className="option">
                    <Menu
                        style={{ width: 256 }}
                        selectedKeys={keys}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <SubMenu key="sub1" title="Features" className="pd-top-bottoms-10 pd-left-rights-5 mg-childrent-0">
                            {
                                features.map((feature,key)=>{
                                    return(
                                        <Menu.Item 
                                            key={key} 
                                            onClick={()=>{setGenres(key)}}
                                            className="pd-top-bottom-10 pd-left-right-5 mg-0"
                                        >
                                            {feature.name}
                                        </Menu.Item>
                                    )
                                })
                            }
                        </SubMenu>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default Feature;