import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from '../Form/Field';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './_formSchema';

class SurveyForm extends Component {
  renderFields() {
    // reduxForm passes Field props to custom componemt
    return FIELDS.map(({ label, name }) => (
      <Field
        key={name}
        label={label}
        type="text"
        name={name}
        component={SurveyField}
      />
    ));
  }

  render() {
    // explain how reduxForm provides a handleSubmit function to the form
    // where you can pass in a custom callback and retrieve the form's data
    // via the values parameter
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}

          <Link to="/dashboard" className="btn-flat red white-text">
            Cancel
          </Link>
          <button type="submit" className="btn-flat right teal white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients);

  FIELDS.forEach(({ name, error }) => {
    if (!values[name]) {
      errors[name] = error;
    }
  });

  return errors;
};

// explain redux form function and options object
// explain why destryoOnUnmount: false saves the data
// and why not declaring this in the New component
// will let use clear the data when unmounted
// this is related to toggling between child elements
// while still within a parent component that uses
// redux-form. For example, we only navigated between Form and
// Review while within New. When we do this, we tell it not
// to clear the data. But once we're done with the form altogether
// --for example, when we leave the New compoennt, then we clear it out
export default reduxForm({
  form: 'surveyForm',
  validate,
  destroyOnUnmount: false
})(SurveyForm);
