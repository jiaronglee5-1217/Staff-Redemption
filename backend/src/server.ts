import app from './app';
import sequelize from './models';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
