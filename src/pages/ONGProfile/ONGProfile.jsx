import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase"
import TitleType from "../../components/Atoms/TitleType/TitleType"
import ButtonType from "../../components/Atoms/ButtonType/ButtonType"
import "./ONGProfile.css"

const pets = [
  {
    id: 1,
    image: "/assets/teste.jpg",
    name: "Rex",
    gender: "Macho",
    age: "3 meses",
  },
  {
    id: 2,
    image: "/assets/teste2.jpg",
    name: "Luna",
    gender: "Fêmea",
    age: "2 anos",
  },
  {
    id: 3,
    image: "/assets/teste.jpg",
    name: "Buddy",
    gender: "Macho",
    age: "5 anos",
  },
  {
    id: 4,
    image: "/assets/teste2.jpg",
    name: "Lucy",
    gender: "Fêmea",
    age: "8 meses",
  },
  {
    id: 2,
    image: "/assets/teste2.jpg",
    name: "Luna",
    gender: "Fêmea",
    age: "2 anos",
  },
  {
    id: 3,
    image: "/assets/teste.jpg",
    name: "Buddy",
    gender: "Macho",
    age: "5 anos",
  },
  {
    id: 4,
    image: "/assets/teste2.jpg",
    name: "Lucy",
    gender: "Fêmea",
    age: "8 meses",
  },
];

const ONGProfile = () => {
  return (
    <div className="ong-profile-container">
      <div className="profile-content">
        <TitleType>Perfil da ONG</TitleType>
        <div className="profile-header-container">
          <div className="profile-header">
              <img src="/assets/teste.jpg" alt="foto da ong"/>
            <div className="profile-header-main">
              <div className="profile-header-top-item">
                <div className="name-ong">
                  <TitleType color="#D14D72">Nome da ONG</TitleType>
                </div>
              </div>
              <div className="description-ong">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem esse iure ratione eius consequuntur ad, ab delectus sequi, hic, saepe explicabo. Impedit exercitationem suscipit quis, consequuntur, voluptatem voluptas ut facilis, amet corporis repellat sit iste!</p>
              </div>
              <div className="info-ong">
                <div className="info-ong-item">
                  <h3>Contato:</h3>
                  <p>+11 99388745</p>
                </div>
                <div className="info-ong-item">
                  <h3>Instagram:</h3>
                  <p>@igdaong</p>
                </div>
                <div className="info-ong-item">
                  <h3>Doações</h3>
                  <p>(11) olha o pix, olha o pix</p>
                </div>
              </div>
            </div>
          </div>
            <div className="profile-header-statistics">
              <div className="profile-header-statistics-item">
                <p>Pets adotados:</p>
                <p>10</p>
              </div>
              <div className="profile-header-statistics-item">
                <p>Pets disponíveis:</p>
                <p>5</p>
              </div>
            </div>
        </div>
      </div>

      <div className="carousel-container">
        <div className="carousel-content">
          <TitleType>Pets desta ONG disponíveis para adoção</TitleType>
          <PetShowcase pets={pets} />
        </div>
      </div>
    </div>
  )
}

export default ONGProfile
