import React, { useEffect, useState } from "react";
import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import Filter from "../../components/Atoms/Filter/Filter";
import "./Catalog.css";

const Catalog = () => {
  const [petsMaisPacientes, setPetsMaisPacientes] = useState([]);
  const [petsEspeciais, setPetsEspeciais] = useState([]);
  const [novosPets, setNovosPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPets, setFilteredPets] = useState({
    special: [],
    patient: [],
    new: [],
  });
  const [activeFilters, setActiveFilters] = useState({
    gender: [],
    size: [],
    age: [],
    health: [],
  });

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://centerpet-api.onrender.com/api/pets"
        );
        const data = await response.json();

        // Processando todos os pets para garantir formato consistente
        const processedPets = data.map((pet) => ({
          ...pet,
          id: pet._id,
          // Processando as imagens
          image:
            pet.image?.[0] ||
            pet.photos?.[0] ||
            pet.imagens?.[0] ||
            (Array.isArray(pet.image) && pet.image.length > 0
              ? pet.image[0]
              : null) ||
            "https://i.imgur.com/WanR0b3.png",
          // Processando as informações de saúde
          hasSpecialCondition:
            pet.health?.specialCondition &&
            pet.health.specialCondition.trim().toLowerCase() !== "nenhuma",
          specialCondition: pet.health?.specialCondition || "Nenhuma",
          vaccinated: pet.health?.vaccinated || false,
          castrated: pet.health?.castrated || false,
          dewormed: pet.health?.dewormed || false,
        }));

        // Pets Especiais: filtra os que têm condições especiais
        const especiais = processedPets.filter(
          (pet) => pet.hasSpecialCondition
        );
        setPetsEspeciais(especiais);

        // Pets Mais Pacientes: maiores waitingTime
        const pacientes = [...processedPets]
          .filter((pet) => !isNaN(Number(pet.waitingTime)))
          .sort((a, b) => Number(b.waitingTime) - Number(a.waitingTime))
          .slice(0, 10);
        setPetsMaisPacientes(pacientes);

        // Novos Pets: ordena por registerDate
        const novos = [...processedPets]
          .filter((pet) => pet.registerDate)
          .sort((a, b) => new Date(b.registerDate) - new Date(a.registerDate))
          .slice(0, 10);
        setNovosPets(novos);

        // Inicializa filteredPets com todos os pets iniciais
        setFilteredPets({
          special: especiais,
          patient: pacientes,
          new: novos,
        });
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
        setPetsEspeciais([]);
        setPetsMaisPacientes([]);
        setNovosPets([]);
        setFilteredPets({
          special: [],
          patient: [],
          new: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  // Efeito para aplicar filtros quando activeFilters mudar
  useEffect(() => {
    // Se não há filtros ativos, mostramos todos os pets originais
    if (Object.values(activeFilters).every((arr) => arr.length === 0)) {
      setFilteredPets({
        special: petsEspeciais,
        patient: petsMaisPacientes,
        new: novosPets,
      });
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

    // Aplicar filtros a cada categoria de pets
    setFilteredPets({
      special: petsEspeciais.filter(matchesFilters),
      patient: petsMaisPacientes.filter(matchesFilters),
      new: novosPets.filter(matchesFilters),
    });
  }, [activeFilters, petsEspeciais, petsMaisPacientes, novosPets]);

  // Handler para atualizar os filtros ativos
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="catalog-container">
      {/* Componente de filtro no início da página */}
      <div className="catalog-header">
        <Filter onFilterChange={handleFilterChange} />
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner" />
        </div>
      ) : (
        <>
          {/* PetShowcase para pets especiais */}
          <PetShowcase
            title="Pets Especiais"
            pets={filteredPets.special}
            category="special"
            limit={8} // Limitando para mostrar apenas 8 pets inicialmente
          />

          {/* PetShowcase para pets mais pacientes */}
          <PetShowcase
            title="Pets Mais Pacientes"
            pets={filteredPets.patient}
            category="more-patient"
            limit={8}
          />

          {/* PetShowcase para novos pets */}
          <PetShowcase
            title="Novos Pets"
            pets={filteredPets.new}
            category="new"
            limit={8}
          />
        </>
      )}
    </div>
  );
};

export default Catalog;
