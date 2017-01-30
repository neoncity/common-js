import { BaseNumberMarshaller, ExtractError } from './index';


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
