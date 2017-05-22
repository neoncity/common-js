import { StringMarshaller, ExtractError } from 'raynor'

const localeCode = require('locale-code')
const languages = require('iso-639-1')


export class LanguageFromLocaleMarshaller extends StringMarshaller {
    filter(locale: string): string {
        const cleanedLocale = locale.replace('_', '-');
	
        if (!localeCode.validateLanguageCode(cleanedLocale)) {
	    throw new ExtractError('Expected a valid locale');
	}

        return localeCode.getLanguageCode(cleanedLocale);
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
