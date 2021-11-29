import React from 'react';
import "./styles.css";
import ProfileUserLayout from "../../layout/ProfileUserLayout/ProfileUserLayout";
import CollectionLayoit from "../../layout/CollectionLayout/CollectionLayout";
import CollectionLayout from '../../layout/CollectionLayout/CollectionLayout';

function User(){
    return(
        <div className="relative min-height-inherit">
            <div className="min-height-inherit d-flex column">
                <div className="min-height-inherit min-width-0 d-flex column">
                    <div className="min-height-inherit d-flex column relative">
                        <ProfileUserLayout />
                        <CollectionLayout />
                   </div>
                </div>
            </div>
        </div>
    )
}

export default User;