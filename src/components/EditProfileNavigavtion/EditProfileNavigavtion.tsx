import React from 'react';
import { Menu } from 'antd';
import "../../screens/EditProfile/styles.css";
const { SubMenu } = Menu;

interface EditProfileNavigationType{
    navigation: (index: any) => void;
}

function EditProfileNavigavtion({
    navigation
}:EditProfileNavigationType){
    const handleClick = (e) => {
        navigation(parseInt(e.key));
    };
    return (
        <div className="edit-profile-navigation">
            <Menu
                onClick={handleClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <Menu.Item key="1" className="hover-edit-profile-navigation">General</Menu.Item>
                <Menu.Item key="2" className="hover-edit-profile-navigation">Avatar And Cover Image</Menu.Item>
                <Menu.Item key="3" className="hover-edit-profile-navigation">Change Password</Menu.Item>
            </Menu>
        </div>
    )
}

export default EditProfileNavigavtion;