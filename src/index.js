import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { hot } from 'react-hot-loader'
import Home from "./Containers/Home"
import reducers from "./reducers"

const urlParams = new URLSearchParams(window.location.search)
const term = urlParams.get('term') || ""
const recipeId = urlParams.get('recipeId') || ""
const ingredients = urlParams.get('ingredients') ? urlParams.get('ingredients').split(',') : []
const initalState = {search: {term, ingredients, recipeId}, recipe: {id: recipeId}}
const store = createStore(reducers, initalState, applyMiddleware(thunkMiddleware))


const WrappedHome = () => (
  <Provider store={store}>
    <Home />
  </Provider>
)

const HotHome = hot(module)(WrappedHome)

ReactDOM.render(
  <HotHome />,
  document.getElementById("home")
)
