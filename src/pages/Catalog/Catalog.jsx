import { useState, useEffect } from "react";
import PetShowcase from "../../components/Organisms/PetShowcase/PetShowcase";
import TitleType from "../../components/Atoms/TitleType/TitleType";
import Filter from "../../components/Atoms/Filter/Filter";
import { getPets } from "../../services/petService";
import './Catalog.css';

const Catalog = () => {
  const [petsMaisPacientes, setPetsMaisPacientes] = useState([]);
  const [novosPets, setNovosPets] = useState([]);
  const [petsEspeciais, setPetsEspeciais] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setIsLoading(true);

        // Buscar pets pacientes
        const pacientes = await getPets('pacientes');
        setPetsMaisPacientes(pacientes);

        // Buscar pets novos
        const novos = await getPets('novos');
        setNovosPets(novos);

        // Buscar pets especiais
        const especiais = await getPets('especiais');
        setPetsEspeciais(especiais);

        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os pets:', error);
        setError('Não foi possível carregar os pets. Tente novamente mais tarde.');
        setIsLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (isLoading) {
    return <div className="loading">Carregando pets...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="conjunt-catalog">
      <div className="filter-container">
        <Filter />
      </div>
      <div className="catalog-header">

      </div>
      <PetShowcase title="Pets mais Pacientes" pets={petsMaisPacientes} />
      <div className="catalog-header">

      </div>
      <PetShowcase title="Novos Pets" pets={novosPets} />
      <div className="catalog-header">

      </div>
      <PetShowcase title="Pets Especiais" pets={petsEspeciais} />
    </div>
  );
};

export default Catalog;