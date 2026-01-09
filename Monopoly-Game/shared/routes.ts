import { z } from 'zod';
import { insertGameSchema, games } from './schema';

export const api = {
  games: {
    save: {
      method: 'POST' as const,
      path: '/api/games',
      input: insertGameSchema,
      responses: {
        201: z.custom<typeof games.$inferSelect>(),
      },
    },
    load: {
      method: 'GET' as const,
      path: '/api/games/:id',
      responses: {
        200: z.custom<typeof games.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
