import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from '../Surveys/List';

const Dashboard = props => {
  return (
    <div>
      Dashobar
      <SurveyList />
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
