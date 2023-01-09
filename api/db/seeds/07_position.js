/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('position').del()
  await knex('position').insert([
    {
      name: 'BDOC',
      post_id: 1,
      man_req: 1,
      cert_id: 3,
      shift: 'days',
      flight_assigned: 3
    },
    {
      name: 'Flight Chief',
      post_id: 2,
      man_req: 1,
      cert_id: 4,
      shift: 'days',
      flight_assigned: 3
    },
    {
      name: 'Golf 1',
      post_id: 3,
      man_req: 2,
      cert_id: 1,
      shift: 'days',
      flight_assigned: 3
    },
    {
      name: 'Golf 2',
      post_id: 4,
      man_req: 2,
      cert_id: 1,
      shift: 'days',
      flight_assigned: 3
    },
    {
      name: 'Golf 3',
      post_id: 5,
      man_req: 2,
      cert_id: 1,
      shift: 'days',
      flight_assigned: 3
    },
    {
      name: 'Security 1',
      post_id: 6,
      man_req: 1,
      cert_id: 4,
      shift: 'days',
      flight_assigned: 3
    },
    {
      name: 'Security 2',
      post_id: 7,
      man_req: 1,
      cert_id: 2,
      shift: 'days',
      flight_assigned: 3
    },
    {
      name: 'Security 3',
      post_id: 8,
      man_req: 1,
      cert_id: 2,
      shift: 'days',
      flight_assigned: 3
    },
    {
      name: 'Security 4',
      post_id: 9,
      man_req: 2,
      cert_id: 2,
      shift: 'days',
      flight_assigned: 3
    },
    { name: 'BDOC', man_req: 1, cert_id: 3, shift: 'mids', flight_assigned: 3 },
    {
      name: 'Flight Chief',
      man_req: 1,
      cert_id: 4,
      shift: 'mids',
      flight_assigned: 3
    },
    {
      name: 'Golf 1',
      man_req: 2,
      cert_id: 1,
      shift: 'mids',
      flight_assigned: 3
    },
    {
      name: 'Golf 2',
      man_req: 2,
      cert_id: 1,
      shift: 'mids',
      flight_assigned: 3
    },
    {
      name: 'Security 1',
      man_req: 1,
      cert_id: 4,
      shift: 'mids',
      flight_assigned: 3
    },
    {
      name: 'Security 2',
      man_req: 1,
      cert_id: 2,
      shift: 'mids',
      flight_assigned: 3
    },
    {
      name: 'Security 3',
      man_req: 1,
      cert_id: 2,
      shift: 'mids',
      flight_assigned: 3
    },
    {
      name: 'Security 4',
      man_req: 2,
      cert_id: 2,
      shift: 'mids',
      flight_assigned: 3
    }
  ])
}
