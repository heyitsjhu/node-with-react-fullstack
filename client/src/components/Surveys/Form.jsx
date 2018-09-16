import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from '../Form/Field';

const FIELDS = [
  {
    label: 'Survey Title',
    name: 'title'
  },
  {
    label: 'Subject Line',
    name: 'subject'
  },
  {
    label: 'Email Body',
    name: 'body'
  },
  {
    label: 'Recipient List',
    name: 'emails'
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
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// explain redux form function and options object
export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
