import Carousel from "../../components/Carousel/Carousel";
import './Catalog.css'

const Catalog = () =>{
    return(
        <div>
            <Carousel nome="Novos Pets"/>
            <Carousel nome="Pets Especias"/>
            <Carousel nome="Pets mais Pacientes"/>
        </div>
    )
}

export default Catalog