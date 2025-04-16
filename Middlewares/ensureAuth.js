const ensureAuthenticated = (req, res, next) => {
  console.log('Is Authenticated:', req.isAuthenticated());
  console.log('User:', req.user);
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to the next middleware or route handler
  }
  // User is not authenticated, redirect to login page
  res.redirect('/auth/login');
}

module.exports = ensureAuthenticated;
// This middleware checks if the user is authenticated before allowing access to certain routes.