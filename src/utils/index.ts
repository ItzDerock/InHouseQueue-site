export const isDefined = <T>(x: T | undefined): x is T => x !== undefined;

export const getRealIP = (request: Request) =>
  request.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'
