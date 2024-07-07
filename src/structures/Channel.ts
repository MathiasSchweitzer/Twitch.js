'use strict';

import Client from '../client/Client';
import User from './User';

class Channel extends User {
    constructor(client: Client, data) {
        super(client, data);

    }
}

export default Channel;