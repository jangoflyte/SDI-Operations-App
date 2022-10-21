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
              'https://i.pinimg.com/originals/ac/97/a4/ac97a40174f0864df0234746dd3a1f5f.jpg',
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
          },
          {
            first_name: 'Jermiah',
            last_name: 'Lastname',
            rank: 'e5',
            flight: 'bravo-2',
            cert_id: 4,
            weapon_arming: true,
            admin: false,
            email: 'jermiah@@spaceforce.mil',
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
          },
        ]);
      }
    });
};
