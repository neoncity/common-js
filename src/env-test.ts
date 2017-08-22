import { expect } from 'chai'
import 'mocha'

import { Env, parseEnv, isLocal, isOnServer, envToString } from './env'


describe('Env', () => {
    describe('parseEnv', () => {
        it('should parse local', () => {
            expect(parseEnv('LOCAL')).to.equal(Env.Local);
            expect(parseEnv('local')).to.equal(Env.Local);
            expect(parseEnv('lOcAl')).to.equal(Env.Local);
        });

        it('should parse test', () => {
            expect(parseEnv('TEST')).to.equal(Env.Test);
            expect(parseEnv('test')).to.equal(Env.Test);
            expect(parseEnv('tEsT')).to.equal(Env.Test);
        });

        it('should parse staging', () => {
            expect(parseEnv('STAGING')).to.equal(Env.Staging);
            expect(parseEnv('staging')).to.equal(Env.Staging);
            expect(parseEnv('sTaGiNg')).to.equal(Env.Staging);
        });

        it('should parse prod', () => {
            expect(parseEnv('PROD')).to.equal(Env.Prod);
            expect(parseEnv('prod')).to.equal(Env.Prod);
            expect(parseEnv('pRoD')).to.equal(Env.Prod);
        });

        it('should throw on undefined', () => {
            expect(() => parseEnv(undefined)).to.throw('Environment is not defined');
        });

        it('should throw on unknown environment', () => {
            expect(() => parseEnv('DEV')).to.throw('Invalid environment DEV');
        });
    });

    describe('envToString', () => {
        it('should convert local', () => {
            expect(envToString(Env.Local)).to.equal('LOCAL');
        });

        it('should convert test', () => {
            expect(envToString(Env.Test)).to.equal('TEST');
        });

        it('should convert stating', () => {
            expect(envToString(Env.Staging)).to.equal('STAGING');
        });

        it('should convert prod', () => {
            expect(envToString(Env.Prod)).to.equal('PROD');
        });
    });

    describe('parseEnv is the opposite of envToString', () => {
        it('should be the case for local', () => {
            expect(envToString(parseEnv('LOCAL'))).to.equal('LOCAL');
            expect(parseEnv(envToString(Env.Local))).to.equal(Env.Local);
        });

        it('should be the case for test', () => {
            expect(envToString(parseEnv('TEST'))).to.equal('TEST');
            expect(parseEnv(envToString(Env.Test))).to.equal(Env.Test);
        });

        it('should be the case for staging', () => {
            expect(envToString(parseEnv('STAGING'))).to.equal('STAGING');
            expect(parseEnv(envToString(Env.Staging))).to.equal(Env.Staging);
        });

        it('should be the case for prod', () => {
            expect(envToString(parseEnv('PROD'))).to.equal('PROD');
            expect(parseEnv(envToString(Env.Prod))).to.equal(Env.Prod);
        });
    });

    describe('isLocal', () => {
        it('should recognize local as local', () => {
            expect(isLocal(Env.Local)).to.be.true;
        });

        it('should recognize test as non-local', () => {
            expect(isLocal(Env.Test)).to.be.false;
        });

        it('should recognize staging as non-local', () => {
            expect(isLocal(Env.Staging)).to.be.false;
        });

        it('should recognize prod as non-local', () => {
            expect(isLocal(Env.Prod)).to.be.false;
        });
    });

    describe('isOnLocal', () => {
        it('should recognize local as not on server', () => {
            expect(isOnServer(Env.Local)).to.be.false;
        });

        it('should recognize test as not on server', () => {
            expect(isOnServer(Env.Test)).to.be.false;
        });

        it('should recognize staging as on server', () => {
            expect(isOnServer(Env.Staging)).to.be.true;
        });

        it('should recognize prod as server', () => {
            expect(isOnServer(Env.Prod)).to.be.true;
        });
    });
});
