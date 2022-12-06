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

            // avatar:
            //   'https://media0.giphy.com/media/KRH2MDRBywNwHe91h9/giphy.gif',
            avatar: 'https://media3.giphy.com/media/sy0AVzau2L8oE/giphy.gif',
            notes: 'DO NOT DELETE',
          },
          {
            first_name: 'Nick',
            last_name: 'Sexton',
            rank: 'o1',
            flight: 'alpha-1',
            cert_id: 3,
            weapon_arming: false,
            admin: false,
            email: 'nicks@spaceforce.mil',

            avatar:
              'https://images.unsplash.com/photo-1539538507524-eab6a4184604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
            // avatar:
            // 'https://media4.giphy.com/media/1rSQ3HLhM8G6NPzLqG/giphy.gif',
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
            // avatar:
            // 'https://images.unsplash.com/photo-1511989130945-c2b632959395?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
            // avatar: 'https://media.giphy.com/media/D7z8JfNANqahW/giphy.gif',
            avatar_background: 'blue',
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

            // avatar:
            //   'https://media1.giphy.com/media/3ornjPteRwwUdSWifC/giphy.gif',
            avatar:
              'https://plus.unsplash.com/premium_photo-1661757906736-f82257dbbd57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
          },
          {
            first_name: 'George',
            last_name: 'Mihov',
            rank: 'o4',
            flight: 'bravo-1',
            cert_id: 2,
            weapon_arming: true,
            admin: false,
            email: 'george@spaceforce.mil',

            avatar:
              'https://images.unsplash.com/photo-1569242840510-9fe6f0112cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80',
            // avatar:
            // 'https://media.tenor.com/8JC0Q8897jwAAAAM/facepalm-picard.gif',
          },
          {
            first_name: 'Nick',
            last_name: 'Swisher',
            rank: 'e7',
            flight: 'bravo-1',
            cert_id: 3,
            weapon_arming: true,
            admin: false,
            email: 'nick@spaceforce.mil',
            avatar:
              'https://images.unsplash.com/photo-1571795184552-5f1df723de54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2352&q=80',
            // avatar: 'https://media.giphy.com/media/q7kofYLObTVUk/giphy.gif',
          },
          {
            first_name: 'Elizabeth',
            last_name: 'Simmons',
            rank: 'e2',
            flight: 'bravo-2',
            cert_id: 4,
            weapon_arming: true,
            admin: false,
            email: 'elizsims@spaceforce.mil',

            avatar:
              'https://images.unsplash.com/photo-1542328025-50d8b06fc769?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
            // avatar:
            // 'https://media.tenor.com/epNMHGvRyHcAAAAC/gigachad-chad.gif',
          },
          {
            first_name: 'Julio',
            last_name: 'Chavez',
            rank: 'e7',
            flight: 'bravo-2',
            cert_id: 1,
            weapon_arming: true,
            admin: false,
            email: 'j.chavez@spaceforce.mil',
            avatar:
              'https://images.unsplash.com/photo-1453683685760-b8db0bbb8dc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
            //  avatar: 'https://media.giphy.com/media/XepyCu939TXLtpJ2gl/giphy.gif',
          },
          {
            first_name: 'William',
            last_name: 'Pryor',
            rank: 'e5',
            flight: 'charlie-1',
            cert_id: 3,
            weapon_arming: true,
            admin: true,
            email: 'willp@spaceforce.mil',
            avatar:
              'https://images.unsplash.com/photo-1569242840838-2a6bdd402fe4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2369&q=80',
            // avatar: 'https://media3.giphy.com/media/gVXENYotXZvi0/200.gif',
          },
        ]);
      }
    });
};
