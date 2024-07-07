'use strict';

import Base from './Base';
import Client from '../client/Client';
import { analyticsType } from '../util/types';
import { Dates } from '../util/interfaces';

interface GameAnalyticsData {
    game_id: string,
    url: string,
    type: analyticsType,
    date_range: analyticsType
}

class GameAnalytics extends Base {
    game_id: string;
    url: string;
    type: analyticsType;
    date_range: Dates.dateRange;

    constructor(client: Client, data: GameAnalyticsData) {
        super(client, data);
        this.game_id = data.game_id;
    }
    
    patch(data: GameAnalyticsData) {
        if('type' in data) {
            this.type = data.type;
        }
    }
}

export default GameAnalytics;