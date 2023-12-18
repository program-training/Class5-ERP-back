import { createClient } from "redis";
import 'dotenv/config'

export const client = createClient({url: process.env.REDIS_CONNECTION_STRING})

export async function connectToRedis () {
    try {        
        await client.connect()
        return 'connected to redis'
    } catch (error) {
        return Promise.reject(error)
    }
}