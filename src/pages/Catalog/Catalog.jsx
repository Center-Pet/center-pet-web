import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import TitleType from "../../components/Atoms/TitleType/TitleType";
import Filter from "../../components/Atoms/Filter/Filter";
import './Catalog.css';

const Catalog = () => {
    const petsMaisPacientes = [
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
        name: "Rex",
        gender: "Macho",
        age: "3 meses",
      },
      {
        id: 4,
        image: "/assets/teste2.jpg",
        name: "Luna",
        gender: "Fêmea",
        age: "2 anos",
      },
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
        name: "Rex",
        gender: "Macho",
        age: "3 meses",
      },
      {
        id: 4,
        image: "/assets/teste2.jpg",
        name: "Luna",
        gender: "Fêmea",
        age: "2 anos",
      },
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
        name: "Rex",
        gender: "Macho",
        age: "3 meses",
      },
      {
        id: 4,
        image: "/assets/teste2.jpg",
        name: "Luna",
        gender: "Fêmea",
        age: "2 anos",
      },
      {
        id: 9,
        image: "/assets/teste.jpg",
        name: "Buddy",
        gender: "Macho",
        age: "5 anos",
      },
      {
        id: 10,
        image: "/assets/teste2.jpg",
        name: "Daisy",
        gender: "Fêmea",
        age: "3 anos",
      },
      {
        id: 11,
        image: "/assets/teste.jpg",
        name: "Rocky",
        gender: "Macho",
        age: "7 anos",
      },
      {
        id: 12,
        image: "/assets/teste2.jpg",
        name: "Lucy",
        gender: "Fêmea",
        age: "8 meses",
      },
      {
        id: 9,
        image: "/assets/teste.jpg",
        name: "Buddy",
        gender: "Macho",
        age: "5 anos",
      },
      {
        id: 10,
        image: "/assets/teste2.jpg",
        name: "Daisy",
        gender: "Fêmea",
        age: "3 anos",
      },
      {
        id: 11,
        image: "/assets/teste.jpg",
        name: "Rocky",
        gender: "Macho",
        age: "7 anos",
      },
      {
        id: 12,
        image: "/assets/teste2.jpg",
        name: "Lucy",
        gender: "Fêmea",
        age: "8 meses",
      },
    ];

    const novosPets = [
      {
        id: 5,
        image: "/assets/teste.jpg",
        name: "Max",
        gender: "Macho",
        age: "1 ano",
      },
      {
        id: 6,
        image: "/assets/teste2.jpg",
        name: "Bella",
        gender: "Fêmea",
        age: "6 meses",
      },
      {
        id: 7,
        image: "/assets/teste.jpg",
        name: "Charlie",
        gender: "Macho",
        age: "2 anos",
      },
      {
        id: 8,
        image: "/assets/teste2.jpg",
        name: "Molly",
        gender: "Fêmea",
        age: "4 meses",
      },
      {
        id: 5,
        image: "/assets/teste.jpg",
        name: "Max",
        gender: "Macho",
        age: "1 ano",
      },
      {
        id: 6,
        image: "/assets/teste2.jpg",
        name: "Bella",
        gender: "Fêmea",
        age: "6 meses",
      },
      {
        id: 9,
        image: "/assets/teste.jpg",
        name: "Buddy",
        gender: "Macho",
        age: "5 anos",
      },
      {
        id: 10,
        image: "/assets/teste2.jpg",
        name: "Daisy",
        gender: "Fêmea",
        age: "3 anos",
      },
      {
        id: 11,
        image: "/assets/teste.jpg",
        name: "Rocky",
        gender: "Macho",
        age: "7 anos",
      },
      {
        id: 12,
        image: "/assets/teste2.jpg",
        name: "Lucy",
        gender: "Fêmea",
        age: "8 meses",
      },
      {
        id: 7,
        image: "/assets/teste.jpg",
        name: "Charlie",
        gender: "Macho",
        age: "2 anos",
      },
      {
        id: 8,
        image: "/assets/teste2.jpg",
        name: "Molly",
        gender: "Fêmea",
        age: "4 meses",
      },
      {
        id: 5,
        image: "/assets/teste.jpg",
        name: "Max",
        gender: "Macho",
        age: "1 ano",
      },
      {
        id: 6,
        image: "/assets/teste2.jpg",
        name: "Bella",
        gender: "Fêmea",
        age: "6 meses",
      },
      {
        id: 7,
        image: "/assets/teste.jpg",
        name: "Charlie",
        gender: "Macho",
        age: "2 anos",
      },
      {
        id: 8,
        image: "/assets/teste2.jpg",
        name: "Molly",
        gender: "Fêmea",
        age: "4 meses",
      },
      {
        id: 5,
        image: "/assets/teste.jpg",
        name: "Max",
        gender: "Macho",
        age: "1 ano",
      },
      {
        id: 6,
        image: "/assets/teste2.jpg",
        name: "Bella",
        gender: "Fêmea",
        age: "6 meses",
      },
      {
        id: 7,
        image: "/assets/teste.jpg",
        name: "Charlie",
        gender: "Macho",
        age: "2 anos",
      },
      {
        id: 8,
        image: "/assets/teste2.jpg",
        name: "Molly",
        gender: "Fêmea",
        age: "4 meses",
      },
      {
        id: 9,
        image: "/assets/teste.jpg",
        name: "Buddy",
        gender: "Macho",
        age: "5 anos",
      },
      {
        id: 10,
        image: "/assets/teste2.jpg",
        name: "Daisy",
        gender: "Fêmea",
        age: "3 anos",
      },
      {
        id: 11,
        image: "/assets/teste.jpg",
        name: "Rocky",
        gender: "Macho",
        age: "7 anos",
      },
      {
        id: 12,
        image: "/assets/teste2.jpg",
        name: "Lucy",
        gender: "Fêmea",
        age: "8 meses",
      },
      {
        id: 9,
        image: "/assets/teste.jpg",
        name: "Buddy",
        gender: "Macho",
        age: "5 anos",
      },
      {
        id: 10,
        image: "/assets/teste2.jpg",
        name: "Daisy",
        gender: "Fêmea",
        age: "3 anos",
      },
      {
        id: 11,
        image: "/assets/teste.jpg",
        name: "Rocky",
        gender: "Macho",
        age: "7 anos",
      },
      {
        id: 12,
        image: "/assets/teste2.jpg",
        name: "Lucy",
        gender: "Fêmea",
        age: "8 meses",
      },
    ];

    const petsEspeciais = [
      {
        id: 9,
        image: "/assets/teste.jpg",
        name: "Buddy",
        gender: "Macho",
        age: "5 anos",
      },
      {
        id: 10,
        image: "/assets/teste2.jpg",
        name: "Daisy",
        gender: "Fêmea",
        age: "3 anos",
      },
      {
        id: 11,
        image: "/assets/teste.jpg",
        name: "Rocky",
        gender: "Macho",
        age: "7 anos",
      },
      {
        id: 12,
        image: "/assets/teste2.jpg",
        name: "Lucy",
        gender: "Fêmea",
        age: "8 meses",
      },
      {
        id: 9,
        image: "/assets/teste.jpg",
        name: "Buddy",
        gender: "Macho",
        age: "5 anos",
      },
      {
        id: 10,
        image: "/assets/teste2.jpg",
        name: "Daisy",
        gender: "Fêmea",
        age: "3 anos",
      },
      {
        id: 11,
        image: "/assets/teste.jpg",
        name: "Rocky",
        gender: "Macho",
        age: "7 anos",
      },
      {
        id: 12,
        image: "/assets/teste2.jpg",
        name: "Lucy",
        gender: "Fêmea",
        age: "8 meses",
      },
      {
        id: 9,
        image: "/assets/teste.jpg",
        name: "Buddy",
        gender: "Macho",
        age: "5 anos",
      },
      {
        id: 10,
        image: "/assets/teste2.jpg",
        name: "Daisy",
        gender: "Fêmea",
        age: "3 anos",
      },
      {
        id: 11,
        image: "/assets/teste.jpg",
        name: "Rocky",
        gender: "Macho",
        age: "7 anos",
      },
      {
        id: 12,
        image: "/assets/teste2.jpg",
        name: "Lucy",
        gender: "Fêmea",
        age: "8 meses",
      },
      {
        id: 9,
        image: "/assets/teste.jpg",
        name: "Buddy",
        gender: "Macho",
        age: "5 anos",
      },
      {
        id: 10,
        image: "/assets/teste2.jpg",
        name: "Daisy",
        gender: "Fêmea",
        age: "3 anos",
      },
      {
        id: 11,
        image: "/assets/teste.jpg",
        name: "Rocky",
        gender: "Macho",
        age: "7 anos",
      },
      {
        id: 12,
        image: "/assets/teste2.jpg",
        name: "Lucy",
        gender: "Fêmea",
        age: "8 meses",
      },
      {
        id: 9,
        image: "/assets/teste.jpg",
        name: "Buddy",
        gender: "Macho",
        age: "5 anos",
      },
      {
        id: 10,
        image: "/assets/teste2.jpg",
        name: "Daisy",
        gender: "Fêmea",
        age: "3 anos",
      },
      {
        id: 11,
        image: "/assets/teste.jpg",
        name: "Rocky",
        gender: "Macho",
        age: "7 anos",
      },
      {
        id: 12,
        image: "/assets/teste2.jpg",
        name: "Lucy",
        gender: "Fêmea",
        age: "8 meses",
      },
    ];

    return (
        <div className="catalog-container">
            <PetShowcase 
                title="Cachorros" 
                pets={petsMaisPacientes} 
                category="dogs" 
            />
            <PetShowcase 
                title="Gatos" 
                pets={novosPets} 
                category="cats" 
            />
            <PetShowcase 
                title="Pets Especiais" 
                pets={petsEspeciais} 
                category="special" 
            />
        </div>
    );
};

export default Catalog;