import { isUri, isWebUri } from 'valid-url'

import { BaseStringMarshaller, ExtractError } from './index'


export class UriMarshaller extends BaseStringMarshaller<string> {
    build(a: string): string {
	if (!isUri(a)) {
	    throw new ExtractError('Not a valid URI');
	}

	return a;
    }

    unbuild(uri: string): string {
	return uri;
    }
}


export class WebUriMarshaller extends UriMarshaller {
    filter(uri: string): string {
	if (!isWebUri(uri)) {
	    throw new ExtractError('Not a valid http/https URI');
	}

	return uri;
    }
}
