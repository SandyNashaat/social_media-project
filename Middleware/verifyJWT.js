const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ message: 'Access Denied' });

//   try {
//     const verified = jwt.verify(token, process.env.REFRESHTOKEN_KEY);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid Token' });
//   }
// };

//تعديل هاجر 

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.cookies.access_token; // قراءة التوكن من الكوكيز

  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.REFRESHTOKEN_KEY);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(400).json({ message: 'Invalid Token' });
  }
};
