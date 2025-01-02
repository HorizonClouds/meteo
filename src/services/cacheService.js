import { createClient } from 'redis';
import config from '../config.js';

const client = createClient({
    url: `redis://${config.redisHost}:${config.redisPort}`,
    // password: config.redisPassword,
});

client.on('error', (err) => console.error('Redis Client Error', err));

await client.connect();

const checkCache = async (url) => {
    try {
        const cachedData = await client.get(url);
        if (cachedData) {
            console.log(`CACHED: ${url}`);
            return JSON.parse(cachedData);
        }
        return null;
    } catch (error) {
        console.error(`Error checking cache for ${url}:`, error);
        return null;
    }
};

const storeInCache = async (url, data, ttl = config.redisTTL) => {
    try {
        await client.set(url, JSON.stringify(data), { EX: ttl });
        console.log(`Stored in cache: ${url}`);
    } catch (error) {
        console.error(`Error storing data in cache for ${url}:`, error);
    }
};

export { checkCache, storeInCache };
