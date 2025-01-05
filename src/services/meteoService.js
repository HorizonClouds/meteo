import axios from 'axios';
import circuitBreaker from '../utils/circuitBreaker.js';
import { WrongMeteoCall } from '../utils/customErrors.js';
import getFakeResponse from '../utils/fakeResponse.js';
import config from '../config.js';
import logger from '../utils/logger.js';

export const getForecast = async (latitude, longitude, stringURLParams, forceOpen = false) => {

  let result;
logger.debug(`Using mock API: ${config.useMockApi}`);
  if (config.useMockApi) {
    result = await circuitBreaker(getFakeResponse, forceOpen);
    return { data: result.response, details: result.details };
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&${stringURLParams}`;
  let callback = async() => {
    try {
      let res = await axios.get(url);
      return res.data;
    } catch (error) {
      throw new WrongMeteoCall('Error in meteo call',  error);
    }
  }
  result = await circuitBreaker(callback, forceOpen);
  
  return { data: result.response, details: result.details };

};

export default { getForecast };
