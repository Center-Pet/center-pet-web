import "./UserCardDetails.css";

const UserCardDetails = ({
  cpf,
  email,
  telefone,
  localizacao,
  endereco,
  tipoMoradia,
  moradiaTelada,
  petsAdotados,
  adotanteSeguro,
}) => {
  return (
    <div className="profile-details">
      <div className="profile-info-grid">
        <div className="info-label">CPF:</div>
        <div className="info-value">{cpf}</div>

        <div className="info-label">Email:</div>
        <div className="info-value">{email}</div>

        <div className="info-label">Telefone:</div>
        <div className="info-value">{telefone}</div>

        <div className="info-label">Localização:</div>
        <div className="info-value">{localizacao}</div>

        <div className="info-label">Endereço:</div>
        <div className="info-value">{endereco}</div>

        {/* <div className="info-label">Tipo de Moradia:</div>
        <div className="info-value">{tipoMoradia}</div>

        <div className="info-label">Moradia telada:</div>
        <div className="info-value">{moradiaTelada}</div>

        <div className="info-label">Pets Adotados:</div>
        <div className="info-value">{petsAdotados}</div>

        <div className="info-label">Adotante Seguro:</div>
        <div className="info-value">{adotanteSeguro}</div> */}
      </div>
    </div>
  );
};

export default UserCardDetails;