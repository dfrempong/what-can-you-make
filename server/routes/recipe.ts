import { RecipeModel } from "../models"
import { Request, Response, NextFunction } from "express"

const formatIngredients = (ingredient) : {id:string, name:string[], unit:string, amount: string } => {
  const {id, name, unit, amount} = ingredient
  return {id, name, unit, amount} 
}

const formatRecipe = (recipe) : {id:string, ingredients:string[], name:string, instructions: string } => { 
  const {id, ingredients:rawIngredients, name, instructions} = recipe
  const ingredients = rawIngredients.map(formatIngredients)
  return {id, ingredients, name, instructions}
}

export const recipeMiddleware = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  // TODO fetch and return a recipe
  const {id} = req.params
  const foundRecipes = await RecipeModel.findOne({_id:id})
  if (!foundRecipes) {
    next()
  } else {
    res.send(formatRecipe(foundRecipes))
  }
}
