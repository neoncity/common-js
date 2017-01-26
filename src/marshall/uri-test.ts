import { expect } from 'chai'
import 'mocha'

import { UriMarshaller } from './uri';


// Uri examples are copied from valid-url tests, which in turn borrowed from the
// Perl module.
describe('UriMarshaller', () => {
    const Uris = [
	'http://google.com',
	'https://stackoverflow.com',
	'http://example.com/test',
        'https://www.example.com/',
        'https://www.example.com',
        'https://www.example.com/foo/bar/test.html',
        'https://www.example.com/?foo=bar',
        'https://www.example.com:8080/test.html',
        'http://www.example.com/',
        'http://www.example.com',
        'http://www.example.com/foo/bar/test.html',
        'http://www.example.com/?foo=bar',
        'http://www.example.com/?foo=bar&space=trucks',
        'http://www.example.com?foo=bar',        
        'http://www.example.com?foo=bar&space=trucks',
        'http://www.example.com:8080/test.html',
        'http://example.w3.org/path%20with%20spaces.html',
        'http://192.168.0.1/'
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
        'foo',
        'foo@bar',
        'http://<foo>',
        '://bob/',
        '1http://bob',
        '1http:////foo.html',
        'http://example.w3.org/%illegal.html',
        'http://example.w3.org/%a',
        'http://example.w3.org/%a/foo',
        'http://example.w3.org/%at',
        'ftp://ftp.example.com',
        'https:www.example.com',
        'http:www.example.com'
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
