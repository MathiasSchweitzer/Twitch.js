'use strict';

import './Base';
import '../client/Client';

class User extends Base {
    constructor(client: Client, data) {
        super(client);
        
    }
}

module.exports = User;