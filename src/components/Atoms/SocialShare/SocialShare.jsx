"use client";

import { Share } from "@phosphor-icons/react";
import "./SocialShare.css";

export default function SocialShare() {
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        // Usa a API de compartilhamento nativa
        await navigator.share(shareData);
      } else {
        // Fallback para navegadores que não suportam a API nativa
        alert(
          "Seu navegador não suporta o compartilhamento nativo. Por favor, copie a URL manualmente."
        );
      }
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  };

  return (
    <button
      className="inline-share-button"
      onClick={handleShare}
      aria-label="Compartilhar esta página"
    >
      <Share size={27} weight="regular" color="#d25b82" />
    </button>
  );
}
