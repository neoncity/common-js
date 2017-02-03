import { expect } from 'chai'
import 'mocha'


import { ArrayMarshaller } from './array'


describe('ArrayMarshaller', () => {
    const Arrays = [
        [],
        [1],
        [1, 2, 3],
        ['hello', 10, true],
        [null, null],
        [{a: 'more'}, {complicated: 'array'}, true]
    ];
    
    const NonArrays = [
        10,
        31.23,
	null,
	undefined,
	NaN,
	Number.POSITIVE_INFINITY,
	Number.NEGATIVE_INFINITY,
        true,
        false,
	'hello',
	'100',
	{},
	{hello: 20.2}
    ];
    
    describe('extract', () => {
        for (let array of Arrays) {
            it(`should extract ${JSON.stringify(array)}`, () => {
                const arrayMarshaller = new ArrayMarshaller();

                expect(arrayMarshaller.extract(array)).to.eql(array);
            });
        }

        for (let nonArray of NonArrays) {
            it(`should throw for non-array ${JSON.stringify(nonArray)}`, () => {
                const arrayMarshaller = new ArrayMarshaller();

                expect(() => arrayMarshaller.extract(nonArray)).to.throw('Expected an array');
            });
        }
    });

    describe('pack', () => {
        for (let array of Arrays) {
            it(`should produce the same input for ${JSON.stringify(array)}`, () => {
                const arrayMarshaller = new ArrayMarshaller();

                expect(arrayMarshaller.pack(array)).to.eql(array);
            });
        }
    });

    describe('extract and pack', () => {
        for (let array of Arrays) {
            it(`should be opposites for ${array}`, () => {
                const arrayMarshaller = new ArrayMarshaller();

                const raw = array;
		const extracted = arrayMarshaller.extract(raw);
		const packed = arrayMarshaller.pack(extracted);

		expect(packed).to.eql(raw);
            });
        }
    });
});
