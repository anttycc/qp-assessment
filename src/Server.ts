import { App } from './App';
import SequelizeConnection from './Configs/SequelizeConnection';

new App();
process.on('SIGINT', () => {
    SequelizeConnection.close();
    process.exit();
  });