import { expect } from 'chai'
import 'mocha'

import { WebUriMarshaller } from './uri';


// WebUri examples are copied from valid-url tests, which in turn borrowed from the
// Perl module.
describe('WebUriMarshaller', () => {
    const WebUris = [
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
        'http://example.w3.org/%at'
    ];

    const InvalidWebUris = [
        'ftp://ftp.example.com',
        'https:www.example.com',
        'http:www.example.com'
    ];

    describe('extract', () => {
	for (let uri of WebUris) {
	    it(`should parse ${uri}`, () => {
		const uriMarshaller = new WebUriMarshaller();

		expect(uriMarshaller.extract(uri)).to.equal(uri);
	    });
	}

	for (let nonString of NonStrings) {
	    it(`should throw for ${JSON.stringify(nonString)}`, () => {
		const uriMarshaller = new WebUriMarshaller();

		expect(() => uriMarshaller.extract(nonString)).to.throw('Expected a string');
	    });
	}

	for (let invalidUri of InvalidUris) {
	    it(`should throw for ${JSON.stringify(invalidUri)}`, () => {
		const uriMarshaller = new WebUriMarshaller();

		expect(() => uriMarshaller.extract(invalidUri)).to.throw('Not a valid URI');
	    });
	}	

	for (let invalidWebUri of InvalidWebUris) {
	    it(`should throw for ${JSON.stringify(invalidWebUri)}`, () => {
		const uriMarshaller = new WebUriMarshaller();

		expect(() => uriMarshaller.extract(invalidWebUri)).to.throw('Not a valid http/https URI');
	    });
	}
    });
});
