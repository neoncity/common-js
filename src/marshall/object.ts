import { ExtractError, Marshaller, PackError, RaiseBuildFilterMarshaller } from './index'
import { OptionalMarshaller } from './optional'


export type MarshalObject = {
    [key: string]: any
}


export abstract class BaseObjectMarshaller<T extends Object> extends RaiseBuildFilterMarshaller<MarshalObject, T> {
    raise(raw: any): MarshalObject {
        if (!(raw != null && typeof raw === 'object' && !Array.isArray(raw))) {
            throw new ExtractError('Expected an object');
        }

	return raw;
    }

    lower(a: MarshalObject): any {
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
