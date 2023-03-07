/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('template').del()
  await knex('template').insert([
    {
      name: 'Panama 12s',
      post_array: JSON.stringify([
        {
          post_id: 1,
          man_req: 1,
          cert_id: 3,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 2,
          man_req: 1,
          cert_id: 4,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 3,
          man_req: 2,
          cert_id: 1,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 4,
          man_req: 2,
          cert_id: 1,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 5,
          man_req: 2,
          cert_id: 1,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 6,
          man_req: 1,
          cert_id: 4,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 7,
          man_req: 1,
          cert_id: 2,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 8,
          man_req: 1,
          cert_id: 2,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 9,
          man_req: 2,
          cert_id: 2,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 1,
          man_req: 1,
          cert_id: 3,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T18:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 2,
          man_req: 1,
          cert_id: 4,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T18:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 3,
          man_req: 2,
          cert_id: 1,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T18:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 4,
          man_req: 2,
          cert_id: 1,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T18:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 5,
          man_req: 2,
          cert_id: 1,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T18:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 6,
          man_req: 1,
          cert_id: 4,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T18:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 7,
          man_req: 1,
          cert_id: 2,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T18:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 8,
          man_req: 1,
          cert_id: 2,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T18:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 9,
          man_req: 2,
          cert_id: 2,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T18:00',
          shift_duration: 12
          // end_datetime: '2023-06-20T18:00'
        }
      ])
    },
    ////////////////////////////////////////////////////////////////////
    {
      name: '8 Hours',
      post_array: JSON.stringify([
        // {
        //   post_id: 2,
        //   man_req: 1,
        //   cert_id: 3,
        //   shift: 'days',
        //   weapon_req: [1, 2],
        //   flight_assigned: 1,
        //   start_datetime: '2023-06-20T06:00',
        //   shift_duration: 8
        // },

        {
          post_id: 1,
          man_req: 1,
          cert_id: 3,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 2,
          man_req: 1,
          cert_id: 4,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 3,
          man_req: 2,
          cert_id: 1,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 4,
          man_req: 2,
          cert_id: 1,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 5,
          man_req: 2,
          cert_id: 1,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 6,
          man_req: 1,
          cert_id: 4,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 7,
          man_req: 1,
          cert_id: 2,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 8,
          man_req: 1,
          cert_id: 2,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 9,
          man_req: 2,
          cert_id: 2,
          shift: 'days',
          weapon_req: [1, 2],
          flight_assigned: 1,
          start_datetime: '2023-06-20T06:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },

        // Swings ---------------------------------
        // {
        //   post_id: 2,
        //   man_req: 1,
        //   cert_id: 3,
        //   shift: 'swings',
        //   weapon_req: [1, 2],
        //   flight_assigned: 3,
        //   start_datetime: '2023-06-20T14:00',
        //   shift_duration: 8
        // },

        {
          post_id: 1,
          man_req: 1,
          cert_id: 3,
          shift: 'swings',
          weapon_req: [1, 2],
          flight_assigned: 3,
          start_datetime: '2023-06-20T14:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 2,
          man_req: 1,
          cert_id: 4,
          shift: 'swings',
          weapon_req: [1, 2],
          flight_assigned: 3,
          start_datetime: '2023-06-20T14:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 3,
          man_req: 2,
          cert_id: 1,
          shift: 'swings',
          weapon_req: [1, 2],
          flight_assigned: 3,
          start_datetime: '2023-06-20T14:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 4,
          man_req: 2,
          cert_id: 1,
          shift: 'swings',
          weapon_req: [1, 2],
          flight_assigned: 3,
          start_datetime: '2023-06-20T14:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 5,
          man_req: 2,
          cert_id: 1,
          shift: 'swings',
          weapon_req: [1, 2],
          flight_assigned: 3,
          start_datetime: '2023-06-20T14:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 6,
          man_req: 1,
          cert_id: 4,
          shift: 'swings',
          weapon_req: [1, 2],
          flight_assigned: 3,
          start_datetime: '2023-06-20T14:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 7,
          man_req: 1,
          cert_id: 2,
          shift: 'swings',
          weapon_req: [1, 2],
          flight_assigned: 3,
          start_datetime: '2023-06-20T14:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 8,
          man_req: 1,
          cert_id: 2,
          shift: 'swings',
          weapon_req: [1, 2],
          flight_assigned: 3,
          start_datetime: '2023-06-20T14:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 9,
          man_req: 2,
          cert_id: 2,
          shift: 'swings',
          weapon_req: [1, 2],
          flight_assigned: 3,
          start_datetime: '2023-06-20T14:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },

        // Mids ---------------------------------
        // {
        //   post_id: 2,
        //   man_req: 1,
        //   cert_id: 3,
        //   shift: 'mids',
        //   weapon_req: [1, 2],
        //   flight_assigned: 5,
        //   start_datetime: '2023-06-20T22:00',
        //   shift_duration: 8
        // },
        {
          post_id: 1,
          man_req: 1,
          cert_id: 3,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 5,
          start_datetime: '2023-06-20T22:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 2,
          man_req: 1,
          cert_id: 4,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 5,
          start_datetime: '2023-06-20T22:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 3,
          man_req: 2,
          cert_id: 1,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 5,
          start_datetime: '2023-06-20T22:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 4,
          man_req: 2,
          cert_id: 1,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 5,
          start_datetime: '2023-06-20T22:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 5,
          man_req: 2,
          cert_id: 1,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 5,
          start_datetime: '2023-06-20T22:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 6,
          man_req: 1,
          cert_id: 4,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 5,
          start_datetime: '2023-06-20T22:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 7,
          man_req: 1,
          cert_id: 2,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 5,
          start_datetime: '2023-06-20T22:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 8,
          man_req: 1,
          cert_id: 2,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 5,
          start_datetime: '2023-06-20T22:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        },
        {
          post_id: 9,
          man_req: 2,
          cert_id: 2,
          shift: 'mids',
          weapon_req: [1, 2],
          flight_assigned: 5,
          start_datetime: '2023-06-20T22:00',
          shift_duration: 8
          // end_datetime: '2023-06-20T18:00'
        }
      ])
    }
  ])
}
/*
{"id":1,
  "name": {
    "id":1,
    "post_name":"BDOC",
    "description":"test"
  },
  "man_req":"1",
  "cert_id":3,
  "post_id":1,
  "shift":"days",
  "flight_assigned":3
  "start_datetime":"2023-06-10T06:00:00.000Z",
  // "end_datetime":"2023-06-10T18:00:00.000Z",
  "weapon_req": [{
    "weapon_id":1,
    "position_id":1,
    "id":1,
    "weapon":"m4",
    "type":"rifle",
    "ammo":"5.56X45mm"
  },
  {
    "weapon_id":2,
    "position_id":1,
    "id":2,"weapon":"m18",
    "type":"pistol",
    "ammo":"9mm"
  }],
  "cert_req":[{"id":3,"cert":"Desk"}],
  "flightInfo":[{"id":3,"cert":"Desk"}]}
  */
