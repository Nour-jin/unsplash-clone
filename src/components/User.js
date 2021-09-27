import React, { useEffect, useState, useContext } from "react";
import CONFIG from "./Api"
import UserPhotos from "./UserPhotos";
import UserLikes from "./UserLikes";
import Following from "./Following";
import UserCollections from './UserCollections'
import UserPortfolio from './UserPortfolio'
import { PhotosProvider, PhotosContext } from './PhotosContext'

import { withRouter } from "react-router-dom";
import {Route, Link, useParams,} from "react-router-dom";
import axios from "axios";

const LOAD_STATE = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  LOADING: "LOADING",
};

const User = () => {
    const [user, setUser] = useState({ profile_image: {}, badge: {} });
    const [follo, setFollo] = useState([]);
    const [lodead, setlodead] = useState(LOAD_STATE.LOADING);
    const [loadedCounter, setloadedCounter] = useState(1);
    const { id } = useParams();

    

  useEffect(() => {
    fetchUser();
  }, [id]);


  const fetchUser = () => {
    const s_appId = CONFIG.__APP_ID__;
    const s_baseUrl = `https://api.unsplash.com/users/${id}`;
    const options = {
      params: {
        client_id: s_appId,
      },
    };
    setlodead(LOAD_STATE.LOADING);
    axios
      .get(s_baseUrl, options)
      .then((response) => {
        
        setUser(response.data);
        setlodead(LOAD_STATE.SUCCESS);
      })

      .catch(() => {
        setlodead(LOAD_STATE.ERROR);
      });
  };


  return (
   
  <>
        {lodead === LOAD_STATE.LOADING && <div className="loader"></div>}
        <div className="user__contaner">
          <img src={user.profile_image.large} alt="" />

          <div className="user__Header">
           
            <h1>{user.name}</h1>
 <h6>{user.username}</h6>
            <p className="bio__user">{user.bio}</p>
            <p>{user.location}</p>
       
            
            
           
          </div>
        </div>
          <Following follo={follo} setFollo={setFollo} userName={user.username} followers_count={user.followers_count} following_Count={user.following_count} />
         
          <div className="switch_Countaner">
              <Link to={`/user/${user.username}`}> <h3>Photos Users <span>{user.total_photos}</span></h3></Link>
              <Link to={`/user/userlikes/${user.username}`}> <h3>Likes <span>{user.total_likes}</span> </h3> </Link>
              <Link to={`/user/usercollections/${user.username}`}> <h3>Collections <span>{user.total_collections}</span> </h3> </Link>
          </div>
          <UserPortfolio/>
         

          <div className="grid"> 
          <Route path="/user/:id/" exact>
            <UserPhotos
              setlodead={setlodead}
              lodead={lodead}
              setloadedCounter={setloadedCounter}
            />
          </Route>
          <Route path="/user/userlikes/:id">
            <UserLikes
              setlodead={setlodead}
              lodead={lodead}
              setloadedCounter={setloadedCounter}
            /> 
              </Route>
          </div>
          <Route path="/user/usercollections/:id">
              <UserCollections
              setlodead={setlodead}
              lodead={lodead}
              setloadedCounter={setloadedCounter}
            />
          </Route>  
         
          
  </>
    
  );
};

export default User;
