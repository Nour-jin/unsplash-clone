import React, { useState, useEffect, useContext } from 'react'
import CONFIG from "./Api"
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import {PhotosContext} from './PhotosContext'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
} from "react-router-dom";
  
const LOAD_STATE = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    LOADING: 'LOADING'
};

const UserLikes = ({ lodead, setlodead }) => {
   
    const { likes, setLikes } = useContext(PhotosContext)
    const [page, setpage] = useState(1);
    const { id } = useParams();
   

useEffect(() => {
    UserLikes()
},[id, page])
console.log("cotext ",likes)
    const UserLikes = () => {
        
        const s_appId = CONFIG.__APP_ID__;
        const p_baseUrl = `https://api.unsplash.com/users/${id}/likes`;
        const optionsUser = {
            params: {
            page:page,
            per_page: "30",
            client_id: s_appId,
          },
        };
          setlodead(LOAD_STATE.LOADING)
             if (likes.length ) {
                   return
                  
           }
        axios
          .get(p_baseUrl, optionsUser)
            .then((response) => {
                console.log("data length", response.headers["x-total"]);
                console.log("new data likes Array", response)
          
                setLikes([...likes,...response.data]);
             setlodead(LOAD_STATE.SUCCESS)
          }) 
            .catch(() => {  setlodead(LOAD_STATE.ERROR)});
         
        }
       
        
        console.log("likes length", likes.length);
    const fetchMoreData = () => {
        setTimeout(() => {
                setpage(page+1);
        }, 500);
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    };
   
    

console.log("page",likes.data)
    return (
        <div>
            <InfiniteScroll
          dataLength={likes.length}
         next={fetchMoreData}
          hasMore={true}
          scrollableTarget="scrollableDiv"
        >
           {likes.map((i) => (
        <div className= "grid__item card">
            <div className="card__body">
              <img src={i.urls.small} alt="" />
            </div>
            <div className="card__footer media">
                    <img
                
                src={i.user.profile_image.medium}
                alt=""
                className="media__obj"
              />
              <div className="media__body">
                <a href="" target="_blank">
                  {i.user.username}
                </a>
              </div>
            </div>
          </div>
        ))}
        </InfiniteScroll>
             
        </div>
    )
}

export default UserLikes
