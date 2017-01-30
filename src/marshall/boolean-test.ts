import { expect } from 'chai'
import 'mocha'

import { BooleanMarshaller } from './boolean';


describe('BooleanMarshaller', () => {
    const NonBooleans = [
	null,
	undefined,
        100,
	'hello',
	'100',
	[],
	[true],
	{},
	{hello: false}
    ];

    describe('extract', () => {
        it('should parse true', () => {
            const booleanMarshaller = new BooleanMarshaller();

            expect(booleanMarshaller.extract(true)).to.be.true;
        });

        it('should parse false', () => {
            const booleanMarshaller = new BooleanMarshaller();

            expect(booleanMarshaller.extract(false)).to.be.false;
        });

        for (let nonBoolean of NonBooleans) {
            it(`should throw for ${JSON.stringify(nonBoolean)}`, () => {
                const booleanMarshaller = new BooleanMarshaller();

                expect(() => booleanMarshaller.extract(nonBoolean)).to.throw('Expected a boolean');
            });
        }
    });   
});
