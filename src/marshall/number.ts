import { ExtractError, RaiseBuildFilterMarshaller } from './index';


export abstract class BaseNumberMarshaller<T> extends RaiseBuildFilterMarshaller<number, T> {
    raise(raw: any): number {
	if (typeof raw !== 'number') {
	    throw new ExtractError('Expected a number');
	}

	return raw;
    }

    lower(a: number): any {
	return a;
    }
}


export class NumberMarshaller extends BaseNumberMarshaller<number> {
    build(a: number): number {
	return a;
    }

    unbuild(b: number): number {
	return b;
    }
}


export class IntegerMarshaller extends NumberMarshaller {
    filter(b: number): number {
        if (!Number.isInteger(b)) {
            throw new ExtractError('Expected an integer');
        }

        return b;
    }
}
