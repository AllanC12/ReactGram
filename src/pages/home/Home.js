import "./Home.css";

import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

import { getAllPhotos, like } from "../../slices/photoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { user } = useSelector((state) => state.auth);
  const { photos, photo, loading, error } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  const handleLike = (photo = null) => {
    dispatch(like(photo));
    resetMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="home">
      {photos &&
        photos.map((photo) => (
          <div key={photo._id}>
            <PhotoItem photo={photo} />
            <LikeContainer photo={photo} user={user} handleLike={handleLike} />
            <Link className="btn" to={`/photos/${photo._id}`}>
              Ver mais
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <div className="no-photos">
          <h2>
            Ainda não há fotos publicadas.{" "}
            <Link to={`/users/${user.id}`}>Clique Aqui!</Link>
          </h2>
        </div>
      )}
    </div>
  );
};

export default Home;
