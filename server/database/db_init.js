import DbHelper from './../helpers/DbHelper';
import Queries from './queries';
import Seeders from './seeds';

const { query } = DbHelper;
// tables
const { dropUsersTable ,dropTripsTable,dropBookingsTable ,createUsersTable,createTripsTable,createBookingsTable } = Queries;
const { usersTableSeeder, tripsTableSeeder,bookingsTableSeeder } = Seeders;

// eslint-disable-next-line import/prefer-default-export
export const initDB = async () => {
  await query(dropTripsTable);
  await query(dropUsersTable);
  await query(dropBookingsTable);
  await query(createTripsTable);
  await query(createUsersTable);
  await query(createBookingsTable);
  // start seeding
  await usersTableSeeder();
  await tripsTableSeeder();
  await bookingsTableSeeder();
};
initDB();
