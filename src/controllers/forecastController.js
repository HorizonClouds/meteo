import meteoService from '../services/meteoService.js';
import standardResponse from '../utils/standardResponse.js';
import { checkCache, storeInCache } from '../services/cacheService.js';

export const getForecast = async (req, res, next) => {
  const forceOpen = req.query.forceOpen === 'true';
  const { latitude, longitude, ...params } = req.query;
  const url = req.originalUrl;

  try {
    const cachedData = await checkCache(url);
    if (cachedData) {
      return standardResponse.sendSuccess(res, { data: cachedData, message: 'Forecast retrieved from cache!' });
    }

    const forecast = await meteoService.getForecast(latitude, longitude, new URLSearchParams(params).toString(), forceOpen);
    await storeInCache(url, forecast.data);

    standardResponse.sendSuccess(res, { data: forecast.data, message: 'Forecast retrieved!', details: forecast.details });
  } catch (error) {
    next(error);
  }
};

export default { getForecast };
