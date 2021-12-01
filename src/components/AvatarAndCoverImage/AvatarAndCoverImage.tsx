import React, {useState} from 'react';
import {Form, Upload, Button} from 'antd';

function AvatarAndCoverImage(){
    const [coverImage, setCoverImage] = useState(null);
    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };
    return(
        <div className="edit-avatar-cover-image">
            <div className="DialogHeader m-bottom-16">Cover Image</div>
            <div className="background-profile border-radius-8">
                <div 
                    className="flex-basic relative border-radius-8 d-flex flex-shringk-1 min-width-0 column flex-grow-1 max-width-full">
                    <div className="width-full border-radius-8 height-300">
                        {
                            coverImage !== null
                            ?
                            <div className="height-full border-radius-8 background-user" style={{backgroundImage: `url(${coverImage})`}}></div>
                            : null
                        }
                    </div>
                </div>
            </div>
            <Form.Item
                name="coverImage"
                valuePropName="fileList"
                getValueFromEvent={normFile}
            >
                <Upload name="logo" action="/upload.do" listType="picture">
                    <Button>Click to upload cover image</Button>
                </Upload>
            </Form.Item>
        </div>
    )
}

export default AvatarAndCoverImage;