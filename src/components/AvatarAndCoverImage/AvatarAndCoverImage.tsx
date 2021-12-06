import React, {useState} from 'react';
import {Form, Upload, Button} from 'antd';
import "../../screens/EditProfile/styles.css";
import { storage } from "../../firebase";

function AvatarAndCoverImage(){
    const [coverImage, setCoverImage] = useState<any>(null);
    const [loadingCoverImage, setLoadingCoverImage] = useState<any>(false);
    const normFile = (e: any) => {
        setLoadingCoverImage(true);
        setCoverImage(null);
        if (e.file.status === "error"){
            getUrlCoverImage(e.file.originFileObj);
        }
    };

    function getUrlCoverImage(file) {
        const uploadTask = storage.ref(`coverImages/${file.name}`).put(file);
        uploadTask.on(
          "state_changed",
          snapshot => { },
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref("coverImages")
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                setCoverImage(url)
                setLoadingCoverImage(false);
                // urlImages.push({
                //     // name: file.name,
                //     Url: url
                // });
              })
          }
        )
      }
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
                            <div className="height-full border-radius-8 background-user-edit" style={{backgroundImage: `url(${coverImage})`}}></div>
                            : loadingCoverImage === true ? <div>Loadding.......</div> : null
                        }
                    </div>
                </div>
            </div>
            <Form.Item
                name="coverImage"
                getValueFromEvent={normFile}
                className="float-right width-auto d-block"
            >
                <Upload name="coverImage" className="flex-end" listType="picture">
                    <Button>Upload cover image (1920x1080)</Button>
                </Upload>
            </Form.Item>
        </div>
    )
}

export default AvatarAndCoverImage;