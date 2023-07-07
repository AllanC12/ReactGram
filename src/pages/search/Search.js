import "./Search.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";

import LikeContainer from "../../components/LikeContainer";
import PhotoItem from "../../components/PhotoItem";
import { Link } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { searchPhotos, like } from "../../slices/photoSlice";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch);
  const { photos, loading } = useSelector((state) => state.photo);
  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(searchPhotos(search));
  }, [dispatch, search]);

  const handleLike = (photo) => {
    dispatch(like(photo));
    resetMessage();
  };

  return (
    <div id="search">
      <h2>Você está buscando por: {search}</h2>
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
            Não há resultados :(
            <Link to={`/users/${user.id}`}>Clique Aqui!</Link>
          </h2>
        </div>
      )}
    </div>
  );
};

export default Search;
