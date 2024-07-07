'use strict';

import Client from '../client/Client';
import Base from './Base';
import Channel from './Channel';

class AdSchedule extends Base {
    snooze_count: number;
    snooze_refresh_at: string;
    last_ad_at: string;
    next_ad_at: string;
    duration: number;
    preroll_free_time: number;
    channel: Channel

    constructor(client: Client, data) {
        super(client, data);

    }

    snooze(): void {
        
    }
}
