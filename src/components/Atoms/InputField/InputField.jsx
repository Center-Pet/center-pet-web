import React from "react";
import "./InputField.css";

const InputField = ({ type, placeholder, value, onChange, required, width, margin, padding }) => {
  return (
    <div className="input-field">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="form-input"
        style={{ width: width, margin: margin, padding:padding }}

      />
    </div>
  );
};

export default InputField;