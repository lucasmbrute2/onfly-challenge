import { ServerError } from '@/src/presentation/errors/server-error'
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.string().default('3333'),
})

const _env = envSchema.safeParse(process.env)
if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())
  throw new ServerError(_env.error.stack)
}

export const env = _env.data
