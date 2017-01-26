import { expect } from 'chai'
import 'mocha'

import { IdMarshaller } from './id';


describe('IdMarshaller', () => {
    describe('extract', () => {
        it('should parse valid ids', () => {
            const idMarshaller = new IdMarshaller();
        
            expect(idMarshaller.extract(1)).to.equal(1);
            expect(idMarshaller.extract(103)).to.equal(103);
        });

	it('should throw at non-numerics', () => {
	    const idMarshaller = new IdMarshaller();

	    expect(() => idMarshaller.extract(null)).to.throw('Non-numeric id');
	    expect(() => idMarshaller.extract(undefined)).to.throw('Non-numeric id');
	    expect(() => idMarshaller.extract('hello')).to.throw('Non-numeric id');
	    expect(() => idMarshaller.extract('100')).to.throw('Non-numeric id');
	    expect(() => idMarshaller.extract([])).to.throw('Non-numeric id');
	    expect(() => idMarshaller.extract([100])).to.throw('Non-numeric id');
	    expect(() => idMarshaller.extract({})).to.throw('Non-numeric id');
	    expect(() => idMarshaller.extract({hello: 100})).to.throw('Non-numeric id');
	});

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
	it('should produce the same input', () => {
	    const idMarshaller = new IdMarshaller();

	    expect(idMarshaller.pack(10)).to.equal(10);
	});
    });

    describe('extract and pack', () => {
	it('should be opposites', () => {
	    const idMarshaller = new IdMarshaller();

	    const raw = 10;
	    const extracted = idMarshaller.extract(raw);
	    const packed = idMarshaller.pack(extracted);

	    expect(packed).to.equal(raw);
	});
    });
});


