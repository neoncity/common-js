import { StringMarshaller, ExtractError } from 'raynor'

const localeCode = require('locale-code')
const languages = require('iso-639-1')


export class LanguageFromLocaleMarshaller extends StringMarshaller {
    filter(locale: string): string {
        if (!localeCode.validateLanguageCode(locale)) {
	    throw new ExtractError('Expected a valid locale');
	}

        return localeCode.getLanguageCode(locale);
    }
}


export class LanguageMarshaller extends StringMarshaller {
    filter(language: string): string {
        if (!languages.validate(language)) {
	    throw new ExtractError('Expected a valid language');
	}

        return language;
    }
}
