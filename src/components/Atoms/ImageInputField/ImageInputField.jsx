import './ImageInputField.css'
import { useState } from 'react'

const ImageInputField = ()=>{


    const[srcImg, setSrcImg] = useState("")

    const loadImage = (value)=>{
        const inputTarget = value
        const file = inputTarget.files[0]
        if(file){
            const reader = new FileReader()

            reader.addEventListener('load', (e)=>{
                const readerTarget = e.target
                setSrcImg(readerTarget.result)
            })
            reader.readAsDataURL(file)
        }
        else{
            setSrcImg("")
        }
    }

    return(
        <div id='profile-image' tabIndex="0">
            <label className='picture' htmlFor="picture-input">
                <span className='picture_image'>
                    {!srcImg ? "Escolha uma imagem" : <img src={srcImg} id='profile-img'/>} 
                </span>
            </label>
            <input type="file" accept='image/*' id='picture-input' onChange={(e)=>{loadImage(e.target)}}/>
        </div>
    )
}

export default ImageInputField