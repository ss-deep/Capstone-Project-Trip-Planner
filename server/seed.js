require('dotenv').config()

const { CONNECTION_STRING } = process.env  //process.env.CONNECTION_STRING

const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING)

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists notes;
        drop table if exists days;
        drop table if exists trip_details;
        drop table if exists trip;
        drop table if exists users;

        create table users (
            user_id serial primary key, 
            username varchar(100), 
            password varchar(100), 
            email varchar(50)
        );
        create table trip (
            trip_id serial primary key, 
			user_id integer references users(user_id), 
            trip_name varchar(100), 
            date varchar(50)
        );

        create table notes (
            note_id serial primary key, 
            user_id integer references users(user_id), 
            note varchar(200)
        );

        create table trip_details (
            trip_id serial primary key, 
            user_id integer references users(user_id), 
            place_name varchar(500),
            hours varchar(50),
            website varchar(200),
            address varchar(500)
        );

        create table days (
            days_id serial primary key, 
            trip_id integer references trip_details(trip_id), 
            user_id integer references users(user_id)
        );

        insert into users (username, password, email)
        values ('Pennie', 'Green', 'pbenazet1@tripadvisor.com'),
            ('Salvidor', 'Fall', 'smoenss@google.it'),
            ('Jarred', 'Spring', 'jgiraudyu@narod.ru'),
            ('Leland', 'abcde', 'ltillsw@usgs.gov'),
            ('Sullivan', 'Blue', 'sboddiex@cbsnews.com');

        insert into notes (user_id, note)
        values (1, 'The Texas State Capitol, completed in 1888 in Downtown Austin, contains the offices and chambers of the Texas Legislature and the Office of the Governor.'),
            (5, 'The Texas State Capitol, completed in 1888 in Downtown Austin, contains the offices and chambers of the Texas Legislature and the Office of the Governor.'),
            (4, 'The Texas State Capitol, completed in 1888 in Downtown Austin, contains the offices and chambers of the Texas Legislature and the Office of the Governor.'),
            (4, 'The Texas State Capitol, completed in 1888 in Downtown Austin, contains the offices and chambers of the Texas Legislature and the Office of the Governor.'),
            (3, 'The Texas State Capitol, completed in 1888 in Downtown Austin, contains the offices and chambers of the Texas Legislature and the Office of the Governor.'),
            (1, 'The Texas State Capitol, completed in 1888 in Downtown Austin, contains the offices and chambers of the Texas Legislature and the Office of the Governor.'),
            (2, 'The Texas State Capitol, completed in 1888 in Downtown Austin, contains the offices and chambers of the Texas Legislature and the Office of the Governor.');

           
        insert into trip_details (user_id, place_name, hours, website, address)
        values (1, 'Las Vegas', 'Tu-Su 13:00-17:00', 'pbenazet1@tripadvisor.com', '34 Sundown Park'),
            (1,  'Las Vegas', 'Mo-Su 1:00-7:00', 'pbenazet1@tripadvisor.com', '35661 Fordem Center'),
            (2,  'Las Vegas', 'Tu-Su 13:00-17:00', 'pbenazet1@tripadvisor.com', '8739 New Castle Avenue'),
            (2,  'Las Vegas', 'Mo-Su 1:00-8:00', 'pbenazet1@tripadvisor.com', '9 Portage Park'),
            (3,  'Las Vegas', 'Tu-Su 13:00-17:00', 'pbenazet1@tripadvisor.com', '480 Golf Center'),
            (3,  'Las Vegas', 'Mo-Su 13:00-17:00', 'pbenazet1@tripadvisor.com', '7 Mayfield Way'),
            (4,  'Las Vegas', 'Tu-Su 3:00-9:00', 'pbenazet1@tripadvisor.com', '896 Lerdahl Park'),
            (4,  'Las Vegas', 'Tu-Su 13:00-17:00', 'pbenazet1@tripadvisor.com', '73 Karstens Trail'),
            (5,  'Las Vegas', 'Mo-Su 3:00-7:00', 'pbenazet1@tripadvisor.com', '73 Karstens Trail'),
            (5,  'Las Vegas', 'Tu-Su 13:00-17:00', 'pbenazet1@tripadvisor.com', '567 Dovetail Court'),
            (2,  'Las Vegas', 'Tu-Su 1:00-7:00', 'pbenazet1@tripadvisor.com', '16724 Old Shore Circle'),
            (3,  'Las Vegas', 'Mo-Su 13:00-17:00', 'pbenazet1@tripadvisor.com', '82 Judy Street');
            
        insert into days (trip_id, user_id)
        values (3, 3),
            (2, 3),
            (1, 3),
            (10, 2),
            (9, 2),
            (8, 4),
            (7, 4),
            (6, 5),
            (5, 5),
            (4, 1),
            (3, 1),
            (1, 1),
            (2, 2);
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}





