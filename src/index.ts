import { log } from 'console';
import app from './app';
import config from './config';
import sequelize from './db/connection';

sequelize.sync().then(() => {
  app.listen(config.PORT, () => {
    log(`Listening on http://localhost:${config.PORT}`);
  });
});
