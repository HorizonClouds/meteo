import { createClient } from 'redis';
import logger from '../utils/logger.js';
import config from '../config.js';

let client;
getClient();

async function getClient() {
    if (client) return client;
    try {
        client = createClient({
            url: `redis://${config.redisHost}:${config.redisPort}`,
            socket: {
                reconnectStrategy: retries => {
                    if (retries > 2) return false;
                    const jitter = Math.floor(Math.random() * 200);
                    const delay = Math.min(Math.pow(2, retries) * 50, 2000);
                    return delay + jitter;
                }
            }
        });
        await client.connect();
        logger.info('Connected to Redis');

        client.on('error', (error) => {
            logger.warn(`Redis client error detected, disconnecting... `);
            client.disconnect();
        });
        client.on('end', () => {
            logger.info('Redis client disconnected');
            client = null;
        });

        return client;
    } catch (error) {
        logger.warn(`Error connecting to Redis ${error.code}`);
        client = null;
        return null;
    }
}

const checkCache = async (url) => {
    const client = await getClient();
    if (!client) return null;
    try {
        const cachedData = await client.get(url);
        if (cachedData) {
            logger.info(`CACHED: ${url}`);
            return JSON.parse(cachedData);
        }
        return null;
    } catch (error) {
        logger.error(`Error checking cache for ${url}:`);
        return null;
    }
};

const storeInCache = async (url, data, ttl = config.redisTTL) => {
    const client = await getClient();
    if (!client) return;
    try {
        await client.set(url, JSON.stringify(data), { EX: ttl });
        logger.info(`Stored in cache: ${url}`);
    } catch (error) {
        logger.error(`Error storing data in cache for ${url}:`);
    }
};

export { checkCache, storeInCache };
