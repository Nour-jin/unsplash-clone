import React, { Component } from 'react';
import Pagination from "./Pagination";
import axios from 'axios';
import CONFIG from "./Api"
///import './SearchBar.css';


 Pagination.defaultProps = {
        pageRange: 4
 };
 const LOAD_STATE = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
    LOADING: 'LOADING'
  };
class SearchBar extends Component {
    constructor() {
        super()
         this.state = {
            val: '',
            loadState: LOAD_STATE.LOADING
         }
        this.loadedCounter =0
    }
       
    
    
   
    onInputChange = (event) => {
        this.setState({ val: event.target.value })
    }



   
        

    searchPhotos(page) {
        const s_appId = CONFIG.__APP_ID__;
        const s_baseUrl = CONFIG.SEARCH_URL;
        var self = this.props;
        

        console.log(s_appId, s_baseUrl)
        const options = {
          params: {
            query: this.state.val,
            client_id: s_appId,
            page: page,
            per_page: self.perPage
          }
        }
        this.setState({ loadState: LOAD_STATE.LOADING });
        this.loadedCounter =0
        axios.get(s_baseUrl, options)
            .then((response) => {
              self.onSearchSubmit({
              photos: response.data.results,
              totalPhotos: parseInt(response.headers['x-total']),
              currentPage: page
          // loadState: LOAD_STATE.SUCCESS
            });
           
          
        })
        .catch(() => {
            this.setState({ loadState: LOAD_STATE.ERROR });
        }); 
    }
    
    onSubmitForm = (event) => {
        event.preventDefault();
        this.searchPhotos(this.props.currentPage)
    }
  
  

    render() {

        
        return (
            <div>
                <form onSubmit={this.onSubmitForm} className="format">
                    <input
                        className="inputStyle"
                        type="text"
                        value={this.state.val}
                        onChange={this.onInputChange}
                        placeholder="Search Photos"
                    />
                </form>
              
            </div>
        )
    }
}

export default SearchBar;
