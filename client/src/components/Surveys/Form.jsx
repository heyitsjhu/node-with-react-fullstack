import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from '../Form/Field';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  {
    label: 'Survey Title',
    name: 'title',
    error: 'You must provide a title'
  },
  {
    label: 'Subject Line',
    name: 'subject',
    error: 'You must provide a subject'
  },
  {
    label: 'Email Body',
    name: 'body',
    error: 'You must provide a body'
  },
  {
    label: 'Recipient List',
    name: 'emails',
    error: 'You must provide a list of recipients'
  }
];

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
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

  errors.emails = validateEmails(values.emails);

  FIELDS.forEach(({ name, error }) => {
    if (!values[name]) {
      errors[name] = error;
    }
  });

  return errors;
};

// explain redux form function and options object
export default reduxForm({
  form: 'surveyForm',
  validate
})(SurveyForm);
