import { createClient } from 'redis';

const redis = new createClient();

export const addToBlacklist = async (token) => {
    const expirationTime = 24 * 60 * 60; // 24 hours, adjust as needed
    await redis.set(`bl_${token}`, 'true', 'EX', expirationTime);
};

export const isTokenBlacklisted = async (token) => {
    const result = await redis.get(`bl_${token}`);
    return result === 'true';
};