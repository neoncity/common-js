import { expect } from 'chai'
import 'mocha'

import { BooleanMarshaller } from './boolean'
import { MapMarshaller } from './map'


describe('MapMarshaller', () => {
    const Maps = [
        {},
        {a: true, b: false},
        {ax: true, bx: true, cx: false, dx: true}
    ];

    const HeterogenousMaps = [
        {a: 'true'},
        {a: true, b: 'false'},
        {a: true, b: {ax: true}}
    ];

    const NonMaps = [
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
        for (let map of Maps) {
            it(`should extract ${JSON.stringify(map)}`, () => {
                const booleanMarshaller = new BooleanMarshaller();
                const mapMarshaller = new MapMarshaller(booleanMarshaller);

                expect(mapMarshaller.extract(map)).to.eql(map);
            });
        }

        for (let heterogenousMap of HeterogenousMaps) {
            it(`should throw for heterogenous map ${JSON.stringify(heterogenousMap)}`, () => {
                const booleanMarshaller = new BooleanMarshaller();
                const mapMarshaller = new MapMarshaller(booleanMarshaller);

                expect(() => mapMarshaller.extract(heterogenousMap)).to.throw('Expected a boolean');
            });
        }

        for (let nonMap of NonMaps) {
            it(`should throw for ${JSON.stringify(nonMap)}`, () => {
                const booleanMarshaller = new BooleanMarshaller();
                const mapMarshaller = new MapMarshaller(booleanMarshaller);

                expect(() => mapMarshaller.extract(nonMap)).to.throw('Expected an object');
            });
        }
    });
});
