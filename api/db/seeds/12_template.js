/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('template').del();
  await knex('template').insert([
    {
      name: 'Test Panama',
      start_date: '2023-06-20T00:00',
      end_date: '2023-06-27T00:00',
      post_array: '',
    },
  ]);
};
