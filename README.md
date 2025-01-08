# Meteo Microservice

## Overview

The Meteo microservice connects to the Open-Meteo API to fetch weather data. It includes advanced features such as circuit breakers, rate limiters, fake connections for testing, JWT authentication with service authorization, and caching with Redis.

## Features

- **Circuit Breaker**: Prevents the system from making requests to an external service that is likely to fail.
- **Rate Limiter**: Limits the number of requests to the service to prevent abuse.
- **Fake Connection**: Allows for testing without making actual requests to the Open-Meteo API.
- **JWT Authentication**: Secures the service endpoints and authorizes specific services.
- **Caching**: Uses Redis to cache responses and reduce load on the Open-Meteo API.
- **Logger**: Logs important information and errors for monitoring and debugging.

## Usage

### Prerequisites

- Node.js (version 22.x)
- Redis
- Docker (for running Redis)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HorizonClouds/meteo.git
   cd meteo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables by creating a `.env` file based on the `.env.example` file. See the [Configuration](#configuration) section for more details.

4. Run Redis using Docker:
   ```bash
   docker run --name redis -p 6404:6379 -d redis
   ```

5. Start the service:
   ```bash
   npm start
   ```

### API Documentation

The API documentation is available in the `meteo-oas.yaml` file located in the `src/api/v1` directory. You can use tools like Swagger UI to visualize and interact with the API.

### Configuration

The configuration is done using environment variables. The following variables are available:

```properties
NODE_ENV=development
BACKEND_PORT=6403
MAX_REQUESTS_PER_MINUTE=10
MIN_INTERVAL_BETWEEN_REQUESTS=1000
USE_MOCK_API=true

JWT_SECRET=meteo-secret
ALLOWED_SERVICES=itineraries-service

METEO_CIRCUIT_BREAKER_FAILURE_THRESHOLD=5
METEO_CIRCUIT_BREAKER_SUCCESS_THRESHOLD=3
METEO_CIRCUIT_BREAKER_RESET_TIMEOUT=15000

REDIS_HOST=localhost
REDIS_PORT=6404
REDIS_TTL=86400

KAFKA_ENABLED=true
KAFKA_BROKER=localhost:9092
KAFKA_TOPIC=logs
KAFKA_SERVICE_NAME=METEO
LOGLEVEL=DEBUG
```

## Detailed Features

### Circuit Breaker

The circuit breaker prevents the system from making requests to an external service that is likely to fail. It has the following configuration:

- **Failure Threshold**: Number of consecutive failures before the circuit opens.
- **Success Threshold**: Number of consecutive successes required to close the circuit.
- **Reset Timeout**: Time in milliseconds before attempting to close the circuit again.

**Process**:
The circuit breaker operates in three states: CLOSED, OPEN, and HALF-OPEN.

- **CLOSED**: In this state, the system operates normally and allows requests to pass through. If the number of consecutive failures reaches the failure threshold, the circuit transitions to the OPEN state.
- **OPEN**: In this state, the circuit breaker prevents any requests from passing through to the external service. After a specified reset timeout, the circuit transitions to the HALF-OPEN state.
- **HALF-OPEN**: In this state, the system allows a limited number of requests to pass through. If these requests succeed, the circuit transitions back to the CLOSED state. If one of the requests fails, the circuit transitions back to the OPEN state.

This mechanism helps to prevent the system from repeatedly making requests to a failing service, allowing it to recover and preventing further strain on the system.

### Rate Limiter

The rate limiter restricts the number of requests to the service to prevent abuse. It is configured with:

- **Max Requests Per Minute**: Maximum number of requests allowed per minute.
- **Min Interval Between Requests**: Minimum time interval between consecutive requests.

**Process**:
The rate limiter operates by maintaining a list of timestamps for each request made. It performs the following checks:

- **Requests Per Minute**: It ensures that the number of requests in the last 60 seconds does not exceed the maximum allowed. If the limit is exceeded, a `TooManyRequestsError` is thrown.
- **Interval Between Requests**: It ensures that the time interval between consecutive requests is not less than the minimum allowed. If the interval is too short, a `RateLimitExceededError` is thrown.

By enforcing these limits, the rate limiter helps to prevent abuse and ensures that the service is not overwhelmed by too many requests in a short period.

### Fake Connection

The fake connection feature allows for testing without making actual requests to the Open-Meteo API. This is useful for development and testing purposes.

### JWT Authentication

JWT authentication secures the service endpoints and authorizes specific services. The configuration includes:

- **JWT Secret**: Secret key used to sign the JWT tokens.
- **Allowed Services**: List of services authorized to access the endpoints.

**Process**:
The JWT authentication process involves the following steps:

1. **Token Extraction**: The token is extracted from the `Authorization` header of the incoming request.
2. **Token Verification**: The token is verified using the secret key to ensure its validity.
3. **Service Authorization**: The service ID embedded in the token is checked against the list of allowed services. If the service is authorized, the request is allowed to proceed; otherwise, an error is thrown.

This process ensures that only authorized services can access the endpoints, providing a secure mechanism for service-to-service communication.

### Caching

The caching feature uses Redis to store responses and reduce the load on the Open-Meteo API. It includes:

- **Redis Host**: The hostname of the Redis server.
- **Redis Port**: The port of the Redis server.
- **Redis TTL**: Time-to-live for cached responses.

**Process**:
The caching process involves the following steps:

1. **Cache Check**: Before making a request to the Open-Meteo API, the system checks if the response is already cached in Redis.
2. **Return Cached Response**: If a cached response is found, it is returned immediately, reducing the need for an external API call.
3. **Store in Cache**: If no cached response is found, the system makes a request to the Open-Meteo API, stores the response in Redis with a specified TTL, and then returns the response.

This process helps to reduce the load on the Open-Meteo API and improve the performance of the microservice by serving frequently requested data from the cache.

### Logger

The logger logs important information and errors for monitoring and debugging. It includes:

- **Log Level**: The level of logging (e.g., DEBUG, INFO, WARN, ERROR).
- **Kafka Integration**: Optionally logs messages to a Kafka topic for centralized logging.

**Process**:
The centralized logging with Kafka involves the following steps:

1. **Initialization**: The logger is initialized with the Kafka client, producer, and topic configuration.
2. **Log Message Formatting**: Each log message is formatted with a timestamp, client ID, and log level.
3. **Console Logging**: The formatted log message is printed to the console.
4. **Kafka Logging**: If Kafka integration is enabled, the formatted log message is sent to the configured Kafka topic for centralized logging.

This process ensures that log messages are not only available locally but also centralized in a Kafka topic, allowing for easier monitoring and analysis of logs across multiple services.

## Dependencies

The project uses the following dependencies:

- **axios**: For making HTTP requests.
- **dotenv**: For managing environment variables.
- **express**: For creating the server.
- **jsonwebtoken**: For JWT authentication.
- **kafkajs**: For Kafka integration.
- **redis**: For caching.
- **swagger-jsdoc**: For generating API documentation.
- **swagger-ui-express**: For serving the API documentation.
- **yamljs**: For parsing YAML files.

## Development Dependencies

- **nodemon**: For automatically restarting the server during development.
- **prettier**: For code formatting.
- **vitest**: For testing.

## License

This project is licensed under the MIT License.