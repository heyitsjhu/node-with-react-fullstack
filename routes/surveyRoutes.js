const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const requireCredits = require('../middlewares/requireCredits');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

/** import Survey model class */
const Survey = mongoose.model('survey');

router.get('/api/surveys/thanks', (req, res) => {
  res.send('Thanks for voting!');
});

/**
 * TODO: Explain the chaining of middleware and why the order is important
 */
router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  /**
   * TODO: Explain how the following declaration is us "architecting" the data structure
   * and how we need to ensure that, on the frontend, the proper data is passed into the body
   */
  const { title, subject, body, recipients } = req.body;

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
  const mailer = new Mailer(survey, surveyTemplate(survey));

  try {
    await mailer.send();
    await survey.save();
    req.user.credits -= 1;
    const user = await req.user.save();

    // sends back the user data so we can show the updated credits
    res.send(user);
  } catch (err) {
    res.status(422).send(err);
  }
});

module.exports = router;
