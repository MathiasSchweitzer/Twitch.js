'use strict';

import Client from '../client/Client';
import { TypeScript } from '../util/types';
import BaseManager from './BaseManager';
import ErrorCodes from '../errors/ErrorCodes';
import Errors from '../errors/TwitchAPIError';

export default class DataManager<T> extends BaseManager {
    holds: TypeScript.Class<T>;
    constructor(client: Client, holds: TypeScript.Class<T>) {
        super(client);
        this.holds = holds;
    }

    get cache() {
        throw new Errors.TwitchAPIError(ErrorCodes.NotImplemented, `get cache`, this.constructor.name);
    }
}