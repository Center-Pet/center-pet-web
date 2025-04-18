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
                <img src="/assets/icons/filter.png" alt="Filtro" className='filter-icon'/>
                Filtros
            </button>
            <div id="filtros_filter" className={isOpen ? 'show' : ''}>
                {Object.entries(categories).map(([category, options], index) => (
                    <div className="filtro-categoria" key={index}>
                        <h4 className="filtro-categoria-titulo">{category}</h4>
                        <div className="filtro-opcoes">
                            {options.map((option, idx) => (
                                <div className="filtro" key={idx}>
                                    <input
                                        className="checkbox_filtro"
                                        type="checkbox"
                                        value={option}
                                        id={`checkbox-${category}-${idx}`}
                                        onChange={handleCheckboxChange} // Chama a função ao alterar o estado do checkbox
                                    />
                                    <label htmlFor={`checkbox-${category}-${idx}`}>{option}</label>
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