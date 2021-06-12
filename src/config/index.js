const path = require('path');

module.exports = {
  PORT: 3000,
  GIT_LOCAL_PATH: path.resolve(__dirname, '../../Jason'),
  GIT_REPOSITORY_FOLDER_NAME: 'Jason',
  AXIOS_CONFIG: {
    baseURL: 'https://shri.yandex/hw/api',
    headers: {
      'Authorization': process.env.token,
    },
  },
};
