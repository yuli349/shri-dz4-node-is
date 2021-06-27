const axios = require('axios');
const { execFile } = require('child_process');
const { rm } = require('fs/promises');
const { GIT_LOCAL_PATH, GIT_REPOSITORY_FOLDER_NAME, AXIOS_CONFIG } = require('../../config/index');

module.exports = async (req, res) => {
  try {
    console.log(req);
    const response = await axios.post('/conf', req.body, AXIOS_CONFIG);
    rm(GIT_LOCAL_PATH, { recursive: true, force: true });
    execFile('git', ['clone', req.body.repoName, GIT_REPOSITORY_FOLDER_NAME]);
    res.json(response.data);
  } catch (error) {
    res.send(error);
  }
};
