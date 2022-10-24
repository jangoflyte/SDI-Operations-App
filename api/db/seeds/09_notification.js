/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('notification').del();
  await knex('notification').insert([
    { name: 'test-notification' },
    { name: 'test-notification 2' },
  ]);
};
