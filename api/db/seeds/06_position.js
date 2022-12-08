/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('position').del();
  await knex('position').insert([
    { name: 'BDOC', man_req: 1, cert_id: 3, shift: 'days', flight_assigned: 3 },
    {
      name: 'Flight Chief',
      man_req: 1,
      cert_id: 4,
      shift: 'days',
      flight_assigned: 3,
    },
    {
      name: 'Golf 1',
      man_req: 2,
      cert_id: 1,
      shift: 'days',
      flight_assigned: 3,
    },
    {
      name: 'Golf 2',
      man_req: 2,
      cert_id: 1,
      shift: 'days',
      flight_assigned: 3,
    },
    {
      name: 'Golf 3',
      man_req: 2,
      cert_id: 1,
      shift: 'days',
      flight_assigned: 3,
    },
    {
      name: 'Security 1',
      man_req: 1,
      cert_id: 4,
      shift: 'days',
      flight_assigned: 3,
    },
    {
      name: 'Security 2',
      man_req: 1,
      cert_id: 2,
      shift: 'days',
      flight_assigned: 3,
    },
    {
      name: 'Security 3',
      man_req: 1,
      cert_id: 2,
      shift: 'days',
      flight_assigned: 3,
    },
    {
      name: 'Security 4',
      man_req: 2,
      cert_id: 2,
      shift: 'days',
      flight_assigned: 3,
    },
    { name: 'BDOC', man_req: 1, cert_id: 3, shift: 'mids', flight_assigned: 3 },
    {
      name: 'Flight Chief',
      man_req: 1,
      cert_id: 4,
      shift: 'mids',
      flight_assigned: 3,
    },
    {
      name: 'Golf 1',
      man_req: 2,
      cert_id: 1,
      shift: 'mids',
      flight_assigned: 3,
    },
    {
      name: 'Golf 2',
      man_req: 2,
      cert_id: 1,
      shift: 'mids',
      flight_assigned: 3,
    },
    {
      name: 'Security 1',
      man_req: 1,
      cert_id: 4,
      shift: 'mids',
      flight_assigned: 3,
    },
    {
      name: 'Security 2',
      man_req: 1,
      cert_id: 2,
      shift: 'mids',
      flight_assigned: 3,
    },
    {
      name: 'Security 3',
      man_req: 1,
      cert_id: 2,
      shift: 'mids',
      flight_assigned: 3,
    },
    {
      name: 'Security 4',
      man_req: 2,
      cert_id: 2,
      shift: 'mids',
      flight_assigned: 3,
    },
  ]);
};
