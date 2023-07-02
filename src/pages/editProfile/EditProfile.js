import "./EditProfile.css";

import { uploads } from "../../utils/config";

//hooks
import { useResetComponentMessage } from "../../hooks/useResetComponentMessage";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import Message from "../../components/Message";

import { profile, updateProfile, resetMessage} from "../../slices/userSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const resetMessage = useResetComponentMessage(dispatch)
  const { user, loading, error, message } = useSelector((state) => state.user);

 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleFile = (e) => {
    const image = e.target.files[0];
    
    setPreviewImage(image);
    setProfileImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    const formData = new FormData();

    const userFormData = Object.keys(userData).forEach((key) =>
      formData.append(key, userData[key])
    );

    formData.append("user", userFormData);

    await dispatch(updateProfile(formData));

    resetMessage()
  };

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setBio(user.bio);
    }
  }, [user]);

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adiciona uma imagem de perfil e conte mais sobre você...
      </p>

      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage)
              : `${uploads}/users/${user.profileImage}`
          }
          alt={user.name}
        />
      )}
        

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="text" placeholder="E-mail" disabled value={email || ""} />
        <label>
          <span>Imagem do perfil</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio</span>
          <input
            type="text"
            placeholder="Descrição do perfil"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input
            type="text"
            placeholder="Digite sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
