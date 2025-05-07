import React, { useState } from "react";
import "./PhotoGallery.css"; // Adicione seu CSS aqui

const PhotoGallery = ({ maxImages = 5, onImageChange }) => {
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));

    // Verifica se o limite será excedido
    if (images.length + newImages.length > maxImages) {
      alert(`Você pode adicionar no máximo ${maxImages} imagens.`);
      return;
    }

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);

    // Atualiza o estado no formulário pai
    if (onImageChange) {
      onImageChange(updatedImages.map((img) => img.file));
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);

    // Atualiza o estado no formulário pai
    if (onImageChange) {
      onImageChange(updatedImages.map((img) => img.file));
    }
  };

  return (
    <div>
      <div className="image-upload">
        {images.length < maxImages && (
          <>
            <button
              type="button" // Adicionado para evitar o comportamento padrão de envio
              onClick={() => document.getElementById("image-input").click()}
              style={{ cursor: "pointer", display: "block", marginBottom: "10px" }}
            >
              Clique para adicionar imagens +
            </button>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </>
        )}
        {images.length >= maxImages && (
          <p style={{ color: "red" }}>Limite de {maxImages} imagens atingido.</p>
        )}
      </div>
      <div className="gallery">
        {images.map((image, index) => (
          <div key={index} className="image-preview" style={{ display: "inline-block", margin: "10px", position: "relative" }}>
            <img
              src={image.url}
              alt={`Preview ${index}`}
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
            />
            <button
              type="button" // Adicionado para evitar o comportamento padrão de envio
              onClick={() => handleRemoveImage(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                width: "20px",
                height: "20px",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;