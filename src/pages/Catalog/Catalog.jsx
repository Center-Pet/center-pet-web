import Carousel from "../../components/Carousel/Carousel";
import Navbar from "../../components/Navbar/Navbar";
import './Catalog.css'

const Catalog = () =>{
    return(
        <div>
            <Navbar/>
            <Carousel nome="Novos Pets"/>
            <Carousel nome="Pets Especias"/>
            <Carousel nome="Pets mais Pacientes"/>
        </div>
    )
}

export default Catalog