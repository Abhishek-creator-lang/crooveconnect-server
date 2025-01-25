import { Knex } from 'knex';

const tableName = 'users';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(tableName, async table => {
    table.dropPrimary();
    table.primary(['email']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(tableName, async table => {
    table.dropPrimary();
    table.primary(['id']);
  });
}
