const jwt = require("jsonwebtoken");
const User = require("../../../models/User");

const createToken = (user) => {
  return jwt.sign(
    { _id: user._id, role: user.role, name: user.name, avatar: user.avatar },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

const isAuthorized = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        return res.status(400).send({ message: "Token is not valid" });
      } else {
        req.user = result;
        next();
      }
    });
  } else {
    return res.status(400).send({ message: "Token is not exist!" });
  }
};

const isAdmin = async (req, res, next) => {
  isAuthorized(req, res, async () => {
    if (req.user.role === "MODERATOR" || "ADMIN") {
      next();
    } else {
      return res.status(400).send({ message: "This user is not exist!" });
    }
  });
};

const isModerator = async (req, res, next) => {
  isAuthorized(req, res, async () => {
    if (req.user.role === "MODERATOR") {
      next();
    } else {
      return res.status(400).send({ message: "This user not exist!" });
    }
  });
};

const getUserId = (token) => {
  let userId;
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.send({ message: "Error occured!" });
    } else {
      userId = user._id;
    }
  });

  return userId;
};

module.exports = { isAuthorized, isAdmin, createToken, isModerator, getUserId };
