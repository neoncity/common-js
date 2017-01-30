import { expect } from 'chai'
import 'mocha'

import { TimeMarshaller } from './time';


describe('TimeMarshaller', () => {
    const DatesTs = [
	Date.UTC(2017, 1, 17, 11),
	Date.UTC(2017, 1, 17, 11, 22, 33),
	Date.UTC(2017, 1, 17, 11, 22, 33, 123)
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
	for (let dateTs of DatesTs) {
            it(`should parse ${new Date(dateTs).toISOString()}`, () => {
		const timeMarshaller = new TimeMarshaller();
		
		expect(timeMarshaller.extract(dateTs).getTime()).to.equal(new Date(dateTs).getTime());
            });
	}

	for (let nonNumeric of NonNumerics) {
    	    it(`should throw for ${JSON.stringify(nonNumeric)}`, () => {
    		const timeMarshaller = new TimeMarshaller();

    		expect(() => timeMarshaller.extract(nonNumeric)).to.throw('Expected a number');
    	    });
	}

        it('should throw at negative time', () => {
            const timeMarshaller = new TimeMarshaller();

            expect(() => timeMarshaller.extract(-1)).to.throw('Non-positive time');
            expect(() => timeMarshaller.extract(-103)).to.throw('Non-positive time');
        });
    });

    describe('pack', () => {
	for (let dateTs of DatesTs) {
    	    it(`should produce the same input for ${new Date(dateTs).toISOString()}`, () => {
    		const timeMarshaller = new TimeMarshaller();

    		expect(timeMarshaller.pack(new Date(dateTs))).to.equal(dateTs);
    	    });
	}
    });

    describe('extract and pack', () => {
	for (let dateTs of DatesTs) {
    	    it(`should be opposites for ${new Date(dateTs).toISOString()}`, () => {
    		const timeMarshaller = new TimeMarshaller();

    		const raw = dateTs;
    		const extracted = timeMarshaller.extract(raw);
    		const packed = timeMarshaller.pack(extracted);

    		expect(packed).to.equal(raw);
    	    });
	}
    });
});
