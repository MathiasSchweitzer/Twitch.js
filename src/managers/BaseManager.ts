'use strict';

import Client from '../client/Client';

export default class BaseManager {
    client: Client;

    constructor(client: Client) {
        this.client = client;
    }
}