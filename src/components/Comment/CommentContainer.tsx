import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";
import { Avatar, Button, Input, Comment, Form, Rate } from "antd";
import { CommentType, GameVersionType, UserType } from "../../interfaces/rootInterface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { RootState } from "../../redux/reducers/index";
import axios from "axios";
import { Endpoint } from "../../api/endpoint";
import CommentItem from "./CommentItem";
import { existsTypeAnnotation } from "@babel/types";
const { TextArea } = Input;

interface IdGame{
    idGame: string;
}

function CommentContainer({idGame}:IdGame) {
    const [connection, setConnection] = useState<HubConnection>();
    const [comments, setComment] = useState<CommentType[]>([]);
    const [ms, setMs] = useState("");
    const [rateInput, setRateInput] = useState(-1);
    const user = useSelector((state:RootState)=> state.user);
    const { userName = '', idUser = ''} = user || {};
    const [userInfo, setUserInfo]  = useState<UserType>();

    const joinRoom = async (user, room) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:5001/comment")
                .configureLogging(LogLevel.Information)
                .build();

            connection.on("ReceiveMessage", (user, message) => {
                console.log("message receive: ", message);
            });

            connection.on("ReceiveCreateComment", (user , comment: CommentType) => {
                console.log('comment is created')
                setComment(cmts => [comment,...cmts])
            })

            connection.on("ReceiveUpdateComment", (user, comment: CommentType) => {
                setComment(cmts => [comment,...cmts.slice(cmts.findIndex(item => item.idComment === comment.idComment))])
            })

            connection.on("ReceiveDeleteComment", (user, id: string) => {
                setComment(cmts => cmts.filter(item => item.idComment !== id))
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
    const createComment = async (data : CommentType) => {
        try {
            await connection?.invoke("CreateComment", data)
        } catch (e) {
            console.log(e);
        }
    }

    const updateComment = async (data : CommentType) =>{
        try {
            await connection?.invoke("UpdateComment",data)
        } catch (e) {
            console.log(e);
        }
    }
    const deleteComment = async (idcmt: string) => {
        try {
            await connection?.invoke("DeleteComment",idcmt)
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
        return axios.get( Endpoint.mainApi + "api/user/" + idUser,{
          headers: {
              Authorization: "Bearer "+ localStorage.getItem('accessToken') // token here
          }
        }).then((response) => {
            setUserInfo(response.data);
            joinRoom("stun-user", idGame);
        }).catch(err => {
            console.log(err)
        })
    };

    useEffect(() => {
        if (localStorage.getItem('accessToken')!==null) {
            getUserInfo();
        }
        getComment();
      
    }, []);
    return (
        <div>
            <div>
                <div className="rate-input-container">

                    <Comment
                        avatar={
                            <Avatar src= {userInfo?.avatar===null ? "https://firebasestorage.googleapis.com/v0/b/docprintx.appspot.com/o/logoSecondary.png?alt=media&token=d451278d-c524-46b5-a400-816b7970baa8" : userInfo?.avatar}  alt="Han Solo" />
                        }
                        content={<Editor />}
                    />
                </div>
                {comments.map((data, index) => (
                    <CommentItem comment = {data} updateCmtFunc = {updateComment} deleteCmtFunc = {deleteComment} isOwn = {idUser===data.idUser} />
                ))}
            </div>
        </div>
    );
}

export default CommentContainer;
