import { expect } from 'chai'
import 'mocha'

import { ArrayMarshaller} from './array'
import { MapMarshaller} from './map'
import { NumberMarshaller } from './number'
import { OptionalMarshaller } from './optional'
import { ArrayOf, MapOf, OptionalOf } from './annotation'


describe('OptionalOf', () => {
    it('should create an OptionalMarshaller', () => {
        const marshaller = new (OptionalOf(NumberMarshaller));

        expect(marshaller).to.be.an.instanceof(OptionalMarshaller);
    });
});


describe('ArrayOf', () => {
    it('should create an ArrayMarshaller', () => {
        const marshaller = new (ArrayOf(NumberMarshaller));

        expect(marshaller).to.be.an.instanceof(ArrayMarshaller);
    });
});


describe('MapOf', () => {
    it('should create an MapMarshaller', () => {
        const marshaller = new (MapOf(NumberMarshaller));

        expect(marshaller).to.be.an.instanceof(MapMarshaller);
    });
});
