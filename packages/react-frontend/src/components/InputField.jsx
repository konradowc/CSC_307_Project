import React from "react";

const InputField = ({ label, value, onChange }) => (
  <div className="input-field">
    <label>{label}</label>
    <input value={value} onChange={onChange} />
  </div>
);

export default InputField;
