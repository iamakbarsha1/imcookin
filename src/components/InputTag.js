import React from "react";

const InputTag = ({ label, name, type, value, onChange }) => {
  return (
    <div className="inputCon">
      <label
        className={` ${
          label === "Enter your email address*"
            ? "mb-2 text-base text-cyan-300 tracking-wide"
            : "labelTag"
        }`}
      >
        {label}
      </label>
      <input
        className="inputTag"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputTag;
