/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('position', table => {
    table.increments('id')
    table.string('name', 250)
    table.string('man_req', 250)
    table.integer('cert_id')
    table.foreign('cert_id').references('id').inTable('certification')
    table.integer('post_id')
    table.foreign('post_id').references('id').inTable('post')
    table.string('shift')
    table.integer('flight_assigned')
    table.foreign('flight_assigned').references('id').inTable('flight')
    table.dateTime('start_datetime', { precision: 6 }).defaultTo(knex.fn.now(6))
    table.dateTime('end_datetime', { precision: 6 }).defaultTo(knex.fn.now(6))
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('position', table => {
      table.dropForeign('cert_id')
      table.dropForeign('post_id')
      table.dropForeign('flight_assigned')
    })
    .then(() => {
      return knex.schema.dropTableIfExists('position')
    })
}
