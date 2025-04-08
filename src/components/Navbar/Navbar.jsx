import './Navbar.css'
import {useEffect} from 'react'


const Navbar = () =>{
    useEffect(()=>{
        const dropdown_button = document.querySelector('#dropdown_button')

        if(dropdown_button){
            dropdown_button.addEventListener("click", showDropdown)
        }
        return ()=>{
            if(dropdown_button){
                dropdown_button.removeEventListener('click', showDropdown)
            }
        }
    })
    
    const showDropdown = () =>{
        document.getElementById("filtros_dropdown").classList.toggle("show");
    }

    return(
        <>
            <header>
                <div className="brown_square"></div>
                <nav id='navbar'>
                <img id="logo" src="/assets/CenterPet.png" alt="Center Pet Logo" />                    <ul>
                        <li>
                            <a href="#">Catálogo</a>
                        </li>
                        <li>
                            <a href="#">ONGs</a>
                            </li>
                        <li>
                            <a href="#">Sobre nós</a>
                        </li>
                    </ul>
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
                </nav>
            </header>
        </>
    )
}

export default Navbar