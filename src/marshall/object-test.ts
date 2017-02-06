import { expect } from 'chai'
import 'mocha'

import { UntypedObjectMarshaller } from './object'


describe('UntypedObjectMarshaller', () => {
    class Point {
	x: number;
	y: number;

	constructor(x: number, y: number) {
	    this.x = x;
	    this.y = y;
	}

	sumCoords(): number {
	    return this.x + this.y;
	}
    }
    
    const Objects = [
	{},
	{a: 'hello', b: 'world'},
	new Point(10, 20)
    ];

    const NonObjects = [
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
	[],
	[true, true, false]
    ];

    describe('extract', () => {
	for (let object of Objects) {
	    it(`should extract ${JSON.stringify(object)}`, () => {
		const objectMarshaller = new UntypedObjectMarshaller();
		const extracted = objectMarshaller.extract(object);

		expect(extracted).to.eql(object);
		expect(extracted).to.not.have.ownProperty('sumCoords');
	    });
	}

	for (let nonObject of NonObjects) {
	    it(`should throw for ${JSON.stringify(nonObject)}`, () => {
		const objectMarshaller = new UntypedObjectMarshaller();

		expect(() => objectMarshaller.extract(nonObject)).to.throw('Expected an object');
	    });
	}
    });

    describe('pack', () => {
	for (let object of Objects) {
	    it(`should produce the same input for ${JSON.stringify(object)}`, () => {
		const objectMarshaller = new UntypedObjectMarshaller();

		expect(objectMarshaller.pack(object)).to.eql(object);
	    });
	}
    });

    describe('extract and pack', () => {
	for (let object of Objects) {
	    it(`should be opposites for ${JSON.stringify(object)}`, () => {
		const objectMarshaller = new UntypedObjectMarshaller();

		const raw = object;
		const extracted = objectMarshaller.extract(raw);
		const packed = objectMarshaller.pack(extracted);

		expect(packed).to.eql(raw);
	    });
	}
    });    
});
