import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";
import './Catalog.css'

const Catalog = () =>{
    return(
        <div>
            <Navbar/>
            {/*}

            <div id="filtro_pesquisa">
                <input id="barra_pesquisa" type="text" />
            </div>
            {*/}
            <Carousel nome="Novos Pets"/>
            <Carousel nome="Pets Especias"/>
            <Carousel nome="Pets mais Pacientes"/>
        </div>
    )
}

export default Catalog