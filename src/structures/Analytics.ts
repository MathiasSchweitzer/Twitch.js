'use strict';

import Base from './Base';
import Client from '../client/Client';
import { analyticsType } from '../util/types';
import { Dates } from '../util/interfaces';

class Analytics extends Base {
    id: string;
    url: string;
    type: analyticsType;
    date_range: Dates.dateRange;

    constructor(client: Client, data) {
        super(client, data);
        
    }
}

export default Analytics;