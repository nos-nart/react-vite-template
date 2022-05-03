import { getReasonPhrase, ReasonPhrases, StatusCodes } from 'http-status-codes';
import { createResponseComposition, context } from 'msw';
import type { RestRequest } from 'msw';

import { db } from './db';

export const delayedResponse = createResponseComposition(undefined, [
  context.delay('real'),
]);

export const unauthenticatedResponse = createResponseComposition(undefined, [
  context.status(StatusCodes.UNAUTHORIZED),
  context.json({
    statusCode: StatusCodes.UNAUTHORIZED,
    error: ReasonPhrases.UNAUTHORIZED,
    message: getReasonPhrase(ReasonPhrases.UNAUTHORIZED),
  }),
]);

export function extractTokenFromRequest(
  request: RestRequest
): string | undefined {
  const authorization = request.headers.get('Authorization');
  if (!authorization || !/Bearer\s+.+/.test(authorization)) {
    return undefined;
  }
  let [, token] = authorization.split(' ');
  if (!token) {
    token = request.cookies.token;
  }
  return token as string;
}

export function decodeToken(token: string | undefined | undefined) {
  if (!token) return null;

  try {
    const payload = JSON.parse(token) as { sub: number };
    const user = db.user.findFirst({
      where: { id: { equals: payload.sub } },
      strict: true,
    });

    return user;
  } catch {
    return null;
  }
}

export function encodeToken(user: { id: number }): string {
  return JSON.stringify({ sub: user.id });
}
