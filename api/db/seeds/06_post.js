/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('post').del();
  await knex('post').insert([
    { post_name: 'BDOC' },

    {
      post_name: 'Flight Chief',
    },
    {
      post_name: 'Golf 1',
    },
    {
      post_name: 'Golf 2',
    },
    {
      post_name: 'Golf 3',
    },
    {
      post_name: 'Security 1',
    },
    {
      post_name: 'Security 2',
    },
    {
      post_name: 'Security 3',
    },
    {
      post_name: 'Security 4',
    },
  ]);
};
