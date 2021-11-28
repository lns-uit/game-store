import {
    HubConnection,
    HubConnectionBuilder,
    LogLevel,
} from "@microsoft/signalr";
import { Avatar, Button, Input, Comment, Form, Rate } from "antd";
import { CommentType, GameVersionType } from "../../interfaces/rootInterface";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { RootState } from "../../redux/reducers/index";
import axios from "axios";
import { Endpoint } from "../../api/endpoint";
import CommentItem from "./CommentItem";
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

            })

            connection.on("ReceiveDeleteComment", (user, id: string) => {

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
    const Editor = () => (
        <Form
            onFinish={(value) => {
                let data: CommentType = {
                    idComment: '',
                    idGame: idGame,
                    idUser: "d5d56be0-e414-47d5-be4d-05ff7bcd9311",
                    content: value.comment,
                    likes: 0,
                    dislike: 0,
                    time: new Date(),
                    rate: value.rate,
                    userName: "https://joeschmoe.io/api/v1/random",
                    avatar: "https://joeschmoe.io/api/v1/random"
                }
                createComment(data)
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

    useEffect(() => {
        getComment();
        joinRoom("stun-user", idGame);
    }, []);
    return (
        <div>
            <div>
                <div className="rate-input-container">

                    <Comment
                        avatar={
                            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
                        }
                        content={<Editor />}
                    />
                </div>
                {comments.map((data, index) => (
                    <CommentItem comment = {data} />
                ))}
            </div>
        </div>
    );
}

export default CommentContainer;
