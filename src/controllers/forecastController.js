import meteoService from '../services/meteoService.js';

export const getForecast = async (req, res, next) => {
  const { latitude, longitude, ...params } = req.query;

  try {
    const forecast = await meteoService.getForecast(latitude, longitude, new URLSearchParams(params).toString());
    res.sendSuccess(forecast, 'Forecast retrieved', 200);
  } catch (error) {
    next(error);
  }
};

export default { getForecast };
