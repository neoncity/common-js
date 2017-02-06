import { Marshaller } from './index'
import { BaseObjectMarshaller, MarshalObject } from './object'


export type MarshalMap<K> = {
    [key: string]: K
}


export class MapMarshaller<K> extends BaseObjectMarshaller<MarshalMap<K>> {
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