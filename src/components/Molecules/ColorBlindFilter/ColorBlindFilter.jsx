import { useState, useEffect } from 'react';
import './ColorBlindFilter.css'; // Importando o CSS para estilização

const FILTERS = {
    normal: 'none',
    protanopia: 'url(#protanopia)',
    deuteranopia: 'url(#deuteranopia)',
    tritanopia: 'url(#tritanopia)',
    grayscale: 'grayscale(100%)'
  };  

export default function ColorBlindFilter() {
  const [filter, setFilter] = useState('normal');

  useEffect(() => {
    document.documentElement.style.filter = FILTERS[filter];
  }, [filter]);

  return (
    <div id="colorblind-controls">
      <select
        aria-label="Select color filter"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="normal">Normal</option>
        <option value="protanopia">Protanopia</option>
        <option value="deuteranopia">Deuteranopia</option>
        <option value="tritanopia">Tritanopia</option>
        <option value="grayscale">Grayscale</option>
      </select>
    </div>
  );
}
