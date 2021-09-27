import React,{useState, createContext} from 'react'


export const PhotosContext = createContext();


export const PhotosProvider = props => {
    const [likes, setLikes,] = useState([]);
    const [photos, setPhotos] = useState([]);
 


    return (
        <PhotosContext.Provider value={{likes, setLikes, photos, setPhotos}}>
           {props.children}
        </PhotosContext.Provider >
   );
}

 
