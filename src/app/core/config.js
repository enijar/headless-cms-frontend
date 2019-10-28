if (process.env.APP_ENV === 'testing') {
  require('dotenv').config({path: require('path').resolve(__dirname, '..', '..', '..', '.env')});
}

export default {
  env: process.env.APP_ENV,
  apiServer: process.env.API_SERVER,
  publicRoutes: [
    '/forgot-login',
  ],
};
