import { Marshaller, ExtractError } from './index';


export class IdMarshaller implements Marshaller<number, number> {
    static Schema = {
	'$schema': 'http://json-schema.org/draft-04/schema#',
	'title': 'Id',
	'description': 'An unique id for the entiry',
	'type': 'integer',
	'minimum': 1
    }
    
    extract(raw: number): number {
        if (raw <= 0) {
	    throw new ExtractError('Non-positive id');
	}

	return raw;
    }

    pack(cooked: number): number {
	return cooked;
    }
}
