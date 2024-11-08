function logRequests(req, res, next) {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
}
function isAuthenticated(req, res, next) {
    if (req.session.loggedIn) {
      return next();
    }
    res.redirect('/login');
  }

module.exports = logRequests, isAuthenticated;
