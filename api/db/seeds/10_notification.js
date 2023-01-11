/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('notification').del()
  await knex('notification').insert([
    {
      name: 'Welcome to PASS! Your destination for post assignment and scheduling needs',
      notes: 'Go to Home page to see Schedule',
      link: '/',
      link_text: 'See Schedule'
    },
    {
      name: 'Example Date',
      notes: 'This is a day with all posts for this day',
      link: '/date/2023-6-10',
      link_text: 'See Schedule'
    },
    { name: 'test-notification 3' },
    { name: 'test-notification 4' },
    { name: 'test-notification 5' },
    { name: 'test-notification 6' },
    { name: 'test-notification 7' },
    { name: 'test-notification 8' }
  ])
}
