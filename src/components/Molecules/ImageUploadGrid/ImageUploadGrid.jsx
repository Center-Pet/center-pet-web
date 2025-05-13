import { useRef } from "react";
import "./ImageUploadGrid.css";

export default function ImageUploadGrid({
  images,
  onImageAdd,
  onImageDelete,
  maxImages = 6,
  mainImage = true,
}) {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const files = event.target.files;
    if (files && images.length < maxImages) {
      const newImage = URL.createObjectURL(files[0]);
      onImageAdd(newImage);
    }
  };

  const AddImageButton = ({ disabled }) => (
    <button
      type="button"
      className="add-image-button"
      onClick={() => fileInputRef.current?.click()}
      disabled={disabled}
    >
      +
    </button>
  );

  const ImageContainer = ({ src, index, onDelete }) => (
    <div className="image-container">
      <img
        src={src}
        alt={`Imagem ${index + 1}`}
        className={index === 0 && mainImage ? "main-image" : "uploaded-image"}
      />
      <button
        type="button"
        className="delete-image-button"
        onClick={() => onDelete(index)}
      >
        ×
      </button>
    </div>
  );

  return (
    <div className="image-upload-container">
      {/* Slot da Imagem Principal (se mainImage for true) */}
      {mainImage && (
        <div className="main-image-slot">
          {images.length > 0 ? (
            <ImageContainer
              src={images[0]}
              index={0}
              onDelete={onImageDelete}
            />
          ) : (
            <AddImageButton disabled={images.length >= maxImages} />
          )}
        </div>
      )}

      {/* Grid de imagens secundárias */}
      <div className="image-upload-grid">
        {[...Array(mainImage ? 5 : 6)].map((_, index) => {
          const imageIndex = mainImage ? index + 1 : index;

          return (
            <div key={imageIndex} className="image-upload-slot">
              {imageIndex < images.length ? (
                <ImageContainer
                  src={images[imageIndex]}
                  index={imageIndex}
                  onDelete={onImageDelete}
                />
              ) : (
                <AddImageButton disabled={images.length >= maxImages} />
              )}
            </div>
          );
        })}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: "none" }}
      />
    </div>
  );
}
