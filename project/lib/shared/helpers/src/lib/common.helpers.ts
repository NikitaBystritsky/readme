import { ClassTransformOptions, plainToInstance } from 'class-transformer';

type PlainObject = Record<string, unknown>;

const REGEX = /%([^%]*)%/;

export function fillDto<T, U extends PlainObject>(dto: new () => T, plainObject: U, options?: ClassTransformOptions): T;

export function fillDto<T, U extends PlainObject[]>(dto: new () => T, plainObject: U, options?: ClassTransformOptions): T[];

export function fillDto<T, U extends PlainObject>(dto: new () => T, plainObject: U, options?: ClassTransformOptions): T | T[] {
  return plainToInstance(dto, plainObject, {excludeExtraneousValues: true, ...options});
}

export function createMessage<T>(message: string, expressions: T[] = []): string {
  if (!expressions.length) {
    return message.replace(REGEX, '').trim();
  }

  return expressions.reduce((accumulator: string, currentValue: T) => accumulator.replace(REGEX, String(currentValue)), message);
}
