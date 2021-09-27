import React from 'react';
import { Route } from 'react-router';
import SearchForm from './SearchBar';


const Navgation = ({ onSearchSubmit, loadState, perPage, currentPage, loadedCounter }) => {
    console.log("lodead app",loadedCounter)
    return (
        <div className="navBar_Countaner">
            <img className="imgLogo" src='' alt="" />
        <Route path="/" exact>
                <h1>PHoToS <span>By JiN</span></h1>
            </Route>
            <Route path="/user/">
                <h1>PHoToS Users <span>By JiN</span></h1>
        </Route>
            <SearchForm
                loadedCounter={loadedCounter}
                 currentPage={currentPage}
                perPage={perPage}
                loadState={loadState}
                onSearchSubmit={onSearchSubmit}
            />
        </div>
    )
}

export default Navgation
