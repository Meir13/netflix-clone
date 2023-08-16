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
        res.status(401).send({ message: "Invalid" });
      }

      req.user = data;
      next();
    });
  } else {
    res.status(401).send({ message: "Invalid" });
  }
};
