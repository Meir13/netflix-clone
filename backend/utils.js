import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    { _id: user._id, name: user.name, email: user.email },
    process.env.JWT_PASS,
    { expiresIn: "7d" }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {
    jwt.verify(authorization, process.env.JWT_PASS, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(401).send({ message: err.message });
      }

      req.user = data;
      next();
    });
  } else {
    return res.status(401).send({ message: err.message });
  }
};
