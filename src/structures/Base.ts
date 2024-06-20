'use strict';

import '../client/Client';

class Base {
    public client: Client;
    constructor(client: Client) {
        this.client = client;
    }
}

module.exports = Base;