const path = require('path');

module.exports = {
  PORT: 3000,
  GIT_LOCAL_PATH: path.resolve(__dirname, '../../Jason'),
  GIT_REPOSITORY_FOLDER_NAME: 'Jason',
  AXIOS_CONFIG: {
    baseURL: process.env.base_url,
    headers: {
      'Authorization': 'Bearer ' + process.env.token,
    },
  },
};
