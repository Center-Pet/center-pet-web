import ButtonType from "../../components/ButtonType/ButtonType";
import TitleType from "../../components/TitleType/TitleType";
import "./TestDraft.css";

const TestDraft = () => {
  return (
    <div className="profile-page">
      <div className="profile-content">
        <TitleType>Enzo viado demais</TitleType>
      </div>
        <ButtonType color="#D14D72">Botão Vermelho</ButtonType>
        <ButtonType color="#4CAF50">Botão Verde</ButtonType>
        <ButtonType color="#2196F3">Botão Azul</ButtonType>
    </div>
  );
};

export default TestDraft;