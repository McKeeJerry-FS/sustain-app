const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1]; // Check cookies or Authorization header
  if (!token) {
    return res.status(401).render('auth/login', {
      title: 'Login',
      error_msg: 'Access denied. Please log in.',
      user: null,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded; // Attach the decoded user info to the request object
    next();
  } catch (err) {
    console.error('Invalid token:', err);
    return res.status(403).render('auth/login', {
      title: 'Login',
      error_msg: 'Invalid or expired token. Please log in again.',
      user: null,
    });
  }
};

module.exports = authenticateToken;