// TODO Create a connected component to render a fetched recipe
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import LinearProgress from '@material-ui/core/LinearProgress'


class Recipe extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    const {recipe, isLoading} = this.props
    
    return (
      <>
        {recipe ? <div>
          <h1>{recipe.name}</h1>
          <h2>Ingredients</h2>
          <List>
            {recipe.ingredients.map( ingredient =>
              <ListItem key={ingredient.id}>
                <ListItemText primary={`${ingredient.amount} ${ingredient.unit}${ingredient.amount !== 1 && 's'} of ${ingredient.name}`}/>
              </ListItem>
            )}
          </List>
          <h2>Instructions</h2>
          <p>{recipe.instructions}</p>
        </div> : <div>No Recipe Chosen Yet</div> } 
        {isLoading && <LinearProgress />}
      </>        
    )
  }
}

const mapStateToProps = (state) => {
  const { recipe } = state
  return {...recipe}
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRecipe: actions.fetchRecipe,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)