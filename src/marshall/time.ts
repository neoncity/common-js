import { ExtractError } from './index';
import { BaseNumberMarshaller } from './number';


export class TimeMarshaller extends BaseNumberMarshaller<Date> {
    build(a: number): Date {
	if (!Number.isInteger(a)) {
	    throw new ExtractError('Expected an integer');
	}
	
	if (a < 0) {
	    throw new ExtractError('Expected a positive timestamp');
	}

	return new Date(a);
    }

    unbuild(date: Date): number {
	return date.getTime();
    }
}
