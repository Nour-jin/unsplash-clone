import React from 'react';
import {
    BrowserRouter as Router,
    Link,
  } from "react-router-dom";

const FollowingList = ({user}) => {
    return (
        

           <Link to={`/user/${user.username}`}><div class="profile__card">
           <img src={user.profile_image.large} alt="profile-image" class="profile"/>
           <h5 className="user__name">{user.name}</h5>
       </div>
    </Link>
     
    )
}

export default FollowingList
