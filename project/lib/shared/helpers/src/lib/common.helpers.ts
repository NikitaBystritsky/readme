import { ClassTransformOptions, plainToInstance } from 'class-transformer';

import { HttpService } from '@nestjs/axios';

import { REGEX, TIME_REGEX, VALUE_PARSE_ERROR, WRONG_TIME_ERROR } from './helpers.constant';
import { DateTimeUnit, TimeAndUnit } from './helpers.types';
import { User } from '@project/lib/shared/app/types';

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

export function getRabbitMQConnectionString({user, password, host, port}): string {
  return `amqp://${user}:${password}@${host}:${port}`;
}

export function parseBoolean(value: string | undefined): boolean {
  return value === 'true';
};

export function parseTime(time: string): TimeAndUnit {
  const match = TIME_REGEX.exec(time);

  if (!TIME_REGEX.exec(time)) {
    throw new Error(createMessage(WRONG_TIME_ERROR, [time]));
  }

  const [, valueRaw, unitRaw] = match;
  const value = parseInt(valueRaw, 10);
  const unit = unitRaw as DateTimeUnit;

  if (isNaN(value)) {
    throw new Error(VALUE_PARSE_ERROR);
  }

  return {value, unit}
}

export async function fetchUserData(data: string, url: string, req?: Request): Promise<User>;

export async function fetchUserData(data: string[], url: string, req?: Request): Promise<User[]>;

export async function fetchUserData(data: string[] | string, url: string, req?: Request): Promise<User | User[]> {
  const httpService = new HttpService();
  if (typeof data === 'string') {
    const userURL = new URL(data, url).toString();
    const { data: user } = await httpService.axiosRef.get<User>(userURL);

    return user;
  }
  const uniqueIds = new Set(data);
  const userURL = new URL(url).toString();
  const { data: users } = await httpService.axiosRef.post<User[]>(userURL,
    { userIds: [...uniqueIds] },
    { headers: { 'Authorization': req?.headers['authorization'] } }
  );

  return users;
}
