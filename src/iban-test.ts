import { expect } from 'chai'
import 'mocha'

import { IBAN, IBANMarshaller } from './iban'


describe('IBANMarshaller', () => {
    const IBANs = [
	['RO113321', new IBAN('RO', '11', '3321')],
	['RO314321ABCD', new IBAN('RO', '31', '4321ABCD')]
    ];

    const NonRoIBANs = [
	'GB114321'
    ];

    const NonIBANs = [
	'',
	'RO114321-4321',
	'RO114321_4321',
	'RO11432',
	'ROAB4321',
	'RO11',
	'11114321'
    ];

    describe('extract', () => {
	for (let [ibanSymbol, iban]  of IBANs) {
            it(`should parse ${ibanSymbol}`, () => {
                const ibanMarshaller = new IBANMarshaller();

                expect(ibanMarshaller.extract(ibanSymbol)).to.eql(iban);
            });
	}

	for (let iban of NonRoIBANs) {
	    it(`should throw for non-ro IBAN${iban}`, () => {
		const ibanMarshaller = new IBANMarshaller();

		expect(() => ibanMarshaller.extract(iban)).to.throw('Expected a valid country for the IBAN');
	    });
	}	

	for (let nonIban of NonIBANs) {
	    it(`should throw for ${nonIban}`, () => {
		const ibanMarshaller = new IBANMarshaller();

		expect(() => ibanMarshaller.extract(nonIban)).to.throw('Expected an IBAN');
	    });
	}
    });

    describe('pack', () => {
	for (let [ibanSymbol, iban] of IBANs) {
	    it(`should produce the same input for ${ibanSymbol}`, () => {
		const ibanMarshaller = new IBANMarshaller();

		expect(ibanMarshaller.pack(iban as IBAN)).to.eql(ibanSymbol as string);
	    });
	}
    });

    describe('extract and pack', () => {
	for (let [ibanSymbol, _] of IBANs) {
	    it(`should be opposites for ${ibanSymbol}`, () => {
		const ibanMarshaller = new IBANMarshaller();

		const raw = ibanSymbol;
		const extracted = ibanMarshaller.extract(raw);
		const packed = ibanMarshaller.pack(extracted);

		expect(packed).to.eql(raw);
	    });
	}
    });
});
