import { Pencil } from "lucide-react";
import "./UserCardHeader.css";

const UserCardHeader = ({ name }) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-image-container">
          <div className="profile-image">
            <img src="/assets/logo/CP.png" alt="Profile" />
          </div>
          <button className="edit-image-button">
            <Pencil size={16} />
          </button>
        </div>
        <div className="profile-name">
          <h2>Olá, {name}</h2>
        </div>
      </div>
    </div>
  );
};

export default UserCardHeader;