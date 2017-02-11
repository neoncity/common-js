import { expect } from 'chai'
import 'mocha'

import { NumberMarshaller } from './number'
import { OptionalMarshaller } from './optional'
import { OptionalOf } from './annotation'


describe('OptionalOf', () => {
    it('should create an OptionalMarshaller', () => {
        const marshaller = new (OptionalOf(NumberMarshaller));

        expect(marshaller).to.be.an.instanceof(OptionalMarshaller);
    });
});
