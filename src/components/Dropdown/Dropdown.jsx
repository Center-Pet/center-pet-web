import './Dropdown.css';
import { useState } from 'react';

const Dropdown = () => {
    const [hasSelection, setHasSelection] = useState(false); // Estado para monitorar seleção
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar abertura do dropdown

    const options = [
        "Fêmea", "Macho", "Grande Porte", "Médio Porte", "Pequeno Porte",
        "Cachorro", "Gato", "Filhote", "Adulto", "Idoso",
        "Vacinado", "Não Vacinado", "Vermifugado", "Não Vermifugado",
        "Castrado", "Não Castrado", "Condição Especial"
    ];

    const handleCheckboxChange = () => {
        // Verifica se pelo menos um checkbox está selecionado
        const anyChecked = document.querySelectorAll('.checkbox_filtro:checked').length > 0;
        setHasSelection(anyChecked);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen); // Alterna o estado de abertura
    };

    return (
        <div id="dropdown" className={hasSelection ? 'selected' : ''}>
            <button id="dropdown_button" onClick={toggleDropdown}>Dropdown</button>
            <div id="filtros_dropdown" className={isOpen ? 'show' : ''}>
                {options.map((option, index) => (
                    <div className="filtro" key={index}>
                        <input
                            className="checkbox_filtro"
                            type="checkbox"
                            value={option}
                            id={`checkbox-${index}`}
                            onChange={handleCheckboxChange} // Chama a função ao alterar o estado do checkbox
                        />
                        <label htmlFor={`checkbox-${index}`}>{option}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dropdown;