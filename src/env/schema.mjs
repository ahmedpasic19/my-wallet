// @ts-check
import 'dotenv/config'
import { z } from 'zod'

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
   DATABASE_URL: z.string().url(),
   NODE_ENV: z.enum(['development', 'test', 'production']),
   NEXTAUTH_SECRET:
      process.env.NODE_ENV === 'production' ? z.string().min(1) : z.string().min(1).optional(),
   NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      (str) => process.env.VERCEL_URL ?? str,
      // VERCEL_URL doesn't include `https` so it cant be validated as a URL
      process.env.VERCEL ? z.string() : z.string().url(),
   ),
   GOOGLE_CLIENT_ID: z.string(),
   GOOGLE_CLIENT_SECRET: z.string(),
   JWT_SECRET: z.string(),
   // POSTGRES_URL: z.string(),
   // POSTGRES_PRISMA_URL: z.string(),
   // POSTGRES_URL_NO_SSL: z.string(),
   // POSTGRES_URL_NON_POOLING: z.string(),
   // POSTGRES_USER: z.string(),
   // POSTGRES_HOST: z.string(),
   // POSTGRES_PASSWORD: z.string(),
   // POSTGRES_DATABASE: z.string(),
})

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * middleware, so you have to do it manually here.
 * @type {{ [k in keyof z.infer<typeof serverSchema>]: z.infer<typeof serverSchema>[k] | undefined }}
 */
export const serverEnv = {
   DATABASE_URL: process.env.DATABASE_URL,
   NODE_ENV: process.env.NODE_ENV,
   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
   NEXTAUTH_URL: process.env.NEXTAUTH_URL,
   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
   JWT_SECRET: process.env.JWT_SECRET,
   // POSTGRES_URL: process.env.POSTGRES_URL,
   // POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
   // POSTGRES_URL_NO_SSL: process.env.POSTGRES_URL_NO_SSL,
   // POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
   // POSTGRES_USER: process.env.POSTGRES_USER,
   // POSTGRES_HOST: process.env.POSTGRES_HOST,
   // POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
   // POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
}

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
   // NEXT_PUBLIC_BASEAPI: z.string(),
})

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
   //   NEXT_PUBLIC_BASEAPI: process.env.NEXT_PUBLIC_BASEAPI,
}
