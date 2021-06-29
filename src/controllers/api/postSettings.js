const axios = require('axios');
const { execFile } = require('child_process');
const util = require('util');
const { rm } = require('fs/promises');
const { GIT_LOCAL_PATH, GIT_REPOSITORY_FOLDER_NAME, AXIOS_CONFIG } = require('../../config/index');

module.exports = async (req, res) => {
  try {
    await rm(GIT_LOCAL_PATH, { recursive: true, force: true });
    await util.promisify(execFile)('git', ['clone', req.body.repoName, GIT_REPOSITORY_FOLDER_NAME]);
    const response = await axios.post('/conf', req.body, AXIOS_CONFIG);
    res.json(response.data);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};
