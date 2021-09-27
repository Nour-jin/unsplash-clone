import React, { useState, useEffect } from 'react'
import CONFIG from "./Api"
import FollowingList from './FollowingList'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import axios from "axios";




const Following = ({ userName, setFollo, follo, followers_count, following_Count }) => {
    const [page, setPage] = useState(1)


    useEffect(() => {
        fetchUsersFollowing()

    }, [userName])


  const useSwitch = () => {
    fetchUsersFollowing()
  }
    
  const useSwitchFollowing = () => {
    fetchUsersFollowers()
  }

    const fetchUsersFollowers = () => {
        
        const s_appId = CONFIG.__APP_ID__;
        const s_baseUrl = `https://api.unsplash.com/users/${userName}/followers`;
        const options = {
            params: {
                page:page,
                per_Page:"10",
            client_id: s_appId,
          },
        };
          axios
              .get(s_baseUrl, options)
              .then((response) => {
                setFollo(response.data)
                  
              })
              
              .catch(() => {});
      };


   let unreadMessages
    const fetchUsersFollowing = () => {
         unreadMessages = unreadMessages;
        const s_appId = CONFIG.__APP_ID__;
        const s_baseUrl = `https://api.unsplash.com/users/${userName}/following`;
        const options = {
            params: {
                page: page,
                per_Page:"10",
            client_id: s_appId
          },
        };
          axios
              .get(s_baseUrl, options)
              .then((response) => {
                  console.log(response)
                setFollo(response.data)
              })
              .catch(() => { });
    };

    const fetchMoreData = () => {
        setTimeout(() => {
            setPage(page + 1);
        }, 500);
    }
console.log(follo)
    return (
        <div>
         
            <button onClick={useSwitch}>Following {following_Count}</button>
            <button onClick={useSwitchFollowing}>Followers {followers_count}</button>
            <div className="profile__container">
                <button onClick={fetchMoreData}>lode more</button>
                
                {follo.map(i => <FollowingList user={i} />)}
            </div>
        </div>
    )
}

export default Following