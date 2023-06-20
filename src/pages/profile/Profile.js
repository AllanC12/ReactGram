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

const Profile = () => {
  const { id } = useParams();
  const { user, loading } = useSelector((state) => state.user);
  const { user: authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const newPhotoForm = useRef();
  const editPhotoForm = useRef();

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

 
  const handleSubmit = (e) => {};

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
              <form onSubmit={handleSubmit}>
                <label>
                  <span>Título para a foto: </span>
                  <input type="text" placeholder="Insira um título" />
                </label>

                <label>
                  <span>Imagem:</span>
                  <input type="file" />
                </label>

                <input type="submit" value="Postar" />
              </form>
            </div>
          </>
        )}
    </div>
  );
};

export default Profile;
