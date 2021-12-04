import React, {useState, useRef} from 'react';
import {
    Form,
    Input
} from 'antd';
import {GameDetailss} from "../../interfaces/rootInterface";

interface GameDetail{
    game: GameDetailss;
}

function ShortDescription({
    game
}:GameDetail){
    return(
        <div className="short-decription">
            <Form.Item
                name="shortDecription"
                valuePropName="shortDecription"
                label = "SHORT DESCRIPTION"
            >
                <Input.TextArea showCount maxLength={500} defaultValue={game.newVersion.shortDescription}/>
            </Form.Item>
        </div>
    )
}

export default ShortDescription;