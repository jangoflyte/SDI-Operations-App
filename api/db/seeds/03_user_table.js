/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('user_table')
    .select('*')
    .then(rows => {
      if (rows.length === 0) {
        return knex('user_table').insert([
          {
            first_name: 'John',
            last_name: 'zDoe',
            rank: 'e5',
            flight: 'alpha-1',
            cert_id: 4,
            weapon_arming: true,
            admin: true,
            email: 'admin',
            password:
              '$2b$10$az7u9mz6Z0YQPxXYsT2PpOd.aC1m3V1Ibt/OFZNcHmbv9.snFQyVO',
            avatar:
              'https://media0.giphy.com/media/KRH2MDRBywNwHe91h9/giphy.gif',
            notes: 'DO NOT DELETE',
          },
          {
            first_name: 'Jane',
            last_name: 'Doe',
            rank: 'e3',
            flight: 'alpha-1',
            cert_id: 3,
            weapon_arming: false,
            admin: false,
            email: 'jane@spaceforce.mil',
            avatar:
              'https://media4.giphy.com/media/1rSQ3HLhM8G6NPzLqG/giphy.gif',
          },
          {
            first_name: 'Greg',
            last_name: 'Smith',
            rank: 'e6',
            flight: 'alpha-2',
            cert_id: 2,
            weapon_arming: true,
            admin: false,
            email: 'greg@spaceforce.mil',
            avatar: 'https://media.giphy.com/media/D7z8JfNANqahW/giphy.gif',
          },
          {
            first_name: 'Macy',
            last_name: 'Jones',
            rank: 'e4',
            flight: 'alpha-2',
            cert_id: 4,
            weapon_arming: true,
            admin: false,
            email: 'macy@spaceforce.mil',
            avatar:
              'https://media1.giphy.com/media/3ornjPteRwwUdSWifC/giphy.gif',
          },
          {
            first_name: 'George',
            last_name: 'Gigi',
            rank: 'e4',
            flight: 'bravo-1',
            cert_id: 2,
            weapon_arming: true,
            admin: false,
            email: 'george@spaceforce.mil',
            avatar:
              'https://media.tenor.com/8JC0Q8897jwAAAAM/facepalm-picard.gif',
          },
          {
            first_name: 'Nick',
            last_name: 'Swartson',
            rank: 'e5',
            flight: 'bravo-1',
            cert_id: 3,
            weapon_arming: true,
            admin: false,
            email: 'nick@spaceforce.mil',
            avatar: 'https://media.giphy.com/media/q7kofYLObTVUk/giphy.gif',
          },
          {
            first_name: 'Giga',
            last_name: 'Chad',
            rank: 'e5',
            flight: 'bravo-2',
            cert_id: 4,
            weapon_arming: true,
            admin: false,
            email: 'jermiah@@spaceforce.mil',
            avatar:
              'https://media.tenor.com/epNMHGvRyHcAAAAC/gigachad-chad.gif',
          },
          {
            first_name: 'Logan',
            last_name: 'Paul',
            rank: 'e6',
            flight: 'bravo-2',
            cert_id: 1,
            weapon_arming: true,
            admin: false,
            email: 'l.paul@spaceforce.mil',
            avatar:
              'https://media.giphy.com/media/XepyCu939TXLtpJ2gl/giphy.gif',
          },
          {
            first_name: 'Ronald',
            last_name: 'McDonald',
            rank: 'e6',
            flight: 'charlie-1',
            cert_id: 3,
            weapon_arming: true,
            admin: true,
            email: 'r.mcdonald@spaceforce.mil',
            avatar: 'https://media3.giphy.com/media/gVXENYotXZvi0/200.gif',
          },
        ]);
      }
    });
};
