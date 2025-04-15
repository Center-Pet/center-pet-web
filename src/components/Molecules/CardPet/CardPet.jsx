import './CardPet.css';

const CardPet = ({ image, name, gender, age }) => {
    return (
        <div className="card_pet">
            <div className="card_img_placeholder">
                <img src={image} alt={`Imagem de ${name}`} />
            </div>
            <div className="card_pet_info">
                <h3 className="card_pet_name">{name}</h3>
                <p className="card_pet_detail">Gênero: {gender}</p>
                <p className="card_pet_detail">Idade: {age}</p>
            </div>
        </div>
    );
};

export default CardPet;