import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export default {
  maxRequestsPerMinute: parseInt(process.env.MAX_REQUESTS_PER_MINUTE, 10) || 60,
  minIntervalBetweenRequests: parseInt(process.env.MIN_INTERVAL_BETWEEN_REQUESTS, 10) || 1000,
  useMockApi: process.env.USE_MOCK_API === 'true' || true,
  backendPort: parseInt(process.env.BACKEND_PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET || 'meteo-secret',
  allowedServices: process.env.ALLOWED_SERVICES || 'itineraries-service',
  CBreakerFailureThreshold: parseInt(process.env.METEO_CIRCUIT_BREAKER_FAILURE_THRESHOLD, 10) || 5,
  CBreakerSuccessThreshold: parseInt(process.env.METEO_CIRCUIT_BREAKER_SUCCESS_THRESHOLD, 10) || 3,
  CBreakerResetTimeout: parseInt(process.env.METEO_CIRCUIT_BREAKER_RESET_TIMEOUT, 10) || 30000,
};
