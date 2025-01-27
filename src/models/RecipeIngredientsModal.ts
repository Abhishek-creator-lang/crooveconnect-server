import knex from 'knex';
import { database } from 'src/database';
import { Model} from './Model';


export class RecipeIngredientsModal extends Model {
  static tableName = 'recipes';

  private static get recipeTable() {
    if (!this.tableName) {
      throw new Error('You must set a table name!');
    }
    console.log(this.tableName,'this.tableName')
    return database(this.tableName);
  }

 public static async  getFilteredRecipes(filters) {
    // Start building the query
    const {
      difficulty,
      rating,
      isFavorite,
      cuisine,
    } = filters || {}
    const query = this.recipeTable.join('recipe_ingredients', 'recipes.id', '=', 'recipe_ingredients.recipe_id')
      .join('ingredients', 'recipe_ingredients.ingredient_id', '=', 'ingredients.id')
      .join('ingredient_categories', 'ingredients.category_id', '=', 'ingredient_categories.id')
      .leftJoin('user_feedback', 'recipes.id', '=', 'user_feedback.recipe_id') // For rating and favorites
      .select(
        'recipes.id as recipe_id',
        'recipes.name as recipe_name',
        'recipes.description as recipe_description',
        'recipes.instructions as recipe_instructions',
        'recipes.difficulty as recipe_difficulty',
        'recipes.cooking_time as recipe_cooking_time',
        'recipes.cuisine as recipe_cuisine',
        'user_feedback.rating as recipe_rating',
        'user_feedback.is_favorite as recipe_is_favorite',
        'ingredients.id as ingredient_id',
        'ingredients.name as ingredient_name',
        'ingredient_categories.id as category_id',
        'ingredient_categories.name as category_name',
        'recipe_ingredients.quantity as ingredient_quantity'
      );
  
    // Apply filters conditionally
    if (difficulty) {
      query.where('recipes.difficulty', difficulty);
    }
  
    if (rating) {
      query.where('user_feedback.rating', '>=', rating);
    }
  
    if (isFavorite !== undefined) {
      query.where('user_feedback.is_favorite', isFavorite);
    }
  
    if (cuisine) {
      query.where('recipes.cuisine', 'like', `%${cuisine}%`);
    }
  
    // Execute the query
    const rawData = await query;
  
    // Transform data to group recipes with their ingredients
    const groupedRecipes = rawData.reduce((result, row) => {
      const {
        recipe_id,
        recipe_name,
        recipe_description,
        recipe_instructions,
        recipe_difficulty,
        recipe_cooking_time,
        recipe_cuisine,
        recipe_rating,
        recipe_is_favorite,
        ingredient_id,
        ingredient_name,
        category_id,
        category_name,
        ingredient_quantity,
      } = row;
  
      // Check if the recipe already exists in the result
      if (!result[recipe_id]) {
        result[recipe_id] = {
          recipe_id,
          recipe_name,
          recipe_description,
          recipe_instructions,
          recipe_difficulty,
          recipe_cooking_time,
          recipe_cuisine,
          recipe_rating,
          recipe_is_favorite,
          ingredients: [],
        };
      }
  
      // Add the ingredient to the recipe's ingredient list
      result[recipe_id].ingredients.push({
        ingredient_id,
        ingredient_name,
        category_id,
        category_name,
        ingredient_quantity,
      });
  
      return result;
    }, {});
  
    // Convert the result object into an array
    return Object.values(groupedRecipes);
  }

  public static async  getTrendingRecipes(limit = 10) {
    const query = this.recipeTable
      .leftJoin('user_feedback', 'recipes.id', '=', 'user_feedback.recipe_id')
      .select(
        'recipes.id as recipe_id',
        'recipes.name as recipe_name',
        'recipes.description as recipe_description',
        'recipes.instructions as recipe_instructions',
        'recipes.difficulty as recipe_difficulty',
        'recipes.cooking_time as recipe_cooking_time',
        'recipes.cuisine as recipe_cuisine',
        database.raw('COALESCE(AVG(user_feedback.rating), 0) as average_rating'), // Average rating
        database.raw('COUNT(user_feedback.is_favorite) FILTER (WHERE user_feedback.is_favorite = true) as favorite_count'), // Favorite count
        database.raw('COUNT(user_feedback.id) as feedback_count') // Total feedback count
      )
      .groupBy('recipes.id') // Group by recipe ID for aggregate functions
      .orderByRaw('favorite_count DESC, average_rating DESC, feedback_count DESC') // Sort by popularity metrics
      .limit(limit); // Limit the number of results
  
    const trendingRecipes = await query;
  
    return trendingRecipes;
  }

  static async getRecipeDetailsById(id: number) {
    const recipe = await this.recipeTable
      .leftJoin('recipe_ingredients', 'recipes.id', 'recipe_ingredients.recipe_id')
      .leftJoin('ingredients', 'recipe_ingredients.ingredient_id', 'ingredients.id')
      .leftJoin('ingredient_categories', 'ingredients.category_id', 'ingredient_categories.id')
      .select(
        'recipes.id',
        'recipes.name',
        'recipes.description',
        'recipes.instructions',
        'recipes.difficulty',
        'recipes.cooking_time',
        'recipes.cuisine',
        database.raw("json_agg(json_build_object('name', ingredients.name, 'category', ingredient_categories.name, 'quantity', recipe_ingredients.quantity)) as ingredients")
      )
      .where('recipes.id', id)
      .groupBy('recipes.id')
      .first(); // Retrieve only one record

    return recipe;
  }

}
