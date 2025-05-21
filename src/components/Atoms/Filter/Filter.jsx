import { Sliders } from 'phosphor-react';
import './Filter.css';
import { useState, useEffect, useRef } from 'react';

const Filter = () => {
    const [hasSelection, setHasSelection] = useState(false); // Estado para monitorar seleção
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar abertura do filtro
    const filterRef = useRef(null); // Referência para o elemento do filtro

    const categories = {
        Gênero: ["Fêmea", "Macho"],
        Porte: ["Grande Porte", "Médio Porte", "Pequeno Porte"],
        Idade: ["Filhote", "Jovem", "Adulto", "Idoso"],
        Saúde: ["Vacinado", "Não Vacinado", "Vermifugado", "Não Vermifugado", "Castrado", "Não Castrado", "Condição Especial"]
    };

    const handleCheckboxChange = () => {
        // Verifica se pelo menos um checkbox está selecionado
        const anyChecked = document.querySelectorAll('.checkbox_filtro:checked').length > 0;
        setHasSelection(anyChecked);
    };

    const toggleFilter = () => {
        setIsOpen(!isOpen); // Alterna o estado de abertura
    };

    const handleClickOutside = (event) => {
        // Verifica se o clique foi fora do filtro
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setIsOpen(false); // Fecha o filtro
        }
    };

    useEffect(() => {
        // Adiciona o evento de clique ao documento
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Remove o evento ao desmontar o componente
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div id="filter" className={hasSelection ? 'selected' : ''} ref={filterRef}>
            <button id="filter_button" onClick={toggleFilter}>
            <Sliders size={25}/> Filtros
            </button>
            <div id="filtros_filter" className={isOpen ? 'show' : ''}>
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
                                            id={`switch-${category}-${idx}`}
                                            onChange={handleCheckboxChange} // Chama a função ao alterar o estado do switch
                                        />
                                        <span className="slider"></span>
                                    </label>
                                    <label htmlFor={`switch-${category}-${idx}`} className="switch-label">
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filter;