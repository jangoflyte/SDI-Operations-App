/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('notification_user', table => {
    table.increments('id');
    table.integer('notification_id');
    table.foreign('notification_id').references('id').inTable('notification');
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('user_table');
    table.datetime('date_time', { precision: 6 }).defaultTo(knex.fn.now(6));
    table.boolean('read').defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('notification_user', table => {
      table.dropForeign('notification_id');
      table.dropForeign('user_id');
    })
    .then(() => {
      return knex.schema.dropTableIfExists('notification_user');
    });
};
