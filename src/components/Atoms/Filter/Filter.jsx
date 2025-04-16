import './Filter.css';
import { useState } from 'react';

const Filter = () => {
    const [hasSelection, setHasSelection] = useState(false); // Estado para monitorar seleção
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar abertura do filter

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

    return (
        <div id="filter" className={hasSelection ? 'selected' : ''}>
            <button id="filter_button" onClick={toggleFilter}>Filtros</button>
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