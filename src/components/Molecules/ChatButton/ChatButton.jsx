import { ChatsCircle } from 'phosphor-react';
import './ChatButton.css'
const ChatButton = () => {
  return (
    <button
        className="floating-help"
        aria-label="Ajuda ou Chat"
        onClick={() => alert('Em breve você poderá falar com a gente!')}
      >
    <ChatsCircle/>
    </button>
      )
    }

export default ChatButton;