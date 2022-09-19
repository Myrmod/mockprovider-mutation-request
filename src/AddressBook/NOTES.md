# Notes

## Customer

```json
{
  "data": {
    "customer": {
      "firstname": "John",
      "lastname": "Doe",
      "suffix": null,
      "email": "jdoe@example.com",
      "addresses": [
       {
         "firstname": "John",
         "lastname": "Doe",
         "street": [
           "123 Elm Street"
         ],
         "city": "Anytown",
         "region": {
           "region_code": "MI",
           "region": "Michigan"
         },
         "postcode": "78758",
         "country_code": "US",
         "telephone": "512 555-1212"
        }
      ]
    }
  }
}
```

https://devdocs.magento.com/guides/v2.4/graphql/queries/customer.html


### Customer Address

#### Get

Query Customer object for addresses

https://devdocs.magento.com/guides/v2.4/graphql/queries/customer.html

#### Create

https://devdocs.magento.com/guides/v2.4/graphql/mutations/create-customer-address.html

#### Update

https://devdocs.magento.com/guides/v2.4/graphql/mutations/update-customer-address.html

#### Delete

https://devdocs.magento.com/guides/v2.4/graphql/mutations/delete-customer-address.html


## Model issues

### International address formatting

* {postcode} {city} doesn't work out for all countries
* How does Commerce deal with this? 

### Second address

* Second address as indicated in designs isn't among the standard fields provided by Commerce.
  * Implement as custom attribute or
  * Exclude from requirements

### Default address

* There is two kinds of default address, `default_billing` and `default_shipping`
  * Which one is supposed to be the default address here?
  * Now using `default_shipping`
* Removal logic
  * Can the default address be deleted?
  * For now we prevent this since it's the easiest way to make it consistent
  * Ordering
    * Handled by Commerce or do we need to account for this?



## MUI

### Forms

https://onestepcode.com/creating-a-material-ui-form/

### HookForm

https://codeat21.com/material-ui-with-react-hook-form-validation-with-error-messages/


## Reponsive fullscreen dialog

https://mui.com/material-ui/react-dialog/#responsive-full-screen


### Country Select

https://javascript.plainenglish.io/create-a-country-select-component-with-react-2021-a259bd0350d5


## Ideas

## Layering

Separation of concern: Consider wrapping rather unaware components in some data-fetching layer that sits on top of every component. For the ease of unit-testing, either version, i.e. the actual component and its fetching hoc

### Context

What about using React's Context API to share some essential data across components, e.g. `CustomerContext` as well as corresponding Providers?

Even if components are not supposed to share stuff, it could still be beneficial for structural reasons, e.g. injecting common data and fetch calls from highest levels and pass through

### Linter

* Camelcase rule <-> API Snakecase?
* Import ordering (Auto fixable)

### Optimistic rendering?

* e.g. Adding address client-side before request even though it might fail
* https://www.apollographql.com/blog/frontend/tutorial-graphql-mutations-optimistic-ui-and-store-updates-f7b6b66bf0e2/



### Error Boundary?

* Global error catching
* Might still be useful even if modules are independent

### Loading state

* Skeleton?
* Spinner Button?

## Interesting reads

https://medium.com/google-design/the-evolution-of-material-designs-text-fields-603688b3fe03

