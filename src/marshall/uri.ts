import { isWebUri } from 'valid-url'

import { Marshaller, ExtractError } from './index'


export class UriMarshaller implements Marshaller<string> {
    extract(raw: any): string {
	if (typeof raw !== 'string') {
	    throw new ExtractError('Non-string URI');
	}

	if (!isWebUri(raw)) {
	    throw new ExtractError('Not a valid URI');
	}

	return raw;
    }

    pack(uri: string): any {
	return uri;
    }	
}
