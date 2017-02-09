import { expect } from 'chai'
import 'mocha'

import { OptionalMarshaller } from './optional'
import { NumberMarshaller } from './number'
import { ObjectMarshaller, UntypedObjectMarshaller, MarshalSchema } from './object'
//import * as a from './annotation'


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


describe('ObjectMarshaller', () => {
    class Point {
        //@a.MarshalWith(NumberMarshaller)
        x: number;
        //@a.MarshalWith(NumberMarshaller)
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        coordsSum(): number {
            return this.x + this.y;
        }
    }

    const Objects = [
        [{x: 10, y: 20}, new Point(10, 20), 30],
        [{x: 11, y: 22}, new Point(11, 22), 33]
    ];

    const PointsSchema: MarshalSchema<Point> = {
        x: new NumberMarshaller(),
        y: new NumberMarshaller()
        //coordsSum: new OptionalMarshaller(new NumberMarshaller())
    };
    
    describe('extract', () => {
        for (let [raw, object, _] of Objects) {
            it(`should extract ${JSON.stringify(object)}`, () => {
                // const oo = new (a.MarshalFrom<Point>(Point));
                const objectMarshaller = new ObjectMarshaller<Point>(Point, PointsSchema);
                const extracted: Point = objectMarshaller.extract(raw);

                console.log(extracted);

                expect(extracted).to.be.an.instanceof(Point);
                expect(extracted).to.eql(object);
                //expect(extracted.coordsSum()).to.eql(coordsSum);
            });
        }
    });
});
