import './CardPet.css'

const CardPet = () =>{
    return(
        <>
            <div className="card_pet">
                <div className="card_img_placeholder">
                    <img src="@/assets/teste.jpg" alt="Pet" />                </div>
                <h3>Nome do pet</h3>
                <p>Gênero: macho</p>
                <p>idade: 3 meses</p>
            </div>
        </>
    )
}

export default CardPet