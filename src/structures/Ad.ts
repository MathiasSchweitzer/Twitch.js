'use strict';

import Client from '../client/Client';
import { BadArgumentType, FunctionError, MissingArgument } from '../errors/errors';
import { checkType } from '../util/functions';
import Base from './Base';
import Channel from './Channel';

interface InterfaceAd {
    message: string;
    at: Date;
}

interface HTTPRequestAd {
    length: number;
    message: string;
    retry_after: string;
}

class Ad extends Base {
    length: number;
    message: string;
    retry_after: number;
    at: Date;
    channel: Channel;

    constructor(client: Client, channel: Channel, length: number, retry_after: number, data: InterfaceAd, immediatePatch = true) {
        super(client);
        if(checkType(channel, [`Channel`], `Channel`, true)) {
            this.channel = channel;
        } else {
            throw new FunctionError(`Check type of channel is false but no error thrown in the function`);
        }
        if(checkType(length, [`number`], `length`, true)) {
            this.length = length;
        } else {
            throw new FunctionError(`Check type of length is false but no error thrown in the function`);
        }
        if(checkType(retry_after, [`number`], `retry_after`, true)) {
            this.retry_after = retry_after;
        } else {
            throw new FunctionError(`Check type of retry_after is false but no error thrown catch in the function`);
        }
        if(data && checkType(data.message, [`string`]) && data.message != null) {
            this.message = data.message;
        } else {
            this.message = ``;
        }
        if(data && checkType(data.at, [`Date`]) && data.at != null) {
            this.at = data.at;
        } else {
            this.at = new Date();
        }
    }
}

export default Ad;