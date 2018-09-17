const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const requireCredits = require('../middlewares/requireCredits');
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

/** import Survey model class */
const Survey = mongoose.model('survey');

router.get('/api/surveys/:surveyId/:choice', (req, res) => {
  res.send('Thanks for voting, yo!');
});

// TODO: Explain this api call that sendgrid uses and the user
// needs to setup in their sendgrid account, in the Event Notification section
// under Mail Settings in their dashboard, and select what notifications they want (clicks)
router.post('/api/surveys/webhooks', (req, res) => {
  // take data from sendgrid, and preprocess the data (sanitize)
  console.log('sendgrid req body', req.body); // to see what data sendgrid sends to us

  // the string passed to PathParser is a url pattern we define, along with strings we want to extract
  const p = new Path('/api/surveys/:surveyId/:choice'); // :surveyId, :choice are the strings we want to extract from a pathname we pass in.

  // sendgrid seems to return one click at a time, no longer consolidates into 30-second intervals
  const events = req.body.map(({ email, url }) => {
    const pathname = new URL(url).pathname; // returns url minus the domain
    console.log(p.test(pathname)); // test returns null if any parse attempt fails
    const match = p.test(pathname);
    if (match) {
      return { email, ...match };
    }
  });

  events.forEach(({ email, choice, surveyId }) => {
    // TODO: Explain updateOne (finds and updates the database)
    // put all of the logic to check for the right conditions in order to save our data,
    // in here ane let mongoose do all the work. Our application doesn't care.
    Survey.updateOne(
      {
        // _id is a mongodb convention
        _id: surveyId,
        // finds just the recipient within this survey in which we care about
        // given the $elemMatch (Mongo operator) criteria/condition
        recipients: {
          // Mongo operator?
          $elemMatch: { email: email, responded: false },
        },
      },
      {
        // $inc Mongo operator [increment]
        $inc: { [choice]: 1 },
        // $set - look at recipients subdoc, $ - refers to $elemMatch from previous argument, set the responded property to true
        $set: { 'recipients.$.responded': true },
        lastResponded: new Date(),
      }
    ).exec(); // execute our updateOne query;
  });

  // because sendgrid seems to only send one event each time, we might not need
  // the array anymore; maybe return just the object inside the array's zero index?
  // check if user has already voted for particular survey
  console.log('events', events);

  res.send();
});

router.get('/api/surveys', requireLogin, async (req, res) => {
  // look into our survey collection in mlab and find all surveys that match the current user
  // controlling what we retrieve from mlab (ie, excluding recipients list, which isn't needed)
  const surveys = await Survey.find({ _user: req.user.id }).select({
    recipients: false,
  });

  res.send(surveys);
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
      email: email.trim(),
    })),
    _user: req.user.id,
    dateSent: Date.now(),
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
