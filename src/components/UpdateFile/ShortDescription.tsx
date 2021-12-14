import React, {useState, useRef} from 'react';
import {
    Form,
    Input
} from 'antd';
import {GameDetailss} from "../../interfaces/rootInterface";

interface GameDetail{
    game: GameDetailss;
    isUpdate:boolean;
}

function ShortDescription({
    game,isUpdate
}:GameDetail){
    return(
        <div className="short-decription" style = {{display: isUpdate ? 'none' : 'block'}}>
            <Form.Item
                name="shortDecription"
                valuePropName="shortDecription"
                label = "SHORT DESCRIPTION"
                rules={[{ required: !isUpdate, message: "Please Input SHORT DESCRIPTION" }]}
            >
                <Input.TextArea showCount maxLength={500} defaultValue={game.newVersion.shortDescription}/>
            </Form.Item>
        </div>
    )
}

export default ShortDescription;