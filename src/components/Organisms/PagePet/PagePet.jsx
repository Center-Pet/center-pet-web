import CardPet from "../../Molecules/CardPet/CardPet";
import { useNavigate } from "react-router-dom";
import "./PagePet.css";

const PagePet = ({ title, pets }) => {
  const navigate = useNavigate();

  const handleCardClick = (petId) => {
    navigate(`/pet-info/${petId}`);
  };

  return (
    <div className="page-pet-container">
      <h2 className="page-pet-title">{title}</h2>
      <div className="page-pet-grid">
        {pets.map((pet, index) => (
          <CardPet
            key={index}
            image={pet.image}
            name={pet.name}
            gender={pet.gender}
            age={pet.age}
            onClick={() => handleCardClick(pet.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PagePet;