import "./LikeContainer.css"

import {BsHeart,BsHeartFill} from 'react-icons/bs'

const LikeContainer = ({photo,user,handleLike}) => {
  return (
    <div className="like-container">
        {photo.likes && user && (
            <>
                {photo.likes.includes(user.id) ? (
                    <BsHeartFill/>
                ) : (
                    <BsHeart onClick={() => handleLike(photo._id)}/>
                )}

                <p>{photo.likes.length} Like(s)</p>
            </>
        )}
    </div>
  )
}

export default LikeContainer