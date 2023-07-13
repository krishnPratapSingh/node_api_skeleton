import { v4 as uuidv4 } from "uuid";

const requestIdentifier = (req, res, next) => {
  const reqIdentifier = uuidv4();
  req.reqIdentifier = reqIdentifier;
  next();
};

export default requestIdentifier;
