import { expect } from 'chai'
import 'mocha'

import { NumberMarshaller, IntegerMarshaller } from './boolean';


describe('NumberMarshaller', () => {
    const Numbers = [
        1,
        10,
        -54,
        4.3,
        893.2
    ];
    
    const NonNumbers = [
	null,
	undefined,
        true,
        false,
	'hello',
	'100',
	[],
	[100],
	{},
	{hello: 20.2}
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
