import users from '../model/users';
import trips from '../model/trip';
import bookings from '../model/book';

import DbHelper from '../helpers/DbHelper';

const { query } = DbHelper;

const usersTableSeedsQuery = `
        INSERT INTO users(email,first_name,last_name,password,is_admin) 
        values($1,$2,$3,$4,$5);
      `;

const tripsTableSeedsQuery = `
      INSERT INTO trips(seating_capacity,fare,origin,destination,trip_date,bus_license_number)
        values($1,$2,$3,$4,$5,$6);
      `;
const bookingsTableSeedsQuery = `
      INSERT INTO bookings(seat_number,created_on,trip_id,user_id)
        values($1,$2,$3,$4);
      `;
 

 

const usersTableSeeder = async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const user of users) {
    // eslint-disable-next-line no-await-in-loop
    await query(usersTableSeedsQuery, [
      user.email,
      user.first_name,
      user.last_name,
      user.password,
      user.is_admin
    ]);
  }
};

const tripsTableSeeder = async () => {
  // eslint-disable-next-line no-restricted-syntax
  for (const trip of trips) {
    // eslint-disable-next-line no-await-in-loop
    await query(tripsTableSeedsQuery, [
      trip.seating_capacity,
      trip.fare,
      trip.origin,
      trip.destination,
      trip.trip_date,
      trip.bus_license_number,

    ]);
  }
};


const bookingsTableSeeder = async () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const book of bookings) {
      // eslint-disable-next-line no-await-in-loop
      await query(bookingsTableSeedsQuery, [
        book.seat_number,
        book.created_on,
        book.trip_id,
        book.user_id
      ]);
    }
  };

export default {
    usersTableSeeder, 
    tripsTableSeeder,
    bookingsTableSeeder 
};
