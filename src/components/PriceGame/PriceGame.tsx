import React from "react";
import "./styles.css";
import {dotNumber} from '../../function/index';

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
    }
}

function PriceGame({
    detail
}:Detail){
    return (
        <div className="d-flex align-items-start column justify-content-end height-full">
            <div className="width-full">
                <div className="d-flex align-items-end">
                    <div className="bgr-blue1 pd-4-12 border-radius-4">
                        <span>-{detail.discount*100}%</span>
                    </div>
                    <div className="m-left-right-8">
                        <span className="gray-2 fs-12 lh-16">{dotNumber(detail.price)}₫</span>
                    </div>
                    <div className="m-left-8">
                        <span className="fs-12 lh-16">{dotNumber(detail.discount*detail.price)}₫</span>
                    </div>
                </div>
                <div className="m-top-36">
                    <div className="bgr-blue1 pd-8-16 width-full border-radius-4 pointer hover-buy transition-dot-3">
                        <p className="m-0 center uppercase">
                            Buy Now
                        </p>
                    </div>
                </div>
                <div className="m-top-28 m-bottom-48">
                    <div className="pd-8-16 width-full border-radius-4 pointer transition-dot-3 hover-buy border-1">
                        <div className="d-flex">
                            <p className="m-0 center uppercase flex-1-1-auto">
                                add to wishlist
                            </p>
                            <span>
                                <i className="fa fa-plus-circle"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    {detail.details.map((item,index)=>{
                        return(
                            <div className={index === 3 ? "d-flex border-top-bottom-gray pd-top-bottom-22 space-between" : "d-flex border-top-gray pd-top-bottom-22 space-between"}>
                                <p className="gray-3 m-0 fs-12 lh-21">{item.name}</p>
                                <p className="m-0 fs-12 lh-21">{item.value}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default PriceGame;