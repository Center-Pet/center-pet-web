import './RegisterUser.css'
import ButtonType from '../../components/Atoms/ButtonType/ButtonType'
import InputField from '../../components/Atoms/InputField/InputField'
import { useState } from 'react'

// link para rota: <Route path="/register-user" element={<RegisterUser />} />
// import para página: import RegisterUser from '../pages/RegisterUser/RegisterUser'
const RegisterUser = ()=>{

    

    return(
        <>
            <h2>Cadastro</h2>
            <h3>Você é:</h3>
            <div className="options">
                <ButtonType type="submit" width={20} margin={29}>
                    ONG
                </ButtonType>
            </div>



        </>
    )
}

export default RegisterUser