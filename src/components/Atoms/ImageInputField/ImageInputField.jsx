import './ImageInputField.css';
import { useState } from 'react';

const ImageInputField = ({ onImageChange }) => {
  const [srcImg, setSrcImg] = useState("");

  const loadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSrcImg(event.target.result);
      };
      reader.readAsDataURL(file);
      onImageChange(file); // envia o arquivo para o componente pai
    } else {
      setSrcImg("");
      onImageChange(null);
    }
  };

  return (
    <div id='profile-image' tabIndex="0">
      <label className='picture' htmlFor="picture-input">
        <span className='picture_image'>
          {!srcImg ? "Escolha uma imagem" : <img src={srcImg} id='profile-img' />}
        </span>
      </label>
      <input type="file" accept="image/*" id="picture-input" onChange={loadImage} />
    </div>
  );
};

export default ImageInputField;
