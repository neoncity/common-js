import { expect } from 'chai'
import 'mocha'

import { IdMarshaller } from './id';


describe('IdMarshaller', () => {
    const Ids = [
	1,
	103,
	23213131
    ];

    const NonNumerics = [
	null,
	undefined,
	'hello',
	'100',
	[],
	[100],
	{},
	{hello: 100}	
    ];
    
    describe('extract', () => {
	for (let id of Ids) {
            it(`should parse ${id} `, () => {
		const idMarshaller = new IdMarshaller();
		
		expect(idMarshaller.extract(id)).to.equal(id);
            });
	}

	for (let nonNumeric of NonNumerics) {
    	    it(`should throw for ${JSON.stringify(nonNumeric)}`, () => {
    		const idMarshaller = new IdMarshaller();

    		expect(() => idMarshaller.extract(nonNumeric)).to.throw('Non-numeric id');
    	    });
	}

        it('should throw at id zero', () => {
            const idMarshaller = new IdMarshaller();

            expect(() => idMarshaller.extract(0)).to.throw('Non-positive id');
        });

        it('should throw at negative id', () => {
            const idMarshaller = new IdMarshaller();

            expect(() => idMarshaller.extract(-1)).to.throw('Non-positive id');
            expect(() => idMarshaller.extract(-103)).to.throw('Non-positive id');
        });
    });

    describe('pack', () => {
	for (let id of Ids) {
	    it(`should produce the same input for ${id}`, () => {
		const idMarshaller = new IdMarshaller();

		expect(idMarshaller.pack(id)).to.equal(id);
	    });
	}
    });

    describe('extract and pack', () => {
	for (let id of Ids) {
	    it(`should be opposites ${id}`, () => {
		const idMarshaller = new IdMarshaller();

		const raw = id;
		const extracted = idMarshaller.extract(raw);
		const packed = idMarshaller.pack(extracted);

		expect(packed).to.equal(raw);
	    });
	}
    });
});
