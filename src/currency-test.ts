import { expect } from 'chai'
import 'mocha'

import { StandardCurrencies, CurrencyMarshaller } from './currency'


describe('CurrencyMarshaller', () => {
    const Currencies = [
        ['EUR', StandardCurrencies.EUR],
        ['USD', StandardCurrencies.USD],
        ['RON', StandardCurrencies.RON]
    ];

    const NonCurrencies = [
        '',
        'eur',
        'usd',
        'ron',
        'hello',
        'this is a string'
    ];

    describe('extract', () => {
        for (let [currencySymbol, currency] of Currencies) {
            it(`should parse ${currencySymbol}`, () => {
                const currencyMarshaller = new CurrencyMarshaller();

                expect(currencyMarshaller.extract(currencySymbol)).to.eql(currency);
            });
        }

        for (let nonCurrency of NonCurrencies) {
            it(`should throw for ${nonCurrency}`, () => {
                const currencyMarshaller = new CurrencyMarshaller();

                expect(() => currencyMarshaller.extract(nonCurrency)).to.throw('Expected a currency name');
            });
        }
    });

    describe('pack', () => {
        for (let [currencySymbol, currency] of Currencies) {
            it(`should produce the same input for ${currencySymbol}`, () => {
                const currencyMarshaller = new CurrencyMarshaller();

                expect(currencyMarshaller.pack(currency)).to.eql(currencySymbol);
            });
        }
    });

    describe('extract and pack', () => {
        for (let [currencySymbol, _] of Currencies) {
            it(`should be opposites for ${currencySymbol}`, () => {
                const currencyMarshaller = new CurrencyMarshaller();

                const raw = currencySymbol;
                const extracted = currencyMarshaller.extract(raw);
                const packed = currencyMarshaller.pack(extracted);

                expect(packed).to.eql(raw);
            });
        }
    });
});
