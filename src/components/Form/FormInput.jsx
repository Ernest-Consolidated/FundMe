import React, { useState } from "react";
import "./FormInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, onChange, errorMessage, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <div>
      <label htmlFor="mobile-or-email" className="sr-only">
        {label}
      </label>
      <input
        {...inputProps}
        onChange={onChange}
        className="block w-full focus:outline-0 shadow-sm sm:text-sm border-gray-300 rounded-md"
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className="text-xs text-red-600">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
