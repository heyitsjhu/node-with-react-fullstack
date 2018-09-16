import React from 'react';

// TODO: destructuring props parameter
// TODO: explain props.input that reduxForm passes into component
// and why we assign it to our custom input field.
export default ({ input, label }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};
