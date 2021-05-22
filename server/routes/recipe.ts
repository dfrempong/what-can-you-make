import { RecipeModel, Ingredient } from "../models"
import { Request, Response, NextFunction } from "express"


const escapeRegex = (text) : string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

// interface Query {
//   name?: RegExp;
//   ingredients?: Ingredient[]
// }

// const recipeCleaner = (recipe) : {id:string, name:string} => {
//   const {id, name} = recipe
//   return {id, name}
// }

export const recipeMiddleware = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
  // TODO fetch and return a recipe
  const foundRecipes = await RecipeModel.findOne({_id: req.params.id})
  res.send(foundRecipes)
}
