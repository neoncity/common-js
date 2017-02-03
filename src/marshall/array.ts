import { ExtractError, Marshaller, RaiseBuildFilterMarshaller } from './index'


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