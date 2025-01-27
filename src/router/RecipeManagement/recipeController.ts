import type { Request, Response } from 'express';
import { IngredinetsModal } from 'src/models/IngredinetsModal';
import { RecipeIngredientsModal } from 'src/models/RecipeIngredientsModal';



export const getIngredients = async (req:Request) => {
    try {
        const ingredients = await IngredinetsModal.ingredients();
        return ingredients
      } catch (error) {
        throw error;
      }
}

export const getRecipe = async (req:Request) => {
    try {
        const recipes =  await RecipeIngredientsModal.getFilteredRecipes()
        return recipes
      } catch (error) {
        throw error;
      }
}

export const getTrendingRecipes = async () =>{
    try {
        const recipes =  await RecipeIngredientsModal.getTrendingRecipes()
        return recipes
      } catch (error) {
        throw error;
      }
}