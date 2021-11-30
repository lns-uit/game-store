import React from 'react';
import '../../screens/EditProfile/styles.css';
import { Row, Col } from 'antd';
import { Link } from 'react-router-dom';
import { Form } from 'antd';
import EditProfileNavigation from '../../components/EditProfileNavigavtion/EditProfileNavigavtion';
import EditProfileGeneral from '../../components/EditProfileGeneral/EditProfileGeneral';
<<<<<<< HEAD
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
=======
import AvatarAndCoverImage from '../../components/AvatarAndCoverImage/AvatarAndCoverImage';
>>>>>>> 5579a78b78d10ec27b9588c251dffcb9cb8c0f79

function EditProfileLayout() {
  const user = useSelector((state: RootState) => state.user);
  const avatar =
    'https://scr.vn/wp-content/uploads/2020/07/Avatar-Facebook-tr%E1%BA%AFng.jpg';

<<<<<<< HEAD
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  return (
    <div className='responsive-page-template-content'>
      <div className='page-edit-content'>
        <div className='profile-header'>
          <div className='profile-header-texture'>
            <div className='d-flex gap-20 align-center'>
              <Link to='/user/c1217ffe-de67-49fc-8515-eb6487b7dcda'>
                <div className='profile-header-avatar'>
                  <img src={avatar} alt='avatar' />
=======
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    return(
        <div className="responsive-page-template-content">
            <div className="page-edit-content">
                <div className="profile-header">
                    <div className="profile-header-texture">
                        <div className="d-flex gap-20 align-center">
                            <Link to="/user/c1217ffe-de67-49fc-8515-eb6487b7dcda">
                                <div className="profile-header-avatar">
                                    <img src={avatar} alt="avatar" />
                                </div>
                            </Link>
                            <div className="profile-small-header-text">
                                <Link to="/user/c1217ffe-de67-49fc-8515-eb6487b7dcda" className="white">
                                    <span className="fs-26">khoild11</span>
                                </Link>
                                <span className="fs-16 gray-4 m-left-right-8">»</span>
                                <span>Edit Profile</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="profile-edit">
                        <Row gutter={[48, 8]}>
                            <Col
                                xxl={6}
                                xl={6}
                                lg={4}
                                md={4}
                                sm={24}
                                xs={24}
                            >
                                <EditProfileNavigation/>
                            </Col>
                            <Col
                                xxl={18}
                                xl={18}
                                lg={20}
                                md={20}
                                sm={24}
                                xs={24}
                            >
                                <Form
                                    name="editProfile"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    autoComplete="off"
                                    layout= "vertical"
                                >
                                    {/* <EditProfileGeneral/> */}
                                    <AvatarAndCoverImage/>
                                </Form>
                            </Col>
                        </Row>
                    </div>
>>>>>>> 5579a78b78d10ec27b9588c251dffcb9cb8c0f79
                </div>
              </Link>
              <div className='profile-small-header-text'>
                <Link
                  to='/user/c1217ffe-de67-49fc-8515-eb6487b7dcda'
                  className='white'>
                  <span className='fs-26'>khoild11</span>
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
                <EditProfileNavigation />
              </Col>
              <Col xxl={18} xl={18} lg={20} md={20} sm={24} xs={24}>
                <Form
                  name='editProfile'
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 16 }}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  autoComplete='off'>
                  <EditProfileGeneral />
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
