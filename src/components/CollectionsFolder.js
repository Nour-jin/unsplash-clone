import React, { useState, useEffect } from 'react'
import CONFIG from "./Api"
import axios from "axios";
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

const CollectionsFolder = () => {

    const [photos, setPhotos] = useState([])
   
    const { idCollections, collectionsfolder } = useParams();
    


useEffect(() => {
    UserPhotos()
}, [ collectionsfolder])
    



   const UserPhotos = () => {
        const s_appId = CONFIG.__APP_ID__;
        const p_baseUrl = `https://api.unsplash.com/collections/${idCollections}/photos`;
        const optionsUser = {
          params: {
            per_page: "30",
            client_id: s_appId,
          },
        };
         
          
        axios
          .get(p_baseUrl, optionsUser)
            .then((response) => {
              console.log("collection id", response)
            setPhotos(response.data);
            
          })
            .catch(() => {});
}


    return (
        <div className="CollectionsFolder">
            <h1>{collectionsfolder}</h1>
            
            <div className="grid"> 
              {photos.map((i) => (
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
        ))}</div>
        </div>
    )
}

export default CollectionsFolder
