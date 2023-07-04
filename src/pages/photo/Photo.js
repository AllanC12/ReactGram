import "./Photo.css";

import { uploads } from "../../utils/config";

import Message from "../../components/Message";
import { Link } from "react-router-dom";
import PhotoItem from "../../components/PhotoItem";
import LikeContainer from "../../components/LikeContainer";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getPhoto, like, comment } from "../../slices/photoSlice";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

const Photo = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const {  photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  const handleLike = (photo) => {
    dispatch(like(photo));
    resetMessage();
  };

  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(comment(commentData));

    setCommentText("")

    resetMessage()


  };

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div id="photo">
      <PhotoItem photo={photo} />
      <LikeContainer photo={photo} user={user} handleLike={handleLike} />
      {error && <Message type="error" msg={message} />}
      {message && <Message type="success" msg={message} />}
      <div className="comments">
        {photo.comments && (
          <>
            <h3>Comentários: ({photo.comments.length}):</h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Insira seu comentário"
                onChange={(e) => setCommentText(e.target.value)}
                value={commentText || ''}
              />
              <input type="submit" value="Comentar" />
            </form>
            {photo.comments.length === 0 && <p>Não há comentários ainda...</p>}
            {photo.comments.map((comment) => (
              <div className="comment" key={comment.comment}>
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}

                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                  <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
