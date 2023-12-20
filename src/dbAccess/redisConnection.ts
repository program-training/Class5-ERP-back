import { createClient } from "redis";
import 'dotenv/config'

export const client = createClient({url: process.env.REDIS_CONNECTION_STRING})

client.on('error', (err) => console.log('Redis Client Error', err))

export default async function connectToRedis () {
    try {        
        await client.connect()
        return 'connected to redis'
    } catch (error) {
        return Promise.reject(error)
    }
}