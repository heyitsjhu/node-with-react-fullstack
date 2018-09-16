import React from 'react';

// TODO: destructuring props parameter
// TODO: explain props.input that reduxForm passes into component
// and why we assign it to our custom input field.
// TODO: explain meta prop from reduxForm (validations, touch, etc)
export default ({ input, label, meta: { error, touched } }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      {touched && (
        <span
          className="red-text"
          style={{ display: 'block', marginBottom: '10px', fontSize: '12px' }}
        >
          {error}
        </span>
      )}
    </div>
  );
};
