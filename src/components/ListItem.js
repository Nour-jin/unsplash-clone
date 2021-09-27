import React from 'react'
import {Link} from 'react-router-dom'
/*photo.user.portfolio_url*/
const ListItem = ({ photo, checkPhotosLoaded, loadState }) => {

  const checkPhotoSize = (e) => {
    const interval = setInterval(() => {
      if (e.target.complete && e.target.naturalHeight !== 0) {
        clearInterval(interval)
        checkPhotosLoaded()
        
    }
      console.log(" checking")
  },(16))
}

console.log("itemList",photo.id)

  console.log(loadState)
  return (
    <>
    
      <div className= {loadState === "SUCCESS" ? "grid__item card" :"hidden"} key={photo.id} >
        <div className="card__body" >
          <img src={photo.urls.small} alt="" />
        </div>
        <div className="card__footer media" >
          <img key={photo.id} onLoad={checkPhotoSize} src={photo.user.profile_image.small} alt="" className="media__obj" />
          <div className="media__body" >
            <Link to={`/user/${photo.user.username}`}>{ photo.user.name }</Link>
          </div>
        </div>
      </div>
      </>
    )
}
  
export default ListItem