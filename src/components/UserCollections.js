import React, { useState, useEffect, useRef } from "react";
import CONFIG from "./Api";
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
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  LOADING: "LOADING",
};

const UserCollections = ({ lodead, setlodead }) => {
  const [collections, setcollections] = useState([]);

  const { id } = useParams();
  console.log("userCollections", collections);

  useEffect(() => {
    UserCollections();
  }, []);

  const UserCollections = () => {
    const s_appId = CONFIG.__APP_ID__;
    const p_baseUrl = `https://api.unsplash.com/users/${id}/collections`;
    const optionsUser = {
      params: {
        per_page: "150",
        client_id: s_appId,
      },
    };
    setlodead(LOAD_STATE.LOADING);

    axios
      .get(p_baseUrl, optionsUser)
      .then((response) => {
        setcollections(response.data);
        setlodead(LOAD_STATE.SUCCESS);
      })
      .catch(() => {
        setlodead(LOAD_STATE.ERROR);
      });
  };
console.log("tags",collections)
    


    return (
       
            
    <div className="swiper__page">
         {collections.map((i) => (
    <div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <div class="container-general">
        <Link to={`/usercolections/${i.title}/${i.id}`}><div class="gallery-wrap wrap-effect-1">
          {i.preview_photos.map((photo) => (
             <div class="item" style={{backgroundImage:`url(${photo.urls.regular})`}}></div>))}
        </div></Link>
                             <p style={{fontWeight:800}}>{i.title}</p>
                             <p style={{ color: "#676767" }}>{i.total_photos} photos .  Curated by{i.user.name}</p> {i.tags.slice(2, i.tags.length).map((tag)=> <div className="tags"><span>{tag.title}</span></div>)}   
                            
      </div>
    </div> 
                 </div>
                     
</div>))}
          
            </div>
               
  );
};



export default UserCollections;
