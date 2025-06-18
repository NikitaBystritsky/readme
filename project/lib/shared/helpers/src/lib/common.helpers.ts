import { ClassTransformOptions, plainToInstance } from 'class-transformer';

const REGEX = /%([^%]*)%/;

export function fillDto<T, P>(dto: new () => T, plainObject: P, options?: ClassTransformOptions): T;

export function fillDto<T, P>(dto: new () => T, plainObject: P, options?: ClassTransformOptions): T[];

export function fillDto<T, P>(dto: new () => T, plainObject: P, options?: ClassTransformOptions): T | T[] {
  return plainToInstance(dto, plainObject, {excludeExtraneousValues: true, ...options});
}

export function createMessage<T>(message: string, expressions: T[] = []): string {
  if (!expressions.length) {
    return message.replace(REGEX, '').trim();
  }

  return expressions.reduce((accumulator: string, currentValue: T) => accumulator.replace(REGEX, String(currentValue)), message);
}

export function getMongoConnectionString({host, port, database, username, userPassword, authSource}): string {
  return `mongodb://${username}:${userPassword}@${host}:${port}/${database}?authSource=${authSource}`;
}
