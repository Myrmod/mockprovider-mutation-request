import * as yup from 'yup';

export const addressSchema = yup.object().shape({
    firstname: yup
        .string()
        .required('Vorname muss ausgefüllt werden')
        .label('Vorname'),
    lastname: yup
        .string()
        .required('Nachname muss ausgefüllt werden')
        .label('Nachname'),
    country_code: yup
        .string()
        .required('Land muss ausgefüllt werden')
        .label('Land'),
    street: yup
        .string()
        .required('Adresse muss ausgefüllt werden')
        .label('Adresse'),
    city: yup.string().required('Stadt muss ausgefüllt werden').label('Stadt'),
    postcode: yup
        .string()
        .matches(/^[0-9]{5}/, {
            message: 'Die Postleitzahl darf nur aus 5 Nummern bestehen'
        })
        .length(5)
        .required('Postleitzahl muss ausgefüllt werden')
        .label('Postleitzahl'),
    telephone: yup
        .string()
        .matches(
            /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/,
            { message: 'Das Format der Telefonnummer ist ungültig' }
        )
        .label('Telefon')
});
