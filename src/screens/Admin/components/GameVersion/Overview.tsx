import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Tag } from "antd";
import { BillType, CommentType, GameDetailss, GameType, GameVersionType, ImageType } from "../../../../interfaces/rootInterface";
import axios from "axios";
import { useHistory, useLocation, useParams } from "react-router-dom";
const { Search } = Input;
import { Endpoint } from "../../../../api/endpoint"
import CommentView from "./CommentView"
import Moment from "react-moment";
import numberDot from "../../../../utils/numberDot";
import numberWithCommas from "../../../../utils/numberWithCommas";
  
function Overview() {
    let slug: any = {};
    slug = useParams();
    const [comments, setComment] = useState<CommentType[]>([]);
    const [billData, setBillData] = useState<BillType[]>([]);
    const [searchGame, setSearchGame] = useState();
    const [game, setGame] = useState<GameDetailss>();
    const [revenue,setRevenue] = useState<number>(0);
    const history = useHistory();
    const location = useLocation();

    const getDataBill = () => {
        let routePath = location.pathname.split('/');
        let id = routePath[routePath.length-1];
        return axios.get(Endpoint.mainApi + "api/bill/" + id + '/' + billData.length +  '/5',
            {
                headers: {
                    Authorization: "Bearer "+ localStorage.getItem("accessToken")
                }
            }
        ).then((response) => {
            if (response.data.length !== 0) {
                setBillData(response.data);
                getDataBill();
            }
        });
    };
    const getGame = () => {
        axios.get(Endpoint.mainApi+"api/gameversion/by-game/lastest-version/"+slug.idGame,
            {
                headers: {
                    Authorization: "Bearer "+ localStorage.getItem("accessToken")
                },
            }
        )
        .then(res => {
            setGame(res.data)
        })
    }
    const getGameRevenue = () => {
        axios.get(Endpoint.mainApi+"api/bill/revenue/"+slug.idGame,
            {
                headers: {
                    Authorization: "Bearer "+ localStorage.getItem("accessToken")
                },
            }
        )
        .then(res => {
            setRevenue(res.data)
        })
    }
    const getComment = () => {
        return axios.get(Endpoint.mainApi + `api/comments/rates/${slug.idGame}/${comments.length}/5`).then((response) => {
            if (response.data.length !== 0) {
                setComment(response.data.reverse());
                getComment();
            }
        });
    };
    useEffect(() => {
        getDataBill();
        getComment();
        getGameRevenue();
        getGame();
    }, []);
    return (
        <div className="console-container">
            <div className="console-detail-header">
                <h1>
                    Overview
                </h1>
                <div className="console-toolbar">

                    <div className="search-container">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#c0c0c0"><path d="M0 0h24v24H0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                        <div style={{ width: '5px' }}></div>
                        <Input
                            placeholder="Search"
                        
                        />
                    </div>
                    <div style={{ width: '40px' }}></div>
                    <Button  className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
                            style={{ height: '40px' }}
                            type = "primary" 
                            onClick={() => { 
                                window.open("/game/"+ game?.idGame) 
                            }}>
                        See game in Stun store
                    </Button>
                </div>
            </div>
            <div className="console-list">
                <h2 style={{color:"rgb(157, 157, 157)"}}>
                    Statistics
                </h2>
                <div className="d-flex space-between">
                    <div className = "box-overview">
                        Number of buying games
                        <br/>
                        <h1 className="number-overview">
                            {numberDot(game?.numberOfBuyer)}
                        </h1>
                    </div>
                    <div className = "box-overview">
                        Number of rate
                        <br/>
                        <h1 className="number-overview">
                            {numberDot(game?.numOfRate)}
                        </h1>
                    </div>
                    <div className = "box-overview">
                        Rating points
                        <br/>
                        <h1 className="number-overview">
                            {numberDot(game?.averageRate)} &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e0e0e0"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        </h1>
                    </div>
                    <div className = "box-overview">
                        Users installed
                        <br/>
                        <h1 className="number-overview">
                            {numberDot(game?.numberOfDownloaders)}
                        </h1>
                    </div>
                    <div className = "box-overview">
                        Total revenue
                        <br/>
                        <h1 className="number-overview">
                            {numberWithCommas(revenue)}
                        </h1>
                    </div>
                </div>
                <h2 style={{color:"rgb(157, 157, 157)"}}>
                    All Comments
                </h2>
                {comments.map((item,index)=>(
                    <CommentView comment={item}></CommentView>
                ))}
        
            </div>
        </div>
    )
}

export default Overview;