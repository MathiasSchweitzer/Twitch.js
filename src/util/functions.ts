import { BadArgumentType, MissingArgument } from '../errors/errors';

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