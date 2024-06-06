import React from "react";

const InputTag = ({ label, name, type, value, onChange }) => {
  return (
    <div className="inputCon">
      <label className="labelTag">{label}</label>
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
