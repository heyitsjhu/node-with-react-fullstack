import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import FIELDS from './_formSchema';

// TODO: explain class and functional components
// TODO: iterating form fields from file to display labels
const SurveyFormReview = ({
  onBackToEdit,
  formData,
  submitSurvey,
  history
}) => {
  console.log(formData);

  const reviewFields = FIELDS.map(({ label, name }) => (
    <div key={name}>
      <label>{label}</label>
      <div>{formData[name]}</div>
    </div>
  ));

  return (
    <div>
      <h5>please confirm</h5>
      <div>{reviewFields}</div>
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={onBackToEdit}
      >
        Back
      </button>
      <button
        className="green white-text btn-flat right"
        onClick={() => {
          submitSurvey(formData, history);
        }}
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

// TODO: gets the state from redux store, which we can then decide
// what property to return and match accessible to the component
// check the redux reducers file
const mapStateToProps = state => {
  console.log(state);
  return { formData: state.form.surveyForm.values };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyFormReview));
// TODO: Explain withRouter and why we need it here to "know" about the history object provided by react router via props(SurveyFormReview);
