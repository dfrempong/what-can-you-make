import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { HomeWrapper, RecipeButton } from "./styles"
import Input from '@material-ui/core/Input'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import * as actions from '../../actions'
import Recipe from '../Recipe'

const ingredientList = [
  "flour", "sugar", "salt", "butter", "milk"
]

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    const {
      term,
      ingredients,
      searchRecipes,
      recipeId,
      fetchRecipe
    } = props
    this.state = {
      term,
      ingredients,
      recipeId
    }
    searchRecipes(term, ingredients)
    fetchRecipe(recipeId)
  }
  fetchSearch () {
    // TODO: something is missing here for fetching
    const {
      term,
      ingredients
    } = this.state
    const {
      searchRecipes
    } = this.props
    searchRecipes(term, ingredients)
    const params = new URLSearchParams(location.search)
    params.set('term', term)
    params.set('ingredients', ingredients)
    window.history.replaceState({}, '', `${location.pathname}?${params}`)
  }
  handleSearch(event) {
    const term = event.target.value
    this.setState({term})
  }
  handleIngredient(ingredient, event) {
    const {ingredients} = {...this.state}
    if (event.target.checked) {
      ingredients.push(ingredient)
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
    }
    this.setState({ingredients})
  }
  handleRecipeSelection(recipe) {
    const recipeId = recipe.id
    const {
      fetchRecipe
    } = this.props
    fetchRecipe(recipeId)
    this.setState({recipeId})
    const params = new URLSearchParams(location.search)
    params.set('recipeId', recipeId)
    window.history.replaceState({}, '', `${location.pathname}?${params}`)
  }
  render () {
    const {term, ingredients, recipeId} = this.state
    const {recipes, isLoading, error} = this.props
    return (
      <HomeWrapper>
        <Input
          autoFocus={true}
          fullWidth={true}
          onChange={this.handleSearch}
          value={term}
        />
        <div>
          <h3>Ingredients on hand</h3>
          {ingredientList.map(
            ingredient => (
              <FormControlLabel
                key={ingredient}
                control={
                  <Checkbox
                    checked={ingredients.includes(ingredient)}
                    onChange={this.handleIngredient.bind(this, ingredient)}
                    value={ingredient}
                  />
                }
                label={ingredient}
              />
            )
          )}
        </div>
        <Button onClick={this.fetchSearch}>
          search
        </Button>
        <Divider />
        {
          recipes && (
            <List>
              {recipes.length >0 ? recipes.map( recipe =>
                <ListItem key={recipe.id}>
                  <RecipeButton className={(recipeId === recipe.id) && 'selected'}>
                    <ListItemText primary={recipe.name} onClick={this.handleRecipeSelection.bind(this, recipe)}/>
                  </RecipeButton>
                </ListItem>
              ) : <p>No recipes found for current selection</p>}
            </List>
          )
        }
        {error && <p>Error updating recipes due to {error}</p>}
        {isLoading && <LinearProgress />}
        <Divider />
        {/*
          TODO: Add a recipe component here.
          I'm expecting you to have it return null or a component based on the redux state, not passing any props from here
          I want to see how you wi
          re up a component with connect and build actions.
        */}
        <Recipe />
      </HomeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { search } = state
  return {...search}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  searchRecipes: actions.searchRecipes,
  fetchRecipe: actions.fetchRecipe,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
