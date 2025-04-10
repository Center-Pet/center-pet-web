import React from "react";
import "./InputField.css";

const InputField = ({ type, placeholder, value, onChange, required }) => {
  return (
    <div className="input-field">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="form-input"
      />
    </div>
  );
};

export default InputField;