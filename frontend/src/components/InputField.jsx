import React from "react";

const InputField = ({ label, name, placeholder, type, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1 w-full mt-3 relative">
      <label className="font-medium text-sm capitalize" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full border border-slate-300 px-4 py-2 text-sm font-medium text-black placeholder:text-slate-400 focus:ring-1 focus:ring-secondary focus:outline-none focus:border-0 rounded-md"
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
