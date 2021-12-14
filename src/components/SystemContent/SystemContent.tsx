import React, { useState, useEffect } from 'react';
import {Row,Col} from 'antd';
import {GameDetailss} from "../../interfaces/rootInterface"

interface Detail{
    game: GameDetailss;
    sysOs: string;
}

function SystemContent({
    game,
    sysOs
}:Detail){
    const [sysDetails, setSysDetails] = useState<any[]>([])

    useEffect(()=>{
        const sysDetailsTmp: {name: string, values: string}[] = []
        for (let i = 0; i < 6; i++){
            i === 0 ?
                sysDetailsTmp.push({name: "Processor", values: game.newVersion.processor})
            : i === 1 ?
                sysDetailsTmp.push({name: "Memory", values: game.newVersion.memory})     
            : i === 2 ?
                sysDetailsTmp.push({name: "Graphics", values: game.newVersion.graphics})
            : i === 3 ?
                sysDetailsTmp.push({name: "Storage", values: game.newVersion.storage})
            : i === 4 ?
                sysDetailsTmp.push({name: "DirectX", values: game.newVersion.directX})
            :   sysDetailsTmp.push({name: "Os", values: game.newVersion.os})
        }
        setSysDetails(sysDetailsTmp);
    },[])

    return(
        <div className="sys-contents">
            <Row gutter={[48, 8]}>
                <Col
                    xxl={12}
                    xl={12}
                    lg={12}
                    md={12}
                    sm={24}
                    xs={24}
                >
                    <div className="sys-minimum">
                        <strong className="uppercase">Minimum:</strong>
                        <ul className="pd-0 m-0 list-none">
                            <li>Requires {game.newVersion.requires}</li>
                            {
                                sysDetails.map((sys,index)=>{
                                    return(
                                        sys.values !== undefined 
                                        ?       
                                        <li>
                                            <span className="gray-5">{sys.name}: </span>
                                            <span>{sys.values}</span>
                                        </li>
                                        :null
                                )})
                            }
                        </ul>
                    </div>
                </Col>
                <Col
                    xxl={12}
                    xl={12}
                    lg={12}
                    md={12}
                    sm={24}
                    xs={24}
                >
                    <div className="sys-recommended">
                        <strong className="uppercase">Recommended:</strong>
                        <ul className="pd-0 m-0 list-none">
                            <li>Requires {game.newVersion.requires}</li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <br/>
            <div className="border-top textAlign" style={{padding: '15px 0'}}>
                <a href = {game.newVersion.privacyPolicy} style={{color:'white'}}>Privacy Policy</a>
            </div>
        </div>
    )
}

export default SystemContent;