export class MarshallError extends Error {
    constructor(message: string) {
	super(message);
	this.name = 'MarshallError';
    }
}


export class ExtractError extends MarshallError {
    constructor(message: string) {
	super(message);
	this.name = 'ExtractError';
    }
}


export class PackError extends MarshallError {
    constructor(message: string) {
	super(message);
	this.name = 'PackError';
    }
}


export interface Marshaller<T> {
    extract(raw: any): T;
    pack(cooked: T): any;
}


export abstract class RaiseBuildFilterMarshaller<A, B> implements Marshaller<B> {
    extract(raw: any): B {
	const a:A = this.raise(raw);
	let b:B = this.build(a);

	let proto = Object.getPrototypeOf(this);

	while (proto != null && proto.hasOwnProperty('filter')) {
	    b = proto.filter(b);
	    proto = Object.getPrototypeOf(proto);
	}

	return b;
    }

    pack(b: B): any {
	const a:A = this.unbuild(b);
	const raw:any = this.lower(a);
	return raw;
    }

    abstract raise(raw: any): A;
    abstract lower(a: A): any;
    abstract build(a: A): B;
    abstract unbuild(b: B): A;
    
    filter(b: B): B {
	return b;
    }
}


export abstract class BaseStringMarshaller<T> extends RaiseBuildFilterMarshaller<string, T> {
    raise(raw: any): string {
	if (typeof raw !== 'string') {
	    throw new ExtractError('Expected a string');
	}

	return raw;	
    }

    lower(a: string): any {
	return a;
    }
}


export class StringMarshaller extends BaseStringMarshaller<string> {
    build(a: string): string {
	return a;
    }

    unbuild(b: string): string {
	return b;
    }
}


export class OptionalMarshaller<T> implements Marshaller<T|null> {
    private _inner: Marshaller<T>;

    constructor(inner: Marshaller<T>) {
	this._inner = inner;
    }

    extract(raw: any): T|null {
	if (raw === null || raw === undefined) {
	    return null;
	}

	return this._inner.extract(raw);
    }

    pack(cooked: T|null): any {
	return cooked;
    }
}


export abstract class BaseArrayMarshaller<T> extends RaiseBuildFilterMarshaller<any[], T[]> {
    raise(raw: any): any[] {
	if (!Array.isArray(raw)) {
	    throw new ExtractError('Non-array input');
	}

	return raw;
    }

    lower(a: any[]): any {
	return a;
    }
}


export class ArrayMarshaller extends BaseArrayMarshaller<any> {
    build(a: any[]) {
	return a;
    }

    unbuild(b: any[]) {
	return b;
    }
}


export class SingleArrayMarshaller<T> extends BaseArrayMarshaller<T> {
    private _inner: Marshaller<T>;

    constructor(inner: Marshaller<T>) {
	super();
	this._inner = inner;
    }

    build(a: any[]): T[] {
	const cooked: T[] = [];

	for (let elem of a) {
	    cooked.push(this._inner.extract(elem));
	}

	return cooked;
    }

    unbuild(cooked: T[]): any[] {
	const a: any[] = [];

	for (let elem of cooked) {
	    a.push(this._inner.pack(elem));
	}

	return a;
    }
}


export type MarshalObject = {
    [key: string]: any
}


export abstract class BaseObjectMarshaller<T extends Object> extends RaiseBuildFilterMarshaller<MarshalObject, T> {
    raise(raw: any): MarshalObject {
        if (!(raw instanceof Object)) {
            throw new ExtractError('Non-object input');
        }

	return raw;
    }

    lower(a: MarshalObject): any {
	return a;
    }
}


export type MarshalMap<K> = {
    [key: string]: K
}


export abstract class MapMarshaller<K> extends BaseObjectMarshaller<MarshalMap<K>> {
    private _inner: Marshaller<K>;

    constructor(inner: Marshaller<K>) {
	super();
	this._inner = inner;
    }


    build(a: MarshalObject): MarshalMap<K> {
	const cooked: MarshalMap<K> = {};

	for (let key in a) {
	    cooked[key] = this._inner.extract(a[key]);
	}

	return cooked;
    }

    unbuild(cooked: MarshalMap<K>): MarshalObject {
	const a: MarshalObject = {};

	for (let key in cooked) {
	    a[key] = this._inner.pack(cooked[key]);
	}

	return a;
    }
}


export type MarshalSchema<T extends Object> = {
    [key in keyof T]: Marshaller<any>
}


export class ObjectMarshaller<T extends Object> extends BaseObjectMarshaller<T> {
    private _prototype: any;
    private _schema: MarshalSchema<T>;

    constructor(prototype: any, schema: MarshalSchema<T>) {
	super();
	this._prototype = prototype;
        this._schema = schema;
    }

    build(raw: MarshalObject): T {
        // We're gonna build it to it's final form in a typesafe way here.
        const cooked = Object.create(this._prototype);

        for (let propName in this._schema) {
	    if (this._schema[propName] instanceof OptionalMarshaller && !raw.hasOwnProperty(propName)) {
		continue;
	    }
	    
            if (!raw.hasOwnProperty(propName)) {
                throw new ExtractError(`Field ${propName} is missing`);
            }

            cooked[propName] = this._schema[propName].extract(raw[propName]);
        }

        return cooked as T;
    }

    unbuild(cooked: T): MarshalObject {
	const b: MarshalObject = {};

	for (let propName in this._schema) {
	    if (!cooked.hasOwnProperty(propName)) {
		throw new PackError(`Field ${propName} is missing`);
	    }

	    b[propName] = this._schema[propName].pack(cooked[propName]);
	}

	return b;
    }
}


export function OptionalOf<T>(marshallerCtor: new () => Marshaller<T>): new() => Marshaller<T|null> {
    return class extends OptionalMarshaller<T> {
	constructor() {
	    super(new marshallerCtor());
	}
    };
}


export function ArrayOf<T>(marshallerCtor: new () => Marshaller<T>): new() => Marshaller<T[]> {
    return class extends SingleArrayMarshaller<T> {
	constructor() {
	    super(new marshallerCtor());
	}
    };
}


export function MarshalWith<T>(marshallerCtor: new () => Marshaller<T>) {
    return function(target: any, propertyKey: string) {
	if (!target.hasOwnProperty('__schema')) {
	    target.__schema = {};
	}
	
	target.__schema[propertyKey] = new marshallerCtor();
    }
}


export function MarshalFrom<T>(entity: any): new() => Marshaller<T> {
    let schema = entity.prototype.__schema;
    if (schema === undefined) {
	schema = {} as MarshalSchema<T>;
    }
    
    return class extends ObjectMarshaller<T> {
	constructor() {
	    super(entity.prototype, schema);
	}
    };
}
