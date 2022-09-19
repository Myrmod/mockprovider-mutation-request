import countries from 'i18n-iso-countries';
import de from 'i18n-iso-countries/langs/de.json';
import en from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(en);
countries.registerLocale(de);

export type Country = {
    code: string;
    name: string;
};

export const useCountries = (
    language = 'EN'
): {
    countries: Country[];
} => {
    return {
        countries: Object.keys(countries.getAlpha2Codes()).map(
            (code: string) => ({
                code,
                name: countries.getName(code, language)
            })
        )
    };
};
