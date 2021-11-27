import React from 'react';
import StarRatings from 'react-star-ratings';
import {dotNumber} from '../../utils/index';
import {Row,Col} from 'antd';

const commemnts = [
    {
        user:{
            userName: "ABC",
            avatar: "https://vcdn-giaitri.vnecdn.net/2020/03/06/Taylor-Swift-6612-1583461788.jpg",
        },
        comment:{
            content: "very good",
            rate: 4,
            time: '10:30:23 AM 24 AUG 2021',
            like: [
                '1','2','3','4','5','6','7','8','9','10','11'
            ],
            dislike: [
                '12','23','213','41239','2311'
            ]
        }
    },
    {
        user:{
            userName: "AZB",
            avatar: "https://pbs.twimg.com/profile_images/1458749765747834883/cC36Uu-H_400x400.jpg",
        },
        comment:{
            content: "very bad",
            rate: 4,
            time: '10:30:23 AM 24 AUG 2021',
            like: [
                '1','2','3','4','5','6','7','8','9','10','11'
            ],
            dislike: [
                '12','23','213','41239','2311'
            ]
        }
    },
    {
        user:{
            userName: "UKL",
            avatar: "https://vnn-imgs-f.vgcloud.vn/2020/07/28/14/1.jpg",
        },
        comment:{
            content: "o no",
            rate: 4,
            time: '10:30:23 AM 24 AUG 2021',
            like: [
                '1','2','3','4','5','6','7','8','9','10','11'
            ],
            dislike: [
                '12','23','213','41239','2311'
            ]
        }
    }
]

function RateAndComment(){
    return(
        <div className="relative">
            <div className="rates">
                <div className="m-top-30">
                    <div className="full-width brg-img m-bottom-10">
                        <div className="d-flex gap-10">
                            <h2 className="white uppercase m-0 lh-26 pd-top-2 fs-14 weight-normal">Rartings</h2>
                            <p className="m-0 pd-top-2 gray-3">{dotNumber(231231)} Rates</p>
                        </div>
                    </div>
                </div>
                <div className="ratings d-inline-block">
                    <StarRatings
                        starRatedColor="yellow"
                        rating={2.5}
                        starDimension="30px"
                        starSpacing="5px"
                        name="rating"
                    />
                </div>
            </div>
            <div className="commemnt">
                <div className="m-top-30">
                    <div className="full-width m-bottom-10 brg-img">
                        <div className="d-flex gap-10">
                            <h2 className="white uppercase m-0 lh-26 pd-top-2 fs-14 weight-normal">Comments</h2>
                            <p className="m-0 pd-top-2 gray-3">{dotNumber(231231)} Comments</p>
                        </div>
                    </div>
                    <div>
                        {
                            commemnts.map((comment,index) =>{
                                return(
                                    <div key={index} className="comment-box">
                                        <div className="pd-20-28">
                                            <Row gutter={[48, 8]}>
                                                <Col
                                                    xxl={8}
                                                    xl={8}
                                                    lg={8}
                                                    md={8}
                                                    sm={24}
                                                    xs={24}
                                                >
                                                    <div className="d-flex gap-10 user">
                                                        <div className="avatar">
                                                            <img src={comment.user.avatar} alt={comment.user.userName} />
                                                        </div>
                                                        <div className="name">
                                                            <span>{comment.user.userName}</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col
                                                    xxl={16}
                                                    xl={16}
                                                    lg={16}
                                                    md={16}
                                                    sm={24}
                                                    xs={24}
                                                >
                                                    <div className="rating-date">
                                                        <StarRatings
                                                            starRatedColor="yellow"
                                                            rating={4}
                                                            starDimension="15px"
                                                            starSpacing="2px"
                                                            name="rating"
                                                        />
                                                        <p className="m-0 gray-4">{comment.comment.time}</p>
                                                    </div>
                                                    <div className="content-comment">
                                                        <p>{comment.comment.content}</p>
                                                    </div>
                                                    <div className="control-block">
                                                        <span className="review-was-helpful">Was this review helpful?</span>
                                                        <div className="vote-btn d-flex gap-10">
                                                            <div className="d-flex">
                                                                <div className="btnv6_grey_black">
                                                                    <span>
                                                                        <i className="fa fa-thumbs-up"></i>
                                                                        Yes
                                                                    </span>
                                                                </div>
                                                                <p>{dotNumber(comment.comment.like.length)}</p>
                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="btnv6_grey_black">
                                                                    <span>
                                                                        <i className="fa fa-thumbs-down"></i>
                                                                        No
                                                                    </span>
                                                                </div>
                                                                <p>{dotNumber(comment.comment.dislike.length)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RateAndComment;