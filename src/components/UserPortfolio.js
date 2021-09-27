import React, { useState, useEffect } from 'react'
import CONFIG from "./Api"
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
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

const UserPortfolio = () => {

    const [Portfolio, setPortfolio] = useState([])
    const { id } = useParams();
    const [page, setpage] = useState(1);


useEffect(() => {
    UserPortfolio()
}, [id])


    const UserPortfolio = () => {
        
        const s_appId = CONFIG.__APP_ID__;
        const p_baseUrl = `https://api.unsplash.com/users/${id}/portfolio`;
        const optionsUser = {
            params: {
                page: page,
                per_page: "30",
                client_id: s_appId,
            },
        };
         
         
        axios
            .get(p_baseUrl, optionsUser)
            .then((response) => {
                console.log("portfolio",response)
                setPortfolio(response.data);
            })
    
            .catch(() => {  });
          }
  
    const fetchMoreData = () => {
        setTimeout(() => {
             setpage(page+1);
        }, 500);
       
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    };
    
    return (
        <div>
         
             
        </div>
    )
}




export default UserPortfolio
