import { FileReader } from 'undici-types';
import { BadArgumentType, MissingArgument } from '../errors/TwitchAPIError';

/**
 * Checks if an object is iterable
 * @param obj The object to test
 * @returns true if the object is iterable
 */
export function isIterable(obj: any): obj is Iterable<any> {
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}


/**
 * Get a variable type
 * @param data The data to get the type
 * @returns The type name (constructor if it's an object, or typeof if it's a primitive) of the data
 */
export function getType(data: any): string {
	if(data === null) return `null`;
	return (typeof data === `object`) ? data.constructor.name: typeof data;
}


/**
 * Check if a variable is of correct type
 * @param data The data to test the type
 * @param type The expected type
 * @param throwError If the function must throw error if the result is false or the data is null
 * @returns true if the variable is correct type
 */
export function checkType(data: any, types: string[], dataName: string = ``, throwError: boolean = false): boolean {
	let result = getType(data).toLowerCase() in types.map((e) => e.toLowerCase());
	if(!result && throwError) {
		if(data == null) throw new MissingArgument(dataName);
		throw new BadArgumentType(dataName, data, types.join(` || `));
	}
	return result;
}


/**
 * Get a random integer between arg1 and arg2. If only arg1 is filled, it's between 0 and arg1.
 * @param arg1 Range value
 * @param arg2 Optional range value, default to 0
 * @returns Random integer
 */
export function randomInt(arg1: number, arg2: number = 0): number {
	if(arg1 > arg2) {
		[arg1, arg2] = [arg2, arg1];
	}
	return Math.floor(Math.random() * (arg2 - arg1) + arg1);
}


export function deepEqual(obj1: any, obj2: any): boolean {
	if(obj1 === obj2) return true;
	if(typeof obj1 !== `object` || obj1 === null || typeof obj2 !== `object` || obj2 === null) return false;
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	for(let key of keys1) {
		if(!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
	}
	return true;
}