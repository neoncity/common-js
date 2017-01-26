import { Marshaller, ExtractError } from './index';


export class IdMarshaller implements Marshaller<number> {
    extract(raw: any): number {
	if (typeof raw !== 'number') {
	    throw new ExtractError('Non-numeric id');
	}
	
        if (raw <= 0) {
	    throw new ExtractError('Non-positive id');
	}

	return raw;
    }

    pack(cooked: number): any {
	return cooked;
    }
}
