const routeNotFoundHandler = (req, res, next) => {
  res.json({
    success: false,
    message: "Invalid path..!",
  });
  next();
};

module.exports = { routeNotFoundHandler };
