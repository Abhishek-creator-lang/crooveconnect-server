import type { Request, Response } from 'express';
import { IngredinetsModal } from 'src/models/IngredinetsModal';
import { RecipeIngredientsModal } from 'src/models/RecipeIngredientsModal';
import { errors } from 'src/lib/error';


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
        const { difficulty, rating, isFavorite, cuisine } = req.query;
        const recipes =  await RecipeIngredientsModal.getFilteredRecipes(
            {
                difficulty: difficulty ? Number(difficulty) : undefined, // Convert to number if present
                rating: rating ? Number(rating) : undefined,             // Convert to number if present
                isFavorite: isFavorite === 'true',                       // Convert to boolean
                cuisine: cuisine || undefined                            // Pass string directly
              }
        )
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

export const getRecipeByid = async (req) =>{
  try {
    const { id } = req.params;

    if (!id) {
      throw new Error("Recipe ID is required.");
    }

    const recipe = await RecipeIngredientsModal.getRecipeDetailsById(Number(id));

    if (!recipe) {
       throw errors.DETAILS_NOT_FOUND();
    }

    return recipe;
  } catch (error) {
    throw error;
  }
}