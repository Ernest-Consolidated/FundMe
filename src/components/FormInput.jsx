import React from "react";

const FormInput = (props) => {
  const { label, onChange, id, ...inputProps } = props;
  return (
    <div>
      <label htmlFor="mobile-or-email" className="sr-only">
        {label}
      </label>
      <input
        {...inputProps}
        onChange={onChange}
        className="block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  );
};

export default FormInput;
