import { BaseStringMarshaller, ExtractError } from 'raynor'


export class Currency {
    private readonly  _name: string;

    constructor(name: string) {
	this._name = name;
    }

    getName(): string {
	return this._name;
    }
}


export const StandardCurrencies: any = {
    EUR: new Currency('EUR'),
    USD: new Currency('USD'),
    RON: new Currency('RON')
};


export class CurrencyMarshaller extends BaseStringMarshaller<Currency> {
    build(a: string): Currency {
	if (!StandardCurrencies.hasOwnProperty(a)) {
	    throw new ExtractError('Expected a currency name');
	}
	
	return StandardCurrencies[a];
    }

    unbuild(currency: Currency): string {
	return currency.getName();
    }
}
