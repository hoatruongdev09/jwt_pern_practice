const badRequest = (res, message) => {
  return res.status(400).json({
    message: message,
  });
};
const unauthorize = (res, message) => {
  return res.status(401).json({
    message: message,
  });
};
const forbidden = (res, message) => {
  return res.status(403).json({
    message: message,
  });
};
const notFound = (res, message) => {
  return res.status(404).json({
    message: message,
  });
};
const internalServerError = (res, message) => {
  return res.status(500).json({
    message: message,
  });
};

module.exports = {
  badRequest,
  unauthorize,
  forbidden,
  notFound,
  internalServerError,
};
