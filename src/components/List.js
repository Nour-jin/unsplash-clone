import React from 'react';
import ListItem from "./ListItem";

const List = ({ data, checkPhotosLoaded, loadState }) => {
  console.log("data", data)
 
  var items = data.map(photo => <ListItem loadState={loadState}  checkPhotosLoaded={checkPhotosLoaded} key={photo.id} photo={photo}/> );
    return (
      <div className="grid">
        { items }
      </div>
    )
}
  
export default List