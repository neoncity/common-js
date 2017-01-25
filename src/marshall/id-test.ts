import { expect } from 'chai'
import 'mocha'

import { IdMarshaller } from './id';
import { ExtractError } from './index';


describe('IdMarshaller', () => {
    describe('extract', () => {
        it('should parse valid ids', () => {
            const idMarshaller = new IdMarshaller();
        
            expect(idMarshaller.extract(1)).to.equal(1);
            expect(idMarshaller.extract(103)).to.equal(103);
        });

        it('should throw at id zero', () => {
            const idMarshaller = new IdMarshaller();

            expect(() => idMarshaller.extract(0)).to.throw(ExtractError, undefined);
        });

        it('should throw at negative id', () => {
            const idMarshaller = new IdMarshaller();

            expect(() => idMarshaller.extract(-1)).to.throw(ExtractError);
            expect(() => idMarshaller.extract(-103)).to.throw(ExtractError);
        });
    });
});


