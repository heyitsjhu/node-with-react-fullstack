import React, { Component } from 'react';
import SurveyForm from './Form';
import SurveyFormReview from './Review';

class SurveyNew extends Component {
  // TODO: Explain component level states vs global redux states
  constructor(props) {
    super(props);

    this.state = {
      showFormReview: false
    };
  }

  // TODO: Explain Babel shortcode for initializing state with constructor
  // state = { showFormReview: false }

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onBackToEdit={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}

export default SurveyNew;
