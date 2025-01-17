import jwt from 'jsonwebtoken';
import logger from '../utils/logger.js';
import config from '../config.js';
import { ForbiddenError } from '../utils/customErrors.js';

const JWT_SECRET = config.jwtSecret;
let allowedServicesArray = config.allowedServices.split(',');
allowedServicesArray.push('admin-service');

let forbiddenError = new ForbiddenError('Unauthorized');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; 
  if (!token) {
    forbiddenError.message = 'Token not provided';
    throw forbiddenError;
  }
  
  jwt.verify(token, JWT_SECRET, (err, tokenPayload) => {
    if (err) {
      forbiddenError.message = 'Invalid token';
      forbiddenError.details = err
      throw forbiddenError;
    }

    if (!allowedServicesArray.includes(tokenPayload.serviceId)) {
      forbiddenError.message = 'Service not allowed';
      forbiddenError.details = "Required payload: { serviceId: 'service-name' }";
      throw forbiddenError;
    }

    next();
  });
};

// Print a vaild token to the console
const token = jwt.sign({ serviceId: 'admin-service' }, JWT_SECRET, { expiresIn: '30m' });
logger.info('Valid token:\n'+ token);

export default authenticateToken;
