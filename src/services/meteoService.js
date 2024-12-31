import axios from 'axios';
import { WrongMeteoCall } from '../utils/customErrors.js';

export const getForecast = async (latitude, longitude, params) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&${params}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new WrongMeteoCall('Error calling the meteo API', error);
  }
};

export default { getForecast };
