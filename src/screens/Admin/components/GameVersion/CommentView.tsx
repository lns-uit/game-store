import { Button, Col, Rate, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Endpoint } from "../../../../api/endpoint";
import { CommentType } from "../../../../interfaces/rootInterface";
import numberDot from "../../../../utils/numberDot";
import './style.css'

interface CommentParam {
    comment: CommentType | undefined;
}

function CommentView({ comment}: CommentParam) {

    return (
        <div>
            <div key={comment?.idComment} className="comment-box">
                <div className="pd-20-28">
                    <Row gutter={[48, 8]}>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                            <div className="d-flex gap-10 user">
                                <div className="avatar">
                                    <img src={comment?.avatar} />
                                </div>
                                <div className="name" style={{color:'white'}}>
                                    <span>{comment?.userName.toUpperCase()}</span>
                                </div>
                            </div>
                        </Col>
                        <Col xxl={16} xl={16} lg={16} md={16} sm={24} xs={24}>
                            <div className="rating-date-container">
                                <div>
                                    <Rate defaultValue={comment?.star} disabled />
                                    <p className="m-0 gray-4">
                                        <Moment format="MMMM DD YYYY, hh:mm:ss">
                                            {comment?.time}
                                        </Moment>

                                    </p>
                                </div>
                            </div>
                            <div className="content-comment" style={{color:'white'}}>
                                <p>{comment?.content}</p>
                            </div>
                            <div className="control-block">
                                <span className="review-was-helpful">

                                </span>
                                <div className="vote-btn d-flex gap-10">
                                    <div className="d-flex flex-center-x">
                                        <div className="btnv6_grey_black"
                                            style={{
                                                background: '#242424',
                                                color: "#7c7c7c"
                                            }}
                                        >
                                            <span>
                                                <i className="fa fa-thumbs-up"></i>
                                                Yes
                                            </span>
                                        </div>
                                        &nbsp;
                                        <div className="comment-like-dislike-text" style={{color:'white'}}>
                                            <p>{numberDot(comment?.likes)}</p>
                                        </div>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className="d-flex flex-center-x"
                                    >
                                        <div className="btnv6_grey_black"
                                            style={{
                                                background: '#242424',
                                                color: "#7c7c7c"
                                            }}
                                        >
                                            <span>
                                                <i className="fa fa-thumbs-down"></i>
                                                No
                                            </span>
                                        </div>
                                        &nbsp;
                                        <div className="comment-like-dislike-text" style={{color:'white'}}>
                                            <p>{numberDot(comment?.dislike)}</p>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default CommentView;
