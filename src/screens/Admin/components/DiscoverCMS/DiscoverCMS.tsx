import axios from "axios";
import React, { useEffect, useState } from "react";
import { Endpoint } from "../../../../api/endpoint";
import { SuggestionType } from "../../../../interfaces/rootInterface";
import "./style.css";

function DiscoverCMS() {

    const [listSuggestion, setListSuggestion] = useState<SuggestionType[]>([]);
    const getAllSuggestion = () => {
        axios
            .get(Endpoint.mainApi + "api/suggestion", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setListSuggestion(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getAllSuggestion();
    });

    return (
        <div className="console-container">
            <div className="console-detail-header">
                <h1>DISCOVER CONTENT MANAGEMENT SYSTEM</h1>
                <div className="console-toolbar">
                    <div className="btn" onClick={() => { }}>
                        Save
                    </div>
                </div>
            </div>
            <div className="console-list">
                <div className="cms-manager">
                
                </div>
            </div>
        </div>
    );
}

export default DiscoverCMS;
