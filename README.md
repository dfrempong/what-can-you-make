# What Can You Make

## Installation

Run:

    yarn

This will install all packages and get it ready to start.

## Development

To bring up locally run:

    yarn start

This will start the backend, run webpack, and handle request proxying for the front end.

Navigate to [localhost:3000](http://localhost:3000) to see the frontend running!

## API

### /api/search

`method`: POST

`body`:

  * name - the recipe name
  * ingredients - array of ingredients

`response`: Array of `{id:string, name:string}`

### /api/recipe/:id

`method`: GET

`response`:

```js
{
  name: string,
  instructions: string,
  ingredients: string[]
}
```


## TODOs

  1. fix the search function
  1. add a recipe component to display the response
  1. add a recipe api to return the recipe (matching the above api docs!)
  1. add routing so that you can land on a recipe page or reload and have the same search
  1. add unit tests using jest, mocha, ava, jasmine, etc...

## Bonus

  1. add ci/cd using travis, circleCI, etc...
  1. containerize the application
  1. add deployments using heroku, digital ocean, etc...
  1. add integration tests using puppeteer, webdriver, playwright, etc...
