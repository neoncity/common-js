import { ExtractError } from './index';
import { BaseNumberMarshaller } from './number';


export class IdMarshaller extends BaseNumberMarshaller<number> {
    build(a: number): number {
        if (a <= 0) {
	    throw new ExtractError('Non-positive id');
	}

	return a;
    }

    unbuild(id: number): any {
	return id;
    }
}
