import { SPHERON_TOKEN } from '@/config';
import * as crypto from 'crypto';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const generateRandomHexString = (length: number): string => {
  const buffer: Buffer = crypto.randomBytes(length);
  const randomHexString = buffer.toString('hex');
  // last half of the string is returned because there are two hex characters in a byte
  return randomHexString.slice(randomHexString.length / 2);
};

export const spheronAuthHeaders = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${SPHERON_TOKEN}`,
};
