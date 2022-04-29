import { Button, Col, Rate, Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Endpoint } from "../../api/endpoint";
import { CommentType } from "../../interfaces/rootInterface";
import numberDot from "../../utils/numberDot";
import './style.css'

interface CommentParam {
    comment: CommentType | undefined;
    updateCmtFunc: any;
    deleteCmtFunc: any;
    isOwn: boolean;
    idUser: string;
}

interface LikeCommentType {
    idComment: any;
    idUser: any;
    isLike: boolean;
}

function Comment({ comment, updateCmtFunc, deleteCmtFunc, isOwn, idUser }: CommentParam) {
    const [userLike, setUserLike] = useState('null');

    const checkMyLikeComment = () => {
        return axios.get(Endpoint.mainApi + "api/likecomment/" + comment?.idComment + "/" + idUser)
            .then(res => {
                setUserLike(res.data.own)
            })
            .catch(err => {})
    }

    useEffect(() => {
        checkMyLikeComment()
    }, [comment])
    return (
        <div>
            <div key={comment?.idComment} className="comment-box">
                <div className="pd-20-28">
                    <Row gutter={[48, 8]}>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                            <div className="d-flex gap-10 user">
                                <div className="avatar">
                                    <img src={comment?.avatar === null ? "https://firebasestorage.googleapis.com/v0/b/docprintx.appspot.com/o/logoSecondary.png?alt=media&token=d451278d-c524-46b5-a400-816b7970baa8" : comment?.avatar} />
                                </div>
                                <div className="name">
                                    <span>{comment?.userName}</span>
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
                                {isOwn ?
                                    <div className="btn-delete-cmt" onClick={() => deleteCmtFunc(comment?.idComment)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M14.12 10.47L12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z" /></svg>
                                    </div> : null
                                }
                            </div>
                            <div className="content-comment">
                                <p>{comment?.content}</p>
                            </div>
                            <div className="control-block">
                                <span className="review-was-helpful">
                                    Was this review helpful?
                                </span>
                                <div className="vote-btn d-flex gap-10">
                                    <div className="d-flex flex-center-x"

                                        onClick={() => {
                                            if (idUser === "") alert("Login to do")
                                            else updateCmtFunc(comment, idUser, "like");
                                        }}>
                                        <div className="btnv6_grey_black"
                                            style={{
                                                background: userLike === 'none' ? '#242424' : (userLike === '1' ? "#c23329" : "#242424"),
                                                color: userLike === 'none' ? '#7c7c7c' : (userLike === '1' ? "white" : "#7c7c7c")
                                            }}
                                        >
                                            <span>
                                                <i className="fa fa-thumbs-up"></i>
                                                Yes
                                            </span>
                                        </div>
                                        &nbsp;
                                        <div className="comment-like-dislike-text">
                                            <p>{numberDot(comment?.likes)}</p>
                                        </div>
                                    </div>
                                    &nbsp;&nbsp;
                                    <div className="d-flex flex-center-x"

                                        onClick={() => {
                                            if (idUser === "") alert("Login to do")
                                            else updateCmtFunc(comment, idUser, "dislike");
                                        }}
                                    >
                                        <div className="btnv6_grey_black"
                                            style={{
                                                background: userLike === 'none' ? '#242424' : (userLike === '0' ? "#c23329" : "#242424"),
                                                color: userLike === 'none' ? '#7c7c7c' : (userLike === '0' ? "white" : "#7c7c7c")
                                            }}
                                        >
                                            <span>
                                                <i className="fa fa-thumbs-down"></i>
                                                No
                                            </span>
                                        </div>
                                        &nbsp;
                                        <div className="comment-like-dislike-text">
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

export default Comment;
