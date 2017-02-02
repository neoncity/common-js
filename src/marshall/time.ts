import { ExtractError } from './index';
import { BaseNumberMarshaller } from './number';


export class TimeMarshaller extends BaseNumberMarshaller<Date> {
    build(a: number): Date {
	if (a < 0) {
	    throw new ExtractError('Non-positive timestamp');
	}

	return new Date(a);
    }

    unbuild(date: Date): number {
	return date.getTime();
    }
}
