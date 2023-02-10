/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('post').del()
  await knex('post').insert([
    { post_name: 'BDOC', description: 'Main gate' },
    {
      post_name: 'Flight Chief',
      description: 'Aux Gate'
    },
    {
      post_name: 'Golf 1',
      description: 'Days'
    },
    {
      post_name: 'Golf 2',
      description: 'Swings'
    },
    {
      post_name: 'Golf 3',
      description: 'Mids'
    },
    {
      post_name: 'Security 1',
      description: 'Days'
    },
    {
      post_name: 'Security 2',
      description: 'Swings'
    },
    {
      post_name: 'Security 3',
      description: 'Mids'
    },
    {
      post_name: 'Security 4',
      description: 'Extra'
    }
  ])
}
