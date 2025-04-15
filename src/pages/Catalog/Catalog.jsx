import Carousel from "../../components/Organisms/Carousel/Carousel";
import TitleType from "../../components/Atoms/TitleType/TitleType";
import './Catalog.css'

const Catalog = () =>{
    return(
        <div className="conjunt-catalog">
            <div className="catalog-header">
                <TitleType>Pets mais Pacientes</TitleType>
            </div>
            <Carousel />
            <div className="catalog-header">
                <TitleType>Novos Pets</TitleType>
            </div>
            <Carousel/>
            <div className="catalog-header">
                <TitleType>Pets Especiais</TitleType>
            </div>
            <Carousel/>
        </div>
    )
}

export default Catalog