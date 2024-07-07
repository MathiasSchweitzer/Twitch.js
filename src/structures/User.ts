'use strict';

import Base from './Base';
import Client from '../client/Client';

interface InterfaceUser {

}

class User extends Base {
    constructor(client: Client, data: InterfaceUser) {
        super(client);
    }
}

export default User;