const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { HttpError } = require("../helpers");
const { status } = require("../consts");
const { PRIVATE_KEY_TEMP } = require("../tempConf");

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  const [bearer, token] = authorization?.split(" ") ?? [];

  if (bearer !== "Bearer" || !token) {
    next(HttpError(status.USER_UNAUTHORIZEDTOKEN));
    return;
  }

  try {
    // const { PRIVATE_KEY } = process.env;
    const { _id } = jwt.verify(token, PRIVATE_KEY_TEMP);

    const user = await User.findById(_id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(status.USER_UNAUTHORIZEDTOKEN));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(status.USER_UNAUTHORIZEDTOKEN));
  }
};

module.exports = authenticate;
