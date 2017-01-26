import { Marshaller, ExtractError } from './index';


export class TimeMarshaller implements Marshaller<Date> {
    extract(raw: any): Date {
	if (typeof raw !== 'number') {
	    throw new ExtractError('Non-numeric timestamp');
	}

	if (raw < 0) {
	    throw new ExtractError('Non-positive timestamp');
	}

	return new Date(raw);
    }

    pack(date: Date): any {
	return date.getTime();
    }
}
