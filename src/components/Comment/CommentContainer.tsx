import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";
import { Avatar, Button, Input, Comment, Form, Rate } from "antd";
import { BillType, CommentType, GameDetailss, GameType, GameVersionType, UserType } from "../../interfaces/rootInterface";
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
    game: GameDetailss;
    idGame: string;
    bill: BillType |undefined;
}

function CommentContainer({ idGame,bill,game }: IdGame) {
    const [connection, setConnection] = useState<HubConnection>();
    const [comments, setComment] = useState<CommentType[]>([]);
    const [ms, setMs] = useState("");
    const [rateInput, setRateInput] = useState(-1);
    const user = useSelector((state: RootState) => state.user);
    const { userName = '', idUser = '' } = user || {};
    const [userInfo, setUserInfo] = useState<UserType>();
    const [myComment, setMyComment] = useState<CommentType>();
    const [commentCount, setCommentCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [rateCount, setRateCount] = useState(game.numOfRate);
    const [rateAverage, setRateAverage] = useState(game.averageRate);

    const joinRoom = async (user, room) => {    
        try {
            const connection = new HubConnectionBuilder()
                .withUrl(Endpoint.mainApi+"comment")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                // console.log("message receive: ", message);
            });

            connection.on("ReceiveCreateComment", (user, comment: CommentType) => {
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
            connection.on("ReceiveUpdateRate",(user, average: number) =>{
                setRateAverage(average);
            })

            connection.on("ReceiveDeleteComment", (user, id: string, average: number) => {
                setRateAverage(average);
                setMyComment(cmt => cmt?.idComment === id ? undefined : cmt);
                setComment(cmts => cmts.filter(item => item.idComment !== id))
                setCommentCount(cmt => cmt - 1);
            })

            await connection.start();
            await connection.invoke("JoinRoom", { user, room });
            setConnection(connection);
        } catch (e) {
        }
    };

    const sendMessage = async (message) => {
        try {
            await connection?.invoke("SendMessage", message);
        } catch (e) {
        }
    };
    const createComment = async (data: CommentType) => {
        try {
            await connection?.invoke("CreateComment", data)
            await connection?.invoke("UpdateRate", data)
        } catch (e) {
        }
    }

    const updateComment = async (data: CommentType, idUser: string, action: string) => {
        try {
            await connection?.invoke("UpdateComment", data, idUser, action)
        } catch (e) {
        }
    }
    const deleteComment = async (idcmt: string) => {
        try {
            await connection?.invoke("DeleteComment", idcmt)
        } catch (e) {
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
                    className='bgr-yellow pd-8-16 width-full border-radius-4 uppercase'
                    style={{ height: '40px' }}
                    htmlType="submit"
                    type="primary"
                >
                    Add Comment
                </Button>
            </Form.Item>

        </Form>

    );

    const getComment = () => {
        return axios.get(Endpoint.mainApi + `api/comments/rates/${idGame}/${comments.length}/5`).then((response) => {
            if (response.data.length !== 0) {
                setComment(response.data.reverse());
                getComment();
            }
        });
    };
    const getUserInfo = () => {
        return axios.get(Endpoint.mainApi + "api/user/" + idUser, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('accessToken')
            }
        }).then((response) => {
            setUserInfo(response.data);
            
        }).catch(err => {
        })
    };
    const getCommentCount = () => {
        return axios.get(Endpoint.mainApi + "api/comments/count/" + idGame)
            .then(res => {
                setCommentCount(res.data)
            })
            .catch(err =>{})
    }
    const getMyComment = () => {
        return axios.get(Endpoint.mainApi + "api/comments/" + idGame + "/" + idUser)
            .then(res => {
                {
                    setMyComment(res.data);
                }
            })
            .catch(err =>{})
    }
    const joinRoomTimeout = () => {
        joinRoom("stun-user", idGame);
        getComment();
       
        getCommentCount();
        
        setIsLoading(false);
    }

    useEffect(() => {
        if (user !== null) {
            getUserInfo();
            getMyComment();
        }
    },[user])
    useEffect(() => {
        joinRoomTimeout();
    }, []);
    return (
        <div>
            
            {isLoading ? null :
            <div className="font-w500">
                <div className="font-w500">
                <div className="white uppercase lh-26 pd-top-2 m-bottom-10 fs-14 weight-normal brg-img d-flex">
                    <div>
                        RATINGS
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{ color: "#6b6b6b" }}>
                        {numberDot(commentCount)} Rates
                    </div>
                    </div>
                    <Rate disabled value = {rateAverage} allowHalf ></Rate>
                </div>
                <br/>
                <div className="white uppercase lh-26 pd-top-2 m-bottom-10 fs-14 weight-normal brg-img d-flex">
                    <div>
                        COMMENTS
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <div style={{ color: "#6b6b6b" }}>
                        {numberDot(commentCount)} Comments
                    </div>
                </div>
                <br />
                {idUser === '' || bill=== undefined ? null :
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
            </div>}
        </div>
    );
}

export default CommentContainer;
