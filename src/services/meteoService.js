import axios from 'axios';
import { WrongMeteoCall } from '../utils/customErrors.js';
import { rateLimiter } from '../utils/rateLimiter.js';
import fakeResponse from '../utils/fakeResponse.js';
import config from '../config.js';

export const getForecast = async (latitude, longitude, params) => {
  rateLimiter(); // Apply rate limiting

  if (config.useMockApi) {
    return fakeResponse;
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&${params}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new WrongMeteoCall('Error calling the meteo API', error);
  }
};

export default { getForecast };
