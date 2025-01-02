import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export default {
  // Rate limiter configuration
  maxRequestsPerMinute: parseInt(process.env.MAX_REQUESTS_PER_MINUTE, 10) || 60,
  minIntervalBetweenRequests: parseInt(process.env.MIN_INTERVAL_BETWEEN_REQUESTS, 10) || 1000,
  // API configuration
  useMockApi: process.env.USE_MOCK_API === 'true' || true,
  backendPort: parseInt(process.env.BACKEND_PORT, 10) || 3000,
  // JWT configuration
  jwtSecret: process.env.JWT_SECRET || 'meteo-secret',
  allowedServices: process.env.ALLOWED_SERVICES || 'itineraries-service',
  // Circuit breaker configuration
  CBreakerFailureThreshold: parseInt(process.env.METEO_CIRCUIT_BREAKER_FAILURE_THRESHOLD, 10) || 5,
  CBreakerSuccessThreshold: parseInt(process.env.METEO_CIRCUIT_BREAKER_SUCCESS_THRESHOLD, 10) || 3,
  CBreakerResetTimeout: parseInt(process.env.METEO_CIRCUIT_BREAKER_RESET_TIMEOUT, 10) || 30000,
  // Redis configuration
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: parseInt(process.env.REDIS_PORT, 10) || 6379,
  redisTTL: parseInt(process.env.REDIS_TTL, 10) || 86400,
  // Kafka configuration
  kafkaEnabled: process.env.KAFKA_ENABLED === 'true',
  kafkaBroker: process.env.KAFKA_BROKER || 'localhost:9092',
  kafkaTopic: process.env.KAFKA_TOPIC || 'logs',
  kafkaServiceName: process.env.KAFKA_SERVICE_NAME || 'meteo',
  // Logger configuration
  logLevel: process.env.LOGLEVEL || 'INFO',
};
