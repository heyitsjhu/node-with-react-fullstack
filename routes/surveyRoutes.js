const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const requireCredits = require('../middlewares/requireCredits');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

/** import Survey model class */
const Survey = mongoose.model('survey');

/**
 * TODO: Explain the chaining of middleware and why the order is important
 */
router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  /**
   * TODO: Explain how the following declaration is us "architecting" the data structure
   * and how we need to ensure that, on the frontend, the proper data is passed into the body
   */
  const { title, subject, body, recipient } = req.body;

  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map(email => ({
      email: email.trim()
    })),
    _user: req.user.id,
    dateSent: Date.now()
  });

  /**
   * Instantiate a new Mailer instance to handle our SendGrid Mail
   */
  const mailer = new Mailer(survey, surveyTemplate(survery));
});

module.exports = router;
