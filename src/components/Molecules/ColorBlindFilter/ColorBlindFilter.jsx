import { useState, useEffect } from 'react';
import SvgColorBlindFilters from './SvgColorBlindFilters';
import './ColorBlindFilter.css';

const FILTERS = {
  padrao: 'none',
  protanomalia: 'url(#protanomalia)',
  protanopia: 'url(#protanopia)',
  deuteranomalia: 'url(#deuteranomalia)',
  deuteranopia: 'url(#deuteranopia)',
  tritanomalia: 'url(#tritanomalia)',
  tritanopia: 'url(#tritanopia)',
  acromatopsia: 'url(#acromatopsia)',
  grayscale: 'grayscale(100%)'
};

const FILTER_NAMES = {
  padrao: 'Padrão',
  protanomalia: 'Protanomalia',
  protanopia: 'Protanopia',
  deuteranomalia: 'Deuteranomalia',
  deuteranopia: 'Deuteranopia',
  tritanomalia: 'Tritanomalia',
  tritanopia: 'Tritanopia',
  acromatopsia: 'Acromatopsia',
  grayscale: 'Escala de cinza'
};

export default function ColorBlindFilter() {
  const [filter, setFilter] = useState('padrao');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.filter = FILTERS[filter];
  }, [filter]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <>
      <SvgColorBlindFilters />
      <div id="colorblind-controls" className={isOpen ? 'open' : ''}>
        <button 
          className="colorblind-toggle"
          aria-label="Opções de acessibilidade visual"
          onClick={toggleDropdown}
          title="Filtros para daltonismo"
        >
          👁️
        </button>
        
        {isOpen && (
          <div className="colorblind-dropdown">
            <h3 className="dropdown-title">Filtros de Visão</h3>
            <div className="filter-options">
              {Object.keys(FILTERS).map(filterType => (
                <button
                  key={filterType}
                  className={`filter-option ${filter === filterType ? 'active' : ''}`}
                  onClick={() => {
                    setFilter(filterType);
                  }}
                  aria-pressed={filter === filterType}
                >
                  {FILTER_NAMES[filterType]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}