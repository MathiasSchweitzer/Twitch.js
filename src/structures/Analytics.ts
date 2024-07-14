'use strict';

import Base from './Base';
import Client from '../client/Client';
import { Analytics } from '../util/types';
import { Dates } from '../util/interfaces';

class Analytics extends Base {
    id: string;
    url: string;
    type: Analytics.Type;
    date_range: Dates.dateRange;

    constructor(client: Client, data) {
        super(client, data);
        
    }
}

export default Analytics;