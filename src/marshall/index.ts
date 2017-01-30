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


export class BooleanMarshaller implements Marshaller<boolean> {
    extract(raw: any): boolean {
	if (typeof raw !== 'boolean') {
	    throw new ExtractError('Expected a boolean');
	}

	return raw;
    }

    pack(cooked: boolean): any {
	return cooked;
    }
}


export class NumberMarshaller implements Marshaller<number> {
    extract(raw: any): number {
	if (typeof raw !== 'number') {
	    throw new ExtractError('Expected a number');
	}

	return raw;
    }

    pack(cooked: number): any {
	return cooked;
    }
}


export class StringMarshaller implements Marshaller<string> {
    extract(raw: any): string {
	if (typeof raw !== 'string') {
	    throw new ExtractError('Expected a string');
	}

	return raw;
    }

    pack(cooked: string): any {
	return cooked;
    }
}


export class OptionalMarshaller<T> implements Marshaller<T> {
    private _inner: Marshaller<T>;

    constructor(inner: Marshaller<T>) {
	this._inner = inner;
    }

    extract(raw: any): T {
	return this._inner.extract(raw);
    }

    pack(cooked: T): any {
	return this._inner.pack(cooked);
    }
}


export class ArrayMarshaller<T extends Object> implements Marshaller<T[]> {
    private _inner: Marshaller<T>;

    constructor(inner: Marshaller<T>) {
	this._inner = inner;
    }

    extract(raw: any): T[] {
	if (!Array.isArray(raw)) {
	    throw new ExtractError('Non-array input');
	}

	const cooked: T[] = [];

	for (let elem of raw) {
	    cooked.push(this._inner.extract(elem));
	}

	return cooked;
    }

    pack(cooked: T[]): any {
	const raw: any[] = [];

	for (let elem of cooked) {
	    raw.push(this._inner.pack(elem));
	}

	return raw;
    }
}


export type MarshalSchema<T extends Object> = {
    [key in keyof T]: Marshaller<any>
}


export class ObjectMarshaller<T extends Object> implements Marshaller<T> {
    private _schema: MarshalSchema<T>;

    constructor(schema: MarshalSchema<T>) {
        this._schema = schema;
    }

    extract(raw: any): T {
        if (!(raw instanceof Object)) {
            throw new ExtractError('Non-object input');
        }

        // We're gonna build it to it's final form in a typesafe way here.
        const cooked = {} as T;

        for (let propName in this._schema) {
	    if (this._schema[propName] instanceof OptionalMarshaller && !raw.hasOwnProperty(propName)) {
		continue;
	    }
	    
            if (!raw.hasOwnProperty(propName)) {
                throw new ExtractError(`Field ${propName} is missing`);
            }

            cooked[propName] = this._schema[propName].extract(raw[propName]);
        }

        // This is where the schema 
        return cooked;
    }

    pack(cooked: T): any {
        return cooked;
    }
}


export abstract class ChainedMarshaller<T> implements Marshaller<T> {
    extract(raw: any): T {
    }

    pack(cooked: T): any {
    }

    abstract linkExtract(raw: any): T {
    }
}


//// --- exploration.


interface Marshaller<T> {} // Something which marshalls from any to T

// primitive & basic marshallers
class BooleanMarshaller : Marshaller<boolean> {} // Marshalls from any to boolean
class NumberMarshaller : Marshaller<number> {} // Marshalls from any to number
class StringMarshaller : Marshaller<string> {} // Marshalls from any to string

// composite marshallers
class ArrayMarshaller<T>(inner: Marshaller<T>) : Marshaller<T[]> {} // Marshalls from any to T[]
class OptionalMarshaller<T>(inner: Marshaller<T>): Marshaller<T|null> {} // Marshalls from any to T|null
class ObjectMarshaller<T>(schema: MarshalSchema) : Marshaller<T> {} // Marshalls an any into an Object with a given structure

class UriMarshaller : StringMarshaller {} // output is still string, so we can do
UriMarshaller {
    extract(raw: any): string => {const l = super.extract(raw); .... }
    // but we'd actually like
    extract(raw: string): string
}

//we could have
class ChainedMarshaller<A, B> implements Marshaller<B> {
    extract(raw: any): B => same as ChainedMarshaller
    abstract raise(raw: any): A
    step(a: A): B
}

class BaseStringMarshaller<T> implements ChainedMarshaller<string, T> {
    raise() => do the string
}

class UriMarshaller extends BaseStringMarshaller<URI> {
    step() => check it is an Uri
}

class WebUriMarshaller extends UriMarshaller {
    step() => assert it is an http|https
}

class BaseNumberMarshaller<T> implements ChainedMarshaller<number, T> {
    raise() => do the int
}

class DateMarshaller implements BaseNumberMarshaller<Date> {
    step() => do the thing
}

// but perhaps, too much power?

class User {
    @Marshal(IdMarshaller)
    id: number;
    @Marshal(Optional(IdMarshaller))
    fbId: number
    @Marshal(Array(ProfilesMarshaller))
    profiles: Profiles[]
    @Marshal(Marshaller(User))
}
