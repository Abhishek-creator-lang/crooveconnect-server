exports.up = function (knex) {
  return knex.schema.createTable('user_feedback', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table
      .integer('recipe_id')
      .unsigned()
      .references('id')
      .inTable('recipes')
      .onDelete('CASCADE'); // Deletes feedback if the recipe is deleted
    table.integer('user_id').unsigned(); // Reference to user if applicable
    table.integer('rating').notNullable().checkBetween([1, 5]); // Rating (1-5)
    table.boolean('is_favorite').defaultTo(false); // Whether the recipe is favorited
    table.timestamps(true, true); // Created and updated timestamps
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('user_feedback');
};

  
