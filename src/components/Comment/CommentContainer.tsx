import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";
import { Avatar, Button, Input, Comment, Form, Rate } from "antd";
import { CommentType, GameVersionType, UserType } from "../../interfaces/rootInterface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../redux/reducers/index";
import axios from "axios";
import { Endpoint } from "../../api/endpoint";
import CommentItem from "./CommentItem";
import { existsTypeAnnotation } from "@babel/types";
import numberDot from "../../utils/numberDot"
const { TextArea } = Input;

interface IdGame {
    idGame: string;
}

function CommentContainer({ idGame }: IdGame) {
    const [connection, setConnection] = useState<HubConnection>();
    const [comments, setComment] = useState<CommentType[]>([]);
    const [ms, setMs] = useState("");
    const [rateInput, setRateInput] = useState(-1);
    const user = useSelector((state: RootState) => state.user);
    const { userName = '', idUser = '' } = user || {};
    const [userInfo, setUserInfo] = useState<UserType>();
    const [myComment, setMyComment] = useState<CommentType>();
    const [commentCount, setCommentCount] = useState(0);

    const joinRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:5001/comment")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                console.log("message receive: ", message);
            });

            connection.on("ReceiveCreateComment", (user, comment: CommentType) => {
                console.log('comment is created')
                if (comment.idUser === idUser) setMyComment(comment);
                setComment(cmts => [comment, ...cmts])
                setCommentCount(cmt => cmt + 1)
            })

            connection.on("ReceiveUpdateComment", (user, comment: CommentType) => {
                if (comment.idUser === idUser) setMyComment(comment);

                setComment(cmts => [
                    ...cmts.slice(0, cmts.findIndex(item => item.idComment === comment.idComment)),
                    comment,
                    ...cmts.slice(cmts.findIndex(item => item.idComment === comment.idComment) + 1)
                ])


            })

            connection.on("ReceiveDeleteComment", (user, id: string) => {
                setMyComment(cmt => cmt?.idComment === id ? undefined : cmt);
                setComment(cmts => cmts.filter(item => item.idComment !== id))
                setCommentCount(cmt => cmt - 1)
            })

            await connection.start();
            await connection.invoke("JoinRoom", { user, room });
            setConnection(connection);
        } catch (e) {
            console.log(e);
        }
    };

    const sendMessage = async (message) => {
        try {
            await connection?.invoke("SendMessage", message);
        } catch (e) {
            console.log(e);
        }
    };
    const createComment = async (data: CommentType) => {
        try {
            await connection?.invoke("CreateComment", data)
        } catch (e) {
            console.log(e);
        }
    }

    const updateComment = async (data: CommentType, idUser: string, action: string) => {
        try {
            await connection?.invoke("UpdateComment", data, idUser, action)
        } catch (e) {
            console.log(e);
        }
    }
    const deleteComment = async (idcmt: string) => {
        try {
            await connection?.invoke("DeleteComment", idcmt)
        } catch (e) {
            console.log(e);
        }
    }
    const Editor = () => (
        <Form
            onFinish={(value) => {
                let data: CommentType = {
                    idComment: '',
                    idGame: idGame,
                    idUser: userInfo?.idUser,
                    content: value.comment,
                    likes: 0,
                    dislike: 0,
                    time: new Date(),
                    star: value.rate,
                    userName: userInfo?.userName,
                    avatar: userInfo?.avatar
                }

                createComment(data);

            }}
        >
            <Form.Item
                name="rate"
                rules={[{ required: true, message: 'Please rating!' }]}
            >
                <Rate />
            </Form.Item>
            <Form.Item
                name="comment"
                rules={[{ required: true, message: 'Please input your comment!' }]}
            >
                <TextArea
                    rows={4}
                    value={ms}
                />
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType="submit"
                    type="primary"
                >
                    Add Comment
                </Button>
            </Form.Item>

        </Form>

    );

    const getComment = () => {
        return axios.get(Endpoint.mainApi + "api/comments/" + idGame).then((response) => {
            setComment(response.data.reverse());
        });
    };

    const getUserInfo = () => {
        return axios.get(Endpoint.mainApi + "api/user/" + idUser, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        }).then((response) => {
            setUserInfo(response.data);
            joinRoom("stun-user", idGame);
        }).catch(err => {
            console.log(err)
        })
    };
    const getCommentCount = () => {
        return axios.get(Endpoint.mainApi + "api/comments/count/" + idGame)
            .then(res => {
                setCommentCount(res.data)
            })
            .catch(err => console.log(err))
    }
    const getMyComment = () => {
        return axios.get(Endpoint.mainApi + "api/comments/" + idGame + "/" + idUser)
            .then(res => {
                {
                    console.log(res)
                    setMyComment(res.data);
                }
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        if (localStorage.getItem('accessToken') !== null) {
            getUserInfo();
        }
        getComment();
        getMyComment();
        getCommentCount();
    }, []);
    return (
        <div>
            <div className="font-w500">
                <div style={{ fontSize: "16px", display: "flex" }}>
                    <div>
                        COMMENTS
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{ color: "#6b6b6b" }}>
                        {numberDot(commentCount)} Comments
                    </div>
                </div>
                <br /> <br />
                {idUser === '' ? null :
                    <div className="rate-input-container">
                        {
                            myComment?.idComment === undefined ?
                                <Comment
                                    avatar={
                                        <Avatar src={userInfo?.avatar === null ? "https://firebasestorage.googleapis.com/v0/b/docprintx.appspot.com/o/logoSecondary.png?alt=media&token=d451278d-c524-46b5-a400-816b7970baa8" : userInfo?.avatar} alt="Han Solo" />
                                    }
                                    content={<Editor />}
                                /> : null

                        }
                    </div>
                }

                {
                    myComment?.idComment !== undefined ?
                        <CommentItem idUser={idUser} comment={myComment} updateCmtFunc={updateComment} deleteCmtFunc={deleteComment} isOwn={true} />
                        : null
                }
                <div style={{ borderBottom: "1px solid #6b6b6b", width: "100%" }}></div>
                <br /> <br />
                {comments.map((data, index) => (
                    data.idUser !== idUser ?
                        <CommentItem idUser={idUser} comment={data} updateCmtFunc={updateComment} deleteCmtFunc={deleteComment} isOwn={idUser === data.idUser} />
                        : null
                ))}
            </div>
        </div>
    );
}

export default CommentContainer;
