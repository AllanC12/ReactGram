import "./Profile.css";

import { uploads } from "../../utils/config";

//components
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import Message from "../../components/Message";
import { Link } from "react-router-dom";

//hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//redux
import { getUserDetails } from "../../slices/userSlice";
import { publishPhoto,resetMessage } from "../../slices/photoSlice";

 const Profile = () => {
  const { id } = useParams();
  const { user, loading } = useSelector((state) => state.user);
  const { user: authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const {
    photos,
    loading: loadingPhoto,
    error: errorPhoto,
    message: messagePhoto,
  } = useSelector((state) => state.photo);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  const handleFile = (e) => {
    const image = e.target.files[0];
    setImage(image);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const photoData = {
      title,
      image,
    };

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    );

    formData.append("photo", photoFormData);

    dispatch(publishPhoto(formData))

    console.log(formData);

    setTitle("");
    
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>

      {id === authUser.id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu: </h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para a foto: </span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ""}
                />
              </label>

              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>

              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && <input type="submit" value="Aguarde..." disabled />}
              {errorPhoto && <Message msg={errorPhoto} type="error" />}
              {messagePhoto && <Message msg={messagePhoto} type="success" />}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
