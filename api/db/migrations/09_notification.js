/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('notification', table => {
    table.increments('id');
    table.string('name', 250);
    table.string('link', 250); // make boolean?
    table.string('link_text', 250);
    table.dateTime('date_time', { precision: 6 }).defaultTo(knex.fn.now(6));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('notification');
};
