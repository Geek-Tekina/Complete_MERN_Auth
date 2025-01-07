export const catchAsyncError = (theFunction) => {
  return (req, res, next) => {
    Promise.resolve(theFunction(req, res, next)).catch(next);
  };
};

// if any error is catched, it sends the flow to next middleware i.e. error.js middleware
