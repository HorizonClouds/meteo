import meteoService from '../services/meteoService.js';
import standardResponse from '../utils/standardResponse.js';

export const getForecast = async (req, res, next) => {
  const forceOpen = req.query.forceOpen === 'true';
  const { latitude, longitude, ...params } = req.query;

  try {
    const forecast = await meteoService.getForecast(latitude, longitude, new URLSearchParams(params).toString(), forceOpen);
    standardResponse.sendSuccess(res,{ data: forecast.data, message: 'Forecast retrieved', details: forecast.details });
  } catch (error) {
    next(error);
  }
};

export default { getForecast };
