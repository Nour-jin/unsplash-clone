import React, { useState, useEffect,useContext } from 'react'
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

const UserPhotos = ({lodead, setlodead }) => {

    const { photos, setPhotos } = useContext(PhotosContext)
    const [page, setpage] = useState(1);
    const [loadedCounter, setloadedCounter] = useState(1)
   
    const { id } = useParams();
    


useEffect(() => {
    UserPhotos()
}, [id, page])
    



   const UserPhotos = () => {
        const s_appId = CONFIG.__APP_ID__;
        const p_baseUrl = `https://api.unsplash.com/users/${id}/photos`;
        const optionsUser = {
            params: {
            page:page,
            per_page: "30",
            client_id: s_appId,
          },
        };
          setlodead(LOAD_STATE.LOADING)
          
        axios
          .get(p_baseUrl, optionsUser)
          .then((response) => {
            setPhotos([...photos,response.data]);
             setlodead(LOAD_STATE.SUCCESS)
          })
            .catch(() => {  setlodead(LOAD_STATE.ERROR)});
}

const fetchMoreData = () => {
    setTimeout(() => {
       
            setpage(page+1);
        
    }, 500);
   
// a fake async api call like which sends
// 20 more records in 1.5 secs
};
console.log("page photos", page)
    return (
        <div>
             <InfiniteScroll
          dataLength={photos.length}
         next={fetchMoreData}
          hasMore={true}
          scrollableTarget="scrollableDiv"
        >
              {photos.map(photos => photos.map((i) => (
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
              )))}
                </InfiniteScroll>
        </div>
    )
}


export default UserPhotos
