import { Col, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { CommentType } from "../../interfaces/rootInterface";

interface CommentParam {
    comment: CommentType;
}

function Comment({comment}: CommentParam) {
    return (
        <div>
            <div key={comment.idComment} className="comment-box">
                <div className="pd-20-28">
                    <Row gutter={[48, 8]}>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                            <div className="d-flex gap-10 user">
                                <div className="avatar">
                                    <img src={comment.avatar} alt={comment.userName} />
                                </div>
                                <div className="name">
                                    <span>{comment.userName}</span>
                                </div>
                            </div>
                        </Col>
                        <Col xxl={16} xl={16} lg={16} md={16} sm={24} xs={24}>
                            <div className="rating-date">
                                <Rate defaultValue={comment.rate} disabled />
                                <p className="m-0 gray-4">{comment.time}</p>
                            </div>
                            <div className="content-comment">
                                <p>{comment.content}</p>
                            </div>
                            <div className="control-block">
                                <span className="review-was-helpful">
                                    Was this review helpful?
                                </span>
                                <div className="vote-btn d-flex gap-10">
                                    <div className="d-flex">
                                        <div className="btnv6_grey_black">
                                            <span>
                                                <i className="fa fa-thumbs-up"></i>
                                                Yes
                                            </span>
                                        </div>
                                        <p>{comment.likes}</p>
                                    </div>
                                    <div className="d-flex">
                                        <div className="btnv6_grey_black">
                                            <span>
                                                <i className="fa fa-thumbs-down"></i>
                                                No
                                            </span>
                                        </div>
                                        <p>{comment.dislike}</p>
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
