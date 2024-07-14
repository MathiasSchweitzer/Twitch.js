'use strict';

import { Key } from "readline";
import { deepEqual, randomInt } from "../util/functions";

type findFunction<K, V> = (element: V, key?: K, map?: Map<K, V>) => boolean;
type eachFunction<K, V> = (element: V, key?: K, map?: Map<K, V>) => any;
type defaultValueGenerator<K, V> = (key: K, collection?: Collection<K, V>) => V;
type toMapFunction<K, OldV, NewV> = (element: OldV, key: K, collection?: Collection<K, OldV>) => NewV;
type sortFunction<V> = (elem1: V, elem2: V) => number;
type collectionFunc<K, V> = (collection: Collection<K, V>) => void;

export class Collection<K, V> extends Map<K, V> {
    constructor(iterable?: Iterable<readonly [K, V]> | null | undefined) {
        super(iterable);
    }

    at(index: number): V | undefined {
        if(index < 0) index += this.size;
        if(index < 0 || index >= this.size) return undefined;
        let i = 0;
        this.forEach((val: V) => {
            if(i === index) return val;
            i++;
        });
        return undefined
    }

    clone(): Collection<K, V> {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    concat(...collections: Collection<K, V>[]): Collection<K, V> {
        let result = new Collection<K, V>();
        collections.forEach((c: Collection<K, V>) => {
            c.forEach((e: V, k: K) => {
                result.set(k, e);
            });
        });
        return result;
    }

    difference(other: Collection<K, any>): Collection<K, V> {
        let result = new Collection<K, V>();
        this.forEach((e: V, k: K) => {
            if(!other.get(k)) result.set(k, e);
        });
        other.forEach((e: V, k: K) => {
            if(!this.get(k)) result.set(k, e);
        });
        return result;
    }

    each(func: eachFunction<K, V>): Collection<K, V> {
        this.forEach((e: V, k: K, map: Map<K, V>) => {
            func(e, k, map);
        });
        return this;
    }

    equals(other: Collection<K, V>): boolean {
        if(other.size !== this.size) return false;
        return deepEqual(this, other);
    }

    every(func: findFunction<K, V>): boolean {
        this.forEach((e: V, k: K, map: Map<K, V>) => {
            if(!func(e, k, map)) return false;
        });
        return true;
    }

    ensure(key: K, defaultValueGenerator: defaultValueGenerator<K, V>): V {
        let val = this.get(key);
        if(val) return val;
        val = defaultValueGenerator(key, this);
        this.set(key, val);
        return val;
    }

    filter(func: findFunction<K, V>): Collection<K, V> {
        let result = new Collection<K, V>();
        this.forEach((e: V, k: K, map: Map<K, V>) => {
            if(func(e, k, map)) result.set(k, e);
        });
        return result;
    }

    find(func: findFunction<K, V>): V | undefined {
        this.forEach((e: V, k: K, map: Map<K, V>) => {
            if(func(e, k, map)) return e;
        });
        return undefined;
    }

    findKey(func: findFunction<K, V>): K | undefined {
        this.forEach((e: V, k: K, map: Map<K, V>) => {
            if(func(e, k, map)) return k;
        });
        return undefined;
    }

    findLast(func: findFunction<K, V>): V | undefined {
        let last = undefined;
        this.forEach((e: V, k: K, map: Map<K, V>) => {
            if(func(e, k, map)) last = e;
        });
        return last;
    }

    findLastKey(func: findFunction<K, V>): K | undefined {
        let last = undefined;
        this.forEach((e: V, k: K, map: Map<K, V>) => {
            if(func(e, k, map)) last = k;
        });
        return last;
    }

    first(): V | undefined {
        return this.at(0);
    }

    firstKey(): K | undefined {
        return this.keyAt(0);
    }

    hasAll(...keys: K[]): boolean {
        keys.forEach((k: K) => {
            if(!this.has(k)) return false;
        });
        return true;
    }

    hasAny(...keys: K[]): boolean {
        keys.forEach((k: K) => {
            if(this.has(k)) return true;
        });
        return false;
    }

    intersection(other: Collection<K, any>): Collection<K, V> {
        let result = new Collection<K, V>();
        this.forEach((e: V, k: K) => {
            if(other.get(k)) result.set(k, e);
        });
        return result;
    }

    keyAt(index: number): K | undefined {
        if(index < 0) index += this.size;
        if(index < 0 || index >= this.size) return undefined;
        let i = 0;
        this.forEach((_: V, key: K) => {
            if(i === index) return key;
            i++;
        });
        return undefined
    }

    last(): V | undefined {
        return this.at(-1);
    }

    lastKey(): K | undefined {
        return this.keyAt(-1);
    }

    map<NewV>(func: toMapFunction<K, V, NewV>): Collection<K, NewV> {
        let result = new Collection<K, NewV>();
        this.forEach((e: V, k: K) => {
            result.set(k, func(e, k, this));
        });
        return result;
    }

    partition(func: findFunction<K, V>): [Collection<K, V>, Collection<K, V>] {
        let success = new Collection<K, V>();
        let failure = new Collection<K, V>();
        this.forEach((e: V, k: K, map: Map<K, V>) => {
            if(func(e, k, map)) {
                success.set(k, e);
            } else {
                failure.set(k, e);
            }
        });
        return [success, failure];
    }

    random(): V | undefined;
    random(amount: number): V[] | undefined;
    random(amount?: number): V | V[] | undefined {
        if(!amount) amount = 1;
        if(amount > this.size || amount <= 0) return undefined;
        let numbers: number[] = [];
        while(numbers.length != amount) {
            let rand = randomInt(this.size);
            if(!numbers.find(n => n === rand)) numbers.push(rand);
        }
        let results: V[] = [];
        numbers.forEach((n: number) => {
            let found = this.at(n);
            if(found) results.push(found);
        });
        if(amount = 1) return results[0];
        return results;
    }

    randomKey(): K | undefined;
    randomKey(amount: number): K[] | undefined;
    randomKey(amount?: number): K | K[] | undefined {
        if(!amount) amount = 1;
        if(amount > this.size || amount <= 0) return undefined;
        let numbers: number[] = [];
        while(numbers.length != amount) {
            let rand = randomInt(this.size);
            if(!numbers.find(n => n === rand)) numbers.push(rand);
        }
        let results: K[] = [];
        numbers.forEach((n: number) => {
            let found = this.keyAt(n);
            if(found) results.push(found);
        });
        if(amount = 1) return results[0];
        return results;
    }

    reverse(): this {
        let temp: [K, V][] = [];
        this.forEach((e: V, k: K) => {
            temp.unshift([k, e])
            this.delete(k);
        });
        temp.forEach(([k, e]: [K, V]) => {
            this.set(k, e);
        });
        return this;
    }

    some(func: findFunction<K, V>): boolean {
        this.forEach((e: V, k: K, map: Map<K, V>) => {
            if(func(e, k, map)) return true;
        });
        return false;
    }

    sort(func: sortFunction<V>): this {
        let temp: [K, V][] = [];
        this.forEach((e: V, k: K) => {
            temp.push([k, e]);
            this.delete(k);
        });
        temp.sort((a, b) => func(a[1], b[1]));
        temp.forEach(([k, e]: [K, V]) => {
            this.set(k, e);
        });
        return this;
    }

    sweep(func: findFunction<K, V>): number {
        let n = 0;
        this.forEach((e: V, k: K) => {
            if(func(e)) {
                n++;
                this.delete(k);
            }
        });
        return n;
    }

    symetricDifference<OtherV>(other: Collection<K, OtherV>): Collection<K, V | OtherV> {
        let result = new Collection<K, V | OtherV>();
        result.concat(this.difference(other));
        result.concat(other.difference(this));
        return result;
    }

    tap(func: collectionFunc<K, V>): this {
        func(this);
        return this;
    }

    toJSON(): [K, V][] {
        let temp: [K, V][] = [];
        this.forEach((e: V, k: K) => {
            temp.push([k, e]);
        });
        return temp;
    }

    toReversed(): Collection<K, V> {
        let other = this.clone();
        return other.reverse();
    }

    toSorted(func: sortFunction<V>): Collection<K, V> {
        let other = this.clone();
        return other.sort(func);
    }

    union<OtherV>(other: Collection<K, OtherV>): Collection<K, OtherV | V> {
        let result = new Collection<K, OtherV | V>();
        other.forEach((e: OtherV, k: K) => {
            result.set(k, e);
        });
        this.forEach((e: V, k: K) => {
            result.set(k, e);
        });
        return result;
    }
}