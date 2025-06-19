import { Sliders } from "phosphor-react";
import "./Filter.css";
import { useState, useEffect, useRef } from "react";

// Adicionamos uma prop onFilterChange para comunicar os filtros selecionados
const Filter = ({ onFilterChange }) => {
  const [hasSelection, setHasSelection] = useState(false); // Estado para monitorar seleção
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar abertura do filtro
  const filterRef = useRef(null); // Referência para o elemento do filtro
  const [selectedFilters, setSelectedFilters] = useState({
    gender: [],
    size: [],
    age: [],
    health: [],
    coat: [], // Nova categoria para pelagem
    status: [], // Adicionando status
  });

  const categories = {
    Gênero: ["Fêmea", "Macho"],
    Porte: ["Grande Porte", "Médio Porte", "Pequeno Porte"],
    Idade: ["Filhote", "Jovem", "Adulto", "Idoso"],
    Pelagem: ["Curta", "Média", "Longa", "Sem pelo"], // Alterado para corresponder ao cadastro
    Saúde: [
      "Vacinado",
      "Não Vacinado",
      "Vermifugado",
      "Não Vermifugado",
      "Castrado",
      "Não Castrado",
      "Condição Especial",
    ],
    Status: ["Disponível", "Indisponível", "Aguardando", "Adotado"], // Adicionando status
  };

  // Mapeamento das categorias para as chaves usadas no estado
  const categoryKeys = {
    Gênero: "gender",
    Porte: "size",
    Idade: "age",
    Pelagem: "coat",
    Saúde: "health",
    Status: "status", // Adicionando status
  };

  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    const category = event.target.getAttribute("data-category");
    const categoryKey = categoryKeys[category];

    setSelectedFilters((prev) => {
      let updatedFilters = { ...prev };

      if (checked) {
        // Adiciona o filtro
        updatedFilters[categoryKey] = [...updatedFilters[categoryKey], value];
      } else {
        // Remove o filtro
        updatedFilters[categoryKey] = updatedFilters[categoryKey].filter(
          (item) => item !== value
        );
      }

      return updatedFilters;
    });
  };

  // Efeito para atualizar os filtros para o componente pai quando houver mudanças
  useEffect(() => {
    const anyChecked = Object.values(selectedFilters).some(
      (arr) => arr.length > 0
    );
    setHasSelection(anyChecked);

    // Notifica o componente pai (Catalog) sobre a mudança nos filtros
    if (onFilterChange) {
      onFilterChange(selectedFilters);
    }
  }, [selectedFilters, onFilterChange]);

  const toggleFilter = () => {
    setIsOpen(!isOpen); // Alterna o estado de abertura
  };

  const handleClickOutside = (event) => {
    // Verifica se o clique foi fora do filtro
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setIsOpen(false); // Fecha o filtro
    }
  };

  // Função para limpar todos os filtros
  const clearFilters = () => {
    setSelectedFilters({
      gender: [],
      size: [],
      age: [],
      health: [],
      coat: [],
      status: [], // Limpar status também
    });

    // Desmarcar todos os checkboxes
    document.querySelectorAll(".switch-input").forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  useEffect(() => {
    // Adiciona o evento de clique ao documento
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove o evento ao desmontar o componente
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="filter" className={hasSelection ? "selected" : ""} ref={filterRef}>
      <button id="filter_button" onClick={toggleFilter}>
        <Sliders size={25} /> Filtros
        {hasSelection && (
          <span className="filter-count">
            {Object.values(selectedFilters).flat().length}
          </span>
        )}
      </button>
      <div id="filtros_filter" className={isOpen ? "show" : ""}>
        {Object.entries(categories).map(([category, options], index) => (
          <div className="filtro-categoria" key={index}>
            <h3 className="filtro-categoria-titulo">{category}</h3>
            <div className="filtro-opcoes">
              {options.map((option, idx) => (
                <div className="filtro" key={idx}>
                  <label className="switch">
                    <input
                      className="switch-input"
                      type="checkbox"
                      value={option}
                      data-category={category}
                      id={`switch-${category}-${idx}`}
                      onChange={handleCheckboxChange}
                      checked={
                        selectedFilters[categoryKeys[category]]?.includes(
                          option
                        ) || false
                      }
                    />
                    <span className="slider"></span>
                  </label>
                  <label
                    htmlFor={`switch-${category}-${idx}`}
                    className="switch-label"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        {hasSelection && (
          <div className="filtro-acoes">
            <button className="limpar-filtros" onClick={clearFilters}>
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;
