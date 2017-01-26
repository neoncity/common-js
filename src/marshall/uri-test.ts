import { expect } from 'chai'
import 'mocha'

import { UriMarshaller } from './uri';


describe('UriMarshaller', () => {
    const Uris = [
	'http://google.com',
	'https://stackoverflow.com',
	'http://example.com/test'
    ];

    const NonStrings = [
	null,
	undefined,
	100,
	-20,
	[],
	['hello'],
	{},
	{hello: 'hello'}
    ];

    const InvalidUris = [
	'',
	'fpt://ftp.richardsonnen.com',
	'http:www.richardsonnen.com',
	'https:www.richardsonnen.com'
    ];

    describe('extract', () => {
	for (let uri of Uris) {
	    it(`should parse ${uri}`, () => {
		const uriMarshaller = new UriMarshaller();

		expect(uriMarshaller.extract(uri)).to.equal(uri);
	    });
	}

	for (let nonString of NonStrings) {
	    it(`should throw for ${JSON.stringify(nonString)}`, () => {
		const uriMarshaller = new UriMarshaller();

		expect(() => uriMarshaller.extract(nonString)).to.throw('Non-string URI');
	    });
	}

	for (let invalidUri of InvalidUris) {
	    it(`should throw for ${JSON.stringify(invalidUri)}`, () => {
		const uriMarshaller = new UriMarshaller();

		expect(() => uriMarshaller.extract(invalidUri)).to.throw('Not a valid URI');
	    });
	}
    });
});
