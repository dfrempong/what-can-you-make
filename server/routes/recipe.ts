import { RecipeModel } from "../models"
import { Request, Response, NextFunction } from "express"
import  mongoose from 'mongoose'


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
  if (mongoose.Types.ObjectId.isValid(id)) {
    const foundRecipes = await RecipeModel.findOne({_id:id})
    res.send(formatRecipe(foundRecipes))
  } else {
    res.status(404).send({message:`Could not find recipe with provided id:${id}`})
  }

}
