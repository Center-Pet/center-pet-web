import './ChatButton.css'
const ChatButton = () => {
  return (
    <button
        className="floating-help"
        aria-label="Ajuda ou Chat"
        onClick={() => alert('Em breve você poderá falar com a gente!')}
      >
        <i className="fas fa-comments"></i>
      </button>
      )
    }

export default ChatButton;