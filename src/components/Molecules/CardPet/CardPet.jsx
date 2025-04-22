import './CardPet.css';

const CardPet = ({ image, name, gender, age, onClick }) => {
    return (
        <div className="card_pet" onClick={onClick}>
            <div className="card_img_placeholder">
                <img src={image} alt={`Imagem de ${name}`} />
            </div>
            <div className="card_pet_info">
                <h3 className="card_pet_name">{name}</h3> {/* Exibe o nome do pet */}
                <p className="card_pet_detail">Gênero: {gender}</p>
                <p className="card_pet_detail">Idade: {age}</p>
            </div>
        </div>
    );
};

export default CardPet;