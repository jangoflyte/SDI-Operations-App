/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('user_table', table => {
    table.increments('id');
    table.string('first_name', 250);
    table.string('last_name', 250);
    table.string('rank', 250);
    table.integer('flight');
    table.foreign('flight').references('id').inTable('flight');
    table.integer('cert_id');
    table.foreign('cert_id').references('id').inTable('certification');
    table.boolean('weapon_arming');
    table.boolean('admin').defaultTo(false);
    table.string('notes', 1024);
    table.string('email');
    table.string('password');
    table.string('avatar');
    table.string('avatar_background');
    table.string('status');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('user_table', table => {
      table.dropForeign('flight');
      table.dropForeign('cert_id');
    })
    .then(() => {
      return knex.schema.dropTableIfExists('user_table');
    });
};
