const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    { _id: user._id, name: user.name, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

const isAuthorized = async (req, res, next) => {
  const authorization = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        res.status(400).send({ message: "Token is not valid" });
      } else {
        req.user = result;
        next();
      }
    });
  } else {
    res.status(400).send({ message: "Token is not exist!" });
  }
};

const isAdmin = async (req, res, next) => {
  isAuthorized(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(400).send({ message: "This user is not exist!" });
    }
  });
};

module.exports = { isAuthorized, isAdmin, createToken };
