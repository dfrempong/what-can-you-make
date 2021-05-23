/* TODO: create recipe fetch actions, creators, and constants
  API: use /api/recipe/:id as a get request to fetch the recipe info
*/
export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_RECIPE = "FAIL_RECIPE"

const fetchingRecipe = () => ({
  type: GET_RECIPE
})

const fetchedRecipe = (payload) => ({
  type: RECEIVE_RECIPE,
  payload
})

const failedRecipeFetch = (payload) => ({
  type: FAIL_RECIPE,
  payload
})

export const executeRecipeFetch = async (recipeId) => {
  const response = await fetch(`/api/recipe/${recipeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  const recipeFetchResults = await response.json()
  return recipeFetchResults
}

export const fetchRecipe = (recipeId) => {
  return (dispatch) => {
    dispatch(fetchingRecipe())
    return executeRecipeFetch(recipeId).then(
      res => dispatch(fetchedRecipe(res))
    ).catch(
      err => dispatch(failedRecipeFetch(err))
    )
  }
}