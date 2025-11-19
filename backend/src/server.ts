import app from './app';
import sequelize from './models';
import dotenv from 'dotenv';
import fs from 'fs';
import csv from 'csv-parser';
import Staff from './models/Staff';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function onBoardSeedStaff() {

  const count = await Staff.count();
  if (count > 1) {
    console.log('Already patched data to Employees table. Skip seeding data.');
    return;
  }

  // Read CSV and insert seed Staff data to DB
  const csvPath = 'src/seedData/staff-id-to-team-mapping.csv';
  fs.createReadStream(csvPath)
    .pipe(csv({ mapHeaders: ({ header }) => header.trim().replace(/^\uFEFF/, '') }))
    .on('data', async (row) => {
      if (row.staff_pass_id && row.team_name && row.created_at) {
        await Staff.create({
        staff_pass_id: row.staff_pass_id,
        team_name: row.team_name,
        created_at: new Date(Number(row.created_at)),
        redeemed: true,
        redeemed_at: new Date()
      });
      };
    })
    .on('end', () => {
      console.log('Staff CSV loaded.');
    });
}

sequelize.sync().then(() => {
  onBoardSeedStaff();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
