import { ExtractError, RaiseBuildFilterMarshaller } from './core';


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
