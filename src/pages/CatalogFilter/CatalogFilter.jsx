import { useState, useEffect } from "react";
import { CaretLeft, CaretRight } from "phosphor-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CardPet from "../../components/Molecules/CardPet/CardPet";
import Filter from "../../components/Atoms/Filter/Filter";
import Title from "../../components/Atoms/TitleType/TitleType";
import "./CatalogFilter.css";

const CatalogFilter = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const petsPerPage = 15;
  const navigate = useNavigate();

  // Pega parâmetros da URL
  const pageTitle = searchParams.get("title") || "Catálogo de Pets";
  const ongId = searchParams.get("ongId");
  const category = searchParams.get("category");

  // Estado para os filtros ativos
  const [activeFilters, setActiveFilters] = useState({
    gender: [],
    size: [],
    age: [],
    health: [],
  });

  useEffect(() => {
    const fetchPets = async () => {
      setIsLoading(true);
      try {
        // Definir o endpoint da API
        let apiUrl = "https://centerpet-api.onrender.com/api/pets";

        if (ongId) {
          // Se tiver ongId, busca pets da ONG específica
          apiUrl = `https://centerpet-api.onrender.com/api/pets/by-ong/${ongId}`;
        }

        // Fazer a requisição para a API
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`Erro ao buscar pets (${response.status})`);
        }

        // Processar os dados da resposta
        const data = await response.json();
        const petsArray = Array.isArray(data.data) ? data.data : data;

        // Processar os pets para garantir formato consistente
        const processedPets = petsArray.map((pet) => ({
          ...pet,
          id: pet._id,
          image:
            pet.image?.[0] ||
            pet.photos?.[0] ||
            pet.imagens?.[0] ||
            (Array.isArray(pet.image) && pet.image.length > 0
              ? pet.image[0]
              : null) ||
            "https://i.imgur.com/WanR0b3.png",
          // Processar atributos de saúde para filtragem
          hasSpecialCondition:
            pet.health?.specialCondition &&
            pet.health.specialCondition.trim().toLowerCase() !== "nenhuma",
          specialCondition: pet.health?.specialCondition || "Nenhuma",
          vaccinated: pet.health?.vaccinated || false,
          castrated: pet.health?.castrated || false,
          dewormed: pet.health?.dewormed || false,
        }));

        // Aplicar filtro com base na categoria da URL
        let filteredByCategory = processedPets;

        if (category) {
          switch (category) {
            case "special":
              // Filtrar pets com condição especial
              filteredByCategory = processedPets.filter(
                (pet) => pet.hasSpecialCondition
              );
              break;

            case "more-patient":
              // Filtrar e ordenar pets por tempo de espera (maior para menor)
              filteredByCategory = [...processedPets]
                .filter((pet) => !isNaN(Number(pet.waitingTime)))
                .sort((a, b) => Number(b.waitingTime) - Number(a.waitingTime));
              break;

            case "new":
              // Filtrar e ordenar pets por data de registro (mais recente primeiro)
              filteredByCategory = [...processedPets]
                .filter((pet) => pet.registerDate)
                .sort(
                  (a, b) => new Date(b.registerDate) - new Date(a.registerDate)
                );
              break;

            default:
              // Sem filtro especial
              break;
          }
        }

        setPets(filteredByCategory);
        setFilteredPets(filteredByCategory);
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
        setPets([]);
        setFilteredPets([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets();
  }, [ongId, category]);

  // Efeito para aplicar filtros do componente Filter
  useEffect(() => {
    // Se não há filtros ativos, mostra todos os pets da categoria
    if (Object.values(activeFilters).every((arr) => arr.length === 0)) {
      setFilteredPets(pets);
      setCurrentPage(1);
      return;
    }

    // Função para verificar se um pet passa pelos filtros ativos
    const matchesFilters = (pet) => {
      // Verificar filtro de gênero
      if (
        activeFilters.gender.length > 0 &&
        !activeFilters.gender.includes(pet.gender)
      ) {
        return false;
      }

      // Verificar filtro de porte
      if (activeFilters.size.length > 0) {
        const petSize = pet.size || "";
        const matches = activeFilters.size.some((filter) => {
          if (filter === "Pequeno Porte")
            return petSize.toLowerCase().includes("pequeno");
          if (filter === "Médio Porte")
            return (
              petSize.toLowerCase().includes("médio") ||
              petSize.toLowerCase().includes("medio")
            );
          if (filter === "Grande Porte")
            return petSize.toLowerCase().includes("grande");
          return false;
        });
        if (!matches) return false;
      }

      // Verificar filtro de idade
      if (activeFilters.age.length > 0) {
        const petAge = pet.age || "";
        const matches = activeFilters.age.some((filter) => {
          if (filter === "Filhote")
            return petAge.toLowerCase().includes("filhote");
          if (filter === "Jovem") return petAge.toLowerCase().includes("jovem");
          if (filter === "Adulto")
            return petAge.toLowerCase().includes("adulto");
          if (filter === "Idoso") return petAge.toLowerCase().includes("idoso");
          return false;
        });
        if (!matches) return false;
      }

      // Verificar filtros de saúde
      if (activeFilters.health.length > 0) {
        const matches = activeFilters.health.every((filter) => {
          if (filter === "Vacinado") return pet.vaccinated;
          if (filter === "Não Vacinado") return !pet.vaccinated;
          if (filter === "Vermifugado") return pet.dewormed;
          if (filter === "Não Vermifugado") return !pet.dewormed;
          if (filter === "Castrado") return pet.castrated;
          if (filter === "Não Castrado") return !pet.castrated;
          if (filter === "Condição Especial") return pet.hasSpecialCondition;
          return true;
        });
        if (!matches) return false;
      }

      return true;
    };

    // Aplicar filtros
    setFilteredPets(pets.filter(matchesFilters));
    setCurrentPage(1); // Resetar para primeira página ao aplicar filtros
  }, [activeFilters, pets]);

  // Paginação
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);
  const totalPages = Math.ceil(filteredPets.length / petsPerPage);

  // Handlers para navegação de página
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Handler para aplicação de filtros
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="conjunt-catalog">
      <div className="catalog-header">
        <div className="catalog-title-container">
          <Title>{pageTitle}</Title>
        </div>
        <div className="filter-container">
          <Filter onFilterChange={handleFilterChange} />
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner" />
        </div>
      ) : (
        <>
          <div className="page-pet-grid">
            {currentPets.length > 0 ? (
              currentPets.map((pet, index) => (
                <CardPet
                  key={index}
                  image={pet.image}
                  name={pet.name}
                  gender={pet.gender}
                  age={pet.age}
                  type={pet.type}
                  hasSpecialCondition={pet.hasSpecialCondition}
                  specialCondition={pet.specialCondition}
                  vaccinated={pet.vaccinated}
                  castrated={pet.castrated}
                  dewormed={pet.dewormed}
                  onClick={() => navigate(`/pet-info/${pet.id}`)}
                />
              ))
            ) : (
              <p className="no-pets-message">
                Nenhum pet encontrado com os filtros selecionados.
              </p>
            )}
          </div>

          {filteredPets.length > 0 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default CatalogFilter;
