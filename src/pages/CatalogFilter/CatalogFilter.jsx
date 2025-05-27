import { useState, useEffect } from 'react';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { useSearchParams } from 'react-router-dom';
import PagePet from "../../components/Organisms/PagePet/PagePet";
import './CatalogFilter.css';

const CatalogFilter = () => {
    const [searchParams] = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // Começa como true para mostrar loading inicial
    const petsPerPage = 20;

    // Pega o título da URL ou usa o título padrão
    const pageTitle = searchParams.get('title') || "Pets mais Pacientes";

    const petsMaisPacientes = [
        // Página 1 (1-20)
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
            name: "Thor",
            gender: "Macho",
            age: "1 ano",
        },
        {
            id: 4,
            image: "/assets/teste2.jpg",
            name: "Bella",
            gender: "Fêmea",
            age: "4 anos",
        },
        {
            id: 5,
            image: "/assets/teste.jpg",
            name: "Max",
            gender: "Macho",
            age: "6 meses",
        },
        {
            id: 6,
            image: "/assets/teste2.jpg",
            name: "Nina",
            gender: "Fêmea",
            age: "3 anos",
        },
        {
            id: 7,
            image: "/assets/teste.jpg",
            name: "Bob",
            gender: "Macho",
            age: "5 anos",
        },
        {
            id: 8,
            image: "/assets/teste2.jpg",
            name: "Mel",
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
            name: "Lola",
            gender: "Fêmea",
            age: "1 ano",
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
            id: 13,
            image: "/assets/teste.jpg",
            name: "Zeus",
            gender: "Macho",
            age: "4 anos",
        },
        {
            id: 14,
            image: "/assets/teste2.jpg",
            name: "Maya",
            gender: "Fêmea",
            age: "2 anos",
        },
        {
            id: 15,
            image: "/assets/teste.jpg",
            name: "Toby",
            gender: "Macho",
            age: "3 anos",
        },
        {
            id: 16,
            image: "/assets/teste2.jpg",
            name: "Sophie",
            gender: "Fêmea",
            age: "1 ano",
        },
        {
            id: 17,
            image: "/assets/teste.jpg",
            name: "Duke",
            gender: "Macho",
            age: "5 anos",
        },
        {
            id: 18,
            image: "/assets/teste2.jpg",
            name: "Mia",
            gender: "Fêmea",
            age: "9 meses",
        },
        {
            id: 19,
            image: "/assets/teste.jpg",
            name: "Charlie",
            gender: "Macho",
            age: "2 anos",
        },
        {
            id: 20,
            image: "/assets/teste2.jpg",
            name: "Lily",
            gender: "Fêmea",
            age: "4 anos",
        },
        // Página 2 (21-40)
        {
            id: 21,
            image: "/assets/teste.jpg",
            name: "Cooper",
            gender: "Macho",
            age: "3 anos",
        },
        {
            id: 22,
            image: "/assets/teste2.jpg",
            name: "Stella",
            gender: "Fêmea",
            age: "2 anos",
        },
        {
            id: 23,
            image: "/assets/teste.jpg",
            name: "Oliver",
            gender: "Macho",
            age: "1 ano",
        },
        {
            id: 24,
            image: "/assets/teste2.jpg",
            name: "Daisy",
            gender: "Fêmea",
            age: "5 anos",
        },
        {
            id: 25,
            image: "/assets/teste.jpg",
            name: "Tucker",
            gender: "Macho",
            age: "4 anos",
        },
        {
            id: 26,
            image: "/assets/teste2.jpg",
            name: "Molly",
            gender: "Fêmea",
            age: "6 anos",
        },
        {
            id: 27,
            image: "/assets/teste.jpg",
            name: "Bear",
            gender: "Macho",
            age: "3 anos",
        },
        {
            id: 28,
            image: "/assets/teste2.jpg",
            name: "Coco",
            gender: "Fêmea",
            age: "2 anos",
        },
        {
            id: 29,
            image: "/assets/teste.jpg",
            name: "Winston",
            gender: "Macho",
            age: "5 anos",
        },
        {
            id: 30,
            image: "/assets/teste2.jpg",
            name: "Penny",
            gender: "Fêmea",
            age: "1 ano",
        },
        {
            id: 31,
            image: "/assets/teste.jpg",
            name: "Milo",
            gender: "Macho",
            age: "2 anos",
        },
        {
            id: 32,
            image: "/assets/teste2.jpg",
            name: "Zoe",
            gender: "Fêmea",
            age: "4 anos",
        },
        {
            id: 33,
            image: "/assets/teste.jpg",
            name: "Jake",
            gender: "Macho",
            age: "3 anos",
        },
        {
            id: 34,
            image: "/assets/teste2.jpg",
            name: "Ruby",
            gender: "Fêmea",
            age: "2 anos",
        },
        {
            id: 35,
            image: "/assets/teste.jpg",
            name: "Leo",
            gender: "Macho",
            age: "5 anos",
        },
        {
            id: 36,
            image: "/assets/teste2.jpg",
            name: "Sadie",
            gender: "Fêmea",
            age: "3 anos",
        },
        {
            id: 37,
            image: "/assets/teste.jpg",
            name: "Oscar",
            gender: "Macho",
            age: "4 anos",
        },
        {
            id: 38,
            image: "/assets/teste2.jpg",
            name: "Maggie",
            gender: "Fêmea",
            age: "6 anos",
        },
        {
            id: 39,
            image: "/assets/teste.jpg",
            name: "Teddy",
            gender: "Macho",
            age: "1 ano",
        },
        {
            id: 40,
            image: "/assets/teste2.jpg",
            name: "Bailey",
            gender: "Fêmea",
            age: "2 anos",
        },
        // Página 3 (41-60)
        {
            id: 41,
            image: "/assets/teste.jpg",
            name: "Bentley",
            gender: "Macho",
            age: "3 anos",
        },
        {
            id: 42,
            image: "/assets/teste2.jpg",
            name: "Roxy",
            gender: "Fêmea",
            age: "4 anos",
        },
        {
            id: 43,
            image: "/assets/teste.jpg",
            name: "Murphy",
            gender: "Macho",
            age: "2 anos",
        },
        {
            id: 44,
            image: "/assets/teste2.jpg",
            name: "Willow",
            gender: "Fêmea",
            age: "1 ano",
        },
        {
            id: 45,
            image: "/assets/teste.jpg",
            name: "Sam",
            gender: "Macho",
            age: "5 anos",
        },
        {
            id: 46,
            image: "/assets/teste2.jpg",
            name: "Pepper",
            gender: "Fêmea",
            age: "3 anos",
        },
        {
            id: 47,
            image: "/assets/teste.jpg",
            name: "Bruno",
            gender: "Macho",
            age: "4 anos",
        },
        {
            id: 48,
            image: "/assets/teste2.jpg",
            name: "Rosie",
            gender: "Fêmea",
            age: "2 anos",
        },
        {
            id: 49,
            image: "/assets/teste.jpg",
            name: "Diesel",
            gender: "Macho",
            age: "6 anos",
        },
        {
            id: 50,
            image: "/assets/teste2.jpg",
            name: "Gracie",
            gender: "Fêmea",
            age: "3 anos",
        },
        {
            id: 51,
            image: "/assets/teste.jpg",
            name: "Luke",
            gender: "Macho",
            age: "4 anos",
        },
        {
            id: 52,
            image: "/assets/teste2.jpg",
            name: "Chloe",
            gender: "Fêmea",
            age: "2 anos",
        },
        {
            id: 53,
            image: "/assets/teste.jpg",
            name: "Gunner",
            gender: "Macho",
            age: "5 anos",
        },
        {
            id: 54,
            image: "/assets/teste2.jpg",
            name: "Emma",
            gender: "Fêmea",
            age: "1 ano",
        },
        {
            id: 55,
            image: "/assets/teste.jpg",
            name: "Finn",
            gender: "Macho",
            age: "3 anos",
        },
        {
            id: 56,
            image: "/assets/teste2.jpg",
            name: "Abby",
            gender: "Fêmea",
            age: "4 anos",
        },
        {
            id: 57,
            image: "/assets/teste.jpg",
            name: "Jack",
            gender: "Macho",
            age: "2 anos",
        },
        {
            id: 58,
            image: "/assets/teste2.jpg",
            name: "Nala",
            gender: "Fêmea",
            age: "5 anos",
        },
        {
            id: 59,
            image: "/assets/teste.jpg",
            name: "Atlas",
            gender: "Macho",
            age: "1 ano",
        },
        {
            id: 60,
            image: "/assets/teste2.jpg",
            name: "Hazel",
            gender: "Fêmea",
            age: "3 anos",
        }
    ];


    // Calcula o índice inicial e final dos pets para a página atual
    const indexOfLastPet = currentPage * petsPerPage;
    const indexOfFirstPet = indexOfLastPet - petsPerPage;
    const currentPets = petsMaisPacientes.slice(indexOfFirstPet, indexOfLastPet);

    // Carregamento inicial dos dados
    useEffect(() => {
        // Simula um carregamento inicial
        setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }, []);

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setIsLoading(true);
            setCurrentPage(prev => prev - 1);
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        }
    };

    const goToNextPage = () => {
        if (indexOfLastPet < petsMaisPacientes.length) {
            setIsLoading(true);
            setCurrentPage(prev => prev + 1);
            setTimeout(() => {
                setIsLoading(false);
            }, 300);
        }
    };

    const totalPages = Math.ceil(petsMaisPacientes.length / petsPerPage);

    return (
        <div className="conjunt-catalog">
            {isLoading ? (
                <div className="loading-spinner">
                    <div className="spinner" />
                </div>
            ) : (
                <>
                    <PagePet title={pageTitle} pets={currentPets} />
                    <div className="pagination-controls">
                        <button 
                            onClick={goToPreviousPage} 
                            disabled={currentPage === 1}
                            className="pagination-button"
                            aria-label="Página anterior"
                        >
                            <CaretLeft size={24} weight="bold" />
                        </button>
                        <span className="page-info">
                            Página {currentPage} de {totalPages}
                        </span>
                        <button 
                            onClick={goToNextPage} 
                            disabled={currentPage === totalPages}
                            className="pagination-button"
                            aria-label="Próxima página"
                        >
                            <CaretRight size={24} weight="bold" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CatalogFilter;