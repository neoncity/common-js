import { ArrayMarshaller } from './array'
import { Marshaller } from './index'
import { MapMarshaller, MarshalMap } from './map'
import { MarshalSchema, ObjectMarshaller } from './object'
import { OptionalMarshaller } from './optional'


export function OptionalOf<T>(marshallerCtor: new () => Marshaller<T>): new() => Marshaller<T|null> {
    return class extends OptionalMarshaller<T> {
	constructor() {
	    super(new marshallerCtor());
	}
    };
}


export function ArrayOf<T>(marshallerCtor: new () => Marshaller<T>): new() => Marshaller<T[]> {
    return class extends ArrayMarshaller<T> {
	constructor() {
	    super(new marshallerCtor());
	}
    };
}


export function MapOf<T>(marshallerCtor: new () => Marshaller<T>): new() => Marshaller<MarshalMap<T>> {
    return class extends MapMarshaller<T> {
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
	    super(entity.prototype, schema as MarshalSchema<T>);
	}
    };
}
