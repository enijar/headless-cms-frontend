const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '..', '..', '..', '.env')});

export default {
  env: process.env.APP_ENV,
  apiServer: process.env.API_SERVER,
};
