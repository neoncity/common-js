import { expect } from 'chai'
import 'mocha'

import { StringMarshaller } from './string';


describe('StringMarshaller', () => {
    const Strings = [
        '',
        'hello',
        'this is a string',
        'this is a ünicode string'
    ];

    const NonStrings = [
	null,
	undefined,
	NaN,
	Number.POSITIVE_INFINITY,
	Number.NEGATIVE_INFINITY,
        true,
        false,
        100,
        3232.3,
	[],
	['hello'],
	{},
	{hello: 'world'}
    ];

    describe('extract', () => {
        for (let string of Strings) {
            it(`should parse ${string}`, () => {
                const stringMarshaller = new StringMarshaller();

                expect(stringMarshaller.extract(string)).to.equal(string);
            });
        }

        for (let nonString of NonStrings) {
            it(`should throw for ${JSON.stringify(nonString)}`, () => {
                const stringMarshaller = new StringMarshaller();

                expect(() => stringMarshaller.extract(nonString)).to.throw('Expected a string');
            });
        }
    });

    describe('pack', () => {
        for (let string of Strings) {
            it(`should produce the same input for ${string}`, () => {
                const stringMarshaller = new StringMarshaller();

                expect(stringMarshaller.pack(string)).to.equal(string);
            });
        }
    });

    describe('extract and pack', () => {
        for (let string of Strings) {
            it(`should be opposites for ${string}`, () => {
                const stringMarshaller = new StringMarshaller();

                const raw = string;
		const extracted = stringMarshaller.extract(raw);
		const packed = stringMarshaller.pack(extracted);

		expect(packed).to.equal(raw);
            });
        }
    });
});
