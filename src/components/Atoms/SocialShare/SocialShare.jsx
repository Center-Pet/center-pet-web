"use client";

import React from 'react';
import { Share } from "@phosphor-icons/react";
import "./SocialShare.css";
import Swal from 'sweetalert2';

const SocialShare = ({ url, title }) => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url
        });
      } catch {
        console.error("Erro ao compartilhar conteúdo");
        Swal.fire({
          icon: 'error',
          title: 'Erro ao compartilhar',
          text: 'Não foi possível compartilhar o conteúdo.',
          confirmButtonColor: '#D14D72'
        });
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Compartilhar',
        text: 'Copie o link para compartilhar: ' + url,
        confirmButtonColor: '#D14D72'
      });
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
};

export default SocialShare;
