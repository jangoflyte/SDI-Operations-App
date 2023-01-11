/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('position').del()
  await knex('position').insert([
    {
      post_id: 1,
      man_req: 1,
      cert_id: 3,
      shift: 'days',
      flight_assigned: 3,
      start_datetime: '2023-06-10T06:00',
      end_datetime: '2023-06-10T18:00'
    },
    {
      post_id: 2,
      man_req: 1,
      cert_id: 4,
      shift: 'days',
      flight_assigned: 3,
      start_datetime: '2023-06-10T06:00',
      end_datetime: '2023-06-10T18:00'
    },
    {
      post_id: 3,
      man_req: 2,
      cert_id: 1,
      shift: 'days',
      flight_assigned: 3,
      start_datetime: '2023-06-10T06:00',
      end_datetime: '2023-06-10T18:00'
    },
    {
      post_id: 4,
      man_req: 2,
      cert_id: 1,
      shift: 'days',
      flight_assigned: 3,
      start_datetime: '2023-06-10T06:00',
      end_datetime: '2023-06-10T18:00'
    },
    {
      post_id: 5,
      man_req: 2,
      cert_id: 1,
      shift: 'days',
      flight_assigned: 3,
      start_datetime: '2023-06-10T06:00',
      end_datetime: '2023-06-10T18:00'
    },
    {
      post_id: 6,
      man_req: 1,
      cert_id: 4,
      shift: 'days',
      flight_assigned: 3,
      start_datetime: '2023-06-10T06:00',
      end_datetime: '2023-06-10T18:00'
    },
    {
      post_id: 7,
      man_req: 1,
      cert_id: 2,
      shift: 'days',
      flight_assigned: 3,
      start_datetime: '2023-06-10T06:00',
      end_datetime: '2023-06-10T18:00'
    },
    {
      post_id: 8,
      man_req: 1,
      cert_id: 2,
      shift: 'days',
      flight_assigned: 3,
      start_datetime: '2023-06-10T06:00',
      end_datetime: '2023-06-10T18:00'
    },
    {
      post_id: 9,
      man_req: 2,
      cert_id: 2,
      shift: 'days',
      flight_assigned: 3,
      start_datetime: '2023-06-10T06:00',
      end_datetime: '2023-06-10T18:00'
    },
    {
      post_id: 1,
      man_req: 1,
      cert_id: 3,
      shift: 'mids',
      flight_assigned: 3,
      start_datetime: '2023-06-10T18:00',
      end_datetime: '2023-06-11T06:00'
    },
    {
      post_id: 2,
      man_req: 1,
      cert_id: 4,
      shift: 'mids',
      flight_assigned: 3,
      start_datetime: '2023-06-10T18:00',
      end_datetime: '2023-06-11T06:00'
    },
    {
      post_id: 3,
      man_req: 2,
      cert_id: 1,
      shift: 'mids',
      flight_assigned: 3,
      start_datetime: '2023-06-10T18:00',
      end_datetime: '2023-06-11T06:00'
    },
    {
      post_id: 4,
      man_req: 2,
      cert_id: 1,
      shift: 'mids',
      flight_assigned: 3,
      start_datetime: '2023-06-10T18:00',
      end_datetime: '2023-06-11T06:00'
    },
    {
      post_id: 5,
      man_req: 1,
      cert_id: 4,
      shift: 'mids',
      flight_assigned: 3,
      start_datetime: '2023-06-10T18:00',
      end_datetime: '2023-06-11T06:00'
    },
    {
      post_id: 6,
      man_req: 1,
      cert_id: 2,
      shift: 'mids',
      flight_assigned: 3,
      start_datetime: '2023-06-10T18:00',
      end_datetime: '2023-06-11T06:00'
    },
    {
      post_id: 7,
      man_req: 1,
      cert_id: 2,
      shift: 'mids',
      flight_assigned: 3,
      start_datetime: '2023-06-10T18:00',
      end_datetime: '2023-06-11T06:00'
    },
    {
      post_id: 8,
      man_req: 2,
      cert_id: 2,
      shift: 'mids',
      flight_assigned: 3,
      start_datetime: '2023-06-10T18:00',
      end_datetime: '2023-06-11T06:00'
    },
    {
      post_id: 1,
      man_req: 1,
      cert_id: 1,
      shift: 'days',
      flight_assigned: 1,
      start_datetime: '2023-06-11T06:00',
      end_datetime: '2023-06-11T18:00'
    }
  ])
}
