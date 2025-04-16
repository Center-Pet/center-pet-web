"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons"

export default function SocialShare() {
  const shareLinks = [
    {
      name: "Facebook",
      icon: <FontAwesomeIcon icon={faFacebookF} size="lg" color="#9ca3af" />,
      url: "https://www.facebook.com/sharer/sharer.php?u=",
    },
    {
      name: "Twitter",
      icon: <FontAwesomeIcon icon={faTwitter} size="lg" color="#9ca3af" />,
      url: "https://twitter.com/intent/tweet?url=",
    },
    {
      name: "Instagram",
      icon: <FontAwesomeIcon icon={faInstagram} size="lg" color="#9ca3af" />,
      url: "https://www.instagram.com/",
    },
    {
      name: "YouTube",
      icon: <FontAwesomeIcon icon={faYoutube} size="lg" color="#9ca3af" />,
      url: "https://www.youtube.com/",
    },
  ]

  const handleShare = (url) => {
    window.open(url + window.location.href, "_blank")
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="#1e4e76"
          stroke="#1e4e76"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span className="font-medium text-[#1e4e76] text-lg">Share:</span>
      </div>
      <div className="flex items-center gap-4">
        {shareLinks.map((link, index) => (
          <button
            key={index}
            onClick={() => handleShare(link.url)}
            className="hover:opacity-80 transition-opacity"
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
