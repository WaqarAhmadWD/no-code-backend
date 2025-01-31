// prettier-ignore
const sendResponse = (res, statusCode, message, data = null, reset={}) => {
  if(typeof reset !== 'object') reset = {reset}
    return res.status(statusCode).json({
      message,
      data,
      ...reset
    });
  };

module.exports = sendResponse;
