exports.up = function (knex) {
  return knex.schema.createTable('recipe_ingredients', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table
      .integer('recipe_id')
      .unsigned()
      .references('id')
      .inTable('recipes')
      .onDelete('CASCADE'); // Deletes related rows if a recipe is deleted
    table
      .integer('ingredient_id')
      .unsigned()
      .references('id')
      .inTable('ingredients')
      .onDelete('CASCADE'); // Deletes related rows if an ingredient is deleted
    table.string('quantity').notNullable(); // Ingredient quantity
    table.timestamps(true, true); // Created and updated timestamps
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('recipe_ingredients');
};
