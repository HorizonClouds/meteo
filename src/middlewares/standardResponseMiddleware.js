import { sendError, sendSuccess } from '../utils/standardResponse.js';
const standardResponseMiddleware = (req, res, next) => {
  // Custom success response method
  /**
   * Send a success response with a standard format
   * @param {Object} content - The content object containing response details
   * @param {Object} content.data - The data to send
   * @param {string} [content.message='Success!'] - The message to send
   * @param {number} [content.statusCode=200] - The status code to send
   * @param {string} [content.appCode='OK'] - The application code
   * @param {Object} [content.details] - Additional details
   * @returns {void}
   * @example
   * res.sendSuccess({ data: { name: 'John Doe' } });
   */
  res.sendSuccess = (content) => {
    sendSuccess(res, content);
  };

  // Improved custom error response method
  /**
   * Send an error response with a standard format
   * @param {Error} error - The error object
   * @returns {void}
   * @example
   * res.sendError(new AppError('Resource not found', 404));
   */
  res.sendError = (error) => {
    sendError(res, error);
  };

  next();
};

export default standardResponseMiddleware;
