import React from 'react';
import {Row,Col} from 'antd';

interface Detail{
    detail:{
        name: string;
        genres: string[];
        features: string[];
        description: string;
        minimumWindow:{
            name: string; value: string;
        }[];
        recommendedWindow:{
            name: string; value: string;
        }[];
        minimumMacOs:{
            name: string; value: string;
        }[];
        recommendedMacOs:{
            name: string; value: string;
        }[];
        discount: number;
        price: number;
        details:{
            name: string; value: string;
        }[];
        requiresMinimum: string;
        requiresRecommended: string;
    };
    sysOs: string;
}

function SystemContent({
    detail,
    sysOs
}:Detail){
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
                            <li>Requires {detail.requiresMinimum}</li>
                            {
                               detail.minimumWindow.map((minimum,index)=>{
                                    return(
                                        <li key={index}>
                                            <span className="gray-5">{minimum.name}: </span>
                                            <span>{minimum.value}</span>
                                        </li>
                                )
                            })
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
                            <li>Requires {detail.requiresMinimum}</li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <div className="border-top">
                <p className="m-top-10 textAlign">Privacy Policy</p>
            </div>
        </div>
    )
}

export default SystemContent;