/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('notification_user').del();
  await knex('notification_user').insert([
    {
      notification_id: 1,
      user_id: 1,
      read: false,
    },
    {
      notification_id: 2,
      user_id: 1,
      read: false,
    },
    {
      notification_id: 3,
      user_id: 1,
      read: false,
    },
    {
      notification_id: 4,
      user_id: 1,
      read: false,
    },
    {
      notification_id: 5,
      user_id: 1,
      read: false,
    },
    {
      notification_id: 2,
      user_id: 2,
      read: false,
    },
  ]);
};
