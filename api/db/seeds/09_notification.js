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
    { name: 'test-notification 3' },
    { name: 'test-notification 4' },
    { name: 'test-notification 5' },
    { name: 'test-notification 6' },
    { name: 'test-notification 7' },
    { name: 'test-notification 8' },
  ]);
};
