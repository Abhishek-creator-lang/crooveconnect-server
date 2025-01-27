exports.up = function (knex) {
  return knex.schema.createTable('ingredients', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.string('name').notNullable().unique(); // Ingredient name
    table
      .integer('category_id')
      .unsigned()
      .references('id')
      .inTable('ingredient_categories')
      .onDelete('SET NULL'); // Foreign key to ingredient_categories
    table.timestamps(true, true); // Created and updated timestamps
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('ingredients');
};
