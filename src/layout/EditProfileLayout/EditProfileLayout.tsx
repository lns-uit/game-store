import React,{useState} from 'react';
import '../../screens/EditProfile/styles.css';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Form, Button } from 'antd';
import EditProfileNavigation from '../../components/EditProfileNavigavtion/EditProfileNavigavtion';
import EditProfileGeneral from '../../components/EditProfileGeneral/EditProfileGeneral';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import AvatarAndCoverImage from '../../components/AvatarAndCoverImage/AvatarAndCoverImage';
import EditPassWord from '../../components/EditPassWord/EditPassWord';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {Endpoint} from '../../api/endpoint';
import { login } from '../../redux/actions/userAction';

function EditProfileLayout() {
  const user = useSelector((state: RootState) => state.user);
  const [navigationEditProfile,setNavigationEditProfile] = useState(1); 
  const [urlCoverImage, setUrlCoverImage] = useState<any>(null);
  const [urlAvatar, setUrlAvatar] = useState<any>(null);
  const [avatar, setAvatar] = useState<any>(user.avatar);
  const [isValidUsername,setIsValidUsername] = useState(true);

  const validUsername = (bool: boolean) =>{
    setIsValidUsername(bool);
  }
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    let userEdited: any = null
    if (navigationEditProfile === 1) {
      if(isValidUsername === true){
        userEdited = {
          UserName: values.username || null,
          RealName: values.realName,
          Background: null,
          Avatar: null
        }
        postEditUser(userEdited);
      }else{
        window.alert('User name exited')
      }
    }else if (navigationEditProfile === 2){
      userEdited = {
        UserName: null,
        RealName: null,
        Background: urlCoverImage,
        Avatar: urlAvatar,
    }
      postEditUser(userEdited);
    }else{
      editPassword(values);
    }
  };

  const postEditUser = async (values: any) => {
    await axios
      .put(`${Endpoint.mainApi}api/user/change-info/${user.idUser}`,values,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
      })
    .then(res=>{
      dispatch(login(res.data));
      window.alert('Edit success');
      console.log(res);
    })
    .catch(err=>{window.alert('Edit fail');})
  }

  const editPassword = async (values: any) =>{
    console.log(values)
    if (values.newPassword !== values.comfirmPassword){
      window.alert('New password not compare confirm password');
    }else{
      await axios.post(`${Endpoint.mainApi}api/user/change-password`,{
        idUser: user.idUser,
        CurrentPass: values.oldPassword,
        NewPass: values.newPassword
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken")
        }
      }
      )
        .then(res=>{
          window.alert("Change password success!")
        })
        .catch(err=>{
          window.alert("Old password is not correct!")
        })
    }
  }

  const getUrlCoverImage = (url: string) =>{
    setUrlCoverImage(url);
  }

  const getUrlAvatar = (url: string) =>{
    setUrlAvatar(url);
  }

  const navigation = (index) =>{
    setNavigationEditProfile(index);
  }
  return (
    <div className='responsive-page-template-content'>
      <div className='page-edit-content'>
        <div className='profile-header'>
          <div className='profile-header-texture'>
            <div className='d-flex gap-20 align-center'>
              <Link to='/user/c1217ffe-de67-49fc-8515-eb6487b7dcda'>
                <div className='profile-header-avatar'>
                  <img src={avatar} alt='avatar' />
                </div>
              </Link>
              <div className='profile-small-header-text'>
                <Link
                  to='/user/c1217ffe-de67-49fc-8515-eb6487b7dcda'
                  className='white'>
                  <span className='fs-26'>{user.userName}</span>
                </Link>
                <span className='fs-16 gray-4 m-left-right-8'>»</span>
                <span>Edit Profile</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className='profile-edit'>
            <Row gutter={[48, 8]}>
              <Col xxl={6} xl={6} lg={4} md={4} sm={24} xs={24}>
                <EditProfileNavigation navigation={navigation}/>
              </Col>
              <Col xxl={18} xl={18} lg={20} md={20} sm={24} xs={24}>
                <Form
                  name='editProfile'
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  autoComplete='off'
                  layout="vertical"
                >
                  {
                    navigationEditProfile === 1 ?
                    <EditProfileGeneral validUsername={validUsername}/>
                    : navigationEditProfile === 2 ?
                    <AvatarAndCoverImage getUrlAvatar={getUrlAvatar} getUrlCoverImage={getUrlCoverImage}/>
                    : <EditPassWord/>
                  }
                  <Button type="primary" htmlType="submit" className="float-right">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileLayout;
