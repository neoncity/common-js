import { expect } from 'chai'
import 'mocha'

import { IdMarshaller } from './id'
import { IntegerMarshaller, NumberMarshaller } from './number'
import { ObjectMarshaller, UntypedObjectMarshaller, MarshalSchema } from './object'
import { OptionalMarshaller } from './optional'
import { StringMarshaller } from './string'


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
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        coordsSum(): number {
            return this.x + this.y;
        }
    }

    const PointSchema: MarshalSchema<Point> = {
        x: new NumberMarshaller(),
        y: new NumberMarshaller()
    };

    const Points = [
        [{x: 10, y: 20}, new Point(10, 20), 30],
        [{x: 11, y: 22}, new Point(11, 22), 33],
        [{x: 12, y: 24, z: 36}, new Point(12, 24), 36]
    ];

    class User {
	id: number;
	name: string;
	age: number;

	homePosition: Point;
	officePosition: Point|null;

	constructor(id: number, name: string, age: number, homePosition: Point, officePosition?: Point) {
	    this.id = id;
	    this.name = name;
	    this.age = age;
	    this.homePosition = homePosition;
	    if (typeof officePosition == 'undefined') {
		this.officePosition = null;
	    } else {
		this.officePosition = officePosition;
	    }
	}
    }

    const UserSchema: MarshalSchema<User> = {
	id: new IdMarshaller(),
	name: new StringMarshaller(),
	age: new IntegerMarshaller(),
	homePosition: new ObjectMarshaller<Point>(Point, PointSchema),
	officePosition: new OptionalMarshaller<Point>(new ObjectMarshaller<Point>(Point, PointSchema))
    };

    const Users = [
	[{id: 1, name: 'John', age: 21, homePosition: {x: 0, y: 20}, officePosition: {x: 10, y: 20}},
	 new User(1, 'John', 21, new Point(0, 20), new Point(10, 20))],
	[{id: 2, name: 'Jane', age: 22, homePosition: {x: 10, y: 30}},
	 new User(2, 'Jane', 22, new Point(10, 30))],
	[{id: 3, name: 'Harry', age: 24, homePosition: {x: 100, y: 300}, money: 1000},
	 new User(3, 'Harry', 24, new Point(100, 300))],	
    ];
    
    describe('extract', () => {
        for (let [raw, point, coordsSum] of Points) {
            it(`should extract ${JSON.stringify(raw)}`, () => {
                const pointMarshaller = new ObjectMarshaller<Point>(Point, PointSchema);
                const extracted: Point = pointMarshaller.extract(raw);

                expect(extracted).to.be.an.instanceof(Point);
                expect(extracted).to.eql(point);
                expect(extracted.coordsSum()).to.eql(coordsSum);
            });
        }

	for (let [raw, user] of Users) {
	    it(`should extract ${JSON.stringify(raw)}`, () => {
		const userMarshaller = new ObjectMarshaller<User>(User, UserSchema);
		const extracted: User = userMarshaller.extract(raw);

                expect(extracted).to.be.an.instanceof(User);
                expect(extracted).to.eql(user);
	    });
	}
    });
});
