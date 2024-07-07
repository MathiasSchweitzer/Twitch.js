'use strict';

import Client from '../client/Client';

abstract class Base {
    public client: Client;
    
    constructor(client: Client) {
        this.client = client;
    }
}

export default Base;