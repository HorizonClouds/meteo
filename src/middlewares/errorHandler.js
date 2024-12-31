// This will catch errors thrown by the application and send a response to the client with the error message and status code.

import { sendError } from '../utils/standardResponse.js';

const errorHandler = (error, req, res, next) => {
  console.log(error);
  sendError(res, error);
};

export default errorHandler;
