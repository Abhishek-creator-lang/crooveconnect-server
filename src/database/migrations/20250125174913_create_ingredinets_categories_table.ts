exports.up = function (knex) {
  return knex.schema.createTable('ingredient_categories', (table) => {
    table.increments('id').primary(); // Auto-incrementing primary key
    table.string('name').notNullable().unique(); // Category name
    table.timestamps(true, true); // Created and updated timestamps
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('ingredient_categories');
};
