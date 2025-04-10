import './Dropdown.css'

const Dropdown = ()=>{
    return(
        <div id="dropdown">
            <button id="dropdown_button">Dropdown</button>
            <div id="filtros_dropdown">
                <div className="filtro">
                    <input className="checkbox_filtro" type="checkbox" value=""/>
                    <p>Raça</p>
                </div>
                <div className="filtro">
                    <input className="checkbox_filtro" type="checkbox" value=""/>
                    <p>Pets Especiais</p>
                </div>
            </div>
        </div>
    )
}

export default Dropdown