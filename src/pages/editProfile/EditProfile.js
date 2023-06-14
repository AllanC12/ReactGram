import "./EditProfile.css";

const EditProfile = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">
        Adiciona uma imagem de perfil e conte mais sobre você...
      </p>
      {/* Preview da imagem */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="text" placeholder="E-mail" disbled />
        <label>
          <span>Imagem do perfil</span>
          <input type="file" />
        </label>
        <label>
          <span>Bio</span>
          <input type="text" placeholder="Descrição do perfil" />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input type="text" placeholder="Digite sua nova senha" />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
};

export default EditProfile;
