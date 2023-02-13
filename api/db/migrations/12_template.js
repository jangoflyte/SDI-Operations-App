/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('template', table => {
    table.increments('id')
    table.string('name', 250)
    // table.dateTime('start_date', { precision: 6 }).defaultTo(knex.fn.now(6))
    // table.dateTime('end_date', { precision: 6 }).defaultTo(knex.fn.now(6))
    // table.specificType('post_array',);
    table.string('post_array', 200000)
    // table.json('test')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('template')
}

/*
post_array = [seed info] 

post_array: [
  {
    man_req:,
    cert:,

    post_id,
    shift_name,
},
  {
    man_req:,
    cert:,

    post_id,
    shift_name,
}]


{
  name: 'example,
  start_date: asdf,
  
  positions: JSON.stringify(post_array)

}

 */
