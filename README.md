To start run

```
npm ci && npm run dev
```

## Reproducing the error
1. Click on the edit button to open the form
2. change the last number of the telephone number from a 7 to an 8

An error like
```
index.ts:71 Uncaught (in promise) Error: No more mocked responses for the query: {
  customer {
    firstname
    lastname
    addresses {
      id
      firstname
      lastname
      postcode
      street
      city
      country_code
      telephone
      default_shipping
    }
  }
}
Expected variables: {}

    at new ApolloError2 (index.ts:71:5)
    at QueryManager.ts:1080:13
    at both (asyncMap.ts:30:30)
    at asyncMap.ts:19:47
    at new Promise (<anonymous>)
    at Object.then (asyncMap.ts:19:16)
    at Object.error (asyncMap.ts:31:39)
    at notifySubscription (module.js:137:18)
    at onNotify (module.js:176:3)
    at SubscriptionObserver2.error (module.js:229:5)
```

should be shown in the console