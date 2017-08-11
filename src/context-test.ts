import { expect } from 'chai'
import 'mocha'

import { Context, parseContext, isServer } from './context'


describe('Context', () => {
    describe('parseContext', () => {
        it('should parse client', () => {
            expect(parseContext('CLIENT')).to.equal(Context.Client);
            expect(parseContext('client')).to.equal(Context.Client);
            expect(parseContext('cLiEnT')).to.equal(Context.Client);
        });

        it('should parse server', () => {
            expect(parseContext('SERVER')).to.equal(Context.Server);
            expect(parseContext('server')).to.equal(Context.Server);
            expect(parseContext('sErVeR')).to.equal(Context.Server);
        });

        it('should throw on undefined', () => {
            expect(() => parseContext(undefined)).to.throw('Context is not defined');
        });

        it('should throw on unknown context', () => {
            expect(() => parseContext('DEV')).to.throw('Invalid context DEV');
        });
    });

    describe('isServer', () => {
        it('should recognize server as server', () => {
            expect(isServer(Context.Server)).to.be.true;
        });

        it('should recognize client as non-server', () => {
            expect(isServer(Context.Client)).to.be.false;
        });
    });
});
