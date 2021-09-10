import React from 'react';
import { API } from '../../backend';


const ImageHelper = ({product}) => {

 const  imageUrl = product ? `${API}/product/photo/${product._id}`: 
 `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?cs=srgb&dl=pexels-hitesh-choudhary-3561339.jpg&fm=jpg` 
    
    return (
        <div className="rounded  p-2">
            <img
              src={imageUrl}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%" }}
              className="mb-3 rounded"
            />
          </div>
    )
}

export default ImageHelper;
