import React, {useState} from 'react';
import {Form, Upload, Button} from 'antd';
import "../../screens/EditProfile/styles.css";
import { storage } from "../../firebase";
import {Row,Col} from "antd";
import AvatarEdit from "../AvatarEdit/AvatarEdit";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

interface AvatarAndCoverImageType{
    getUrlAvatar: (url: string) => void;
    getUrlCoverImage: (url: string) => void;
}

function AvatarAndCoverImage({
    getUrlAvatar,
    getUrlCoverImage
}: AvatarAndCoverImageType){
    const [loadingCoverImage, setLoadingCoverImage] = useState<any>(false);
    const user = useSelector((state: RootState) => state.user);
    const [coverImage, setCoverImage] = useState<any>(user.background);
    const [urlAvatar, setUrlAvatar] = useState<any>(user.avatar);
    const normFile = (e: any) => {
        setLoadingCoverImage(true);
        setCoverImage(null);
        if (e.file.status === "error"){
            getUrlCoverImages(e.file.originFileObj);
        }
    };

    const normAvatar = (e: any) => {
        if (e.file.status === "error"){
            getUrlAvatars(e.file.originFileObj);
        }
    };

    function getUrlCoverImages(file) {
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
                getUrlCoverImage(url);
                // urlImages.push({
                //     // name: file.name,
                //     Url: url
                // });
              })
          }
        )
    }
    function getUrlAvatars(file) {
        const uploadTask = storage.ref(`avatar/${file.name}`).put(file);
        uploadTask.on(
          "state_changed",
          snapshot => { },
          error => {
            console.log(error);
          },
          () => {
            storage
              .ref("avatar")
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                setUrlAvatar(url);
                getUrlAvatar(url);
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
            <div className="m-bottom-32">
                <div className="DialogHeader m-bottom-16 d-flex">Cover Image</div>
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
                    valuePropName="coverImage"
                    className="float-right width-auto d-block"
                >
                    <Upload name="coverImage" className="flex-end file-list-none" listType="picture">
                        <Button>Upload cover image (1920x1080)</Button>
                    </Upload>
                </Form.Item>
            </div>
            <div>
                <div className="DialogHeader m-bottom-16 d-flex">Avatar</div>
                <div className="DialogBodyText">Choose your avatar image and frame.</div>
                <Row gutter={[48, 8]}>
                    <Col xxl={16} xl={16} lg={16} md={18} sm={24} xs={24}>
                        <AvatarEdit urlAvatar={urlAvatar}/>
                    </Col>
                    <Col xxl={8} xl={8} lg={8} md={6} sm={24} xs={24}>
                        <Form.Item
                            name="avatar"
                            getValueFromEvent={normAvatar}
                            className="d-block m-0"
                        >
                            <Upload name="avatar" className="flex-end" listType="picture">
                                <Button>Upload your avatar</Button>
                            </Upload>
                        </Form.Item>
                        <div className="gray-7">
                            Upload a file from your device. Image should be square, at least 184px x 184px.
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default AvatarAndCoverImage;