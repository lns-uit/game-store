import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Tag } from "antd";
import { BillType, GameType, GameVersionType, ImageType } from "../../../../interfaces/rootInterface";
import axios from "axios";
import { useHistory, useLocation, useParams } from "react-router-dom";
const { Search } = Input;
import { Endpoint } from "../../../../api/endpoint"
import Moment from "react-moment";
import numberWithCommas from "../../../../utils/numberWithCommas";

function GameOrders() {
    let slug: any = {};
    slug = useParams();
    const [billData, setBillData] = useState<BillType[]>([]);
    const [searchGame, setSearchGame] = useState('');
    const [nameGame, setNameGame] = useState('');
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
            setNameGame(res.data.nameGame)
        })
    }
    const columns = [
        {
            title: "ID",
            dataIndex: "idBill",
            key: "idBill",
            render: (text) => <h3>{text}</h3>,
        },
        {
            title: "Time",
            dataIndex: "datePay",
            key: "datePay",
            render: (date) => <Moment format="DD-MM-yyyy | HH:mm:ss">{date}</Moment>
        },
        {
            title: "Action",
            dataIndex: "actions",
            key: "actions",
            render: (text,record) => <div style={{color: text === 'refund' ? '#e83b07' : '#07a5e8'}}>{text.toUpperCase()}</div>,
        },
        {
            title: "Cost",
            dataIndex: "cost",
            key: "cost",
            render: (text) => <h3>{numberWithCommas(text)}</h3>,
        },
    ];
    useEffect(() => {
        getDataBill();
    }, []);
    return (
        <div className="console-container">
            <div className="console-detail-header">
                <h1>
                    Orders
                </h1>
                <div className="console-toolbar">

                    <div className="search-container">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#c0c0c0"><path d="M0 0h24v24H0z" fill="none" /><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" /></svg>
                        <div style={{ width: '5px' }}></div>
                        <Input
                            placeholder="Search"
                            onChange={event => setSearchGame(event.target.value?.toLowerCase())}
                        />
                    </div>
                    <div style={{ width: '40px' }}></div>
                </div>
            </div>
            <div className="console-list">
                <Table
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {  },
                        };
                    }}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
                    columns={columns} dataSource={
                        billData.filter(item => item.actions.toLowerCase().indexOf(searchGame) !== -1)
                        } />
            </div>
        </div>
    )
}

export default GameOrders;