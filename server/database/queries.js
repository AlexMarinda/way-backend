const dropUsersTable = `drop table users`;
const dropTripsTable = `drop table trips`;
const dropBookingsTable = `drop table bookings`;

const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users(
        user_id SERIAL PRIMARY KEY,
        email VARCHAR (255) NOT NULL UNIQUE,
        first_name VARCHAR (255) NOT NULL ,
        last_name VARCHAR (255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        is_admin BOOLEAN DEFAULT false
        )
      `;
      const createTripsTable = `
      CREATE TABLE IF NOT EXISTS trips(
        trip_id SERIAL PRIMARY KEY,
        seating_capacity INTEGER,
        status VARCHAR (255) DEFAULT 'active',
        fare INTEGER NOT NULL,
        origin VARCHAR (255) NOT NULL,
        destination VARCHAR (255) NOT NULL,
        trip_date DATE NOT NULL,
        bus_license_number VARCHAR (255) NOT NULL
  
      )
     `;
     const createBookingsTable = `
      CREATE TABLE IF NOT EXISTS bookings(
        book_id SERIAL PRIMARY KEY,
        seat_number INTEGER,
        created_on TIMESTAMP,
        trip_id INTEGER,
        user_id INTEGER,
        FOREIGN KEY (trip_id) REFERENCES trips (trip_id),
        FOREIGN KEY (user_id) REFERENCES users (user_id)
      )
     `;


export default {
  dropUsersTable ,
  dropTripsTable ,
  dropBookingsTable ,
  createUsersTable,
  createTripsTable,
  createBookingsTable
};
