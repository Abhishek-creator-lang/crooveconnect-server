import { Knex } from 'knex';
import { getEncryptedPassword } from '../../lib/hepler';
import { Role } from '../../models/UserModel';
const tableName = 'users';

export async function up(knex: Knex): Promise<void> {
  return knex(tableName).insert({
    email: 'superuser@gmail.com',
    password: await getEncryptedPassword('superuser'),
    role: Role.Admin,
    first_name:'super',
    last_name:'user'
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex(tableName).where({ email: 'superuser@gmail.com' }).del();
}
