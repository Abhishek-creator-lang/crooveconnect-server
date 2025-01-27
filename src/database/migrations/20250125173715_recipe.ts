import { Knex } from "knex";

const tableName = 'recipes'
export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, (table)=>{
  table.increments('id').primary();
  table.string('name').notNullable();
    table.string('cuisine');
    table.string('description');
    table.enu('difficulty', ['easy', 'medium', 'hard']);
    table.integer('cooking_time').notNullable();
    table.json('nutritional_info');
    table.text('instructions').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('recipes');
}

