import React from "react";
import { Eye, EyeSlash } from "phosphor-react";
import "./CustomInput.css";

const CustomInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  className = "",
  isPassword = false,
  showPassword,
  toggleShowPassword,
  error = "",
  name,
  id,
  maxLength,
  minLength,
  disabled = false,
  autoComplete = "on",
}) => {
  return (
    <div className="custom-input-container">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`custom-input ${className} ${error ? "input-error" : ""}`}
        required={required}
        name={name}
        id={id}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {isPassword && (
        <button
          type="button"
          className="custom-toggle-button"
          onClick={toggleShowPassword}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <EyeSlash size={20} weight="bold" />
          ) : (
            <Eye size={20} weight="bold" />
          )}
        </button>
      )}
    </div>
  );
};

export default CustomInput;