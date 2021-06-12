const axios = require('axios');
const util = require('util');
const { GIT_LOCAL_PATH, AXIOS_CONFIG } = require('../../config/index');

module.exports = async (req, res) => {
  try {
    const commitHash = req.params.commitHash;
    const exec = util.promisify(require('child_process').exec);
    const dir = GIT_LOCAL_PATH + '\\.git';

    const branchSearchResult = await exec('git --git-dir ' + dir + ' branch --contains ' + commitHash);
    const branchName = branchSearchResult.stdout.replace(/\*/g, '').trim();
    const logResult = await exec('git --git-dir ' + dir + ' log -1 --pretty=format:"%H|%an|%s" ' + commitHash);
    const commitInfo = logResult.stdout.split('|');
    const authorName = commitInfo[1].trim();
    const commitMessage = commitInfo[2].trim();

    const requestBody = { commitMessage, commitHash, branchName, authorName };
    const response = await axios.post('/build/request', requestBody, AXIOS_CONFIG);

    res.json(response.data);

  } catch (error) {

    res.send(error);
  }
};
