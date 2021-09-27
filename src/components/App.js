import React, { Component } from "react";
import {PhotosProvider} from './PhotosContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Pagination from "./Pagination";
import List from "./List";
import axios from "axios";
import Navgation from "./Navgation";
import SearchForm from "./SearchBar";
import User from "./User";
import CollectionsFolder from './CollectionsFolder'



const LOAD_STATE = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  LOADING: "LOADING",
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      totalPhotos: 0,
      perPage: 20,
      currentPage: 1,
      loadState: LOAD_STATE.LOADING,
    };
    Pagination.defaultProps = {
      pageRange: 4,
    };
    this.loadedCounter = 0;
  }

  componentDidMount() {
    this.fetchPhotos(this.state.currentPage);
  }

  checkPhotosLoaded() {
    this.loadedCounter++;
    console.log(this.state.photos.length, this.loadedCounter);
    if (this.state.photos.length == this.loadedCounter) {
      console.log("all photos is loding");
      setTimeout(() => {
        this.setState({
          loadState: LOAD_STATE.SUCCESS,
        });
      }, 600);
    }
  }

  fetchPhotos(page) {
    var self = this;
    const { perPage } = this.state;
    const { appId, baseUrl } = this.props;
    const options = {
      params: {
        client_id: appId,
        page: page,
        per_page: perPage,
      },
    };

    this.setState({ loadState: LOAD_STATE.LOADING });
    this.loadedCounter = 0;
    console.log(this.loadedCounter);
    axios
      .get(baseUrl, options)
      .then((response) => {
        self.onSearchSubmit({
          photos: response.data,
          totalPhotos: parseInt(response.headers["x-total"]),
          currentPage: page,
          // loadState: LOAD_STATE.SUCCESS
        });
      })
      .catch(() => {
        this.setState({ loadState: LOAD_STATE.ERROR });
      });
  }

  onSearchSubmit = (dataState) => {
    this.setState({
      photos: dataState.photos,
      totalPhotos: dataState.totalPhotos,
      currentPage: dataState.currentPage,
    });
    console.log(this.photos);
  };

  render() {
    return (
     
      <Router>
      <PhotosProvider>
          <Navgation
            loadedCounter={this.loadedCounter}
            currentPage={this.state.currentPage}
            perPage={this.state.perPage}
            loadState={this.state.loadState}
            onSearchSubmit={this.onSearchSubmit}
          />

          <Switch> 
            <Route
              path="/user/:id"
              render={() => (
                <User
                  loadedCounter={this.loadedCounter}
                  currentPage={this.state.currentPage}
                  perPage={this.state.perPage}
                  loadState={this.state.loadState}
                  onSearchSubmit={this.onSearchSubmit}
                />
              )}
          />
          

            <Route path="/" exact>
              <Pagination
                current={this.state.currentPage}
                total={this.state.totalPhotos}
                perPage={this.state.perPage}
                onPageChanged={this.fetchPhotos.bind(this)}
              />
              {this.state.loadState === LOAD_STATE.LOADING && (
                <div className="loader"></div>
              )}
              <List
                loadState={this.state.loadState}
                checkPhotosLoaded={this.checkPhotosLoaded.bind(this)}
                data={this.state.photos}
            />
            
          </Route>
         
          </Switch> <Route path="/usercolections/:collectionsfolder/:idCollections/">
            <CollectionsFolder/>
          </Route>
      </PhotosProvider>
        </Router>
      
    );
  }
}

export default App;
