'use strict';

export namespace Analytics {
    export type Type = `overview_v2`;
}

export namespace Twitch {
    export type StreamKey = string;
}

export namespace TypeScript {
    export type Class<T> = new(...args: any[]) => T;
}