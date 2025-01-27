import { Knex } from "knex";

// seed file: demoData.js
exports.seed = function (knex) {
    // Deletes all existing entries
    return knex('recipe_ingredients').del()
      .then(() => knex('recipes').del())
      .then(() => knex('ingredients').del())
      .then(() => knex('ingredient_categories').del())
      .then(() => {
        // Insert Ingredient Categories
        return knex('ingredient_categories').insert([
          { name: 'Vegetables', id:1 },
          { name: 'Meat', id: 2 },
          { name: 'Dairy', id: 3 },
          { name: 'Spices', id:4 },
          { name: 'Grains', id:5 },
        ]);
      })
      .then(() => {
        // Insert Ingredients
        return knex('ingredients').insert([
          { name: 'Tomato', category_id: 1, id: 1 },
          { name: 'Chicken', category_id: 2, id:2 },
          { name: 'Cheese', category_id: 3, id:3 },
          { name: 'Salt', category_id: 4, id:4 },
          { name: 'Rice', category_id: 5, id:5 },
        ]);
      })
      .then(() => {
        // Insert Recipes
        return knex('recipes').insert([
          {
            name: 'Chicken Biryani',
            description: 'A flavorful rice and chicken dish.',
            instructions: 'Cook rice, marinate chicken, layer and cook.',
            difficulty: 'easy',
            cooking_time: 90,
            cuisine: 'Indian',
            id:1
          },
          {
            name: 'Cheese Omelette',
            description: 'A quick and easy cheese omelette.',
            instructions: 'Whisk eggs, add cheese, and cook.',
            difficulty: 'easy',
            cooking_time: 10,
            cuisine: 'French',
            id:2
          },
        ]);
      })
      .then(() => {
        // Insert Recipe Ingredients
        return knex('recipe_ingredients').insert([
          { recipe_id: 1, ingredient_id: 2, quantity: '500g' }, // Chicken Biryani - Chicken
          { recipe_id: 1, ingredient_id: 5, quantity: '2 cups' }, // Chicken Biryani - Rice
          { recipe_id: 1, ingredient_id: 4, quantity: '1 tsp' },  // Chicken Biryani - Salt
          { recipe_id: 2, ingredient_id: 3, quantity: '50g' },  // Cheese Omelette - Cheese
        ]);
      });
  };
  