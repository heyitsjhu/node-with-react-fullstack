//TODO : explain middlewares

//TODO : explain req, res, next
//TODO : explain how to wire it up; in this case only certain routes have to go through this requireLogin check
module.exports = (req, res, next) => {
  /** check if a user exists in the req (via passport checking) */
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in' });
  }
  next(); // continue to next middleware in stack
};
