import React from 'react'

const LikesList = ({img, useImg, userName}) => {
    return (
        <div>
            <div className= "grid__item card">
            <div className="card__body">
              <img src={{img}} alt="" />
            </div>
            <div className="card__footer media">
                    <img
                
                src={useImg}
                alt=""
                className="media__obj"
              />
              <div className="media__body">
                <a href="" target="_blank">
                  {userName}
                </a>
              </div>
            </div>
          </div>
        </div>
    )
}

export default LikesList
