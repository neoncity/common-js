import { BaseStringMarshaller, ExtractError } from 'raynor'


export class IBAN {
    private readonly _countryCode: string;
    private readonly _checkDigits: string;
    private readonly _accountNumber: string;

    constructor(countryCode: string, checkDigits: string, accountNumber: string) {
	this._countryCode = countryCode;
	this._checkDigits = checkDigits;
	this._accountNumber = accountNumber;
    }

    toString(): string {
	return `${this._countryCode}${this._checkDigits}${this._accountNumber}`
    };
}


export class IBANMarshaller extends BaseStringMarshaller<IBAN> {
    private static readonly _allowedCountries = ['RO'];
    private static readonly _ibanRe = new RegExp('^([A-Z]{2})([0-9]{2})([A-Z0-9]{4,30})$');
    
    build(a: string): IBAN {
	const match = IBANMarshaller._ibanRe.exec(a);

	if (match == null) {
	    throw new ExtractError('Expected an IBAN');
	}

	const countryCode = match[1];
	const checkDigits = match[2];
	const accountNumber = match[3];

	if (IBANMarshaller._allowedCountries.indexOf(countryCode) == -1) {
	    throw new ExtractError('Expected a valid country for the IBAN');
	}

	return new IBAN(countryCode, checkDigits, accountNumber);
    }

    unbuild(iban: IBAN): string {
	return iban.toString();
    }
}
