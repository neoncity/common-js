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
