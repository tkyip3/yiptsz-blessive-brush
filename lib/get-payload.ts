// src/lib/get-payload.ts
import payload, { BasePayload } from 'payload'
import type { Config } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

let cachedPayload: BasePayload = null

export const getPayloadClient = async () => {
  if (cachedPayload) {
    return cachedPayload
  }

  try {
    const config: Config = {
      secret: process.env.PAYLOAD_SECRET || '',
      db: mongooseAdapter({
        url: process.env.MONGODB_URI || '',
      }),
      local: true,
    }

    const client = await payload.init(config)
    cachedPayload = client
    return client
  } catch (error) {
    console.error('Failed to initialize Payload client:', error)
    throw error
  }
}
