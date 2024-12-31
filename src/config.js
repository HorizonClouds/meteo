import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export default {
  maxRequestsPerMinute: process.env.MAX_REQUESTS_PER_MINUTE ?? 60,
  minIntervalBetweenRequests: process.env.MIN_INTERVAL_BETWEEN_REQUESTS ?? 1000,
  useMockApi: process.env.USE_MOCK_API === 'true' || true,
  backendPort: process.env.BACKEND_PORT || 3000,
};
